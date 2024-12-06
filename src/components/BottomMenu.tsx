'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
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
    return <div>Loading...</div>;
  }
  const carouselItemStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '20px',
  };
  return (
    <Row
      className="align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(/bg-landing.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Col>
        <h1 id="textbox2" className="text-center">
          Clubs Offered at UH Manoa
        </h1>
        <Carousel className="">
          {clubs.map((club) => (
            <Carousel.Item key={club.id} style={carouselItemStyle}>
              <ClubCard club={club} userEmail="" />
            </Carousel.Item>
          ))}
        </Carousel>
        <h2 id="textbox2" className="text-center">
          To learn more about the Clubs offered at UH Manoa, Create an Account
          <Link href="/auth/signup">Here</Link>
          Or If you already have an account,
          <Link href="/auth/signin">Sign-in</Link>.
        </h2>
      </Col>
    </Row>
  );
};

export default BottomMenu;
