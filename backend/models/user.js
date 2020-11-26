import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

import Address from './Address.js';

const Users = SQL.define(
    'users',
    {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userType: {
            type: Sequelize.STRING,
            allowNull: false,
            values: ['CUSTOMER', 'STORE_MANAGER', 'ADMIN'],
        },
        foodPreference: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['ALL', 'VEGAN', 'MEAT', 'HEALTHY'],
        },
        // Should these be outside just like how other models are implemented ?
        storeManager: {
            type: Sequelize.UUID,
            references: {
                model: 'stores',
                key: 'storeId',
            },
        },
        storePrefered: {
            type: Sequelize.UUID,
            references: {
                model: 'stores',
                key: 'storeId',
            },
        },
    },
    {
        timestamps: false,
    }
);

// Stores.hasMany(Users);

Users.beforeCreate((user, _) => {
    return (user.userId = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
    Users.sync()
        .then(() => {
            Address.beforeCreate((address, _) => {
                return (address.addressId = uuid());
            });
            Address.belongsTo(Users, {
                foreignKey: {
                    name: 'userId',
                },
            });

            SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
                Address.sync()
                    .then(() => {
                        console.log(`Address created`.cyan.bold);
                    })
                    .catch((error) => console.log('ERROR', error));
            });

            console.log(`Transactions created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error));
});

export default Users;
