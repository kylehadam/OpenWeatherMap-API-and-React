import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const apiKey = '5dfb2baeef00b3c207835a8aa17b75d6';

  const handleSearch = async () => {
    if (city) {
      try {
        // Fetch current weather
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},ca&appid=${apiKey}&units=metric`
        );
        setWeatherData({
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
        });

        // Fetch 5-day forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},ca&appid=${apiKey}&units=metric`
        );
        const forecast = forecastResponse.data.list.filter((entry) =>
          entry.dt_txt.includes('12:00:00')
        );
        setForecastData(forecast);

      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Weather App
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter city name"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
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

      {weatherData && (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h4">{weatherData.city}</Typography>
            <Typography variant="h6">
              Temperature: {weatherData.temperature}°C
            </Typography>
            <Typography variant="body1">
              Description: {weatherData.description}
            </Typography>
          </CardContent>
        </Card>
      )}

      {forecastData.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h5" align="center" gutterBottom>
            5-Day Forecast
          </Typography>

          <Grid container spacing={2}>
            {forecastData.map((forecast, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {new Date(forecast.dt_txt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Temperature: {forecast.main.temp}°C
                    </Typography>
                    <Typography variant="body2">
                      {forecast.weather[0].description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default App;
