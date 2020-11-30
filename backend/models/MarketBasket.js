import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';
import Products from './Product.js';

const MarketBasket = SQL.define(
    'marketbasket',
    {
        marketBasketId: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        
        productA: {
            type: Sequelize.UUID,
            references: {
                model: 'products',
                key: 'productId',
            },
        },
        productB: {
            type: Sequelize.UUID,
            references: {
                model: 'products',
                key: 'productId',
            },
        },
    },
    {
        timestamps: false,
    }
);


SQL.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() =>
    MarketBasket.sync({ force: true }) //  
        .then(() => {
            console.log(`MarketBasket created`.cyan.bold);
        })
        .catch((error) => console.log('ERROR', error))
);

export default MarketBasket;
