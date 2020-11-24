import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';
import Transactions from './Transactions.js';

const Orders = SQL.define(
    'orders',
    {
        orderID: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        quantity: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

Orders.belongsTo(Transactions, {
    foreignKey: {
        name: 'transactionId',
    },
});
Orders.belongsTo(Address, {
    foreignKey: {
        name: 'addressId',
    },
});

//Stores.belongsTo(Address)


Orders.beforeCreate((orders, _) => {
    return (orders.orderID = uuid());
});

Orders.sync()
    .then(() => {
        console.log(`Orders created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Orders;
