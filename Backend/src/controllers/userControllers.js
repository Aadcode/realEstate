import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const PROFILE_IMAGES = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60'
];

// Register a new user
export const registerUser = async (request, reply) => {
    try {
        const { name, email, password, phone, location } = request.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get random avatar
        const randomAvatar = PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];

        // Create user with random avatar
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                location,
                avatar: randomAvatar,
                role: 'CUSTOMER' // Default role
            }
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        reply.code(201).send({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }
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
                message: 'Error registering user',
                error: error.message
            });
        }
    }
};

// Login user
export const loginUser = async (request, reply) => {
    try {
        const { email, password } = request.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });
        console.log(user)
        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            }
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
                message: 'Error logging in',
                error: error.message
            });
        }
    }
};

// Update user
export const updateUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const { name, email, role } = request.body;

        // Validate role if provided
        if (role && !['ADMIN', 'AGENT', 'CUSTOMER'].includes(role)) {
            throw new ApiError(400, 'Invalid role. Must be ADMIN, AGENT, or CUSTOMER');
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                ...(role && { role }) // Only update role if provided
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                location: true,
                avatar: true,
                position: true,
                summary: true,
                socialMedia: true,
                createdAt: true,
                updatedAt: true
            }
        });

        reply.code(200).send({
            success: true,
            message: 'User updated successfully',
            data: user
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
                message: 'Error updating user',
                error: error.message
            });
        }
    }
};

// Delete user
export const deleteUser = async (request, reply) => {
    try {
        const { id } = request.params;

        await prisma.user.delete({
            where: { id }
        });

        reply.code(200).send({
            success: true,
            message: 'User deleted successfully'
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
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
};


export const getAllUsers = async (request, reply) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                phone:true,
                location:true,
                createdAt: true,
                updatedAt: true
            }
        });

        reply.code(200).send({
            success: true,
            data: users
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
                message: 'Error fetching users',
                error: error.message
            });
        }
    }
};

export const getUserById = async (request, reply) => {
    try {
        const { id } = request.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        reply.code(200).send({
            success: true,
            data: user
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
                message: 'Error fetching user',
                error: error.message
            });
        }
    }
};

export const getAdmin = async (request, reply) => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                role: 'ADMIN'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                phone: true,
                location: true,
                createdAt: true,
                updatedAt: true
            }
        });

        reply.code(200).send({
            success: true,
            data: admins
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
                message: 'Error fetching admin users',
                error: error.message
            });
        }
    }
};

