import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Stores = SQL.define(
    'stores',
    {
        storeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        addressID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Stores.sync().then(() => {
    console.log('Stores created');
});

export default Stores;
