import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
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
  categories: Yup.array().of(Yup.string()).required(),
  admins: Yup.array().of(Yup.string().email()).required(),
  expiration: Yup.date().required(),
  notification: Yup.boolean().required(),
});
