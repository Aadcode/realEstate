// routes/userRoutes.js
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
   getAdmin
} from '../controllers/userControllers.js';


export default async function userRoutes(fastify) {
  fastify.post('/register', registerUser);
  fastify.post('/login', loginUser);
  fastify.get('/users', getAllUsers);
  fastify.put('/users/:userId', updateUser);
  fastify.get('/admin',getAdmin)
}
