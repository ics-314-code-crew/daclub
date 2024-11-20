'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Col, Container, Row, Card, Button, Modal } from 'react-bootstrap';

const Home = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [isLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Example club data
  const clubs = [
    {
      id: 1,
      name: 'Club 1',
      logo: 'logoTest.png', // Replace with an actual image path or URL
      description: 'Insert description here.',
      interestArea: 'Athletic',
    },
    {
      id: 2,
      name: 'Club 2',
      logo: 'logoTest.png', // Replace with an actual image path or URL
      description: 'Insert description here.',
      interestArea: 'Art',
    },
    {
      id: 3,
      name: 'Club 3',
      logo: 'logoTest.png', // Replace with an actual image path or URL
      description: 'Insert description here.',
      interestArea: 'Athletic',
    },
  ];

  const handleCardClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Handle the case when the user is logged in
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push('/auth/signin'); // Redirect to the sign-in page
  };

  // Group clubs by interest areas
  const groupedClubs: Record<string, typeof clubs[0][]> = clubs.reduce((acc, club) => {
    if (!acc[club.interestArea]) {
      acc[club.interestArea] = [];
    }
    acc[club.interestArea].push(club);
    return acc;
  }, {} as Record<string, typeof clubs[0][]>);

  return (
    <main>
      <Container id="landing-page" fluid className="py-5">
        <Row className="justify-content-center">
          {Object.keys(groupedClubs).map((interestArea) => groupedClubs[interestArea].map((club) => (
            <Col key={club.id} xs={12} md={6} lg={4} className="mb-4">
              <Card onClick={handleCardClick}>
                <Card.Header className="text-center" style={{ backgroundColor: '#41d538' }}>
                  {club.name}
                </Card.Header>
                <Card.Img
                  variant="top"
                  src={club.logo}
                  alt={`${club.name} logo`}
                  className="p-3"
                />
                <Card.Body>
                  <Card.Text>
                    Interest Area:
                    {' '}
                    {club.interestArea}
                  </Card.Text>
                  <Card.Text>{club.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )))}
        </Row>
      </Container>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to log in to view the contents of this club.</p>
          <Button onClick={handleLogin}>Log In</Button>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Home;
