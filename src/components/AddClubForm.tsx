'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { createClub } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddClubSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  id: number;
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website?: string;
  contactEmail: string;
  photos: string[];
  logo: string;
  categories: string[];
  admins: string[];
  expiration: Date;
  notification: boolean;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await createClub(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddClubForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddClubForm', status, session);
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
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add CLub</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Club Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Meeting Time</Form.Label>
                  <input
                    type="text"
                    {...register('meetingTime')}
                    className={`form-control ${errors.meetingTime ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.meetingTime?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website URL</Form.Label>
                  <input
                    type="text"
                    {...register('website')}
                    className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.website?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contact Email</Form.Label>
                  <input
                    type="text"
                    {...register('contactEmail')}
                    className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contactEmail?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Club Photos</Form.Label>
                  <input
                    type="text"
                    {...register('photos')}
                    className={`form-control ${errors.photos ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.photos?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Categories</Form.Label>
                  <input
                    type="Interest"
                    {...register('categories')}
                    className={`form-control ${errors.categories ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.categories?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Admins</Form.Label>
                  <input
                    type="User"
                    {...register('admins')}
                    className={`form-control ${errors.admins ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.admins?.message}</div>
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Notifications</Form.Label>
                  <input
                    type="Notification"
                    {...register('notifications')}
                    className={`form-control ${errors.notifications ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.notifications?.message}</div>
                </Form.Group> */}
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
