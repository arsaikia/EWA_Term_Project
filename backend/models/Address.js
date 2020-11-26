import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Users from './User.js';
// import Stores from './Store.js';

const Address = SQL.define(
    'addresses',
    {
        addressId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            // defaultValue: () => uuid(),
        },
        street1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        street2: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        zip: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

export default Address;
