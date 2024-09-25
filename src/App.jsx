import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '5dfb2baeef00b3c207835a8aa17b75d6';

  const handleSearch = async () => {
    if (city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData({
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
        });
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      
      {weatherData && (
        <div>
          <h2>{weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Description: {weatherData.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
