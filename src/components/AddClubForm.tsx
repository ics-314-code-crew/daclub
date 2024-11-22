'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addClub } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddClubSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  name: string;
  // description: string;
  // meetingTime: string;
  // location: string;
  // website: string;
  // contactEmail: string;
  logo: string;
  // expiration: Date;
  admins: string;
}) => {
  await addClub(data);
  swal('Success', 'Contact has been added', 'success', {
    timer: 2000,
  });
};

const AddClubForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddClubSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Club</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Club Name</Form.Label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Logo</Form.Label>
                      <input
                        type="text"
                        {...register('logo')}
                        className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.logo?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <input type="hidden" {...register('admins')} value={currentUser} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClubForm;
