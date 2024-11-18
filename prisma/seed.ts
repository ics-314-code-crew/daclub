import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    let role: Role = 'USER';
    if (account.role === 'SUPER_ADMIN') 
      role = 'SUPER_ADMIN';
    else if (account.role === 'CLUB_ADMIN') 
      role = 'CLUB_ADMIN';

    console.log(`Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
        uhId: account.uhId ?? null,
      },
    });
  }

  for (const interest of config.defaultInterests) {
    console.log(`Creating interest: ${interest.name}`);
    await prisma.interest.upsert({
      where: { name: interest.name },
      update: {},
      create: {
        name: interest.name,
      },
    });
  }
  

  for (const data of config.defaultClubsData) {
    console.log(`Adding club: ${data.name}`);
  
    // Ensure categories exist
    const categories = await prisma.interest.findMany({
      where: { name: { in: data.categories } },
    });
  
    // Ensure admins exist
    const admins = await prisma.user.findMany({
      where: { email: { in: data.admins } },
    });
  
    if (categories.length !== data.categories.length || admins.length !== data.admins.length) {
      console.warn(
        `Skipping club: ${data.name} due to missing categories or admins.`
      );
      continue;
    }
  
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
        categories: {
          connect: categories.map((category) => ({ id: category.id })),
        },
        admins: {
          connect: admins.map((admin) => ({ id: admin.id })),
        },
      },
    });
  }  
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
