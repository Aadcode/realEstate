import { createOrder, getOrders } from '../controllers/orderControllers.js';


const orderRoutes = async (fastify) => {
  fastify.get('/orders/:orderId', getOrders);
  fastify.post('/createOrder', createOrder);
};

export default orderRoutes;
