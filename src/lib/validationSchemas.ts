import * as Yup from 'yup';

const hawaiiEmailValidationRequired = Yup.string()
  .required('Email is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be a valid email address')
  .matches(/^[^\s@]+@hawaii\.edu$/, 'Email must end with @hawaii.edu');

const hawaiiEmailValidationNotRequired = Yup.string().notRequired();

const passwordValidation = Yup.string().min(6, 'Must be at least 6 characters').required('Password is required');

const adminsValidationNotRequired = Yup.string()
  .test('valid-hawaii-emails', 'All admin emails must end with @hawaii.edu', (value) => {
    if (!value || value.trim() === '') {
      return true; // Skip validation if the field is empty
    }
    const emails = value.split(',').map((email) => email.trim());
    return emails.every((email) => /^[^\s@]+@hawaii\.edu$/.test(email));
  })
  .notRequired();

const membersValidationNotRequired = Yup.string()
  .test('valid-member-emails', 'All member emails must end with @hawaii.edu', (value) => {
    if (!value || value.trim() === '') {
      return true; // Skip validation if the field is empty
    }
    const emails = value.split(',').map((email) => email.trim());
    return emails.every((email) => /^[^\s@]+@hawaii\.edu$/.test(email));
  })
  .notRequired();

const nameValidation = Yup.string().required('This field is required');

const websiteValidation = Yup.string().url('Must be a valid URL').notRequired();

const profileImageValidation = Yup.string().url('Must be a valid URL').notRequired();

export const SignInSchema = Yup.object({
  credentials: Yup.object({
    email: hawaiiEmailValidationRequired,
    password: passwordValidation,
  }),
});

export const SignUpSchema = Yup.object({
  credentials: Yup.object({
    email: hawaiiEmailValidationRequired,
    password: passwordValidation,
  }),
  user: Yup.object({
    firstName: nameValidation,
    lastName: nameValidation,
    profileImage: profileImageValidation,
  }),
});

export const EditUserSchema = Yup.object({
  id: Yup.number().required('ID is required'),
  email: hawaiiEmailValidationRequired,
  role: Yup.mixed().oneOf(['USER', 'SUPER_ADMIN'], 'Invalid role'),
});

export const AddClubSchema = Yup.object({
  name: nameValidation,
  description: nameValidation,
  meetingTime: nameValidation,
  location: nameValidation,
  website: websiteValidation,
  contactEmail: hawaiiEmailValidationNotRequired,
  logo: nameValidation,
  admins: adminsValidationNotRequired,
  interestAreas: nameValidation,
  startDate: Yup.date().required('Start date is required'),
  expirationDate: Yup.date().required('Expiration date is required'),
  imageLocations: Yup.string()
    .matches(/^(\s*https?:\/\/\S+\s*,?\s*)*$/, 'Images must be a comma-separated list of valid URLs')
    .notRequired(),
});

export const EditClubSchema = Yup.object({
  name: nameValidation,
  description: nameValidation,
  meetingTime: nameValidation,
  location: nameValidation,
  website: websiteValidation,
  contactEmail: hawaiiEmailValidationNotRequired,
  logo: nameValidation,
  admins: adminsValidationNotRequired,
  interestAreas: nameValidation,
  startDate: Yup.string()
    .required('Start date is required')
    .test(
      'valid-date',
      'Start date must be a valid date in YYYY-MM-DD format',
      (value) => !Number.isNaN(Date.parse(value || '')),
    ),
  expirationDate: Yup.string()
    .required('Expiration date is required')
    .test(
      'valid-date',
      'Expiration date must be a valid date in YYYY-MM-DD format',
      (value) => !Number.isNaN(Date.parse(value || '')),
    ),
  members: membersValidationNotRequired,
  imageLocations: Yup.string()
    .matches(/^(\s*https?:\/\/\S+\s*,?\s*)*$/, 'Images must be a comma-separated list of valid URLs')
    .notRequired(),
  read: Yup.boolean(),
});

export const AddNotification = Yup.object({
  clubId: Yup.number().required('Club ID is required'),
  message: Yup.string().required('Message is required'),
  read: Yup.boolean(),
});
