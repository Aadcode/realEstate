import prisma from '../config/db.js';
import ApiError from '../utils/apiError.js';

// Create a new review
export const createReview = async (request, reply) => {
    try {
        const { propertyId, rating, comment, userId } = request.body;

        // Check if property exists
        const property = await prisma.property.findUnique({
            where: { id: propertyId }
        });

        if (!property) {
            throw new ApiError(404, 'Property not found');
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                userId,
                propertyId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        reply.code(201).send({
            success: true,
            message: 'Review created successfully',
            data: review
        });
    } catch (error) {
        if (error instanceof ApiError) {
            reply.code(error.statusCode).send({
                success: false,
                message: error.message
            });
        } else {
            reply.code(500).send({
                success: false,
                message: 'Error creating review',
                error: error.message
            });
        }
    }
};

// Get all reviews
export const getAllReviews = async (request, reply) => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                },
                property:{
                    select:{
                        agent:true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        reply.code(200).send({
            success: true,
            data: reviews
        });
    } catch (error) {
        reply.code(500).send({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

// Update a review
export const updateReview = async (request, reply) => {
    try {
        const { id } = request.params;
        const { action } = request.body;

        // Log the incoming action for debugging
        console.log('Received action:', action);

        // Convert id to integer
        const reviewId = parseInt(id, 10);
        if (isNaN(reviewId)) {
            throw new ApiError(400, 'Invalid review ID');
        }

        // Check if review exists
        const review = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if (!review) {
            throw new ApiError(404, 'Review not found');
        }

        // Convert action to lowercase for case-insensitive comparison
        const normalizedAction = action?.toLowerCase()?.trim();
        console.log('Normalized action:', normalizedAction);

        // Determine the new status based on the action
        let newStatus;
        if (normalizedAction === 'approve' || normalizedAction === 'accept') {
            newStatus = 'Published';
        } else if (normalizedAction === 'reject') {
            newStatus = 'Deleted';
        } else {
            throw new ApiError(400, 'Invalid action. Use either "approve", "accept", or "reject"');
        }

        console.log('Setting status to:', newStatus);

        // Update review
        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                status: newStatus
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        reply.code(200).send({
            success: true,
            message: `Review ${action}ed successfully`,
            data: updatedReview
        });
    } catch (error) {
        console.error('Error updating review:', error);
        if (error instanceof ApiError) {
            reply.code(error.statusCode).send({
                success: false,
                message: error.message
            });
        } else {
            reply.code(500).send({
                success: false,
                message: 'Error updating review',
                error: error.message
            });
        }
    }
}; 