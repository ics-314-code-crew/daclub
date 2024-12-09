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
import { SignInSchema } from '@/lib/validationSchemas';

type SignInFormData = {
  credentials: {
    email: string;
    password: string;
  };
};

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.credentials.email,
      password: data.credentials.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setError(null);
      window.location.href = '/';
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
          maxWidth: '500px',
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
                <h2 className="text-center text-white mb-4">Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">Email</Form.Label>
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
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 py-2 mb-3"
                  >
                    Sign In
                  </Button>
                </Form>
                <div className="text-center text-white">
                  Don&apos;t have an account?
                  {' '}
                  <Link href="/auth/signup" className="text-info">
                    Sign Up
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

export default SignIn;
