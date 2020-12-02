import fs from 'fs';
import MarketBasket from '../models/MarketBasket.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import path from 'path';
import { spawn } from 'child_process';

import { PythonShell } from 'python-shell';

import data from '../_data/mba.json';
// import JSON from ''

/*
 * @desc     Get productB with productId
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const getProduct = asyncHandler(async (req, res, next) => {
    if (!req.body.products || req.body.products.length <= 0) {
        return next(
            res.status(404).json({
                success: false,
                error: `Product to match cannot be empty`,
            })
        );
    }

    let product = await MarketBasket.findAll({
        where: {
            productA: req.body.products,
        },
    });

    if (!product || product.length == 0) {
        console.log(`Product Not Found with user id ${req.params.id}`);
        return next(
            res.status(201).json({
                success: true,
                data: {},
            })
        );
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
    Promise.resolve(
        PythonShell.run('mbaScript.py', null, function (err) {
            err && console.log(`err : ${err}`.red.bold);
            next(res.status(404).json({ success: false, data: {} }));
        })
    );

    const marketbasket = JSON.parse(JSON.stringify(data));

    try {
        await MarketBasket.bulkCreate(marketbasket);

        console.log('Market basket reinitialized...'.green.inverse);
        next(res.status(200).json({ success: true, data: marketbasket }));
    } catch (err) {
        console.error(err);
        next(res.status(404).json({ success: false, data: {} }));
    }
});

/*
 * @desc     Delete MarketBasket Table
 * @route    POST /api/v1/marketbasket/d/
 * @access   Public
 */

const deleteTable = asyncHandler(async (req, res, next) => {
    await MarketBasket.destroy({ where: {} });

    next(res.status(200).json({ success: true, data: {} }));
});

const getProducts = asyncHandler(async (req, res, next) => {
    const users = await MarketBasket.findAll();

    if (!users) {
        return next(new ErrorResponse(`No User found!`, 404));
    }
    next(res.status(200).json({ success: true, data: users }));
});

export { getProduct, createTable, deleteTable, getProducts };
