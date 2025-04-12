import prisma from '../config/db.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const createOrder = asyncHandler(async (req, reply) => {
    const { status = "PENDING", amount, type, customerId, agentId, propertyId } = req.body;

    if (!amount || !type || !customerId || !agentId || !propertyId) {
        throw new ApiError(400, "Required fields: amount, type, customerId, agentId, propertyId");
    }

    // Validate if property exists
    const property = await prisma.property.findUnique({
        where: { id: parseInt(propertyId) }
    });

    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    // Validate if users exist
    const [customer, agent] = await Promise.all([
        prisma.user.findUnique({ where: { id: parseInt(customerId) } }),
        prisma.user.findUnique({ where: { id: parseInt(agentId) } })
    ]);

    if (!customer || !agent) {
        throw new ApiError(404, "Customer or agent not found");
    }

    const order = await prisma.order.create({
        data: {
            status,
            amount: parseFloat(amount),
            type,
            customerId: parseInt(customerId),
            agentId: parseInt(agentId),
            propertyId: parseInt(propertyId),
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            agent: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            property: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    status: true
                }
            }
        }
    });

    reply.code(201).send(
        new ApiResponse(201, order, "Order created successfully")
    );
});

export const getOrders = asyncHandler(async (req, reply) => {
    const { orderId } = req.params;

    if (orderId) {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(orderId) },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                agent: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                property: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        status: true
                    }
                }
            }
        });

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        return reply.code(200).send(
            new ApiResponse(200, order, `Order with ID ${orderId} fetched successfully`)
        );
    }

    const where = {};
    if (customerId) where.customerId = parseInt(customerId);
    if (agentId) where.agentId = parseInt(agentId);
    if (status) where.status = status;
    if (type) where.type = type;

    const orders = await prisma.order.findMany({
        where,
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            agent: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            property: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    status: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return reply.code(200).send(
        new ApiResponse(200, orders, "Orders fetched successfully")
    );
});
