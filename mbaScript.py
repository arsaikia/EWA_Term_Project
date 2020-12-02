#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import json
import re
import contextlib
import csv
import datetime
import os
import pymysql
import uuid

## Generate Customer Registration csv
REGISTRATION_SQL_QUERY = """
SELECT * FROM orders;
"""

connection = pymysql.connect(host='ewa-term-project-instance.ccstkwakl93l.us-east-2.rds.amazonaws.com',
                             user='admin',
                             password='#ewa_term_project#',
                             db='ewaDB')

with contextlib.closing(connection):
    with connection.cursor() as cursor:
        cursor.execute(REGISTRATION_SQL_QUERY)
        registration_results = cursor.fetchall()

registration_col_names = [i[0] for i in cursor.description]

registration_results = (tuple(registration_col_names),) + registration_results
        
registartion_output_file = './backend/_data/orders.csv'
with open(registartion_output_file, 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile, lineterminator='\n')
    csv_writer.writerows(registration_results)
    
orders = pd.read_csv('./backend/_data/orders.csv')
my_basket = orders.groupby(['transactionId', 'productId'])['quantity'].sum().unstack().reset_index().set_index('transactionId')
drop_nan = my_basket.fillna(0)

def encoder(x):
    if x == 0:
        return 0
    elif x > 0:
        return 1

def encoder2(x):
    if len(x) == 1:
        return x
    elif len(x) != 1:
        return np.nan

def encoder3(x):
    if (x):
        x = x[12:-3]
        return x

encoded_basket = drop_nan.applymap(encoder)
my_frequent_itemsets = apriori(encoded_basket, min_support = 0.01, use_colnames = True)
my_rules = association_rules(my_frequent_itemsets, metric = "lift", min_threshold = 1)
column = my_rules["consequent support"]
max_value = column.max()
final_products = my_rules.drop(['antecedent support', 'consequent support', 'support', 'confidence', 'lift'
                               ,'leverage', 'conviction'], axis=1)
final_products = final_products.rename(columns={"antecedents": "productA", "consequents": "productB"})

encoded2_basket = final_products.applymap(encoder2)
encoded2_basket = encoded2_basket.dropna()
encoded2_basket['productA'] = encoded2_basket['productA'].astype('|S')
encoded2_basket['productB'] = encoded2_basket['productB'].astype('|S')
encoded3_basket = encoded2_basket.applymap(encoder3)
encoded3_basket['marketBasketId'] = encoded3_basket.apply(lambda _: str(uuid.uuid4()), axis=1)
encoded3_basket = encoded3_basket[['marketBasketId', 'productA', 'productB']]
result = encoded3_basket.to_json(r'./backend/_data/mba.json',orient="records")
print('Success!')

