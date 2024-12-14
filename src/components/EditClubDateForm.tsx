'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Container, Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { getClubById, updateClubDate } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditClubDateSchema } from '@/lib/validationSchemas';
import { useEffect, useState } from 'react';

type ClubDateForm = {
  startDate: string;
  expirationDate: string;
};

const EditClubDateForm = ({ clubId }: { clubId: string }) => {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditClubDateSchema),
  });

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const club = await getClubById(Number(clubId));
        if (club) {
          Object.keys(club).forEach((key) => {
            if (key === 'startDate' || key === 'expirationDate') {
              setValue(key as keyof ClubDateForm, club[key]);
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

  const onSubmit = async (data: ClubDateForm) => {
    try {
      await updateClubDate(Number(clubId), data);
      swal('Success', 'Club has been updated.', 'success', {
        timer: 2000,
      });
    } catch (error) {
      swal('Error', 'Failed to update club.', 'error');
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/uh-blurred.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
        padding: '3rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <div className="text-center mb-4">
          <h2 className="text-white">Edit Club</h2>
          <p className="text-white">
            Fields marked with
            {' '}
            <span style={{ color: 'red' }}>*</span>
            {' '}
            are
            required.
          </p>
        </div>
        <Card className="border-0">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Dates */}
              <h5 className="mb-3">Dates</h5>
              <hr />
              <Form.Group className="mb-4">
                <Form.Label>
                  Start Date
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="date"
                  {...register('startDate')}
                  className={`form-control-lg ${errors.startDate ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.startDate?.message}
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Expiration Date
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="date"
                  {...register('expirationDate')}
                  className={`form-control-lg ${errors.expirationDate ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.expirationDate?.message}
                </div>
              </Form.Group>

              {/* Actions */}
              <Form.Group className="d-flex justify-content-between">
                <Button type="submit" variant="primary" className="px-5">
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default EditClubDateForm;
