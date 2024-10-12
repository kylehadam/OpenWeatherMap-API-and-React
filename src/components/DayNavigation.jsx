import React from 'react';
import { Button, Box } from '@mui/material';

const DayNavigation = ({ currentDay, handleNextDay, handlePreviousDay }) => {
  return (
    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePreviousDay}
        disabled={currentDay === 0}
      >
        Previous Day
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleNextDay}
        disabled={currentDay === 4}
      >
        Next Day
      </Button>
    </Box>
  );
};

export default DayNavigation;
