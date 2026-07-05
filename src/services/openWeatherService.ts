import type { Weather } from "../models/Weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log("API KEY:", API_KEY);

export async function getWeather(city: string): Promise<Weather> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    description: data.weather[0].description,
  };
}