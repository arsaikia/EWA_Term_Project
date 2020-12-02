import Cards from '../models/Cards.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';
import { v4 as uuid } from 'uuid';

/*
 * @desc     Get card with user id
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const getCard = asyncHandler(async (req, res, next) => {
    const card = await Cards.findAll({
        where: {
            userId: req.params.id,
        },
    });

    if (!card || card.length == 0) {
        console.log(`Card Not Found with user id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Card Not Found with user id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: card }));
});

/*
 * @desc     Create card in Db
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const createCard = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    console.log('req.body', req.body);
    if (!req.params.id || !req.body.cardNumber) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }
    const cardId = req.body.cardId || uuid();
    const card = await Cards.create({
        cardId: cardId,
        userId: req.params.id,
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
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

/*
 * @desc     Create card in Db
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const updateCard = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.params.id) {
        return next(
            res.status(400).send({
                message: 'Card Id can not be empty!',
            })
        );
    }
    const cardToUpdate = await Cards.findOne({
        where: {
            cardId: req.params.id,
        },
    });

    if (!cardToUpdate || cardToUpdate.length == 0) {
        console.log(`Card Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while fetching the card.`,
        });
    } else {
        const updatedCard = cardToUpdate.update({
            cardName: req.body.cardName,
            cardNumber: req.body.cardNumber,
            // expiryDate: req.body.expiryDate,
            cvv: req.body.cvv,
        });

        return next(res.status(200).json({ success: true, data: updatedCard }));
    }
});
export { getCard, createCard, updateCard };
