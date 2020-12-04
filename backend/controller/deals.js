import data from '../_data/tweets.json';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

const getTweets = asyncHandler(async (req, res, next) => {
    const tweets = JSON.parse(JSON.stringify(data));

    try {
        console.log('Tweets created'.green.inverse);
        next(res.status(200).json({ success: true, data: tweets }));
    } catch (err) {
        console.error(err);
        next(res.status(404).json({ success: false, data: {} }));
    }

});

export { getTweets };