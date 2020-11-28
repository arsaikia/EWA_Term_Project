import Carts from '../models/Cart.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import Products from '../models/Product.js';
import lodash from 'lodash';
const { get } = lodash;

/*
 * @desc     Get Cart for a user
 * @route    GET /api/v1/carts/:id
 * @access   Public
 */

const getCarts = asyncHandler(async (req, res, next) => {
    const cart = await Carts.findAll({
        include: [
            {
                model: Products,
            },
        ],
        where: { userId: req.params.id },
    });

    if (!cart) {
        return next(new ErrorResponse(`No Store found!`, 404));
    }
    res.status(200).json({ success: true, data: cart });
});

/*
 * @desc     POST new cart instance
 * @route    POST /api/v1/carts/
 * @access   Public
 */
const createCart = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.body.userId || !req.body.productId) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }
    // Check if we already have a product for the userId with same productId
    // If yes => update the quantity
    // If No => Create a new cartId
    const cart = await Carts.findAll({
        where: { productId: req.body.productId, userId: req.body.userId },
    });
    console.log(cart);

    if (cart.length <= 0) {
        const cart = await Carts.create({
            cartId: req.body.cartId,
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
        }

        res.status(200).json({ success: true, data: cart });
    } else {
        const responseData = JSON.parse(JSON.stringify(cart));
        const cartId = get(responseData[0], 'cartId');
        const currentQuantity = get(responseData[0], 'quantity');
        try {
            const updateCart = await Carts.update(
                { quantity: currentQuantity + req.body.quantity },
                { where: { cartId: cartId } }
            );
            res.status(200).json({ success: true, data: updateCart });
        } catch (error) {
            console.log(
                `Error Encountered while updating cart items for cart : ${cartId}`
                    .red.underline
            );
        }
    }
});

/*
 * @desc     DELETE a cart instance
 * @route    DELETE /api/v1/carts/:id
 * @access   Public
 */

const deleteCarts = asyncHandler(async (req, res, next) => {
    await Carts.destroy({
        where: { cartId: req.params.id },
    });

    res.status(200).json({ success: true, data: {} });
});

export { getCarts, createCart, deleteCarts };
