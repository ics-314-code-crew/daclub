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
    console.log(`Creating user: ${account.email} with role: ${role}`);
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

  config.defaultInterests.forEach(async (interest) => {
    console.log(`Creating interest: ${interest.name}`);
    await prisma.interest.upsert({
      where: { name: interest.name },
      update: {},
      create: {
        name: interest.name,
      },
    });
  });

  config.defaultClubsData.forEach(async (data) => {
    console.log(`Adding club: ${data.name}`);

    // For Later use.......
    // // Ensure categories exist
    // const categories = await prisma.interest.findMany({
    //   where: { name: { in: data.categories } },
    // });

    // // Ensure admins exist
    // const admins = await prisma.user.findMany({
    //   where: { email: { in: data.admins } },
    // });

    // if (categories.length !== data.categories.length || admins.length !== data.admins.length) {
    //   console.warn(`Skipping club: ${data.name} due to missing categories or admins.`);
    // }
  });

  config.defaultClubsData.forEach(async (data) => {
    console.log(`Adding club: ${data.name}`);
    await prisma.club.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        description: data.description || 'Default description',
        meetingTime: data.meetingTime || 'Default meeting time',
        location: data.location || 'Default location',
        website: data.website || null,
        contactEmail: data.contactEmail || 'example@gmail.com',
        photos: data.photos || [],
        expiration: new Date(data.expiration || '2025-01-01'),
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
