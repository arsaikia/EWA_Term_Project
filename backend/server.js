import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import { MongoDB, MySQL, SQL } from './config/db.js';

import { usersRoute } from './routes/users.js';

dotenv.config();

// Test DB using sequelize
SQL.authenticate()
	.then(() => console.log(`DB Connected Sequalize!`.cyan.bold.underline))
	.catch((err) => console.log(`DB Not Connected Sequalize! ${err}`.red.bold));

const app = express();

// Mount routers
app.use('/users', usersRoute);

// Listen to the PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
	return console.log(`Server sarted on PORT ${PORT}`.yellow.bold);
});
