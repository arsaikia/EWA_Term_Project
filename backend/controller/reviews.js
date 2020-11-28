import Review from '../models/Review.js';

/*
 * @desc     Create Review
 * @route    POST /api/v1/reviews/
 * @access   Public
 */

const createReview = async (req, res, next) => {
    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review,
    });
};

/*
 * @desc     Find Review by product Id
 * @route    GET /api/v1/reviews/:id
 * @access   Public
 */

const getReviews = async (req, res, next) => {
    const reviews = await Review.find({ productId: req.params.id });

    if (!reviews) {
        return next(res.status(202).json({ success: true, data: {} }));
    }
    return next(res.status(200).json({ success: true, data: reviews }));
};

/*
 * @desc     Find Review by UserId
 * @route    GET /api/v1/reviews/byuser/:id
 * @access   Public
 */

const getReviewsByUser = async (req, res, next) => {
    const reviews = await Review.find({ userId: req.params.id });

    if (!reviews) {
        return next(res.status(202).json({ success: true, data: {} }));
    }
    return next(res.status(200).json({ success: true, data: reviews }));
};

export { createReview, getReviews, getReviewsByUser };
