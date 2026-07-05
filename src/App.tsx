import { use, useState } from "react";
import SearchBar from "./components/SearchBar";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState<string>("");

  const { data: weather, isLoading, error } = useWeather(city);

  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar onSearch={setCity} />
      {isLoading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>Error loading weather data.</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind: {weather.windSpeed} km/h</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>{weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
