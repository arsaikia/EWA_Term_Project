import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoDB, MySQL, SQL } from './config/db.js';

import { usersRoute } from './routes/users.js';
import { productsRoute } from './routes/users.js';
import { storesRoute } from './routes/users.js';

dotenv.config();

// Test DB using sequelize
SQL.authenticate()
	.then(() => console.log(`DB Connected Sequalize!`.cyan.bold.underline))
	.catch((err) => console.log(`DB Not Connected Sequalize! ${err}`.red.bold));

const app = express();

// Body Parser
app.use(express.json());

// Allow CORS
app.use(cors());

// Mount routers
app.use('/users', usersRoute);
app.use('/products', productRoute);
app.use('/stores', storeRoute);

// Listen to the PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
	return console.log(`Server sarted on PORT ${PORT}`.yellow.bold);
});
