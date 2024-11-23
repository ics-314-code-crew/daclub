import * as Yup from 'yup';

export const CreateUserSchema = Yup.object({
  credentials: Yup.object({
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().min(6, 'Must be at least 6 characters').required(),
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
  role: Yup.mixed().oneOf(['USER', 'CLUB_ADMIN', 'SUPER_ADMIN'], 'Invalid role'),
});

export const EditClubSchema = Yup.object({
  name: Yup.string().required(),
  logo: Yup.string().url('Must be a valid URL').required(),
});
