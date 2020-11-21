import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

const Address = SQL.define(
    'addresses',
    {
        addressId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
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

Address.beforeCreate((address, _) => {
    return (address.addressId = uuid());
});

Address.sync()
    .then(() => {
        console.log(`Address created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Address;

//
