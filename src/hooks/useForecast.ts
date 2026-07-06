import { useQuery } from "@tanstack/react-query";
import { getWeatherForecast } from "../services/openWeatherService";

export function useForecast(city: string) {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => getWeatherForecast(city),
    enabled: !!city,
    retry: false,
  });
}
