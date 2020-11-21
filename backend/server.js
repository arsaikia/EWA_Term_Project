import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoDB, MySQL, SQL } from './config/db.js';

import { usersRoute } from './routes/users.js';
import { productsRoute } from './routes/products.js';
import { storesRoute } from './routes/stores.js';

dotenv.config();

// Test DB using sequelize
SQL.authenticate()
    .then(() => console.log(`DB Connected Sequalize!`.cyan.bold.underline))
    .catch((err) => console.log(`DB Not Connected Sequalize! ${err}`.red.bold));

// SQL.sync({force: true})
//     .then(() => console.log(`All Tables Dropped`.blue.bold.underline))
//     .catch((err) => console.log(`Tables drop Failed ${err}`.red.bold.underline));

const app = express();

// Body Parser
app.use(express.json());

// Allow CORS
app.use(cors());

// Mount routers
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/stores', storesRoute);

// Listen to the PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    return console.log(`Server sarted on PORT ${PORT}`.yellow.bold);
});
