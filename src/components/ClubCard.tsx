'use client';

import { useState } from 'react';
import { Club } from '@prisma/client';
import { Card, Image, Button, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ClubCard.module.css';

const ClubCard = ({ club, userEmail }: { club: Club; userEmail: string }) => {
  const adminEmails = club.admins ? club.admins.split(',').map((email) => email.trim()) : [];
  const canEdit = adminEmails.includes(userEmail);

  const [showToast, setShowToast] = useState(false);

  const handleCopyEmails = () => {
    if (adminEmails.length > 0) {
      navigator.clipboard.writeText(adminEmails.join(';'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <Link href={`/pages/clubs/${club.id}`} passHref>
          <Card.Link className={styles.cardLink}>
            <div className={styles.imageContainer}>
              <Image
                src={club.logo}
                alt={`${club.name} Logo`}
                className={styles.logoImage}
              />
            </div>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{club.name}</Card.Title>
            </Card.Body>
          </Card.Link>
        </Link>
        <Card.Footer className={styles.cardFooter}>
          {canEdit && (
            <Link href={`/edit/${club.id}`} passHref>
              <Button variant="outline-primary" className={styles.editButton}>
                Edit Club
              </Button>
            </Link>
          )}
          {!canEdit && (
            <OverlayTrigger
              placement="top"
              overlay={(
                <Tooltip>
                  {adminEmails.length > 0
                    ? 'Click to copy admin emails'
                    : 'No admins available.'}
                </Tooltip>
              )}
            >
              <Button
                variant="outline-primary"
                className={styles.editButton}
                onClick={handleCopyEmails}
                disabled={adminEmails.length === 0}
              >
                Copy Admin Emails
              </Button>
            </OverlayTrigger>
          )}
        </Card.Footer>
      </Card>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className={styles.toast}
      >
        <Toast.Body>Copied to Clipboard!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ClubCard;
