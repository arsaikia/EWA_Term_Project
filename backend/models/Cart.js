import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

import Users from './User.js';
import Products from './Product.js';

const Cart = SQL.define(
    'cart',
    {
        cartId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },

        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Cart.belongsTo(Users, {
    foreignKey: {
        name: 'userId',
    },
});

Cart.belongsTo(Products, {
    foreignKey: {
        name: 'productId',
    },
});

Cart.beforeCreate((cart, _) => {
    return (cart.cartId = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    Cart.sync()
        .then(() => {
            console.log(`Cart created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error));
});

export default Cart;
