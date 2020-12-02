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
import { cartsRoute } from './routes/carts.js';
import { transactionsRoute } from './routes/transactions.js';
import { ordersRoute } from './routes/orders.js';
import { cardsRoute } from './routes/cards.js';
import { addressesRoute } from './routes/addresses.js';
import { sharesRoute } from './routes/shares.js';
import { reviewRouter } from './routes/reviews.js';
import { marketbasketRoute } from './routes/marketbasket.js';

dotenv.config();

// Test DB using sequelize
SQL.authenticate()
    .then(() => console.log(`DB Connected Sequalize!`.cyan.bold.underline))
    .catch((err) => console.log(`DB Not Connected Sequalize! ${err}`.red.bold));

// Connect to mongo
MongoDB();

const app = express();

// Body Parser
app.use(express.json());

// Allow CORS
app.use(cors());

// Mount routers
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/stores', storesRoute);
app.use('/carts', cartsRoute);
app.use('/transactions', transactionsRoute);
app.use('/orders', ordersRoute);
app.use('/cards', cardsRoute);
app.use('/addresses', addressesRoute);
app.use('/shares', sharesRoute);
app.use('/reviews', reviewRouter);
app.use('/marketbasket', marketbasketRoute);

// Listen to the PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    return console.log(`Server sarted on PORT ${PORT}`.yellow.bold);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
