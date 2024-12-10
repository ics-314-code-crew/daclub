'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from 'react-bootstrap';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SignUpSchema } from '@/lib/validationSchemas';
import { createUser } from '@/lib/dbActions';

type SignUpFormData = {
  user: {
    firstName: string;
    lastName: string;
    profileImage?: string | null;
  };
  credentials: {
    email: string;
    password: string;
  };
};

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      await createUser(data);

      const result = await signIn('credentials', {
        redirect: false,
        email: data.credentials.email,
        password: data.credentials.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Row className="justify-content-center">
          <Col>
            <Card
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
              }}
            >
              <Card.Body>
                <h2 className="text-center text-white mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-white">
                          First Name
                        </Form.Label>
                        <Form.Control
                          {...register('user.firstName')}
                          type="text"
                          placeholder="Enter your first name"
                        />
                        {errors.user?.firstName && (
                          <div className="text-danger">
                            {errors.user.firstName.message}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-white">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          {...register('user.lastName')}
                          type="text"
                          placeholder="Enter your last name"
                        />
                        {errors.user?.lastName && (
                          <div className="text-danger">
                            {errors.user.lastName.message}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">UH Email</Form.Label>
                    <Form.Control
                      {...register('credentials.email')}
                      type="email"
                      placeholder="Enter your university email"
                    />
                    {errors.credentials?.email && (
                      <div className="text-danger">
                        {errors.credentials.email.message}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      {...register('credentials.password')}
                      type="password"
                      placeholder="Enter your password"
                    />
                    {errors.credentials?.password && (
                      <div className="text-danger">
                        {errors.credentials.password.message}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Profile Image URL</Form.Label>
                    <Form.Control
                      {...register('user.profileImage')}
                      type="text"
                      placeholder="Enter your profile image URL"
                    />
                    {errors.user?.profileImage && (
                    <div className="text-danger">
                      {errors.user.profileImage.message}
                    </div>
                    )}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 py-2 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Sign Up'}
                  </Button>
                </Form>
                <div className="text-center text-white">
                  Already have an account?
                  {' '}
                  <Link href="/auth/signin" className="text-info">
                    Sign In
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
