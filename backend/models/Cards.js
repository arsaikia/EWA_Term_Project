import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Address from './Address.js';
import Products from './Product.js';
import Users from './User.js';

const Cards = SQL.define(
    'cards',
    {
        cardId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },
        cardNumbaer: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

Cards.belongsTo(Users, {
    foreignKey: {
        name: 'userId',
    },
});

//Stores.belongsTo(Address)


Cards.beforeCreate((cards, _) => {
    return (cards.cardId = uuid());
});

Cards.sync()
    .then(() => {
        console.log(`Cards created`.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Cards;
