// src/components/ClubCard.tsx
import { useState } from 'react';
import { Club } from '@prisma/client';
import { Card, Image, Button, OverlayTrigger, Tooltip, Toast, Badge } from 'react-bootstrap';
import styles from './ClubCard.module.css';
import Notification from './Notification'; // Import the Notification component

const ClubCard = ({ club, userEmail }: { club: Club; userEmail: string; }) => {
  const adminEmails = club.admins ? club.admins.split(',').map((email) => email.trim()) : [];
  const canEdit = adminEmails.includes(userEmail);

  const [showToast, setShowToast] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleCopyEmails = () => {
    if (adminEmails.length > 0) {
      navigator.clipboard.writeText(adminEmails.join(';'));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setNotification('Admin emails copied to clipboard!');
    } else {
      setNotification('No admin emails available.');
    }
  };

  const isGuest = userEmail === 'Guest';
  const isExpired = new Date(club.expirationDate) < new Date();
  return (
    <div className={styles.cardContainer}>
      <Card className={`${styles.card} ${isExpired ? styles.expiredOverlay : ''}`}>
        {isExpired && (
          <div>
            <Badge pill bg="danger">Expired</Badge>
          </div>
        )}
        {!isGuest ? (
          <Card.Link href={`/clubs/${club.id}`} className={styles.cardLink}>
            <div className={styles.imageContainer}>
              <Image src={club.logo} alt={`${club.name} Logo`} className={styles.logoImage} />
            </div>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{club.name}</Card.Title>
            </Card.Body>
          </Card.Link>
        ) : (
          <div className={styles.cardLink} style={{ cursor: 'default' }}>
            <div className={styles.imageContainer}>
              <Image src={club.logo} alt={`${club.name} Logo`} className={styles.logoImage} />
            </div>
            <Card.Body>
              <Card.Title className={styles.cardTitle}>{club.name}</Card.Title>
            </Card.Body>
          </div>
        )}
        {!isGuest && (
          <Card.Footer className={`${styles.cardFooter} ${isExpired ? styles.cardExpiredFooter : ''}`}>
            { canEdit && isExpired && (
              <>
                <p className={styles.expiredText}>This club has expired. Please renew it to relist.</p>
                <a href={`/editDate/${club.id}`} className={styles.cardLink}>
                  <Button variant="outline-primary" className={styles.renewButton}>
                    Renew Club
                  </Button>
                </a>
              </>
            )}
            {canEdit && !isExpired && (
              <a href={`/edit/${club.id}`} className={styles.cardLink}>
                <Button variant="outline-primary" className={styles.editButton}>
                  Edit Club
                </Button>
              </a>
            )}
            {!canEdit && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>{adminEmails.length > 0 ? 'Click to copy admin emails' : 'No admins available.'}</Tooltip>
                }
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
        )}
      </Card>
      <Toast show={showToast} onClose={() => setShowToast(false)} className={styles.toast}>
        <Toast.Body>Copied to Clipboard!</Toast.Body>
      </Toast>
      {notification && <Notification message={notification} />}
    </div>
  );
};

export default ClubCard;
