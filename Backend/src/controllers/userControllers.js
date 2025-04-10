import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const signUp = asyncHandler(async (req, reply) => {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
        data: req.body
    });

    const { password: _, ...userWithoutPassword } = newUser;

    reply.code(201).send(
        new ApiResponse(201, userWithoutPassword, "User created successfully")
    );
});

export const signIn = asyncHandler(async (req, reply) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (!existingUser) {
        throw new ApiError(404, "User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }

    const token = jwt.sign(
        { 
            id: existingUser.id, 
            email: existingUser.email, 
            roles: existingUser.roles 
        
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = existingUser;

    reply.code(200).send(
        new ApiResponse(200, { user: userWithoutPassword, token }, "User signed in successfully")
    );
});

export const getAllUsers = asyncHandler(async (req, reply) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    reply.code(200).send(new ApiResponse(200, users, "Users retrieved successfully"));
});
