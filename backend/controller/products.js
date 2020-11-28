import { SQL } from '../config/db.js';
import Products from '../models/Product.js';
import Review from '../models/Review.js';
import Sequelize from 'sequelize';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import lodash from 'lodash';
const { get, isEmpty } = lodash;

/*

 * @desc     Get All Products
 * @route    GET /api/v1/products/store
 * @access   Public
 */

const getProducts = asyncHandler(async (req, res, next) => {
    let allProducts = [];
    const storeId = !isEmpty(req.params.id)
        ? req.params.id
        : `706ab483-b96f-4b88-81ed-66b7beca5f5a`;
    const query = `SELECT * from products P inner join storeproducts SP on P.productId = SP.productId and storeId = '${storeId}';`;

    let products = await SQL.query(query, { raw: true });
    const existing = {};
    products.forEach((product) => {
        if (!existing[product.productName]) {
            existing[product.productName] = true;
            allProducts.push(product);
        }
    });

    if (!allProducts) {
        return next(new ErrorResponse(`No Product found!`, 404));
    }
    res.status(200).json({ success: true, data: allProducts[0] });
});

/*
 * @desc     Get product with id
 * @route    GET /api/v1/products/:id
 * @access   Public
 */

const getProduct = asyncHandler(async (req, res, next) => {
    let product = await Products.findAll({
        where: {
            productId: req.params.id,
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with id ${req.params.id}`);
        return next(
            res.status(404).json({
                success: false,
                error: `Product Not Found with id '${req.params.id}'`,
            })
        );
    }

    const reviews = await Review.find({ productId: req.params.id });
    let allReviews = [...reviews];

    product = { product, reviews };
    // product.push(...allReviews)

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
