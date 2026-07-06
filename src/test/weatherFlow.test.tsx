import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import * as api from "../services/openWeatherService";
import {renderWithProviders} from "./render";

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

    renderWithProviders(<App />);

    fireEvent.change(screen.getByPlaceholderText("Enter city..."), {
      target: { value: "London" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("London")).toBeInTheDocument();
    expect(await screen.findByText("20°C")).toBeInTheDocument();
    expect(await screen.findByText("clear sky")).toBeInTheDocument();
  });

  it("displays an error message when the weather request fails", async () => {
    vi.mocked(api.getCurrentWeather).mockRejectedValue(new Error("City not found"));

    renderWithProviders(<App />);

    fireEvent.change(screen.getByPlaceholderText("Enter city..."), {
      target: { value: "FakeCity" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("City not found")).toBeInTheDocument();
    expect(screen.queryByText("FakeCity")).not.toBeInTheDocument();
  });
});
