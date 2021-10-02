import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const LoadingButtonComp = ({ customStyle = {}, loading, startIcon, type ='button', children }) => {
  return (
    <LoadingButton
      loadingPosition='start'
      loading={loading}
      startIcon={startIcon}
      variant='outlined'
      type={type}
      sx={customStyle}
    >
      {children}
    </LoadingButton>
  );
};

export default LoadingButtonComp;
