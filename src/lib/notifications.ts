export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export async function fetchNotifications(): Promise<Notification[]> {
  const response = await fetch('/api/notifications');
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return response.json();
}

// src/lib/notifications.ts
export interface Club {
  id: string;
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website?: string | null;
  contactEmail?: string | null;
  logo: string;
  interestAreas: string;
  admins: string;
  startDate: string;
  expirationDate: string;
  imageLocations: string[];
  createdAt: string;
}

export async function fetchAllClubs(): Promise<Club[]> {
  const response = await fetch('/lib/clubs');
  if (!response.ok) {
    throw new Error('Failed to fetch clubs');
  }
  return response.json();
}
