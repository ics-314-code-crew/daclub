'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: Email , password.
 */
export async function createUser({
  credentials,
  user,
}: {
  credentials: { email: string; password: string };
  user: { firstName: string; lastName: string; email: string };
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
 * Gets a club by its ID.
 * @param id, the club identifier.
 */
export async function getClubById(id: number) {
  return prisma.club.findUnique({
    where: { id },
  });
}
export async function addClub(club: {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website?: string | null
  contactEmail?: string | null;
  logo: string;
  admins: string;
  startDate: Date;
  expirationDate: Date
}) {
  await prisma.club.create({
    data: {
      name: club.name,
      description: club.description,
      meetingTime: club.meetingTime,
      location: club.location,
      website: club.website,
      contactEmail: club.contactEmail,
      logo: club.logo,
      admins: club.admins,
      startDate: new Date(club.startDate),
      expirationDate: new Date(club.expirationDate),
    },
  });

  redirect('/list');
}
/**
 * Updates an existing club in the database.
 * @param id, the club identifier.
 * @param data, the updated club data.
 */
export async function updateClub(
  id: number,
  data: { name: string; logo: string; admins: string },
) {
  await prisma.club.update({
    where: { id },
    data,
  });

  redirect('/list');
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
