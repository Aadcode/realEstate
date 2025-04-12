import { createReview, getAllReviews, updateReview } from '../controllers/reviewControllers.js';

const reviewRoutes = async (fastify) => {
    // Create a new review
    fastify.post('/reviews', createReview);

    // Get all reviews
    fastify.get('/reviews', getAllReviews);

    // Update a review
    fastify.put('/reviews/:id', updateReview);
};

export default reviewRoutes;