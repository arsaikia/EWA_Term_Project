import Carts from '../models/Cart.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import Products from '../models/Product.js';

/*
 * @desc     Get All Products
 * @route    GET /api/v1/products
 * @access   Public
 */

const getCarts = asyncHandler(async (req, res, next) => {
    const cart = await Carts.findAll({
        include: [{
          model: Products,
         }], where: {userId: req.params.id}
      });

    if (!cart) {
        return next(new ErrorResponse(`No Store found!`, 404));
    }
    res.status(200).json({ success: true, data: cart });
});

const createCart = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.body.userId || !req.body.productId) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }

    const cart = await Carts.create({
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
    });

    if (!cart || cart.length == 0) {
        console.log(`Cart Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the Cart.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: cart });
});

export { getCarts , createCart};

//
