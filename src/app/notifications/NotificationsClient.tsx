'use client';

import { useEffect, useState } from 'react';
import Notification from '@/components/Notification';

const NotificationsClient = () => {
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/src/pages/api/'); // Adjust the API endpoint if needed
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        console.log('Fetched notifications:', data);
        setNotifications(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };
    fetchNotifications();
  }, []);

  return (
    <main>
      <h1>Notifications</h1>
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
      {notifications.length === 0 && !error && <p>No notifications available.</p>}
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} />
      ))}
    </main>
  );
};

export default NotificationsClient;
