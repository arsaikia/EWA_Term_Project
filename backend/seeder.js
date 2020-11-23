import fs from 'fs';
import colors from 'colors';
import { SQL } from './config/db.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Load models
import Products from './models/Product.js';
import Address from './models/Address.js';
import Stores from './models/Store.js';
import StoreProducts from './models/StoreProduct.js';
import Carts from './models/Cart.js';
import Users from './models/User.js';

// Connect to DB
SQL.authenticate();

// Read JSON files

const users = JSON.parse(fs.readFileSync(`./_data/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`./_data/products.json`, 'utf-8'));
const addresses = JSON.parse(
    fs.readFileSync(`./_data/addresses.json`, 'utf-8')
);
const stores = JSON.parse(fs.readFileSync(`./_data/stores.json`, 'utf-8'));
const storeproducts = JSON.parse(
    fs.readFileSync(`./_data/storeproducts.json`, 'utf-8')
);
const carts = JSON.parse(fs.readFileSync(`./_data/carts.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Users.bulkCreate(users);
        await Products.bulkCreate(products);
        await Address.bulkCreate(addresses);
        await Stores.bulkCreate(stores);
        await StoreProducts.bulkCreate(storeproducts);
        await Carts.bulkCreate(carts);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Users.destroy({ where: {} });
        await Products.destroy({ where: {} });
        await Address.destroy({ where: {} });
        await Stores.destroy({ where: {} });
        await StoreProducts.destroy({ where: {} });
        await Carts.destroy({ where: {} });

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
