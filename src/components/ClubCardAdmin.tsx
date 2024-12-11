'use client';

import { useSession } from 'next-auth/react';
import { Club } from '@prisma/client';
import { Card, Image, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ClubCard.module.css';

const ClubCardAdmin = ({ club }: { club: Club }) => {
  const { status } = useSession();

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        {status === 'authenticated' ? (
          <Card.Link href={`/clubs/${club.id}`} className={styles.cardLink}>
            <div className={styles.imageContainer}>
              <Image src={club.logo} alt={`${club.name} Logo`} className={styles.logoImage} />
            </div>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{club.name}</Card.Title>
            </Card.Body>
          </Card.Link>
        ) : (
          <div>
            <div className={styles.imageContainer}>
              <Image src={club.logo} alt={`${club.name} Logo`} className={styles.logoImage} />
            </div>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{club.name}</Card.Title>
            </Card.Body>
          </div>
        )}
        {status === 'authenticated' && (
          <Card.Footer className={styles.cardFooter}>
            <Link href={`/edit/${club.id}`} passHref>
              <Button variant="outline-primary" className={styles.editButton}>
                Edit Club
              </Button>
            </Link>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default ClubCardAdmin;
