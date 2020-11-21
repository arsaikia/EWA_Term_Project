import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

import Users from './user.js';
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
        // userId: {
        //     type: Sequelize.UUID,
        //     references: {
        //         model: 'users',
        //         key: 'userId',
        //     },
        // },
        // productId: {
        //     type: Sequelize.UUID,
        //     references: {
        //         model: 'products',
        //         key: 'productId',
        //     },
        // },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

// Cart.hasOne(Users);
// Cart.hasMany(Products);

Cart.belongsTo(Users, {
    foreignKey: {
      name: 'userId'
    }
  });

  Cart.belongsTo(Products, {
    foreignKey: {
      name: 'productId'
    }
  });

//   Cart.belongsTo(Products, {
//     foreignKey: {
//       name: 'userId'
//     }
//   });

Cart.beforeCreate((cart, _) => {
    return (cart.cartId = uuid());
});

Cart.sync()
    .then(() => {
        console.log(`Cart created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Cart;
