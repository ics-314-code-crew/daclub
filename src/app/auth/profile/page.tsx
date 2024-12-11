'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Container, Image } from 'react-bootstrap';
import { getUserData } from '@/lib/dbActions';

const ProfilePage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '/default-image.png',
  });
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const user = await getUserData(session.user.id);
          if (user) {
            setUserData({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              profileImage: user.profileImage || '/default-image.png',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [session]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const { firstName, lastName, email, profileImage } = userData;
  return (
    <Container>
      <h1 className="text-center mt-5">Profile</h1>
      <div className="profile-div">
        <div className="profile-image-info mt-2 mx-5">
          <Image
            src={profileImage}
            alt="Profile Picture"
            roundedCircle
            width={250}
            height={250}
            className="profile-image mb-5 mx-5"
          />
        </div>
        <div className="profile-info mx-5">
          <div className="text-size">
            <strong>First Name: </strong>
            <br />
            <span>{firstName}</span>
          </div>
          <div className="text-size">
            <strong>Last Name: </strong>
            <br />
            <span>{lastName}</span>
          </div>
          <div className="text-size">
            <strong>Email Address: </strong>
            <br />
            <span>{email}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
