import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../services/openWeatherService";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    enabled: !!city,
    retry: false,
  });
}
