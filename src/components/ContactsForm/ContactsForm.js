import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  Label,
  Input,
  Button,
  StyledErrorMessage,
} from './ContactsForm.styled';

const schema = yup.object().shape({
  name: yup.string().required('It is required field'),
  number: yup.string()
    .matches(/^\+?3?8?(0\d{9})$/, 'Wrong phone number')
    .required('It is required field'),
});

export const ContactsForm = ({ onSubmit }) => {

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      <StyledForm>
        <Label>
          Name
          <Input type="text" name="name" />
          <ErrorMessage name="name">
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </Label>

        <Label>
          Number
          <Input type="text" name="number" placeholder="Example: 099775544" />
          <ErrorMessage name="number">
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </Label>
          <Button type="submit">Add contact</Button>
      </StyledForm>
    </Formik>
  );
};
