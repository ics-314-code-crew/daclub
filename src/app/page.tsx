'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './globals.css';
import MiddleMenu from '@/components/MiddleMenu';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { data: session } = useSession();
  interface Club {
    id: number;
    name: string;
    interestAreas: string;
    description: string;
    logo: string;
  }

  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    if (session) {
      // Fetch club data when the user is logged in
      fetch('/api/clubs')
        .then((response) => response.json())
        .then((data) => setClubs(data));
    }
  }, [session]);

  // Placeholder clubs
  const placeholderClubs: Club[] = [
    {
      id: 1,
      name: 'Club 1',
      interestAreas: 'Interest 1',
      description: 'This is a brief description of Club 1.',
      logo: '/logoTest.png',
    },
    {
      id: 2,
      name: 'Club 2',
      interestAreas: 'Interest 2',
      description: 'This is a brief description of Club 2.',
      logo: '/logoTest.png',
    },
    {
      id: 3,
      name: 'Club 3',
      interestAreas: 'Interest 3',
      description: 'This is a brief description of Club 3.',
      logo: '/logoTest.png',
    },
  ];

  return (
    <main>
      <Container fluid id="landing-page" style={{ paddingTop: '60px' }}>
        {session ? (
          <Row className="justify-content-center">
            {(clubs.length > 0 ? clubs : placeholderClubs).map((club) => (
              <Col key={club.id} xs={12} md={6} lg={4} className="mb-4">
                <Card>
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
                      Interest Areas:
                      {' '}
                      {club.interestAreas}
                    </Card.Text>
                    <Card.Text>{club.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <MiddleMenu />
        )}
      </Container>
    </main>
  );
};

export default Home;
