'use client';

import { Club } from '@prisma/client';
import { Card, Image, Button } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single club card and shows Edit button if user email matches */
const ClubCard = ({ club, userEmail }: { club: Club; userEmail: string }) => {
  const adminEmails = club.admins ? club.admins.split(',').map((email) => email.trim()) : [];
  const canEdit = adminEmails.includes(userEmail);

  return (
    <Card className="h-100 text-center mx-auto">
      <Link href={`/pages/clubs/${club.id}`} passHref>
        <Card.Link as="a">
          <Image src={club.logo} width={100} className="club-image" />
          <Card.Body>
            <Card.Title>{club.name}</Card.Title>
            <Card.Text>{club.description}</Card.Text>
          </Card.Body>
        </Card.Link>
      </Link>
      {canEdit && (
        <Card.Footer>
          <Link href={`/edit/${club.id}`} passHref>
            <Button variant="outline-primary" className="w-100">
              Edit Club
            </Button>
          </Link>
        </Card.Footer>
      )}
    </Card>
  );
};

export default ClubCard;
