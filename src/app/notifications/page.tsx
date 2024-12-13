'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { deleteNotification } from '@/lib/dbActions';

interface Notification {
  id: number;
  message: string;
  read: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/search?editedOnly=true');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
  try {
    await fetch(`/api/notifications/${id}/mark-as-read`, { method: 'POST' });
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
  } catch (error) {
    console.error('Failed to mark as read', error);
  }
};

  // const deleteNotif = async (id: number) => {
  //   try {
  //     const notifId = session?.notification?.id;
  //     if (notifId) {
  //       await deleteNotification(notifId);
  //       setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
  //     } else {
  //       console.error('User ID is undefined');
  //     }
  //   } catch (error) {
  //     console.error('Failed to delete notification', error);
  //   }
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="p-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Card key={notification.id} className="mb-4">
            <Card.Header>
              <h2>{notification.name}</h2>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  // deleteNotif(notification.id);
                  markAsRead(notification.id);
                }}
              >
                Mark as Read
              </Button>
            </Card.Header>
          </Card>
        ))
      ) : (
        <p>No unread notifications found.</p>
      )}
    </main>
  );
};

export default NotificationsPage;

