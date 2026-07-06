export interface ForecastEntry {
  time: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  chanceOfRain: number;
  description: string; 
}

export interface ForecastDay {
    date: string;
    entries: ForecastEntry[];
}

export interface Forecast {
  city: string;
  days: ForecastDay[];
}