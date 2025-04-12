import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from "@fastify/cors"
import multipart from "@fastify/multipart";
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const fastify = Fastify({});

// Register plugins
fastify.register(cors, {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
});

fastify.register(multipart, {
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// Register routes
fastify.register(propertyRoutes, { prefix: '/api/v1' });
fastify.register(orderRoutes, { prefix: '/api/v1' });
fastify.register(userRoutes, { prefix: '/api/v1' });
fastify.register(reviewRoutes, { prefix: '/api/v1' });

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 8000, host: '0.0.0.0' });
        console.log('Server is running on port 8000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();