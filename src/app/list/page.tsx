import { getServerSession } from 'next-auth';
// import { Col, Container, Row, Table } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of clubs for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  // const owner = (session && session.user && session.user.email) || '';
  return (
    <main>
      Placeholder for the club list.
    </main>
  );
};

export default ListPage;
