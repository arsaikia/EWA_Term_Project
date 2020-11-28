import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    orderId: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    productId: {
        type: String,
        required: true,
        trim: true,
    },
    reviewRating: {
        type: Number,
        required: true,
        trim: true,
    },
    reviewText: {
        type: String,
        required: true,
        trim: true,
    },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
