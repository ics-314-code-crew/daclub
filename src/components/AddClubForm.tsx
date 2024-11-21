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

interface ClubFormData {
  name: string;
  description: string;
  meetingTime: string;
  location: string;
  website: string;
  contactEmail: string;
  logo: string;
  admins: string;
  expiration: Date;
  id: number;
}

const AddClubForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: yupResolver(AddClubSchema),
  });

  const onSubmit = async (data: ClubFormData) => {
    try {
      const clubData = {
        ...data,
        admins: currentUser,
        expiration: data.expiration || new Date(),
      };
      await createClub(clubData);
      swal('Success', 'Your club has been added', 'success', { timer: 2000 });
      reset();
    } catch (error) {
      swal('Error', 'Failed to add the club. Please try again.', 'error');
    }
  };

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
                {/* Club Name */}
                <Form.Group>
                  <Form.Label>Club Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                {/* Description */}
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                {/* Meeting Time */}
                <Form.Group>
                  <Form.Label>Meeting Time</Form.Label>
                  <input
                    type="text"
                    {...register('meetingTime')}
                    className={`form-control ${errors.meetingTime ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.meetingTime?.message}</div>
                </Form.Group>

                {/* Location */}
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>

                {/* Website */}
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <input
                    type="url"
                    {...register('website')}
                    className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.website?.message}</div>
                </Form.Group>

                {/* Contact Email */}
                <Form.Group>
                  <Form.Label>Contact Email</Form.Label>
                  <input
                    type="email"
                    {...register('contactEmail')}
                    className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contactEmail?.message}</div>
                </Form.Group>

                {/* Logo */}
                <Form.Group>
                  <Form.Label>Logo URL</Form.Label>
                  <input
                    type="url"
                    {...register('logo')}
                    className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.logo?.message}</div>
                </Form.Group>

                {/* Expiration */}
                <Form.Group>
                  <Form.Label>Expiration Date</Form.Label>
                  <input
                    type="date"
                    {...register('expiration')}
                    className={`form-control ${errors.expiration ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.expiration?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('admins')} value={currentUser} />

                {/* Buttons */}
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => reset()}
                        variant="warning"
                        className="float-right"
                      >
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
