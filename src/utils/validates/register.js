import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required().min(3).max(100),
  email: yup.string().required().min(8).max(150).email(),
  password: yup.string().required().min(6).max(100)
});

export default schema;
