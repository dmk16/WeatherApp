import { use, useState } from "react";
import SearchBar from "./components/SearchBar";
import { getMockWeather } from "./services/mockWeatherService";
import { getWeather } from "./services/openWeatherService";
import type { Weather } from "./models/Weather";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  
  const handleSearch = async (city: string) => {
    setWeather(null);
    setLoading(true);
    setError(null);
    
    console.log("SEARCH START");

    try{
      console.log("BEFORE API CALL");
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      console.log(weatherData);

    }
    catch(err) {
      setError("Unable to load data.");
    }
    finally{
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Weather App</h1>

      <SearchBar onSearch={handleSearch}/>
      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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