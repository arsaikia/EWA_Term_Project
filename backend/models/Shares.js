import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Products from './Product.js';
import Users from './User.js';

const Shares = SQL.define(
    'shares',
    {
        shareId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Stores.belongsTo(Users, {
    foreignKey: {
        name: 'userId',
    },
});

Stores.belongsTo(Products, {
    foreignKey: {
        name: 'productsId',
    },
});

Shares.beforeCreate((shares, _) => {
    return (shares.sharesId = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() =>
Shares.sync() //  { force: true }
        .then(() => {
            console.log(`Shares created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error))
);

export default Shares;