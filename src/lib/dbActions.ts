'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: Email, password.
 */
export async function createUser({
  credentials,
  user,
}: {
  credentials: { email: string; password: string };
  user: { firstName: string; lastName: string, profileImage?: string | null };
}): Promise<void> {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
    },
  });

  redirect('/');
}

/**
 * Edits a users information in the database.
 * @param id, the user's id.
 */
export async function editUser({
  id,
  firstName,
  lastName,
  profileImage,
  email,
}: {
  id: number;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  email: string;
}) {
  const userId = Number(id);
  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      email,
      profileImage,
    },
  });

  redirect('/auth/profile');
}

/**
 * Deletes a user from the database.
 * @param email, the user's id.
 */
export async function deleteUser(id: number) {
  const userId = Number(id);
  await prisma.user.delete({
    where: { id: userId },
  });
  redirect('/');
}
/**
 * Get users data from the database.
 * @param id, the user's id.
 */
export async function getUserData(id: number) {
  const userId = Number(id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user
    ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.profileImage || '',
    }
    : null;
}
/**
 * Gets a user by their id.
 * @param id, the user's id.
 */
export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user
    ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.profileImage || '',
    }
    : null;
}
/**
 * Gets a club by its ID.
 * @param id, the club identifier.
 */
export async function getClubById(id: number) {
  const club = await prisma.club.findUnique({
    where: { id },
  });

  return club
    ? {
      name: club.name,
      description: club.description || '',
      meetingTime: club.meetingTime || '',
      location: club.location || '',
      website: club.website || null,
      contactEmail: club.contactEmail || null,
      logo: club.logo || '',
      admins: club.admins || '',
      interestAreas: club.interestAreas || '',
      startDate: club.startDate.toISOString().split('T')[0],
      expirationDate: club.expirationDate.toISOString().split('T')[0],
      members: club.members || '',
      imageLocations: club.imageLocations || [],
    }
    : null;
}

/**
 * Creates a new club in the database.
 * @param club, an object with the club's properties.
 */
export async function addClub(club: {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website?: string | null
  contactEmail?: string | null;
  logo: string;
  interestAreas: string;
  admins: string;
  startDate: Date;
  expirationDate: Date;
  imageLocations: string[];
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
      interestAreas: club.interestAreas,
      admins: club.admins,
      startDate: new Date(club.startDate),
      expirationDate: new Date(club.expirationDate),
      imageLocations: club.imageLocations,
    },
  });

  redirect('/list');
}

/**
 * Gets all the clubs in the database
 * @returns a list of clubs.
 */
export async function getAllClubs() {
  return prisma.club.findMany();
}

/**
 * Updates an existing club in the database.
 * @param id, the club identifier.
 * @param data, the updated club data.
 */
export async function updateClub(
  id: number,
  data: Omit<{
    name: string;
    description: string;
    meetingTime: string;
    location: string;
    website?: string | null;
    contactEmail?: string | null;
    logo: string;
    admins?: string | null;
    interestAreas: string;
    startDate: string;
    expirationDate: string;
    imageLocations?: string[];
  }, 'admins'> & { admins?: string | null },
) {
  const { admins, imageLocations, ...rest } = data;

  const formattedData = {
    ...rest,
    startDate: new Date(data.startDate),
    expirationDate: new Date(data.expirationDate),
    ...(admins ? { admins } : {}),
    ...(imageLocations ? { imageLocations } : {}),
  };

  await prisma.club.update({
    where: { id },
    data: formattedData,
  });

  redirect('/list');
}

/**
 * Updates a club's start date expiration date.
 * @param id, the club identifier.
 */
export async function updateClubDate(
  id: number,
  data: {
    startDate: string;
    expirationDate: string;
  },
) {
  await prisma.club.update({
    where: { id },
    data: {
      startDate: new Date(data.startDate),
      expirationDate: new Date(data.expirationDate),
    },
  });

  redirect('/my-clubs');
}

/**
 * Changes a user's password.
 * @param credentials, the user credentials.
 */
export async function changePassword(
  credentials:
  {
    email: string;
    password: string;
  },
) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });

  redirect('/about');
}
