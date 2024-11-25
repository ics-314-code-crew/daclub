import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import ClubCard from '@/components/ClubCard';
import { Club } from '@prisma/client';

/** Render a list of clubs for the logged in user. */
const BottomMenu = async () => {
  const clubs: Club[] = await prisma.club.findMany({});
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Clubs Offered at Manoa</h1>
          <Row xs={1} md={2} lg={3}>
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BottomMenu;
