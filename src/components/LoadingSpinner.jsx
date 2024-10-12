import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
