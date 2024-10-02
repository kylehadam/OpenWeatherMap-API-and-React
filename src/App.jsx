import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, TextField, Button, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, CssBaseline, Box, CircularProgress } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [forecastType, setForecastType] = useState('hour');
  const [currentDay, setCurrentDay] = useState(0); // For day-view navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For storing error messages

  const apiKey = '5dfb2baeef00b3c207835a8aa17b75d6';

  useEffect(() => {
    if (forecastType === 'day-view') {
      setCurrentDay(0); // Reset to Day 0 when switching to day view
    }
    if (city) {
      handleSearch();
    }
  }, [forecastType]);

  useEffect(() => {
    if (forecastType === 'day-view' && city) {
      handleSearch();
    }
  }, [currentDay]);

  const handleSearch = async () => {
    if (city) {
      setLoading(true); // Show loading spinner
      setError(null); // Clear previous errors
      try {
        const units = 'metric'; // Default to Celsius
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city},ca&appid=${apiKey}&units=${units}`;
        const response = await axios.get(endpoint);
        const forecast = response.data.list;

        if (forecastType === 'hour') {
          const next12Hours = forecast.slice(0, 4); // 3-hour intervals (next 12 hours)
          setForecastData(next12Hours);

        } else if (forecastType === 'day') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5); // 5-day forecast
          setForecastData(daily);

        } else if (forecastType === '14day') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5);
          const fourteenDay = [...daily, ...daily, ...daily.slice(0, 4)];
          setForecastData(fourteenDay);

        } else if (forecastType === 'day-view') {
          const daily = forecast.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 5);
          setForecastData([daily[currentDay]]); // Only show the selected day
        }
        setLoading(false); // Remove loading spinner after successful search
      } catch (err) {
        setLoading(false); // Remove loading spinner
        setError('Unable to fetch weather data. Please check the city name and try again.');
        console.error(err); // Log the error to the console
      }
    }
  };

  const handleNextDay = () => {
    if (currentDay < 4) {
      setCurrentDay(currentDay + 1);
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 0) {
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
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Typography variant="body1" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

        </Box>

        {forecastData.length > 0 && !loading && !error && (
          <Box className="forecast-grid" sx={{ width: '100%', marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
              {forecastType === 'hour'
                ? 'Hourly Forecast (Next 12 Hours)'
                : forecastType === 'day'
                ? '5-Day Forecast'
                : forecastType === '14day'
                ? 'Simulated 14-Day Forecast'
                : 'Weather Forecast'}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {forecastData.map((forecast, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {forecastType === 'hour'
                          ? new Date(forecast.dt_txt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : new Date(forecast.dt_txt).toLocaleDateString([], {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })}
                      </Typography>
                      <Typography variant="body1">
                        Temperature: {Math.round(forecast.main.temp)}°C  {/* Temperature displayed in Celsius */}
                      </Typography>
                      <Typography variant="body1">
                        Wind: {forecast.wind.speed} m/s  {/* Wind speed in m/s */}
                      </Typography>
                      <Typography variant="body2">
                        {forecast.weather[0].description}
                      </Typography>
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                        style={{ width: '50px' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {forecastType === 'day-view' && (
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
