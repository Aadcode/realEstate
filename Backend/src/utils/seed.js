import { PrismaClient, Role, OrderStatus, PropertyStatus, reviewStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Agents (Users)
  const agents = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Agent ${i + 1}`,
          email: `agent${i + 1}@example.com`,
          phone: `90000000${i}`,
          password: `hashed_password_${i}`,
          position: 'Agent',
          summary: `Experienced in properties ${i}`,
          location: 'Mumbai',
          avatar: `https://i.pravatar.cc/150?img=${10 + i}`,
          role: Role.AGENT,
        },
      })
    )
  );

  // Seed Customers
  const customers = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.customer.create({
        data: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `80000000${i}`,
          password: `hashed_password_${i}`,
          avatar: `https://i.pravatar.cc/150?img=${20 + i}`,
          location: 'Pune',
        },
      })
    )
  );

  // Seed Properties + Related Entities
  await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const agent = agents[i % agents.length];
      const customer = customers[i % customers.length];

      const property = await prisma.property.create({
        data: {
          title: `Property ${i + 1}`,
          description: `Beautiful property number ${i + 1}`,
          status: PropertyStatus.FOR_SALE,
          address: `Address ${i + 1}`,
          city: 'Mumbai',
          state: 'MH',
          zipCode: `4000${i}`,
          price: 5000000 + i * 100000,
          bedrooms: 2 + (i % 3),
          bathrooms: 1 + (i % 2),
          squareFeet: 800 + i * 50,
          yearBuilt: 2015 + (i % 5),
          features: ['Balcony', 'Lift'],
          imageUrls: [`https://placehold.co/600x400?text=Property+${i + 1}`],
          agentId: agent.id,
        },
      });

      await prisma.propertyOwnership.create({
        data: {
          propertyId: property.id,
          ownerId: customer.id,
          startDate: new Date('2022-01-01'),
        },
      });

      await prisma.customerReview.create({
        data: {
          comment: `Loved Property ${i + 1}`,
          rating: (i % 5) + 1,
          images: [],
          propertyId: property.id,
          customerId: customer.id,
          status: reviewStatus.Published,
        },
      });

      await prisma.order.create({
        data: {
          status: OrderStatus.PENDING,
          amount: property.price,
          type: 'BUY',
          customerId: customer.id,
          agentId: agent.id,
          propertyId: property.id,
        },
      });
    })
  );
}

main()
  .then(() => {
    console.log('🌱 Seeded 5 customers, 5 agents, and 10 properties with related data');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
