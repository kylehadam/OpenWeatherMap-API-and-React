import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = () => {
    // Placeholder for the API call
    console.log(`Fetching weather for ${city}`);
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

