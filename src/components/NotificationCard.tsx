'use client';

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface NotificationCardProps {
  id: number;
  name: string;
  read: boolean;
  onMarkAsRead: (id: number) => void;
}

const NotificationCard = ({ id, name, read, onMarkAsRead }: NotificationCardProps) => {
  const [isRead, setIsRead] = useState(read);

  const handleMarkAsRead = () => {
    onMarkAsRead(id);
    setIsRead(true);
  };

  return (
    <Card className={`mb-4`} id="notificationCard">
      <Card.Header>
        <h2>{name}</h2>
      </Card.Header>
      <Card.Body>
        <Button variant="outline-secondary" onClick={handleMarkAsRead} disabled={isRead}>
          {isRead ? 'Read' : 'Mark as Read'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
