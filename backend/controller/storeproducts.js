

import StoreProduct from '../models/StoreProduct.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import { v4 as uuid } from 'uuid';

/*
 * @desc     Post Create row in storeproducts
 * @route    GET /api/v1/storeproducts/create/
 * @access   Public
 */

const createStoreProduct = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    console.log('req.body', req.body);
    if (!req.body.storeId || !req.body.productId) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }
    const storeproduct = await StoreProduct.create({
        storeId: req.body.storeId,
        productId: req.body.productId,
    });

    if (!storeproduct || storeproduct.length == 0) {
        console.log(`Store product not added ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the store product.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: storeproduct });
});

/*
 * @desc     Post Delete row in storeproducts
 * @route    GET /api/v1/storeproducts/delete/
 * @access   Public
 */

const deleteStoreProduct = asyncHandler(async (req, res, next) => {
    const delStoreProduct = await StoreProduct.destroy({ where: {
        storeId: req.body.storeId,
        productId: req.body.productId,
    } });

    next(res.status(200).json({ success: true, data: delStoreProduct }));
});


export { createStoreProduct, deleteStoreProduct };