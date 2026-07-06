import { describe, expect, it } from "vitest";
import { groupForecastByDay } from "./groupForecastByDay";
import type { ForecastEntry } from "../models/Forecast";

describe("groupForecastByDay", () => {
  it("groups forecast entries by day", () => {
    const entries: ForecastEntry[] = [
      {
        time: 1751875200,
        temperature: 20,
        windSpeed: 4,
        humidity: 60,
        icon: "01d",
        chanceOfRain: 0,
        description: "clear sky",
      },
      {
        time: 1751886000,
        temperature: 22,
        windSpeed: 5,
        humidity: 58,
        icon: "02d",
        chanceOfRain: 10,
        description: "few clouds",
      },
      {
        time: 1751961600,
        temperature: 18,
        windSpeed: 6,
        humidity: 70,
        icon: "03d",
        chanceOfRain: 40,
        description: "cloudy",
      },
    ];

    const result = groupForecastByDay(entries);

    expect(result).toHaveLength(2);
    expect(result[0].entries).toHaveLength(2);
    expect(result[1].entries).toHaveLength(1);
  });
});