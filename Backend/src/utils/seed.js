import { PrismaClient, Role, OrderStatus, PropertyStatus, ReviewStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Default avatar images
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

// Function to get random profile image
const getRandomProfileImage = () => {
  return PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];
};

// Function to get random property image
const getRandomPropertyImage = () => {
  const images = [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687644-c7171b4249b5?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1600607687644-c7171b4249b5?w=800&auto=format&fit=crop&q=60'
  ];
  return images[Math.floor(Math.random() * images.length)];
};

// Function to get random review image
const getRandomReviewImage = () => {
  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60'
  ];
  return images[Math.floor(Math.random() * images.length)];
};

async function main() {
  // Clean up existing data
  console.log('🧹 Cleaning up existing data...');
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.propertyOwnership.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleanup completed');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '9000000000',
      password: hashedPassword,
      location: 'Mumbai',
      avatar: getRandomProfileImage(),
      role: Role.ADMIN,
      socialMedia: {
        facebook: 'https://facebook.com/admin',
        twitter: 'https://twitter.com/admin',
        linkedin: 'https://linkedin.com/in/admin'
      }
    }
  });

  // Seed Users (Agents)
  const agents = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Agent ${i + 1}`,
          email: `agent${i + 1}@example.com`,
          phone: `90000000${i}`,
          password: hashedPassword,
          position: 'Real Estate Agent',
          summary: `Experienced in properties ${i}`,
          location: 'Mumbai',
          avatar: getRandomProfileImage(),
          role: Role.AGENT,
          socialMedia: {
            facebook: `https://facebook.com/agent${i + 1}`,
            twitter: `https://twitter.com/agent${i + 1}`,
            linkedin: `https://linkedin.com/in/agent${i + 1}`
          }
        }
      })
    )
  );

  // Seed Users (Customers)
  const customers = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `80000000${i}`,
          password: hashedPassword,
          location: 'Pune',
          avatar: getRandomProfileImage(),
          role: Role.CUSTOMER,
          socialMedia: {
            facebook: `https://facebook.com/customer${i + 1}`,
            twitter: `https://twitter.com/customer${i + 1}`,
            linkedin: `https://linkedin.com/in/customer${i + 1}`
          }
        }
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
          description: `Beautiful property number ${i + 1} with amazing features`,
          status: PropertyStatus.FOR_SALE,
          address: `Address ${i + 1}, Street ${i + 1}`,
          city: 'Mumbai',
          state: 'MH',
          zipCode: `4000${i}`,
          price: 5000000 + i * 100000,
          bedrooms: 2 + (i % 3),
          bathrooms: 1 + (i % 2),
          squareFeet: 800 + i * 50,
          yearBuilt: 2015 + (i % 5),
          features: ['Balcony', 'Lift', 'Parking', 'Security'],
          imageUrls: [getRandomPropertyImage()],
          agentId: agent.id
        }
      });

      // Create Property Ownership
      await prisma.propertyOwnership.create({
        data: {
          propertyId: property.id,
          userId: customer.id,
          startDate: new Date('2022-01-01'),
          endDate: null
        }
      });

      // Create Review
      await prisma.review.create({
        data: {
          comment: `Loved Property ${i + 1}. Great location and amenities!`,
          rating: (i % 5) + 1,
          images: [getRandomReviewImage()],
          status: ReviewStatus.Published,
          propertyId: property.id,
          userId: customer.id
        }
      });

      // Create Order
      await prisma.order.create({
        data: {
          status: OrderStatus.PENDING,
          amount: property.price,
          type: 'BUY',
          customerId: customer.id,
          agentId: agent.id,
          propertyId: property.id
        }
      });
    })
  );
}

main()
  .then(() => {
    console.log('🌱 Seeded 1 admin, 5 agents, 5 customers, and 10 properties with related data');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 