export const validateRequired = (value) => {
  return Boolean(value) ? undefined : 'Required';
};

export const validateEmail = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = regex.test(String(value).toLowerCase());
  return valid ? undefined : 'Invalid Email';
};

export const runValidations = (value, validationArray) => {
  for (let validation of validationArray) {
    const errorMessage = validation(value);
    if (errorMessage) return errorMessage;
  }
};
