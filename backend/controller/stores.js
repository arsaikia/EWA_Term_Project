import Stores from '../models/stores.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*
 * @desc     Get All Products
 * @route    GET /api/v1/products
 * @access   Public
 */

const getStores = asyncHandler(async (req, res, next) => {
    const stores = await Stores.findAll({
        attributes: [
            'id',
            'storeName',
            'userID',
            'description',
        ],
    });

    if (!stores) {
        return next(new ErrorResponse(`No Store found!`, 404));
    }
    res.status(200).json({ success: true, data: stores });
});

/*
 * @desc     Get store with id
 * @route    GET /api/v1/users/:id
 * @access   Public
 */

const getStore = asyncHandler(async (req, res, next) => {
    //? We can fire direct SQL query as the below line
    // const user = await SQL.query(`select * from users;`);
    const store = await Stores.findAll({
        attributes: [
            'id',
            'storeName',
            'userID',
            'description',
        ],
        // where: {
        //     email: req.params.id,
        // },
    });

    if (!store || store.length == 0) {
        console.log(`Store Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Store Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: user }));
});

export { getStores, getStore };

// 
