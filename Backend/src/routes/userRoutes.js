import { getAllUsers, signIn, signUp } from '../controllers/userControllers.js';

const userRoutes = async (fastify) => {
  fastify.post('/user/signup', signUp);
  fastify.post('/user/signin', signIn);
  fastify.get("/users",getAllUsers)
};

export default userRoutes;
