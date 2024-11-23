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
          Object.keys(club).forEach((key) => {
            setValue(key as keyof typeof club, club[key]);
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

  const onSubmit = async (data: { name: string; logo: string; admins: string }) => {
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

export default EditClubForm;
