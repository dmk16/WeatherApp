import type { Weather } from "../../models/Weather";
import "./WeatherCard.css";

type WeatherCardProps = {
  weather: Weather;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const description = weather.description.charAt(0).toUpperCase() +
  weather.description.slice(1);
  
  return (
    <section className="weather-banner">
      <div className="weather-main">
        <div className="weather-info">
          <div className="city">{weather.city}</div>

          <div className="temperature">
            {Math.round(weather.temperature)}°C
          </div>

          <p className="description">
            {description}
          </p>
        </div>

        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span>💨</span>
          <div>
            <p>Wind</p>
            <strong>{Math.round(weather.windSpeed)} m/s</strong>
          </div>
        </div>

        <div className="detail-item">
          <span>💧</span>
          <div>
            <p>Humidity</p>
            <strong>{Math.round(weather.humidity)}%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}