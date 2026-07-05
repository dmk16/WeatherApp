import type { Weather } from "../models/Weather";

export function getMockWeather(city: string): Promise<Weather> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% chance of failure
      if (Math.random() < 0.2) {
        reject(new Error("Failed to fetch weather data."));
        return;
      }

      resolve({
        city,
        temperature: Math.round(10 + Math.random() * 20),
        windSpeed: Math.round(Math.random() * 15),
        humidity: Math.round(40 + Math.random() * 50),
        description: "Cloudy",
        icon: "☁️",
      });
    }, 800);
  });
}
