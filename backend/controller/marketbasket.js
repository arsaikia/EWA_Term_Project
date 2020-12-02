import fs from 'fs';
import MarketBasket from '../models/MarketBasket.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import path from 'path';
import { spawn } from 'child_process';

import { PythonShell } from 'python-shell';

// import data from '../_data/mba.json';
// import JSON from ''

/////

/*
 * @desc     Get productB with productId
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const getProduct = asyncHandler(async (req, res, next) => {
    if (!req.body.products || req.body.products.length <= 0) {
        return res.status(404).json({
            success: false,
            error: `Product to match cannot be empty`,
        });
    }

    let product = await MarketBasket.findAll({
        where: {
            productA: req.body.products,
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with user id ${req.params.id}`);
        return res.status(201).json({
            success: true,
            data: {},
        });
    }
    product = JSON.parse(JSON.stringify(product));
    const products = [];
    product.forEach((product) => products.push(product.productB));

    console.log('product', product);
    return next(res.status(200).json({ success: true, data: products }));
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

    //you can use error handling to see if there are any errors
    PythonShell.run('mbaScript.py', null, function (err) {
        console.log(`err : ${err}`.red.bold);
        // console.log(`results : ${results}`.green.bold);
    });

    //your code

    var pythonProcess = spawn('python', ['mbaScript.py']);
    res.status(200);

    pythonProcess.stdout.on('mbadata', function (mbadata) {
        res.send(data.toString());
    });
    // const marketbasket = JSON.parse(JSON.stringify(data));

    // try {
    //     await MarketBasket.bulkCreate(marketbasket);

    //     console.log('Market basket reinitialized...'.green.inverse);
    //     res.status(200).json({ success: true, data: marketbasket });
    // } catch (err) {
    //     console.error(err);
    //     res.status(404).json({ success: false, data: {} });
    // }
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
