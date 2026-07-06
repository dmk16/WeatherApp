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
      <h2>5 Day Forecast</h2>

      <div className="forecast-days">
        {forecast.days.map((day, index) => (
          <button
            className={
              selectedDay === index ? "forecast-day active" : "forecast-day"
            }
            key={day.date}
            onClick={() => setSelectedDay(index)}
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
            <p className="time">
              {new Date(entry.time * 1000).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              })}
            </p>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
              alt={entry.description}
            />
            <p className="temperature">{Math.round(entry.temperature)}°C</p>
            <div className="detail">
              <span>💨</span>
              <span>{Math.round(entry.windSpeed)} m/s</span>
            </div>

            <div className="detail">
              <span>💧</span>
              <span>{entry.humidity}%</span>
            </div>

            <div className="detail">
              <span>🌧️</span>
              <span>{Math.round(entry.chanceOfRain)}%</span>
            </div>
            {/* <p className="description">{entry.description.charAt(0).toUpperCase() + entry.description.slice(1)}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
