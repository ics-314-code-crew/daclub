import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();
async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'CLUB_ADMIN') {
      role = 'CLUB_ADMIN';
    } else if (account.role === 'SUPER_ADMIN') {
      role = 'SUPER_ADMIN';
    }
    // Validate Email
    if (!account.email.endsWith('@hawaii.edu')) {
      console.error(`Invalid email: ${account.email}`);
      console.error('Email must end with @hawaii.edu');
      process.exit(1);
    }

    console.log(`  Creating user: ${account.firstName} + ${account.lastName} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password,
        role,
      },
    });
  });

  config.defaultClubsData.forEach(async (data) => {
    console.log(`  Adding club: ${data.name}`);
    console.log(data);
    await prisma.club.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        description: data.description,
        meetingTime: data.meetingTime,
        location: data.location,
        website: data.website,
        contactEmail: data.contactEmail,
        logo: data.logo,
        startDate: new Date(data.startDate),
        expirationDate: new Date(data.expirationDate),
        interestAreas: data.interestAreas,
        admins: data.admins,
        interestAreas: data.interestAreas,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
