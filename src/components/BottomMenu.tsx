'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Carousel, Spinner, Container } from 'react-bootstrap';
import ClubCard from '@/components/ClubCard';
import { Club } from '@prisma/client';
import { getAllClubs } from '@/lib/dbActions';
import Link from 'next/link';

const BottomMenu = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const club = await getAllClubs();
        setClubs(club);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          backgroundImage: 'url(/uh-blurred.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/uh-blurred.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100%',
        fontFamily: "'Montserrat', sans-serif",
        padding: '2rem 0',
      }}
    >
      <Container
        fluid
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
          padding: '2rem',
          color: '#fff',
          maxWidth: '90%',
          margin: '0 auto',
        }}
      >
        <Row className="justify-content-center text-center mb-4">
          <Col>
            <h1
              className="mb-3"
              style={{ fontSize: '2rem', fontWeight: 'bold' }}
            >
              Clubs Offered at UH Manoa
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
              Explore various student organizations and find the perfect club
              for you!
            </p>
          </Col>
        </Row>
        <Carousel className="mb-4" indicators={false}>
          {clubs.map((club) => (
            <Carousel.Item key={club.id}>
              <Row className="justify-content-center">
                <Col xs={12} md={8}>
                  <ClubCard club={club} userEmail="Guest" />
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row className="text-center mt-4">
          <Col>
            <h4>
              To learn more about the clubs offered at UH Manoa,{' '}
              <Link
                href="/auth/signup"
                className="text-info"
                style={{ fontWeight: 'bold' }}
              >
                create an account here
              </Link>
              . If you already have an account,
              {' '}
              <Link
                href="/auth/signin"
                className="text-info"
                style={{ fontWeight: 'bold' }}
              >
                sign in
              </Link>
              .
            </h4>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default BottomMenu;
