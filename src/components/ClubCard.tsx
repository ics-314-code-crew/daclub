'use client';

import { useState } from 'react';
import { Club } from '@prisma/client';
import { Card, Image, Button, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single club card and shows Edit button if user email matches */
const ClubCard = ({ club, userEmail }: { club: Club; userEmail: string }) => {
  const adminEmails = club.admins ? club.admins.split(',').map((email) => email.trim()) : [];
  const canEdit = adminEmails.includes(userEmail);

  const [showToast, setShowToast] = useState(false);

  const handleCopyEmails = () => {
    if (adminEmails.length > 0) {
      navigator.clipboard.writeText(adminEmails.join(', '));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
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
                className="w-100"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                }}
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
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 1050,
          backgroundColor: '#28a745',
          color: 'white',
        }}
      >
        <Toast.Body>Copied to Clipboard!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ClubCard;
