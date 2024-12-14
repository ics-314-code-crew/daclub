'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUserSchema } from '@/lib/validationSchemas';
import { redirect } from 'next/navigation';
import swal from 'sweetalert';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { editUser, getUserData } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type EditUserForm = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
};

const EditUserProfile = () => {
  const { status, update, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(EditUserSchema),
    defaultValues: {
      email: session?.user?.email || '',
      firstName: session?.user?.name?.split(' ')[0] || '',
      lastName: session?.user?.name?.split(' ')[1] || '',
      profileImage: session?.user?.profileImage || '',
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const user = await getUserData(session.user.id);
          if (user) {
            reset({
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.profileImage,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [session, reset]);
  const onSubmit = async (data: EditUserForm) => {
    try {
      const updatedData = {
        id: session?.user?.id as number,
        email: data.email || session?.user?.email || '',
        firstName: data.firstName || session?.user?.name?.split(' ')[0] || '',
        lastName: data.lastName || session?.user?.name?.split(' ')[1] || '',
        profileImage: data.profileImage || session?.user?.profileImage || null,
      };
      const updatedUser = await editUser(updatedData);
      await update({
        ...session,
        user: {
          updatedUser,
        },
      });
      reset(updatedData);
      await swal('Success', 'Your profile has been changed', 'success', {
        timer: 2000,
      });
    } catch (error) {
      await swal('Error', 'Failed to change profile. Please try again.', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main
      style={{
        backgroundImage: "url('/sign-in-bg.jpg')",
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
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-white text-center mb-4">Edit Profile</h2>
            <Card
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
              }}
            >
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('firstName')}
                      isInvalid={!!errors.firstName}
                      placeholder="Enter your new first name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('lastName')}
                      isInvalid={!!errors.lastName}
                      placeholder="Enter your new last name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white"> Email Address </Form.Label>
                    <Form.Control
                      type="email"
                      {...register('email')}
                      isInvalid={!!errors.email}
                      placeholder="Enter your new email address"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white"> Profile Image </Form.Label>
                    <Form.Control
                      type="url"
                      {...register('profileImage')}
                      isInvalid={!!errors.profileImage}
                      placeholder="Enter your new profile image URL"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.profileImage?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col className="d-flex justify-content-between">
                      <Button type="submit" variant="primary" className="px-4">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditUserProfile;
