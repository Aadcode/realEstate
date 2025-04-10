import prisma from '../config/db.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const createOrder = asyncHandler(async (req, reply) => {
  const { status = "PENDING", amount, customerId, agentId, propertyId } = req.body;

  if (!amount || !customerId || !agentId || !propertyId) {
    throw new ApiError(400, "Required fields: amount, customerId, agentId, propertyId.");
  }

  if (isNaN(amount) || isNaN(customerId) || isNaN(agentId) || isNaN(propertyId)) {
    throw new ApiError(400, "Fields 'amount', 'customerId', 'agentId', and 'propertyId' must be valid numbers.");
  }

  const order = await prisma.order.create({
    data: {
      status,
      amount: parseInt(amount),
      customerId: parseInt(customerId),
      agentId: parseInt(agentId),
      propertyId: parseInt(propertyId),
    },
  });

  reply.code(201).send(
    new ApiResponse(201, order, "Order created successfully")
  );
});

export const getOrders = asyncHandler(async (req, reply) => {
  const { orderId } = req.params;
  const { customerId, agentId, status } = req.query;

  if (orderId) {
    
    if (isNaN(orderId)) {
      throw new ApiError(400, "Valid 'orderId' is required.");
    }

  
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    return reply.code(200).send(
      new ApiResponse(200, order, `Order with ID ${orderId} fetched successfully`)
    );
  }

  const where = {};
  if (customerId) where.customerId = parseInt(customerId);
  if (agentId) where.agentId = parseInt(agentId);
  if (status) where.status = status;

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return reply.code(200).send(
    new ApiResponse(200, orders, "Orders fetched successfully")
  );
});
