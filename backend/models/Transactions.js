import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';
import Users from './User.js';
import Stores from '../models/Store.js';

// I'm storing all dates as string for now. This can be changed to a date time datatype later
const Transactions = SQL.define(
    'transactions',
    {
        transactionId: {
            allowNull: false,
            primaryKey: true,
            distinct: true,
            type: Sequelize.UUID,
        },
        purchaseDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        totalPrice: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        deliveryForcast: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        deliveryActual: {
            type: Sequelize.DATEONLY,
        },
        deliveryMethod: {
            type: Sequelize.STRING,
            allowNull: false,
            values: ['HOME', 'STORE'],
            defaultValue: 'HOME',
        },
        deliveryStatus: {
            type: Sequelize.STRING,
            allowNull: false,
            values: ['DELIVERED', 'IN_PROGRESS'],
            defaultValue: 'IN_PROGRESS',
        },
    },
    {
        timestamps: false,
    }
);

Transactions.belongsTo(Users, {
    allowNull: false,
    foreignKey: {
        name: 'userId',
    },
});
Transactions.belongsTo(Address, {
    allowNull: false,
    foreignKey: {
        name: 'addressId',
    },
});
Transactions.belongsTo(Stores, {
    foreignKey: {
        name: 'storeId',
    },
});

//Stores.belongsTo(Address)

Transactions.beforeCreate((transactions, _) => {
    return (transactions.transactionID = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    Transactions.sync()
        .then(() => {
            console.log(`Transactions created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error));
});

export default Transactions;
