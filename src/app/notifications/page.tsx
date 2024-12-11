'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface Club {
  id: number;
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website: string | null;
  contactEmail: string | null;
  logo: string;
  admins: string;
  startDate: Date;
  expirationDate: Date;
  interestAreas: string;
  members: string | null;
  imageLocations: string[];
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  read: boolean;
}

const NotificationsPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditedClubs = async () => {
      try {
        const response = await fetch('/api/search?editedOnly=true');
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data: Club[] = await response.json();
        const unreadClubs = data.filter((club) => !club.read);
        setClubs(unreadClubs);
      } catch (error) {
        console.error('Error fetching edited clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditedClubs();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/clubs/${id}/mark-as-read`, { method: 'POST' });
      setClubs((prevClubs) => prevClubs.filter((club) => club.id !== id));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      {clubs.length > 0 ? (
        clubs.map((club) => (
          <Card key={club.id} className="mb-4">
            <Card.Header>
              <h2>{club.name}</h2>
              <Button variant="outline-secondary" onClick={() => markAsRead(club.id)}>
                Mark as Read
              </Button>
            </Card.Header>
          </Card>
        ))
      ) : (
        <p>No edited clubs found.</p>
      )}
    </main>
  );
};

export default NotificationsPage;
