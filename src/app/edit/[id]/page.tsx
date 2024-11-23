import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import EditClubForm from '@/components/EditClubForm';

export default async function EditClubPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
    } | null,
  );

  const { id } = params;

  if (!id) {
    return (
      <main>
        <h2>Error</h2>
        <p>Club ID is missing.</p>
      </main>
    );
  }

  return (
    <main>
      <EditClubForm clubId={id} />
    </main>
  );
}
