'use server';

import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addClub(club: {
  name: string;
  image: string;
  description: string;
  email: string;
  owner: string
}) {
  await prisma.club.create({
    data: {
      name: club.name,
      images: club.image,
      description: club.description,
      email: club.email,
      owner: club.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}
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
      firstName: user.firstName, // Replace with actual first name
      lastName: user.lastName, // Replace with actual last name
    },
  });

  redirect('/');
}

/**
 * Updates an existing user in the database.
 * @param details, an object with the following properties: id, email, uhId, role.
 */
export async function updateUser(details:
{
  id: number;
  email?: string;
  role?: Role;
}) {
  await prisma.user.update({
    where: { id: details.id },
    data: {
      email: details.email,
      role: details.role,
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

/**
 * Creates a new club in the database.
 * @param details, the club identifier.
 */
export async function createClub(details: {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website?: string;
  contactEmail?: string;
  photos?: string[];
  expiration: Date;
}) {
  await prisma.club.create({
    data: {
      name: details.name,
      description: details.description,
      meetingTime: details.meetingTime,
      location: details.location,
      website: details.website,
      contactEmail: details.contactEmail,
      photos: details.photos || [],
      expiration: details.expiration,
    },
  });

  redirect('/');
}

/**
 * Updates a club in the database.
 * @param details, the club details.
 */
export async function updateClub(details: {
  id: number;
  name?: string;
  description?: string;
  meetingTime?: string;
  location?: string;
  website?: string;
  contactEmail?: string;
  photos?: string[];
  expiration?: Date;
}) {
  await prisma.club.update({
    where: { id: details.id },
    data: {
      name: details.name,
      description: details.description,
      meetingTime: details.meetingTime,
      location: details.location,
      website: details.website,
      contactEmail: details.contactEmail,
      photos: details.photos,
      expiration: details.expiration,
    },
  });

  redirect('/');
}

/**
 * Deletes a club from the database.
 * @param id, the club identifier.
 */
export async function deleteClub(id: number) {
  await prisma.club.delete({
    where: { id },
  });

  redirect('/');
}

/**
 * Create a new interest in the database.
 * @param id, the interest name.
 */
export async function createInterest(name: string) {
  await prisma.interest.create({
    data: { name },
  });

  redirect('/');
}

/**
 * Deletes an interest from the database.
 * @param id, the interest identifier.
 */
export async function deleteInterest(id: number) {
  await prisma.interest.delete({
    where: { id },
  });

  redirect('/');
}

/**
 * Creates a new notification in the database.
 * @param id, the notification details.
 */
export async function createNotification(details: {
  userId: number;
  clubId?: number;
  message: string;
  isRead?: boolean;
}) {
  await prisma.notification.create({
    data: {
      userId: details.userId,
      clubId: details.clubId,
      message: details.message,
      isRead: details.isRead || false,
    },
  });

  redirect('/');
}

/**
 * Marks a notification as read.
 * @param id, the notification identifier.
 */
export async function markNotificationAsRead(id: number) {
  await prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
    },
  });

  redirect('/');
}

/**
 * Deletes a notification from the database.
 * @param id, the notification identifier.
 */
export async function deleteNotification(id: number) {
  await prisma.notification.delete({
    where: { id },
  });

  redirect('/');
}

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
