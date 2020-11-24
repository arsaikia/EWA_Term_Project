import Orders from '../models/Orders.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*
 * @desc     Get All Orders
 * @route    GET /api/v1/orders
 * @access   Public
 */

const getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Orders.findAll();

    if (!orders) {
        return next(new ErrorResponse(`No Orders found!`, 404));
    }
    res.status(200).json({ success: true, data: orders });
});

/*
 * @desc     Get order with id
 * @route    GET /api/v1/orders/:id
 * @access   Public
 */

const getOrder = asyncHandler(async (req, res, next) => {
    const order = await Orders.findAll({
        where: {
            orderId: req.params.id,
        },
    });

    if (!order || order.length == 0) {
        console.log(`Order Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Order Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: order }));
});

export { getOrders, getOrder };

//
