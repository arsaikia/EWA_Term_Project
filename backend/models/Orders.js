import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Products from './Product.js';
import Transactions from './Transactions.js';

const Orders = SQL.define(
    'orders',
    {
        orderId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        quantity: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Orders.belongsTo(Transactions, {
    allowNull: false,
    foreignKey: {
        name: 'transactionId',
    },
});
Orders.belongsTo(Products, {
    allowNull: false,
    foreignKey: {
        name: 'productId',
    },
});

//Stores.belongsTo(Address)

Orders.beforeCreate((orders, _) => {
    return (orders.orderID = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    Orders.sync()
        .then(() => {
            console.log(`Orders created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error));
});

export default Orders;
