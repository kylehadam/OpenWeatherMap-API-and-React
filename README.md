# OpenWeatherMap React App

This is a weather forecasting app built with React and Vite, using the OpenWeatherMap API to provide current and forecasted weather information.

## Features

- **Search Weather by City**: Enter a city name to fetch weather data.
- **Hourly Forecast**: View weather in 3-hour intervals for the next 12 hours.
- **5-Day Forecast**: Get a 5-day weather forecast.
- **14-Day Forecast (Simulated)**: Simulated forecast for 14 days based on the 5-day forecast.
- **Day View Navigation**: View weather for a specific day with "Next" and "Previous" buttons to navigate through days.
- **Responsive Design**: Clean, responsive UI using Material UI for a modern look.
- **Dynamic Weather Information**: Displays temperature, wind speed, weather description, and an icon for each forecast period.

## Tools & Libraries

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Material UI**: Component library for a clean and responsive UI.
- **Axios**: HTTP client for making API requests.
- **PropTypes**: For type-checking React props.
- **React Router**: For navigating between different views in the app.

### Backend/API:
- **OpenWeatherMap API**: Used to fetch weather forecast data for any city.

### Linting:
- **ESLint**: Linter for identifying and fixing problems in JavaScript code.

### Testing (Optional):
- **Jest**: For frontend testing.
- **Mocha + Chai**: For backend testing (if any server-side logic is added).

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kylehadam/OpenWeatherMap-API-and-React.git
   cd OpenWeatherMap-React-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up OpenWeatherMap API key:**
   - Create a `.env` file and add your OpenWeatherMap API key:
     ```
     REACT_APP_OPENWEATHER_API_KEY=your_api_key
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Usage

1. Enter a city name in the input field (e.g., "Vancouver, CA").
2. Select the forecast type: **Hourly**, **5-Day**, **14-Day**, or **Day View**.
3. Click **Search** to view the weather data.
4. In **Day View**, use the "Next" and "Previous" buttons to navigate through specific days.

## API

This project uses the OpenWeatherMap API to fetch weather data. You need to sign up for an API key at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and configure it in your project.

## Project Structure

```
src/
│
├── App.jsx               # Main component with weather search and display logic
├── index.css             # Global styles
├── components/           # Reusable components (e.g., ForecastCard)
└── services/             # API request logic (if needed to be extracted)
```

## License

This project is licensed under the MIT License.
