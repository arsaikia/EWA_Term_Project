import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Stores from './Store.js';
import Products from './Product.js';

const StoreProducts = SQL.define(
    'storeproducts',
    {
        storeId: {
            type: Sequelize.UUID,
            primaryKey: true,
            distinct: true,
            references: {
                model: 'stores',
                key: 'storeId',
            },
        },
        productId: {
            type: Sequelize.UUID,
            primaryKey: true,
            distinct: true,
            references: {
                model: 'products',
                key: 'productId',
            },
        },
    },
    {
        timestamps: false,
    }
);

Stores.belongsToMany(Products, { through: StoreProducts });
Products.belongsToMany(Stores, { through: StoreProducts });

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    StoreProducts.sync()
        .then(() => {
            console.log(`StoreProducts created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error));
});

export default StoreProducts;
