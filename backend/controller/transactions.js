import { SQL } from '../config/db.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import Transactions from '../models/Transactions.js';
import Cart from '../models/Cart.js';
import Products from '../models/Product.js';
import Orders from '../models/Orders.js';

import lodash from 'lodash';
const { get } = lodash;
import { v4 as uuid } from 'uuid';

/*
 * @desc     Get All Transactions
 * @route    GET /api/v1/transactions
 * @access   Public
 */

const getTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await Transactions.findAll();

    if (!transactions) {
        return next(new ErrorResponse(`No Store found!`, 404));
    }
    res.status(200).json({ success: true, data: transactions });
});

/*
 * @desc     Get store with user id
 * @route    GET /api/v1/transactions/:id
 * @access   Public
 */

const getTransaction = asyncHandler(async (req, res, next) => {
    const query = `SELECT DISTINCT * FROM transactions T INNER JOIN orders O INNER JOIN products P ON T.transactionId = O.transactionId  and O.productId=P.productId where T.userId='${req.params.id}'  order by T.purchaseDate desc;`;
    const transaction = await SQL.query(query, { raw: true });

    // await Transactions.findAll({
    //     include: [
    //         {
    //             model: Orders,
    //         },
    //     ],
    //     where: {
    //         userId: req.params.id,
    //     },
    // });

    if (!transaction || transaction.length == 0) {
        console.log(`Transaction Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Transaction Not Found with id '${req.params.id}'`,
        });
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: transaction[0] }));
});

/*
 * @desc     Update transaction for cancellation
 * @route    Post /api/v1/transactions/:id
 * @access   Public
 */

const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const updateTransaction = await Transactions.update(
        { deliveryStatus: req.body.deliveryStatus },
        { where: { transactionId: req.body.transactionId } }
    );
    if (!transaction || transaction.length == 0) {
        console.log(`Transaction Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Transaction Not Found with id '${req.params.id}'`,
        });
    }
    console.log(req.params.id);
    return next(
        res.status(200).json({ success: true, data: updateTransaction })
    );
});

/*
 * @desc     Create transaction with id
 * @route    Post /api/v1/transactions/:id
 * @access   Public
 */

const createTransaction = asyncHandler(async (req, res, next) => {
    // Insert Transaction in Transactions table
    const transactionId = uuid().toString();
    const transaction = await Transactions.create({
        transactionId: transactionId,
        purchaseDate: req.body.purchaseDate,
        totalPrice: req.body.totalPrice,
        deliveryForcast: req.body.deliveryForcast,
        deliveryActual: req.body.deliveryActual,
        deliveryMethod: req.body.deliveryMethod,
        deliveryStatus: req.body.deliveryStatus,
        userId: req.body.userId,
        addressId: req.body.addressId,
        storeId: req.body.storeId,
        cardId: req.body.cardId,
        cancelReason: req.body.cancelReason,
    });

    if (!transaction || transaction.length == 0) {
        console.log(`Transaction Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Transaction Not Found with id '${req.params.id}'`,
        });
    }

    // Get all cart data for the userId
    const cart = await Cart.findAll({
        include: [
            {
                model: Products,
            },
        ],
        where: { userId: req.body.userId },
    });

    if (!cart) {
        return next(new ErrorResponse(`No cart found!`, 404));
    }

    // If we have cart, add those to the orders Table
    let order;
    for (const cartItem of cart) {
        const responseData = JSON.parse(JSON.stringify(cartItem));

        const quantity = get(responseData, 'quantity');
        const productId = get(get(responseData, 'product'), 'productId');

        const ordId = uuid().toString();
        order = await Orders.create({
            orderId: ordId,
            quantity: quantity,
            transactionId: transactionId,
            productId: productId,
        });
    }
    if (!order || order.length <= 0) {
        await Transactions.destroy({
            where: { transactionId: transactionId },
        });
        return res.status(404).json({
            success: false,
            error: `Order Creation was not successful!'`,
        });
    }

    await Cart.destroy({
        where: { userId: req.body.userId },
    });

    return next(res.status(200).json({ success: true, data: transaction }));
});

export {
    getTransactions,
    getTransaction,
    createTransaction,
    updateOrderStatus,
};
