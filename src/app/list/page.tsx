import { Container, Row, Col } from 'react-bootstrap';
import SearchWithResults from '@/components/SearchWithResults';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';

const ListPage = async () => {
  // Fetch session and protect the page
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
    } | null,
  );

  const currentUserEmail = session?.user?.email || '';

  return (
    <main
      style={{
        backgroundImage: "url('/uh-blurred.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        fontFamily: "'Montserrat', sans-serif",
        padding: '2rem 0',
      }}
    >
      <Container
        fluid
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          color: '#fff',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Row>
          <Col>
            <h2 className="text-white text-center">Club List</h2>
            <br />
            <SearchWithResults currentUserEmail={currentUserEmail} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
