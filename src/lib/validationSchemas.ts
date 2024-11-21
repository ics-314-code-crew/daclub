import * as Yup from 'yup';

export const CreateUserSchema = Yup.object({
  credentials: Yup.object({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters').required(),
  }),
  user: Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email').required(),
  }),
});

export const EditUserSchema = Yup.object({
  id: Yup.number().required(),
  email: Yup.string().email('Invalid email').required(),
  role: Yup.mixed().oneOf(
    ['USER', 'CLUB_ADMIN', 'SUPER_ADMIN'],
    'Invalid role',
  ),
});

export const AddClubSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  location: Yup.string().required(),
  website: Yup.string().url().required(),
  contactEmail: Yup.string().email().required(),
  logo: Yup.string().url().required(),
  admins: Yup.string().required(),
  expiration: Yup.date().required(),
  // notification: Yup.boolean().required(),
  // categories: Yup.array().of(Yup.string()).required(),
  // photos: Yup.array().of(Yup.string().url()).required(),
});

export const EditClubSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  location: Yup.string().required(),
  website: Yup.string().url().required(),
  contactEmail: Yup.string().email().required(),
  photos: Yup.array().of(Yup.string().url()).required(),
  logo: Yup.string().url().required(),
  categories: Yup.array().of(Yup.string()).required(),
  admins: Yup.string().required(),
  expiration: Yup.date().required(),
  notification: Yup.boolean().required(),
});
