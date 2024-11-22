'use server';

import { Role, Club } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: Email , password.
 */
export async function createUser({ credentials, user }:
{ credentials: { email: string; password: string };
  user: { firstName: string; lastName: string; email: string; }
}): Promise<void> {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: user.email,
      password,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  redirect('/');
}

/**
 * Updates an existing user in the database.
 * Confused on those...who made this?
 * @param club, an object with the following properties: id, email, role.
 */
export async function updateUser(id: number) {
  await prisma.user.update({
    where: { id },
    data: {
      role: Role.USER,
    },
  });

  redirect('/');
}

/**
 * Deletes a user from the database.
 * @param id, the user identifier.
 */
export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });

  redirect('/');
}

export async function createClub(data: {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  logo: string;
  expiration: Date;
  admins: string;
  categories: string[];
}): Promise<void> {
  await prisma.club.create({
    data: {
      name: data.name,
      description: data.description,
      meetingTime: data.meetingTime,
      location: data.location,
      logo: data.logo,
      expiration: data.expiration,
      admins: data.admins,
      categories: data.categories,
    },
  });

  redirect('/list');
}

/**
 * Creates a new club in the database.
 * @param club, the club identifier.
 */
// export async function createClub(club: {
//   id: number;
//   name: string;
//   description: string;
//   meetingTime: string;
//   location: string;
//   website?: string;
//   contactEmail?: string;
//   photos?: string[];
//   logo?: string
//   expiration: Date;
//   // categories?: string[];
//   admins: string;
// }) {
//   console.log('createClub');
//   console.log(club);
//   await prisma.club.create({
//     data: {
//       id: club.id,
//       name: club.name,
//       description: club.description,
//       meetingTime: club.meetingTime,
//       location: club.location,
//       website: club.website,
//       contactEmail: club.contactEmail,
//       photos: club.photos || [],
//       logo: club.logo || '',
//       expiration: club.expiration,
//       admins: club.admins,
//     },
//   });
//   redirect('/list');
// }

/**
 * Updates a club in the database.
 * @param club, the club club.
 */
export async function editClub(club: Club) {
  await prisma.club.update({
    where: { id: club.id },
    data: {
      name: club.name,
      description: club.description,
      meetingTime: club.meetingTime,
      location: club.location,
      website: club.website,
      contactEmail: club.contactEmail,
      photos: club.photos,
      logo: club.logo,
      expiration: club.expiration,
      // admins: {
      //   set: (club.admins?.map((email) => ({ email })) || []),
      // },
      categories: club.categories,
    },
  });

  redirect('/list');
}

/**
 * Deletes a club from the database.
 * @param id, the club identifier.
 */
export async function deleteClub(id: number) {
  await prisma.club.delete({
    where: { id },
  });

  redirect('/list');
}

/**
 * Create a new interest in the database.
 * @param id, the interest name.
 */

/**
 * Deletes an interest from the database.
 * @param id, the interest identifier.
 */

/**
 * Creates a new notification in the database.
 * @param id, the notification club.
 */

/**
 * Marks a notification as read.
 * @param id, the notification identifier.
 */

/**
 * Deletes a notification from the database.
 * @param id, the notification identifier.
 */

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: Email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
