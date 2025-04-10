import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";

export const addProperty = asyncHandler(async (req, reply) => {
  const { title, description, status, address, city, state, zipCode, price, userId=1 } = req.body;
  const images = req.uploadedFiles;

  if (!title || !description || !status || !address || !city || !state || !zipCode || !price || !userId || images.length === 0) {
    return reply.code(400).send(new ApiResponse(400, null, "All fields and images are required"));
  }

  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      status,
      address,
      city,
      state,
      zipCode: zipCode || 213213,
      price: parseInt(price),
      agentId: parseInt(userId),  
      imageUrls: images  
    }
  });

  reply.code(201).send(new ApiResponse(201, newProperty, "Property added successfully with multiple images"));
});


export const getAllProperties = asyncHandler(async (req, reply) => {
  const properties = await prisma.property.findMany({
      include: {
          agent: {
              select: {
                  id: true,
                  name: true,
                  email: true
              }
          }
      }
  });

  reply.code(200).send(
      new ApiResponse(200, properties, "Properties retrieved successfully")
  );
});
