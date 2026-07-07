import type { Forecast as ForecastModel } from "../../models/Forecast";
import { useState } from "react";
import "./Forecast.css";

interface ForecastProps {
  forecast: ForecastModel;
}

export default function Forecast({ forecast }: ForecastProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const currentDay = forecast.days[selectedDay];

  return (
    <div className="forecast">
      <h2>5-day forecast</h2>

      <div className="forecast-days">
        {forecast.days.map((day, index) => (
          <button
            className={
              selectedDay === index ? "forecast-day active" : "forecast-day"
            }
            key={day.date}
            onClick={() => setSelectedDay(index)}
            aria-pressed={selectedDay == index}
          >
            {new Date(day.date).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </button>
        ))}
      </div>

      <div className="hourly-forecast">
        {currentDay.entries.map((entry) => (
          <div className="hourly-entry" key={entry.time}>
            <p className="forecast-time">
              {new Date(entry.time * 1000).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              }).toUpperCase()}
            </p>
            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
              alt={entry.description}
            />
            <div className="forecast-temperature">{Math.round(entry.temperature)}°C</div>
            <div className="forecast-detail">
              <span>💨</span>
              <span>{Math.round(entry.windSpeed)} m/s</span>
            </div>

            <div className="forecast-detail">
              <span>💧</span>
              <span>{Math.round(entry.humidity)}%</span>
            </div>

            <div className="forecast-detail">
              <span>🌧️</span>
              <span>{Math.round(entry.chanceOfRain)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
