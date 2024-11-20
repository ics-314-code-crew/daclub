'use client';

import { Club } from '@prisma/client';
import { Card, Image } from 'react-bootstrap';
/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ClubCard = ({ club }: { club: Club }) => (
  <Card className="h-100 text-center">
    <Image src={club.logo} width={100} className="club-image" />
    <Card.Body>
      <Card.Title>{club.name}</Card.Title>
    </Card.Body>
  </Card>
);

export default ClubCard;
