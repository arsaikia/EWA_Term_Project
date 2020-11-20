import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

const Users = SQL.define(
    'users',
    {
        id: {
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
    },
    {
        timestamps: false,
    }
);

Users.beforeCreate((user, _) => {
    return (user.id = uuid());
});

Users.sync().then(() => {
    console.log('Users created');
});

export default Users;
