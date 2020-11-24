import Cards from '../models/Cards.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*
 * @desc     Get card with id
 * @route    GET /api/v1/cards/:id
 * @access   Public
 */

const getCard = asyncHandler(async (req, res, next) => {
    const card = await Cards.findAll({
        where: {
            cardId: req.params.id,
        },
    });

    if (!card || card.length == 0) {
        console.log(`Card Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `Card Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: card }));
});

export { getCard };

//
