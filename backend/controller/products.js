import { SQL } from '../config/db.js';
import Products from '../models/Product.js';
import Sequelize from 'sequelize';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*

 * @desc     Get All Products
 * @route    GET /api/v1/products
 * @access   Public
 */

const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Products.findAll();

    if (!products) {
        return next(new ErrorResponse(`No Product found!`, 404));
    }
    res.status(200).json({ success: true, data: products });
});

/*
 * @desc     Get product with id
 * @route    GET /api/v1/products/:id
 * @access   Public
 */

const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Products.findAll({
        where: {
            productId: req.params.id,
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Product Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: product }));
});

/*
 * @desc     Get product matching name
 * @route    GET /api/v1/products/matches/:id
 * @access   Public
 */

const getFilteredProducts = asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const product = await Products.findAll({
        where: {
            productName: { [Op.like]: `%${req.params.id}%` },
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Product Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: product }));
});

export { getProducts, getProduct, getFilteredProducts };
