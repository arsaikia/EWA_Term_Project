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
 * @desc     Get store with id
 * @route    GET /api/v1/transactions/:id
 * @access   Public
 */

const getTransaction = asyncHandler(async (req, res, next) => {
    const transaction = await Transactions.findAll({
        where: {
            userId: req.params.id,
        },
    });

    if (!transaction || transaction.length == 0) {
        console.log(`Transaction Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Transaction Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: transaction }));
});

/*
 * @desc     Get store with id
 * @route    GET /api/v1/transactions/:id
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

    return next(res.status(200).json({ success: true, data: {} }));
});

export { getTransactions, getTransaction, createTransaction };

//
