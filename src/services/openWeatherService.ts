import type { Forecast, ForecastEntry } from "../models/Forecast";
import type { Weather } from "../models/Weather";
import { groupForecastByDay } from "../utils/groupForecastByDay";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log("API KEY:", API_KEY);

export async function getCurrentWeather(city: string): Promise<Weather> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the city name and try again.");
    }

    if (response.status >= 500) {
      throw new Error ("Weather service is currently unavailable. Please try again later.");
    } 

    throw new Error("Unable to fetch weather data");
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function getWeatherForecast(city: string): Promise<Forecast> {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found");
    }
    throw new Error("Unable to fetch forecast data");
  }
  const data = await response.json();

  const entries: ForecastEntry[] = data.list.map((item: any) => ({
    time: item.dt,
    temperature: item.main.temp,
    windSpeed: item.wind.speed,
    humidity: item.main.humidity,
    icon: item.weather[0].icon,
    chanceOfRain: item.pop * 100,
    description: item.weather[0].description,
  }));

  const days = groupForecastByDay(entries);

  return {
    city: data.city.name,
    days,
  };
}
