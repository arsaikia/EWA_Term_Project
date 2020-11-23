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

StoreProducts.sync({ force: true })
    .then(() => {
        console.log(`StoreProducts created`.red.inverse.underline);
    })
    .catch((error) => console.log('ERROR', error));

export default StoreProducts;
