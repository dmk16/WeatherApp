import type { ForecastDay, ForecastEntry } from "../models/Forecast";

export function groupForecastByDay(entries: ForecastEntry[]): ForecastDay[] {
  const grouped: Record<string, ForecastEntry[]> = {};

  entries.forEach((entry) => {
    const date = new Date(entry.time * 1000).toISOString().split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(entry);
  });

  return Object.entries(grouped).map(([date, entries]) => ({
    date,
    entries,
  }));
}
