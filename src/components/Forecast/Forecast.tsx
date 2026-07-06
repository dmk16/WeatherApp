import type { Forecast as ForecastModel } from "../../models/Forecast";
import { useState } from "react";

interface ForecastProps {
  forecast: ForecastModel;
}


export default function Forecast({ forecast }: ForecastProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const currentDay = forecast.days[selectedDay];
  
  return (
    <div>
      <h2>5 Day Forecast</h2>

      {forecast.days.map((day, index) => (
        <button key={day.date} onClick={() => setSelectedDay(index)}>
          {new Date(day.date).toLocaleDateString("en-UK", { weekday: "short", day: "numeric", month: "short" })}
        </button>
      ))}

      {currentDay.entries.map((entry) => (
        <div key={entry.time}>
          <p>Time: {new Date(entry.time * 1000).toLocaleTimeString([], { hour : "numeric" })}</p>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
            alt={entry.description}
          />
          <p>Temperature: {entry.temperature}°C</p>
          <p>Wind Speed: {entry.windSpeed} m/s</p>
          <p>Humidity: {entry.humidity}%</p>
          <p>Chance of Rain: {Math.round(entry.chanceOfRain)}%</p>
          <p>Description: {entry.description}</p>
        </div>
      ))}

    </div>
  );
}