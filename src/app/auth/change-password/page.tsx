'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { changePassword } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || '';
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Old password is required'),
    password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await changePassword({ email, ...data });
      await swal('Success', 'Your password has been changed', 'success', {
        timer: 2000,
      });
      reset();
    } catch (error) {
      await swal('Error', 'Failed to change password. Please try again.', 'error');
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
            <h2 className="text-white text-center mb-4">Change Password</h2>
            <Card
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
              }}
            >
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('oldpassword')}
                      isInvalid={!!errors.oldpassword}
                      placeholder="Enter your old password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.oldpassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-white">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('password')}
                      isInvalid={!!errors.password}
                      placeholder="Enter your new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      {...register('confirmPassword')}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Confirm your new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col className="d-flex justify-content-between">
                      <Button type="submit" variant="primary" className="px-4">
                        Change Password
                      </Button>
                      <Button
                        type="button"
                        variant="warning"
                        onClick={() => reset()}
                        className="px-4"
                      >
                        Reset
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

export default ChangePassword;
