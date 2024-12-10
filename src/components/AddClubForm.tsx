'use client';

import { useSession } from 'next-auth/react';
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addClub } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddClubSchema } from '@/lib/validationSchemas';

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

  const onSubmit = async (data: {
    name: string;
    description: string;
    meetingTime: string;
    location: string;
    website?: string | null;
    contactEmail?: string | null;
    logo: string;
    interestAreas: string;
    admins?: string | null;
    startDate: Date;
    expirationDate: Date;
    imageLocations?: string | null;
  }) => {
    try {
      const adminsArray = Array.from(
        new Set([
          currentUser,
          ...(data.admins
            ? data.admins.split(',').map((email) => email.trim())
            : []),
        ]),
      );

      const processedData = {
        ...data,
        admins: adminsArray.join(','),
        imageLocations: data.imageLocations
          ? data.imageLocations.split(',').map((url) => url.trim())
          : [],
      };

      await addClub(processedData);
      swal('Success', 'New club has been added', 'success', {
        timer: 2000,
      });
    } catch (error) {
      swal('Error', 'Failed to submit form.', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

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
          <h2 className="text-white">Add Club</h2>
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
              {/* Club Details */}
              <h5 className="mb-3">Club Details</h5>
              <hr />
              <Form.Group className="mb-4">
                <Form.Label>
                  Club Name
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., Hawaii Hiking Club"
                  {...register('name')}
                  className={`form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Description
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  as="textarea"
                  rows={4}
                  placeholder="Provide a detailed description about the club..."
                  {...register('description')}
                  className={`form-control-lg ${errors.description ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.description?.message}
                </div>
              </Form.Group>

              {/* Meeting and Location */}
              <h5 className="mb-3">Meeting Information</h5>
              <hr />
              <Form.Group className="mb-4">
                <Form.Label>
                  Meeting Time
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., Every Tuesday at 5 PM"
                  {...register('meetingTime')}
                  className={`form-control-lg ${errors.meetingTime ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.meetingTime?.message}
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Location
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., Room 101, Student Union"
                  {...register('location')}
                  className={`form-control-lg ${errors.location ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.location?.message}
                </div>
              </Form.Group>

              {/* Additional Details */}
              <h5 className="mb-3">Additional Information</h5>
              <hr />
              <Form.Group className="mb-4">
                <Form.Label>Gallery Images</Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
                  {...register('imageLocations')}
                  className={`form-control-lg ${errors.imageLocations ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.imageLocations?.message}</div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Website URL</Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., https://hawaiihikingclub.org"
                  {...register('website')}
                  className={`form-control-lg ${errors.website ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.website?.message}
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Contact Email</Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., contact@hawaiihikingclub.org"
                  {...register('contactEmail')}
                  className={`form-control-lg ${errors.contactEmail ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.contactEmail?.message}
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Club Admins
                  {' '}
                  <OverlayTrigger
                    placement="top"
                    overlay={(
                      <Tooltip>
                        Comma-separated list of admin emails.
                        <br />
                        You&apos;re included by default!
                      </Tooltip>
                    )}
                  >
                    <span
                      style={{ textDecoration: 'underline', cursor: 'help' }}
                    >
                      (?)
                    </span>
                  </OverlayTrigger>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., admin1@hawaii.edu, admin2@hawaii.edu"
                  {...register('admins')}
                  className={`form-control-lg ${errors.admins ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.admins?.message}</div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Logo
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., https://example.com/logo.png"
                  {...register('logo')}
                  className={`form-control-lg ${errors.logo ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.logo?.message}</div>
              </Form.Group>

              {/* Interest Areas */}
              <Form.Group className="mb-4">
                <Form.Label>
                  Interest Areas
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  placeholder="e.g., Hiking, Nature, Adventure"
                  {...register('interestAreas')}
                  className={`form-control-lg ${errors.interestAreas ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">
                  {errors.interestAreas?.message}
                </div>
              </Form.Group>

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
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => reset()}
                  variant="warning"
                  className="px-5"
                >
                  Reset
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddClubForm;
