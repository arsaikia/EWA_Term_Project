import { SQL } from '../config/db.js';
import Products from '../models/Products.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*
 * @desc     Get All Users
 * @route    GET /api/v1/users
 * @access   Public
 */

const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Products.findAll();

    if (!products) {
        return next(new ErrorResponse(`No Product found!`, 404));
    }
    res.status(200).json({ success: true, data: products });
});

export { getProducts };
