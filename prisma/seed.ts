// prisma/seed.ts - Seed database with sample data

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        email: 'john.doe@company.com',
        name: 'John Doe',
        department: 'Engineering',
        role: 'Senior Engineer',
      },
    }),
    prisma.employee.create({
      data: {
        email: 'jane.smith@company.com',
        name: 'Jane Smith',
        department: 'Product',
        role: 'Product Manager',
      },
    }),
    prisma.employee.create({
      data: {
        email: 'bob.wilson@company.com',
        name: 'Bob Wilson',
        department: 'Sales',
        role: 'Sales Director',
      },
    }),
  ]);

  console.log(`✅ Created ${employees.length} employees`);

  // Create sample check-ins
  const now = new Date();
  const checkIns = await Promise.all([
    prisma.checkIn.create({
      data: {
        employeeId: employees[0].id,
        energyLevel: 3,
        workloadLevel: 4,
        motivation: 2,
        teamSupport: 3,
        stressLevel: 4,
        note: 'Feeling a bit overwhelmed',
        burnoutScore: 62,
        riskLevel: 'high_risk',
        week: 21,
        year: 2024,
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.checkIn.create({
      data: {
        employeeId: employees[1].id,
        energyLevel: 4,
        workloadLevel: 3,
        motivation: 4,
        teamSupport: 4,
        stressLevel: 2,
        burnoutScore: 25,
        riskLevel: 'healthy',
        week: 21,
        year: 2024,
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log(`✅ Created ${checkIns.length} check-ins`);

  // Create wellness nudges
  const nudges = await Promise.all([
    prisma.wellnessNudge.create({
      data: {
        message: 'Take a short walk 🚶',
        emoji: '🚶',
        category: 'walk',
      },
    }),
    prisma.wellnessNudge.create({
      data: {
        message: 'Look away from the screen for 1 minute 👀',
        emoji: '👀',
        category: 'screen-break',
      },
    }),
    prisma.wellnessNudge.create({
      data: {
        message: 'Drink some water 💧',
        emoji: '💧',
        category: 'hydration',
      },
    }),
  ]);

  console.log(`✅ Created ${nudges.length} wellness nudges`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
