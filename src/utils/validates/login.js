import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().min(8).max(150).email(),
  password: yup.string().required().min(2).max(100)
});

export default schema;
