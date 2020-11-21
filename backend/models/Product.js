import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';
import { v4 as uuid } from 'uuid';

const Products = SQL.define(
    'products',
    {
        productId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: uuid(),
        },

        productName: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        category: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [
                'PRODUCE',
                'DAIRY_AND_EGGS',
                'FROZEN',
                'BEVERAGES',
                'SNACKS',
            ],
            defaultValue: 'PRODUCE',
        },

        subcategory: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        isVeg: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },

        countInStock: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        foodPreference: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['ALL', 'VEGAN', 'MEAT', 'HEALTHY'],
            defaultValue: 'ALL',
        },

        quantityType: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['NUMBERS', 'LBS'],
        },
    },
    {
        timestamps: false,
    }
);

Products.beforeCreate((product, _) => {
    return (product.productId = uuid());
});

Products.sync()
    .then(() => {
        console.log('Products created'.cyan.bold);
    })
    .catch((error) => console.log('ERROR', error));

export default Products;
