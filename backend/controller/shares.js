import Shares from '../models/Shares.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import { v4 as uuid } from 'uuid';
import lodash from 'lodash';
const { get, isEmpty } = lodash;

/*
 * @desc     Get All shares
 * @route    GET /api/v1/shares
 * @access   Public
 */

const getShares = asyncHandler(async (req, res, next) => {
    const shares = await Shares.findAll();

    if (!shares) {
        return next(new ErrorResponse(`No shares found!`, 404));
    }
    res.status(200).json({ success: true, data: shares });
});

/*
 * @desc     Get shares with userId
 * @route    GET /api/v1/shares/:id
 * @access   Public
 */

const getSharePerUser = asyncHandler(async (req, res, next) => {
    //? We can fire direct SQL query as the below line
    // const user = await SQL.query(`select * from users;`);
    const share = await Shares.findAll({
        where: {
            userId: req.params.id,
        },
    });

    if (!share || share.length == 0) {
        console.log(`Shares Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Shares Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: share }));
});

const createShare = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    console.log('req.body', req.body);
    if (!req.body.email) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }

    const shareId = !isEmpty(get(req.body, 'shareId')) || uuid().toString();
    const share = await Shares.create({
        shareId,
        userId: req.body.userId,
        productId: req.body.productId,
        email: req.body.email,
    });

    if (!share || share.length == 0) {
        console.log(`Share Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the share.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: share });
});

export { getShares, getSharePerUser, createShare };
