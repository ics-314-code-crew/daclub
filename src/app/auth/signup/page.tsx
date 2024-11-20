'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // console.log(JSON.stringify(data, null, 2));
    await createUser({
      credentials: {
        email: data.email,
        password: data.password,
      },
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });
    // After creating, signIn with redirect to the add page
    await signIn('credentials', { callbackUrl: '/add', ...data });
  };

  return (
    <main>
      <Container id="sign-up-page" fluid className="py-3">
        <Container>
          <Row className="justify-content-center">
            <Col xs={5}>
              <h1 className="text-center">Sign Up</h1>
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Label>First Name</Form.Label>
                          <input
                            type="text"
                            {...register('firstName')}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Label>Last Name</Form.Label>
                          <input
                            type="text"
                            {...register('lastName')}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="form-group">
                          <Form.Label>UH Email</Form.Label>
                          <input
                            type="text"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          />
                          <div className="invalid-feedback">{errors.email?.message}</div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="form-group">
                      <Form.Label>Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Confirm Password</Form.Label>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </Form.Group>
                    <Form.Group className="form-group py-3">
                      <Row>
                        <Col>
                          <Button type="submit" className="btn btn-primary">
                            Register
                          </Button>
                        </Col>
                        <Col>
                          <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                            Reset
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Already have an account?
                  <a href="/auth/signin">Sign in</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default SignUp;
