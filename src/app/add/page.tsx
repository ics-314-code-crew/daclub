import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddClubForm from '@/components/AddClubForm';

const AddClub = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
    } | null,
  );

  return (
    // Add your form here
    <main>
      <h1>Add Club</h1>
      <AddClubForm />
    </main>
  );
};

export default AddClub;
