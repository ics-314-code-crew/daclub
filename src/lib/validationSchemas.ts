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

export const CreateClubSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  location: Yup.string().required(),
  website: Yup.string().url(),
  contactEmail: Yup.string().email(),
  photos: Yup.array().of(Yup.string().url()),
  expiration: Yup.date().required(),
});

export const EditClubSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddClubSchema = Yup.object({
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
  admins: Yup.array().of(Yup.string().email()).required(),
  expiration: Yup.date().required(),
  notification: Yup.boolean().required(),
});
