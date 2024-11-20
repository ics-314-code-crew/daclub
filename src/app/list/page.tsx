import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ClubCard from '@/components/ClubCard';
import { Club } from '@prisma/client';

/** Render a list of clubs for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const clubs: Club[] = await prisma.club.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Club List</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
