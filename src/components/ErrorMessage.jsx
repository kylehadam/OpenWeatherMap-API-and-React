import React from 'react';
import { Typography } from '@mui/material';

const ErrorMessage = ({ error }) => (
  <Typography variant="body1" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
    {error}
  </Typography>
);

export default ErrorMessage;
