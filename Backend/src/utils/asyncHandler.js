import ApiError from '../utils/apiError.js';

const asyncHandler = (func) => {
    return async (req, reply) => {
        try {
            await func(req, reply);
        } catch (error) {
            if (!(error instanceof ApiError)) {
                throw new ApiError(500, error.message || 'Internal Server Error');
            }
            
            throw error;
        }
    };
};

export default asyncHandler;
