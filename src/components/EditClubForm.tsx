'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { getClubById, updateClub } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditClubSchema } from '@/lib/validationSchemas';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EditClubForm: React.FC<{ clubId: string }> = ({ clubId }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditClubSchema),
  });

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const club = await getClubById(Number(clubId));
        if (club) {
          const formKeys = Object.keys(EditClubSchema.fields) as Array<keyof typeof EditClubSchema.fields>;
          formKeys.forEach((key) => {
            if (key in club) {
              setValue(key, club[key]?.toString() || '');
            }
          });
        }
      } catch (error) {
        swal('Error', 'Failed to load club data.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubData();
  }, [clubId, setValue]);

  if (status === 'loading' || isLoading) {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: {
    name: string;
    description: string;
    meetingTime: string;
    location: string;
    website?: string | null;
    contactEmail?: string | null;
    logo: string;
    admins: string;
    startDate: Date;
    expirationDate: Date;
  }) => {
    try {
      await updateClub(Number(clubId), data);
      swal('Success', 'Club has been updated.', 'success', {
        timer: 2000,
      });
    } catch (error) {
      swal('Error', 'Failed to update club.', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Club</h2>
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
                      <Form.Label>Description</Form.Label>
                      <input
                        type="text"
                        {...register('description')}
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.description?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Meeting Time</Form.Label>
                      <input
                        type="text"
                        {...register('meetingTime')}
                        className={`form-control ${errors.meetingTime ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.meetingTime?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <input
                        type="text"
                        {...register('location')}
                        className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.location?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Website</Form.Label>
                      <input
                        type="text"
                        {...register('website')}
                        className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.website?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Contact Email</Form.Label>
                      <input
                        type="text"
                        {...register('contactEmail')}
                        className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.contactEmail?.message}</div>
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

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Admins</Form.Label>
                      <input
                        type="text"
                        {...register('logo')}
                        className={`form-control ${errors.admins ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.admins?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <input
                        type="text"
                        {...register('startDate')}
                        className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.startDate?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col className="justify-content-start">
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <input
                        type="text"
                        {...register('expirationDate')}
                        className={`form-control ${errors.expirationDate ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.expirationDate?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <input type="hidden" {...register('admins')} value={currentUser} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Update
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

EditClubForm.propTypes = {
  clubId: PropTypes.string.isRequired,
};

export default EditClubForm;
