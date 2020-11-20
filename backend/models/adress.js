import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Address = SQL.define(
    'products',
    {
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
            type: Sequelize.STRING,
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

Address.sync().then(() => {
    console.log('Address created');
});

export default Products;

//