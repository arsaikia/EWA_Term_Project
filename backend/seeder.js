import fs from 'fs';
import colors from 'colors';
import { SQL } from './config/db.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Load models
import Products from './models/Product.js';

// Connect to DB
SQL.authenticate();

// Read JSON files

const products = JSON.parse(fs.readFileSync(`./_data/products.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Products.bulkCreate(products);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Products.destroy({ where: {} });

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
