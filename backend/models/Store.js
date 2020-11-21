import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';

const Stores = SQL.define(
    'stores',
    {
        storeId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        storeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        addressId: {
            type: Sequelize.UUID,
            references: {
                model: 'addresses',
                key: 'addressId',
            },
        },
    },
    {
        timestamps: false,
    }
);

Address.hasOne(Stores);

//Stores.belongsTo(Address)

// const StoreProducts = SQL.define('storeproducts', {
//     storeId: {
//         type: Sequelize.UUID,
//         references: {
//             model: 'stores',
//             key: 'storeId',
//         },
//     },
//     productId: {
//         type: Sequelize.UUID,
//         references: {
//             model: 'products',
//             key: 'productId',
//         },
//     },
// });

Stores.belongsToMany(Products, { through: 'storeproducts' });
Products.belongsToMany(Stores, { through: 'storeproducts' });



Stores.beforeCreate((stores, _) => {
    return (stores.storeId = uuid());
});

Stores.sync()
    .then(() => {
        console.log(`Stores created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Stores;
