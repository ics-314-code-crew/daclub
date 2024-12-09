import { prisma } from '@/lib/prisma';
import { Container, Image, Navbar, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

type ClubPageProps = {
  params: { id: string };
};

const ClubPage = async ({ params }: ClubPageProps) => {
  const { id } = params;

  const clubId = parseInt(id, 10);

  if (Number.isNaN(clubId)) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100%' }}
      >
        <h1>Invalid club ID</h1>
      </Container>
    );
  }

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      meetingTime: true,
      location: true,
      admins: true,
    },
  });

  if (!club) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100%' }}
      >
        <h1>Club not found!</h1>
      </Container>
    );
  }

  console.log('club.logo in ClubPage:', club.logo);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/uh-blurred.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        padding: '3rem',
      }}
    >
      <Card
        className="shadow-lg p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: '10px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <Navbar className="mb-4">
          <Link href="/list">
            <ArrowLeftCircle
              width={40}
              height={40}
              style={{ color: 'white' }}
            />
          </Link>
          <h2 className="text-center w-100" style={{ color: 'white' }}>
            {club.name}
          </h2>
        </Navbar>
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center mb-4 mb-md-0"
          >
            <Image
              src={club.logo?.startsWith('http') ? club.logo : `/${club.logo}`}
              rounded
              fluid
              style={{
                objectFit: 'contain',
                maxWidth: '200px',
                maxHeight: '200px',
              }}
            />
          </Col>
          <Col xs={12} md={8}>
            <h5>Location:</h5>
            <p>{club.location || 'Not specified'}</p>
            <h5>Meeting Time:</h5>
            <p>{club.meetingTime || 'Not specified'}</p>
            <h5>Description:</h5>
            <p>{club.description || 'No description provided'}</p>
            {club.admins && (
              <div>
                <h5>Admin(s):</h5>
                {club.admins || 'Not specified'}
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ClubPage;
