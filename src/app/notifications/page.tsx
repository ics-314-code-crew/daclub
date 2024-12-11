'use client';

import { useEffect, useState } from 'react';

interface Club {
  id: string;
  name: string;
  // Add other club fields as necessary
}

const NotificationsPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/search'); // Adjust endpoint if needed
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await response.json();
        setClubs(data);
      } catch (err) {
        setError('Fetching clubs has failed.');
      }
    };

    fetchClubs();
  }, []);

  return (
    <main>
      <h1>Clubs</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default NotificationsPage;
