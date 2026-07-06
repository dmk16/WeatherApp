import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { useForecast } from "./hooks/useForecast";
import Forecast from "./components/Forecast/Forecast";

function App() {
  const [city, setCity] = useState<string>("");

  const { data: weather, isLoading, error } = useWeather(city);
  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast(city);

  console.log("Forecast data:", forecast);
  return (
    <div className="app">
      <div className="page">
        <header className="app-header">
          <div className="app-title-container">
            <h1 className="app-title">Weather</h1>
            <p className="app-subtitle">
              Get the current weather conditions and 5-day forecast for any
              city.
            </p>
          </div>
          <SearchBar onSearch={setCity} hasError={!!error} />
        </header>

        <main>
          <div className="content">
            {(isLoading || forecastLoading) && <Spinner />}
            {(error || forecastError) && (
              <ErrorMessage
                message={((error || forecastError) as Error).message}
              />
            )}

            {weather && <WeatherCard weather={weather} />}
            {forecast && <Forecast forecast={forecast} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
