import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from "@fastify/cors"
import customerRoutes from './routes/customerRoutes.js';
import ApiError from "./utils/apiError.js"
import multipart from "@fastify/multipart";
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

const fastify = Fastify({
});

fastify.register(cors, {
  origin: ['http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(multipart);

fastify.register(customerRoutes, { prefix: '/api/v1' });
fastify.register(orderRoutes, { prefix: '/api/v1' });
fastify.register(propertyRoutes, { prefix: '/api/v1' });
fastify.register(userRoutes, { prefix: '/api/v1' });

fastify.setErrorHandler((error, req, reply) => {
  if (error instanceof ApiError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode, 
      data: error.data || null,
      message: error.message,
      success: false,
      error: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  } else {
    console.error('Server Error:', error);
    
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      data: null,
      message: error.message || 'Internal Server Error',
      success: false,
      error: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  }
});

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

const start = async () => {
  try {
    const port = process.env.PORT || 8000;
    
     fastify.listen({ 
      port,
      listenTextResolver: (address) => {
        return `Server running at ${address}`;
      }
    });
    
    console.log(`Server ready on http://:${port}`);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

start();