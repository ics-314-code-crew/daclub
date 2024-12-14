'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import cron from 'node-cron';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: Email, password.
 */
export async function createUser({
  credentials,
  user,
}: {
  credentials: { email: string; password: string };
  user: { firstName: string; lastName: string; profileImage?: string | null };
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
  website?: string | null;
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

async function addNotification(clubId: number, message: string) {
  await prisma.notification.create({
    data: {
      clubId,
      message,
      createdAt: new Date(),
    },
  });
}

/**
 * Deletes a notification from the database.
 * @param notificationId, the identifier of the notification to be deleted.
 */
export async function deleteNotification(notificationId: number) {
  await prisma.notification.delete({
    where: { id: notificationId },
  });
}

export async function updateClub(
  id: number,
  data: Omit<
    {
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
      createdAt: Date;
      edited: boolean;
      read: boolean;
    },
    'admins'
  > & { admins?: string | null },
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

  // Remove club from the notification database
  if (data.read) {
    await prisma.notification.deleteMany({
      where: { clubId: id },
    });
  }

  // Trigger notification
  await addNotification(id, `The club "${data.name}" has been edited and needs review.`);

  redirect('/list');
}

/**
 * Changes a user's password.
 * @param credentials, the user credentials.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });

  redirect('/about');
}

/**
 * Checks for clubs nearing expiration and generates notifications for admins.
 * @param daysBefore Number of days before expiration to notify admins.
 */
export async function notifyExpiringClubs(daysBefore: number = 7) {
  const upcomingExpirationDate = new Date();
  upcomingExpirationDate.setDate(upcomingExpirationDate.getDate() + daysBefore);

  try {
    // Find clubs that are about to expire
    const expiringClubs = await prisma.club.findMany({
      where: {
        expirationDate: {
          lte: upcomingExpirationDate, // Find clubs expiring within the given range
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Create notifications for expiring clubs
    for (const club of expiringClubs) {
      await prisma.notification.create({
        data: {
          clubId: club.id,
          message: `The club "${club.name}" is about to expire.`,
          createdAt: new Date(),
        },
      });
    }

    console.log(`Generated notifications for ${expiringClubs.length} expiring clubs.`);
  } catch (error) {
    console.error('Error generating notifications for expiring clubs:', error);
  }
}

/**
 * Initializes cron jobs for the application.
 * This logic should run only on the server.
 */
export async function initializeCronJobs() {
  // Ensure this only runs on the server-side
  if (typeof window === 'undefined') {
    // Schedule a daily job at midnight to check for expiring clubs
    cron.schedule('0 0 * * *', async () => {
      console.log('Running daily expiration check...');
      try {
        await notifyExpiringClubs(7); // Notify admins 7 days before expiration
        console.log('Daily expiration check completed.');
      } catch (error) {
        console.error('Error in daily expiration check:', error);
      }
    });

    console.log('Cron jobs initialized.');
  }
}
