import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [city, setCity] = useState<string>("");

  const { data: weather, isLoading, error } = useWeather(city);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather App</h1>

        <SearchBar onSearch={setCity} hasError={!!error} />
      </header>

      <div className="content">
        {isLoading && <Spinner />}
        {error && <ErrorMessage message={(error as Error).message} />}

        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
