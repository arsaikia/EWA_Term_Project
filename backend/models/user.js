import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Users = SQL.define(
    'users',
    {
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
    },
    {
        timestamps: false,
    }
);

Users.sync().then(() => {
    console.log('Users created');
});

export default Users;
