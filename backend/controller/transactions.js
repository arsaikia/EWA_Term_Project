import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import Transactions from '../models/Transactions.js';

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

export { getTransactions, getTransaction };

//
