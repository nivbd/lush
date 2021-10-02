import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCallApi } from '../customHooks/useFetch';
import { createUser } from '../services/api';
import Input from '../widgets/Input';
import {
  validateRequired,
  validateEmail,
  runValidations,
} from '../utils/validate';
import LoadingButton from '../widgets/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from 'react-router';

const FORM_FIELDS = {
  firstName: {
    name: 'firstName',
    label: 'First name',
    required: true,
    validation: [validateRequired],
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    required: true,
    validation: [validateRequired],
  },
  email: {
    name: 'email',
    label: 'Email',
    required: true,
    validation: [validateEmail],
  },
  password: {
    name: 'password',
    label: 'Password',
    required: true,
    validation: [validateRequired],
  },
  description: {
    name: 'description',
    label: 'Description',
    required: false,
  },
};

const CreateUser = () => {
  const history = useHistory();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const {
    dispatchApiCall,
    data: createdUser,
    error: createUserError,
    loading: createUserLoading,
  } = useCallApi({
    apiFunction: createUser,
  });

  useEffect(() => {
    if (createdUser?.id) {
      setTimeout(() => history.push('/users/list'), 500);
    }
  }, [history, createdUser]);

  const handleChange = (fieldName, value) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));

    validateField(fieldName, value);
  };

  const validateField = (fieldName, value) => {
    const currentValue = value ?? values[fieldName];
    const validationArray = FORM_FIELDS[fieldName].validation || [];
    const errorMessage = runValidations(currentValue, validationArray);

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchApiCall(values);
  };

  const renderInputs = () => {
    return Object.values(FORM_FIELDS).map((field) => {
      const { name, label, required } = field;
      return (
        <Input
          key={name}
          name={name}
          value={values[name] || ''}
          required={required}
          label={label}
          error={errors[name] || ''}
          handleChange={handleChange}
          handleBlur={validateField}
        />
      );
    });
  };

  const renderApiErrors = () => {
    if (!createUserError) return;

    return (
      <ApiErrorsWrapper>
        <ul>
          {createUserError.map((error) => {
            return <li key={error.errorCode}>{error.message}</li>;
          })}
        </ul>
      </ApiErrorsWrapper>
    );
  };

  return (
    <Wrapper>
      <Title>Create User</Title>
      <StyledForm onSubmit={handleSubmit}>
        {renderInputs()}
        {renderApiErrors()}
        <LoadingButton
          customStyle={{ marginTop: '30px' }}
          startIcon={<SaveIcon />}
          loading={createUserLoading}
          type='submit'
        >
          Save
        </LoadingButton>
      </StyledForm>
    </Wrapper>
  );
};

export default CreateUser;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;

const StyledForm = styled.form`
  width: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ApiErrorsWrapper = styled.div`
  background: #f8d7db;
  margin-top: 20px;
`;
