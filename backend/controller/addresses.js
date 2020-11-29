import Address from '../models/Address.js';
import Users from '../models/user.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import { v4 as uuid } from 'uuid';

/*
 * @desc     Get addresses with user id
 * @route    GET /api/v1/addresses/:id
 * @access   Public
 */

const getAddresses = asyncHandler(async (req, res, next) => {
    const addresses = await Address.findAll({
        include: [
            {
                model: Users,
            },
        ],
        where: {
            userId: req.params.id,
        },
    });

    if (!addresses || addresses.length == 0) {
        console.log(`Addresses Not Found with user id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Adderesses Not Found with user id '${req.params.id}'`,
        });
    }
    return next(res.status(200).json({ success: true, data: addresses }));
});

/*
 * @desc     Create card in Db
 * @route    GET /api/v1/addresses/:id
 * @access   Public
 */

const createAddress = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.params.id || !req.body.street1) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }
    const addressId = req.body.addressId || uuid();
    const address = await Address.create({
        addressId: addressId,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        zip: req.body.zip,
        state: req.body.state,
        userId: req.params.id,
    });

    //I should be validating user itself right ?
    if (!address || address.length == 0) {
        console.log(`address Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the address.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: address });
});

export { getAddresses, createAddress };
