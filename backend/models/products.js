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
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category: {
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

Products.beforeCreate((product, _) => {
    return (product.productId = uuid());
});

Products.sync().then(() => {
    console.log('Products created'.cyan.bold);
});

export default Products;