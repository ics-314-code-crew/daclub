'use client';

import { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { Row, Col, Carousel } from 'react-bootstrap';
=======
import { Container, Row, Col, Carousel } from 'react-bootstrap';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        const club = await getAllClubs();
        setClubs(club);
=======
        const response = await fetch('/api/clubs');
        const data = await response.json();
        setClubs(data);
>>>>>>> Stashed changes
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
<<<<<<< Updated upstream
  const carouselItemStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '20px',
  };
  return (
    <Row
      className="align-items-center justify-content-center"
      style={{
        // backgroundImage: 'url(/bg-landing.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Col>
        <h1 className="text-center">Clubs Offered at UH Manoa</h1>
        <Carousel className="">
          {clubs.map((club) => (
            <Carousel.Item key={club.id} style={carouselItemStyle}>
              <ClubCard club={club} />
            </Carousel.Item>
          ))}
        </Carousel>
        <h2 className="text-center">
          To learn more about the Clubs offered at UH Manoa, Create an Account
          {' '}
          <Link href="/auth/signup">Here</Link>
          {' '}
          Or If you already have an account,
          {' '}
          <Link href="/auth/signin">Sign-in</Link>
          .
        </h2>
      </Col>
    </Row>
=======

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Clubs Offered at Manoa</h1>
          <Carousel>
            {clubs.map((club) => (
              <Carousel.Item key={club.id}>
                <ClubCard club={club} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
>>>>>>> Stashed changes
  );
};

export default BottomMenu;
