'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addClub(club: {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website: string;
  contactEmail: string;
  photos: string[];
  categories: string[];
  admins: string[];
  expiration: string;
}) {
  await prisma.club.create({
    data: {
      name: club.name,
      description: club.description,
      meetingTime: club.meetingTime,
      location: club.location,
      website: club.website,
      contactEmail: club.contactEmail,
      photos: club.photos,
      categories: {
        connect: club.categories.map((name) => ({ name })),
      },
      admins: {
        connect: club.admins.map((email) => ({ email })),
      },
      expiration: new Date(club.expiration),
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
