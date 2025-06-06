import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../config/db.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const addProperty = asyncHandler(async (req, reply) => {
    const { 
        title, 
        description, 
        status, 
        address, 
        city, 
        state, 
        zipCode, 
        price, 
        bedrooms,
        bathrooms,
        squareFeet,
        yearBuilt,
        'features': featuresArray, 
        userId 
    } = req.body;

    const images = req.uploadedFiles;
   

    // Convert features to proper format
    const features = featuresArray ? 
        (Array.isArray(featuresArray) ? featuresArray : [featuresArray]) : 
        [];
    
    if (!title || !description || !status || !address || !city || !state || !zipCode || !price || !userId) {
        throw new ApiError(400, "Required fields are missing");
    }
    console.log(features)
    const newFeature = features[0].split(",")
        const newProperty = await prisma.property.create({
        data: {
            title,
            description,
            status,
            address,
            city,
            state,
            zipCode,
            price: parseFloat(price),
            bedrooms: bedrooms ? parseInt(bedrooms) : null,
            bathrooms: bathrooms ? parseInt(bathrooms) : null,
            squareFeet: squareFeet ? parseInt(squareFeet) : null,
            yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
            features: newFeature,  // Use the processed features array
            imageUrls: images || [],
            agentId: parseInt(userId)
        }
    });

    reply.code(201).send(new ApiResponse(201, newProperty, "Property added successfully"));
});

export const getAllProperties = asyncHandler(async (req, reply) => {
    const { status, city, minPrice, maxPrice, bedrooms, bathrooms } = req.query;

    const where = {};
    if (status) where.status = status;
    if (city) where.city = city;
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (bedrooms) where.bedrooms = parseInt(bedrooms);
    if (bathrooms) where.bathrooms = parseInt(bathrooms);

    const properties = await prisma.property.findMany({
        where,
        include: {
            agent: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    avatar: true
                }
            },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    status: true,
                    createdAt: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    reply.code(200).send(
        new ApiResponse(200, properties, "Properties retrieved successfully")
    );
});

export const getPropertyById = asyncHandler(async (req, reply) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Property ID is required");
    }

    const property = await prisma.property.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            agent: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    avatar: true
                }
            },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    status: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true
                        }
                    }
                },
                where: {
                    status: "Published"
                }
            }
        }
    });

    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    reply.code(200).send(
        new ApiResponse(200, property, "Property retrieved successfully")
    );
});
