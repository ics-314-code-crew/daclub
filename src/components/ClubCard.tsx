'use client';

import { Club } from '@prisma/client';
import { Card, Image, Button } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single row in the List Club table. See list/page.tsx. */
const ClubCard = ({ club }: { club: Club }) => (
  <Card className="h-100 text-center">
    <Link href={`/clubs/${club.id}`} passHref>
      <Card className="h-100 text-center" as="a">
        <Image src={club.logo} width={100} className="club-image" />
        <Card.Body>
          <Card.Title>{club.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
    <Card.Footer>
      <Link href={`/edit/${club.id}`} passHref>
        <Button variant="outline-primary" className="w-100">
          Edit Club
        </Button>
      </Link>
    </Card.Footer>
  </Card>
);

export default ClubCard;
