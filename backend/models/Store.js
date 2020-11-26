import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';

const Stores = SQL.define(
    'stores',
    {
        storeId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        storeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Stores.belongsTo(Address, {
    foreignKey: {
        name: 'addressId',
    },
});

Stores.beforeCreate((stores, _) => {
    return (stores.storeId = uuid());
});

SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() =>
    Stores.sync() //  { force: true }
        .then(() => {
            console.log(`Stores created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error))
);

export default Stores;
