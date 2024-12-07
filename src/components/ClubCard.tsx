'use client';

import { Club } from '@prisma/client';
import { Card, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single club card and shows Edit button if user email matches */
const ClubCard = ({ club, userEmail }: { club: Club; userEmail: string }) => {
  const adminEmails = club.admins ? club.admins.split(',').map((email) => email.trim()) : [];
  const canEdit = adminEmails.includes(userEmail);

  const handleCopyEmails = () => {
    if (adminEmails.length > 0) {
      navigator.clipboard.writeText(adminEmails.join(';'));
      alert('Admin emails copied to clipboard!');
    }
  };

  return (
    <Card
      className="h-100 text-center mx-auto"
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.transform = 'scale(1.03)');
        (e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.transform = 'scale(1)');
        (e.currentTarget.style.boxShadow = 'none');
      }}
    >
      <Link href={`/pages/clubs/${club.id}`} passHref>
        <Card.Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '0.15rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
            }}
          >
            <Image
              src={club.logo}
              alt={`${club.name} Logo`}
              style={{
                maxWidth: '80%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
          </div>
          <Card.Body>
            <Card.Title
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#007bff',
              }}
            >
              {club.name}
            </Card.Title>
          </Card.Body>
        </Card.Link>
      </Link>
      <Card.Footer
        style={{
          backgroundColor: '#fff',
        }}
      >
        {canEdit && (
          <Link href={`/edit/${club.id}`} passHref>
            <Button
              variant="outline-primary"
              className="w-100"
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              Edit Club
            </Button>
          </Link>
        )}
       {!canEdit && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {adminEmails.length > 0
                  ? 'Copy'
                  : 'No admins available.'}
              </Tooltip>
            }
          >
            <Button
              variant="outline-primary"
              className="w-100"
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
              onClick={handleCopyEmails}
              disabled={adminEmails.length === 0}
            >
              View Admin Emails
            </Button>
          </OverlayTrigger>
        )}
      </Card.Footer>
    </Card>
  );
};

export default ClubCard;
