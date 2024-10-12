import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, CssBaseline, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import './App.css';
import ForecastDisplay from './components/ForecastDisplay';
import DayNavigation from './components/DayNavigation';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [forecastType, setForecastType] = useState('hour');
  const [currentDay, setCurrentDay] = useState(0); // For day-view navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For storing error messages

  const apiKey = '5dfb2baeef00b3c207835a8aa17b75d6';

  // Debug logs to trace the re-renders and state changes
  useEffect(() => {
    console.log('Rendering App Component');
  });

  useEffect(() => {
    if (forecastType === 'day-view') {
      setCurrentDay(0); // Reset to Day 0 when switching to day view
      console.log('Forecast Type changed to Day View, resetting currentDay to 0');
    }
    if (city) {
      handleSearch();
    }
  }, [forecastType]);

  useEffect(() => {
    if (forecastType === 'day-view' && city) {
      console.log(`Current Day changed to ${currentDay}, fetching new forecast`);
      handleSearch();
    }
  }, [currentDay]);

  const handleSearch = async () => {
    if (city) {
      setLoading(true); // Show loading spinner
      setError(null); // Clear previous errors
      console.log(`Fetching weather data for city: ${city}, Forecast Type: ${forecastType}`);
      try {
        const units = 'metric'; // Default to Celsius
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city},ca&appid=${apiKey}&units=${units}`;
        const response = await axios.get(endpoint);
        const forecast = response.data.list;

        if (forecastType === 'hour') {
          const next12Hours = forecast.slice(0, 4); // 3-hour intervals (next 12 hours)
          setForecastData(next12Hours);
          console.log('Setting forecast data for next 12 hours');

        } else if (forecastType === 'day') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5); // 5-day forecast
          setForecastData(daily);
          console.log('Setting forecast data for 5-day forecast');

        } else if (forecastType === '14day') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5);
          const fourteenDay = [...daily, ...daily, ...daily.slice(0, 4)];
          setForecastData(fourteenDay);
          console.log('Setting forecast data for 14-day simulated forecast');

        } else if (forecastType === 'day-view') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5);
          setForecastData([daily[currentDay]]); // Only show the selected day
          console.log(`Setting forecast data for day view: Day ${currentDay}`);
        }
        setLoading(false); // Remove loading spinner after successful search
      } catch (err) {
        setLoading(false); // Remove loading spinner
        setError('Unable to fetch weather data. Please check the city name and try again.');
        console.error('Error fetching weather data:', err); // Log the error to the console
      }
    }
  };

  const handleNextDay = () => {
    if (currentDay < 4) {
      console.log('Next Day button clicked, incrementing currentDay');
      setCurrentDay(currentDay + 1);
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 0) {
      console.log('Previous Day button clicked, decrementing currentDay');
      setCurrentDay(currentDay - 1);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className="full-width">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="main-container full-width">
        <Box className="inner-content">
          <Typography variant="h4" gutterBottom>
            Check Your Weather
          </Typography>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            Enter the city name (e.g., &quot;Vancouver, CA&quot;) to get the weather forecast.
          </Typography>

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

          {/* Loading Spinner */}
          {loading && <LoadingSpinner />}

          {/* Error Message */}
          {error && <ErrorMessage error={error} />}

        </Box>

        {/* Forecast Data */}
        {forecastData.length > 0 && !loading && !error && (
          <Box className="forecast-grid" sx={{ width: '100%', marginTop: 4 }}>
            <ForecastDisplay forecastData={forecastData} forecastType={forecastType} />

            {/* Ensure DayNavigation renders only once */}
            {forecastType === 'day-view' && (
              <Box className="navigation-container">
                <DayNavigation
                  currentDay={currentDay}
                  handleNextDay={handleNextDay}
                  handlePreviousDay={handlePreviousDay}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Box className="footer full-width">
        <Typography variant="body1">Weather App © {new Date().getFullYear()}</Typography>
      </Box>
    </>
  );
};

export default App;
