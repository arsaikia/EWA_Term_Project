import fs from 'fs';
import colors from 'colors';
import { SQL } from './config/db.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

import MarketBasket from './models/MarketBasket.js';

// Connect to DB
SQL.authenticate();

// Read JSON file
const marketbasket = JSON.parse(fs.readFileSync(`./_data/mba.json`, 'utf-8'));

// Delete data
const deleteData = async () => {
    try {
        await MarketBasket.destroy({ where: {} });

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Import into DB
const importData = async () => {
    try {
        await MarketBasket.bulkCreate(marketbasket);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

deleteData();
importData();