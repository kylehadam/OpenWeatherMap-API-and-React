import React from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchForm = ({ city, setCity, forecastType, setForecastType, handleSearch }) => {
  return (
    <Grid container spacing={2} justifyContent="center" className="form-container">
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Enter city name"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="forecast-type-label">Forecast Type</InputLabel>
          <Select
            labelId="forecast-type-label"
            value={forecastType}
            onChange={(e) => setForecastType(e.target.value)}
            label="Forecast Type"
          >
            <MenuItem value="hour">12-Hour Forecast (3-hour increments)</MenuItem>
            <MenuItem value="day">5-Day Forecast</MenuItem>
            <MenuItem value="14day">14-Day Forecast</MenuItem>
            <MenuItem value="day-view">Day View</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
