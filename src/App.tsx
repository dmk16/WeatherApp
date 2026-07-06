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
  const { data: forecast, isLoading: forecastLoading, error: forecastError } = useForecast(city);

  console.log("Forecast data:", forecast);
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather App</h1>

        <SearchBar onSearch={setCity} hasError={!!error} />
      </header>

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
    </div>
  );
}

export default App;
