import Address from '../models/Address.js';
import Users from '../models/user.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

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
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const createAddress = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.params.id || !req.body.cardNumber) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }

    const card = await Address.create({
        userId: req.params.id,
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
        cardNumber: req.body.cardNumber,
        expiryDate: req.body.expiryDate,
        cvv: req.body.cvv,
    });

    //I should be validating user itself right ?
    if (!card || card.length == 0) {
        console.log(`Card Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the card.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: card });
});

export { getAddresses };
