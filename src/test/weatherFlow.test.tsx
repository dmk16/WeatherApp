import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import * as api from "../services/openWeatherService";
import { renderWithProviders } from "./render";

vi.mock("../services/openWeatherService");

describe("Weather App Integration", () => {
  it("searches for a city and displays weather data", async () => {
    vi.mocked(api.getCurrentWeather).mockResolvedValue({
      city: "London",
      temperature: 20,
      windSpeed: 10,
      humidity: 50,
      description: "clear sky",
      icon: "01d",
    });

    vi.mocked(api.getWeatherForecast).mockResolvedValue({
      city: "London",
      days: [
        {
          date: "2026-07-06",
          entries: [
            {
              time: 1783328400,
              temperature: 30,
              windSpeed: 10,
              humidity: 50,
              chanceOfRain: 10,
              icon: "01d",
              description: "clear sky",
            },
          ],
        },
        {
          date: "2026-07-07",
          entries: [
            {
              time: 1783414800,
              temperature: 25,
              windSpeed: 8,
              humidity: 40,
              chanceOfRain: 30,
              icon: "02d",
              description: "few clouds",
            },
          ],
        },
      ],
    });

    renderWithProviders(<App />);

    fireEvent.change(screen.getByPlaceholderText("Search for a city..."), {
      target: { value: "London" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("London")).toBeInTheDocument();
    expect(await screen.findByText("20°C")).toBeInTheDocument();
    expect(await screen.findByText("Clear sky")).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: /5-day forecast/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Mon/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tue/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Tue/i }));

    expect(await screen.findByText("25°C")).toBeInTheDocument();
  });

  it("displays an error message when the weather request fails", async () => {
    vi.mocked(api.getCurrentWeather).mockRejectedValue(
      new Error("City not found"),
    );

    vi.mocked(api.getWeatherForecast).mockRejectedValue(
      new Error("City not found")
    );

    renderWithProviders(<App />);

    fireEvent.change(screen.getByPlaceholderText("Search for a city..."), {
      target: { value: "FakeCity" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("City not found")).toBeInTheDocument();
    expect(screen.queryByText("FakeCity")).not.toBeInTheDocument();
  });
});
