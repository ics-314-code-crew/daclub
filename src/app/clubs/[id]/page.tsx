import { prisma } from '@/lib/prisma';
import { Container, Image, Navbar, Row, Col, Card } from 'react-bootstrap';

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
        <h1>Invalid Club ID</h1>
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
      members: true,
      imageLocations: true,
      interestAreas: true,
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
            <p>{club.description || 'Not specified'}</p>
            <h5>Interest Areas:</h5>
            <p>{club.interestAreas || 'Not specified'}</p>
            {club.admins && (
              <>
                <h5>Admin(s):</h5>
                <p>{club.admins || 'Not specified'}</p>
              </>
            )}
            {club.members && (
              <>
                <h5>Members(s):</h5>
                <p>{club.members || 'Not specified'}</p>
              </>
            )}
          </Col>
        </Row>
        {club.imageLocations && club.imageLocations.length > 0 && (
          <>
            <div className="text-center mt-4">
              <h5>Gallery</h5>
              <hr />
            </div>
            <Row className="mt-3">
              {club.imageLocations.map((image, index) => (
                <Col key={image} xs={6} md={4} className="mb-4">
                  <div
                    style={{
                      height: '150px',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '8px',
                      backgroundColor: '#000',
                    }}
                  >
                    <Image
                      src={image}
                      rounded
                      fluid
                      style={{
                        objectFit: 'cover',
                        maxHeight: '150px',
                        width: '100%',
                      }}
                      alt={`Gallery Image ${index + 1}`}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card>
    </Container>
  );
};

export default ClubPage;
