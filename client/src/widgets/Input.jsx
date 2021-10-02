import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ name, label, error, value, required, handleChange, handleBlur }) => {
  return (
    <TextField
      label={label}
      variant='standard'
      required={required}
      value={value}
      error={Boolean(error)}
      helperText={error || ''}
      onChange={(e) => handleChange(name, e.target.value)}
      onBlur={() => handleBlur(name)}
    />
  );
};

export default Input;
