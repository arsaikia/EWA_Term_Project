import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import { MongoDB, MySQL, SQL } from './config/db.js';

import { userRoute } from './routes/user.js';

dotenv.config();

// Test DB using sequelize
SQL.authenticate()
	.then(() => console.log(`DB Connected Sequalize!`.cyan.bold.underline))
	.catch((err) => console.log(`DB Not Connected Sequalize! ${err}`.red.bold));

const app = express();

// USER routes
app.use('/user', userRoute);

// USER routes
app.use('/user/:id', userRoute);


// Listen to the PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
	return console.log(`Server sarted on PORT ${PORT}`.yellow.bold);
});
