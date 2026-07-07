import { useQuery } from "@tanstack/react-query";
import { getWeatherForecast } from "../services/openWeatherService";

export function useForecast(city: string) {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => getWeatherForecast(city),
    enabled: !!city,
    retry: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
