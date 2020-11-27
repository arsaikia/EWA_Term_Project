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

Shares.belongsTo(Users, {
    foreignKey: {
        name: 'userId',
    },
});

Shares.belongsTo(Products, {
    foreignKey: {
        name: 'productId',
    },
});

Shares.beforeCreate((shares, _) => {
    return (shares.shareId = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() =>
Shares.sync({ force: true }) //  { force: true }
        .then(() => {
            console.log(`Shares created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error))
);

export default Shares;