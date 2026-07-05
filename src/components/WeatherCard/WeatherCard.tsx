import type { Weather } from "../../models/Weather";
import "./WeatherCard.css";

type WeatherCardProps = {
  weather: Weather;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
        <h2 className="city">{weather.city}</h2>

        <div className="temperature">
            {Math.round(weather.temperature)}°C
        </div>

        <p className="description">
            {weather.description}</p>

        <div className="details">
            <div className="detail-item">
            <span>💨</span>
            <div>
                <p>Wind</p>
                <strong>{weather.windSpeed} km/h</strong>
            </div>
            </div>

            <div className="detail-item">
            <span>💧</span>
            <div>
                <p>Humidity</p>
                <strong>{weather.humidity}%</strong>
            </div>
            </div>
        </div>
    </div>
  );
}