import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import DayNavigation from './DayNavigation';

const ForecastDisplay = ({ forecastData, forecastType, currentDay, setCurrentDay }) => {
  return (
    <>
      {forecastData.length > 0 && (
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
                      Temperature: {Math.round(forecast.main.temp)}°C
                    </Typography>
                    <Typography variant="body1">
                      Wind: {forecast.wind.speed} m/s
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
            <DayNavigation currentDay={currentDay} setCurrentDay={setCurrentDay} />
          )}
        </Box>
      )}
    </>
  );
};

export default ForecastDisplay;
