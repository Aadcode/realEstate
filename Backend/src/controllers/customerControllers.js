import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const signUp = asyncHandler(async (req, reply) => {
    const { name, email, password,phone,avatar,location} = req.body;

    const existingCustomer = await prisma.customer.findUnique({
        where: { email }
    });

    if (existingCustomer) {
        throw new ApiError(409, "Customer already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await prisma.customer.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
            avatar,
            location
        }
    });

    const { password: _, ...CustomerWithoutPassword } = newCustomer;

    reply.code(201).send(new ApiResponse(201, CustomerWithoutPassword, "Customer created successfully"));
});

export const signIn = asyncHandler(async (req, reply) => {
    const { email, password } = req.body;

    const existingCustomer = await prisma.customer.findUnique({
        where: { email }
    });

    if (!existingCustomer) {
        throw new ApiError(404, "Customer Not Found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingCustomer.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }

    const token = jwt.sign(
        { id: existingCustomer.id, email: existingCustomer.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    const { password: _, ...CustomerWithoutPassword } = existingCustomer;

    reply.code(200).send(
        new ApiResponse(200, { Customer: CustomerWithoutPassword, token }, "Customer signed in successfully")
    );
});

export const addCustomerReview = asyncHandler(async (req, reply) => {
    const { comment, rating, propertyId, customerId } = req.body;
  
    if (!comment || !rating || !propertyId || !customerId) {
        throw new ApiError(400, "Comment, rating, propertyId, and customerId are required");
    }
  
    const existingOrder = await prisma.order.findFirst({
        where: {
            propertyId: parseInt(propertyId),
            customerId: parseInt(customerId),
            status: "COMPLETED", 
        },
    });
  
    if (!existingOrder) {
        throw new ApiError(403, "You can only review properties that you have bought, sold, or rented.");
    }
  
    const imageUrls = req.uploadedFiles || [];
  
    const review = await prisma.customerReview.create({
        data: {
            comment,
            rating: parseInt(rating),
            images: imageUrls.length ? imageUrls : [],
            propertyId: parseInt(propertyId),
            customerId: parseInt(customerId),
            status: "All_Review"
        },
    });
  
    reply.code(201).send(new ApiResponse(201, review, "Review added successfully"));
});

export const getReviews = asyncHandler(async (req, reply) => {
    const { propertyId } = req.params; 
    const { status } = req.query;
  
    const query = {
        where: {
            ...(propertyId && { propertyId: parseInt(propertyId) })
        },
        orderBy: { createdAt: "desc" },
        include: { 
            customer: { 
                select: { 
                    name: true,
                    avatar: true
                } 
            },
            property: {
                select: {
                    title: true,
                    imageUrls: true
                }
            }
        }
    };
  
    const reviews = await prisma.customerReview.findMany(query);
  
    const updatedReviews = reviews.map(review => ({
        ...review,
        customer: {
            name: review.customer?.name || "Anonymous",
            profileImage: review.customer?.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=professional"
        }
    }));
  
    reply.code(200).send(
        new ApiResponse(
            200, 
            updatedReviews, 
            propertyId 
                ? `Reviews fetched successfully for property ID: ${propertyId}`
                : "All reviews fetched successfully"
        )
    );
});

export const getAllCustomers = asyncHandler(async (req, reply) => {
  try {
      const customers = await prisma.customer.findMany({
          select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              createdAt: true,
              updatedAt: true,
          },
          orderBy: { createdAt: "desc" },
      });

      reply.code(200).send(new ApiResponse(200, customers, "Customers fetched successfully"));
  } catch (error) {
      throw new ApiError(500, "Failed to fetch customers");
  }
});

export const handleReviewAction = asyncHandler(async (req, reply) => {
    const { reviewId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'

    console.log("Received reviewId:", reviewId);
    console.log("Received action:", action);

    // Validate action
    if (!action || !["accept", "reject"].includes(action)) {
        throw new ApiError(400, "Invalid action. Must be either 'accept' or 'reject'");
    }

    // Check if review exists and is in All_Review status
    const existingReview = await prisma.customerReview.findUnique({
        where: { 
            id: parseInt(reviewId) 
        }
    });

    console.log("Existing review:", existingReview);

    if (!existingReview) {
        throw new ApiError(404, "Review not found");
    }

    if (existingReview.status !== "All_Review") {
        console.log("Current review status:", existingReview.status);
        throw new ApiError(400, `Can only accept/reject reviews in All_Review status. Current status: ${existingReview.status}`);
    }

    // Determine new status based on action
    const newStatus = action === "accept" ? "Published" : "Deleted";

    console.log("Updating review to status:", newStatus);

    // Update review status
    const updatedReview = await prisma.customerReview.update({
        where: { 
            id: parseInt(reviewId) 
        },
        data: { status: newStatus },
        include: {
            customer: {
                select: {
                    name: true,
                    avatar: true
                }
            },
            property: {
                select: {
                    title: true,
                    imageUrls: true
                }
            }
        }
    });

    const formattedReview = {
        ...updatedReview,
        customer: {
            name: updatedReview.customer?.name || "Anonymous",
            profileImage: updatedReview.customer?.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=professional"
        }
    };

    reply.code(200).send(
        new ApiResponse(200, formattedReview, `Review ${action}ed successfully`)
    );
});


