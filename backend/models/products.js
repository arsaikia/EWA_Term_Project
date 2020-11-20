import { Sequelize } from 'sequelize';
import { SQL } from '../config/db.js';

const Products = SQL.define(
    'products',
    {
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        catagory: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isVeg: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantityType: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['NUMBERS', 'LBS', 'OZ'],
        },
    },
    {
        timestamps: false,
    }
);

Products.sync().then(() => {
    console.log('Products created');
});

export default Products;