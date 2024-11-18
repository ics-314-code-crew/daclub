import { getServerSession } from 'next-auth';
// import { Col, Container, Row, Table } from 'react-bootstrap';
// import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      Placeholder for Admin club list.
    </main>
  );
};

export default AdminPage;
