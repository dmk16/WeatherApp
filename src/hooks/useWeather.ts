import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../services/openWeatherService";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getCurrentWeather(city),
    enabled: !!city,
    retry: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
