import { addCustomerReview, getReviews, signIn, signUp,getAllCustomers, handleReviewAction } from '../controllers/customerControllers.js';
import upload from "../middlewares/imageUpload.js"

const customerRoutes = async (fastify) => {
  fastify.post('/customer/signup', signUp);
  fastify.post('/customer/signin', signIn);
  fastify.get('/reviews', getReviews);
  fastify.get("/customers",getAllCustomers)
  fastify.post('/createReview',
    {
        preHandler:upload,
        schema:{
            consumes:["multipart/form-data"]
        }
    }
    ,addCustomerReview );
    fastify.put('/reviews/:reviewId',handleReviewAction);
};


export default customerRoutes;
