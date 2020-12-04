import data from '../_data/tweets.json';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import StoreProduct from '../models/StoreProduct.js';
import Products from '../models/Product.js';
import { SQL } from '../config/db.js';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

const getTweets = asyncHandler(async (req, res, next) => {
    let tweets = JSON.parse(JSON.stringify(data));
    tweets = tweets.slice(0, 10);
    try {
        console.log('Tweets created'.green.inverse);
        next(res.status(200).json({ success: true, data: tweets }));
    } catch (err) {
        console.error(err);
        next(res.status(404).json({ success: false, data: {} }));
    }
});

const getBestDeals = asyncHandler(async (req, res, next) => {
    const query = `SELECT * FROM storeproducts AS SP INNER JOIN products AS P ON P.productId = SP.productId AND SP.storeId = '${req.params.id}' ORDER BY P.discount DESC limit 10`;
    const bestDeals = await SQL.query(query, { raw: true });
    if (!bestDeals || bestDeals.length == 0) {
        console.log(`There are no discounts in this shop ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `There are no discounts in this shop'${req.params.id}'`,
        });
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: bestDeals[0] }));
});

const getBestReviews = asyncHandler(async (req, res, next) => {
    const reviews = await Review.find({}).sort('-reviewRating').limit(10);
    const allProducts = [];
    reviews.forEach((review) => allProducts.push(review.productId));
    const bestProd = await Products.findAll({
        where: {
            productId: allProducts,
        },
    });
    if (!bestProd || bestProd.length == 0) {
        console.log(`No products found`);
        return res.status(404).json({
            success: false,
            error: `No products found}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    return next(res.status(200).json({ success: true, data: bestProd }));
});
export { getTweets, getBestDeals, getBestReviews };
