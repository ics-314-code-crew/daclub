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
  description: Yup.string().required(),
  meetingTime: Yup.string().required(),
  location: Yup.string().required(),
  website: Yup.string()
    .url('Must be a valid URL')
    .notRequired(),
  contactEmail: Yup.string()
    .email('Must be a valid email')
    .notRequired(),
  logo: Yup.string().required(),
  admins: Yup.string().required(),
  startDate: Yup.date().required(),
  expirationDate: Yup.date().required(),
});
