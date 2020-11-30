import fs from 'fs';
import MarketBasket from '../models/MarketBasket.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import path from 'path';


import data from '../_data/mba.json';
// import JSON from ''

/////




/*
 * @desc     Get productB with productId
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const getProduct = asyncHandler(async (req, res, next) => {
    const product = await MarketBasket.findAll({
        where: {
            productA: req.params.id,
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with user id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Product Not Found with user id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: product }));
});

/*
 * @desc     Create Marketbasket Table
 * @route    POST /api/v1/marketbasket/i/
 * @access   Public
 */

const createTable = asyncHandler(async (req, res, next) => {
    
    // const pathName = fs.readFile(path.join(__dirname, '../_data', 'mba.json'), 'utf8', (err,data) => {
    //     if (err) throw err;
    //     console.log(data);
    // });
    const marketbasket = JSON.parse(JSON.stringify(data));
    
    try {
        await MarketBasket.bulkCreate(marketbasket);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
    res.status(200).json({ success: true, data: {} });
});

/*
 * @desc     Delete MarketBasket Table
 * @route    POST /api/v1/marketbasket/d/
 * @access   Public
 */

const deleteTable = asyncHandler(async (req, res, next) => {
    await MarketBasket.destroy({ where: {} });

    res.status(200).json({ success: true, data: {} });
});

export { getProduct, createTable, deleteTable };