import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Forecast from "./Forecast";

const mockForecast = {
  city: "London",
  days: [
    {
      date: "2026-07-06",
      entries: [
        {
          time: 1783328400, // 09:00
          temperature: 20,
          windSpeed: 5,
          humidity: 60,
          icon: "01d",
          chanceOfRain: 10,
          description: "clear sky",
        },
      ],
    },
    {
      date: "2026-07-07",
      entries: [
        {
          time: 1783414800, // 09:00 next day
          temperature: 24,
          windSpeed: 7,
          humidity: 50,
          icon: "02d",
          chanceOfRain: 40,
          description: "few clouds",
        },
      ],
    },
  ],
};


describe("Forecast", () => {
  it("renders the forecast heading and day buttons", () => {
    render(<Forecast forecast={mockForecast} />);

    expect(
      screen.getByRole("heading", { name: /5-day forecast/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Mon/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Tue/i })).toBeInTheDocument();
  });
});

it("shows the first day's forecast by default", () => {
  render(<Forecast forecast={mockForecast} />);

  expect(screen.getByText("20°C")).toBeInTheDocument();
});

it("changes the forecast when another day is selected", async () => {
  const user = userEvent.setup();

  render(<Forecast forecast={mockForecast} />);

  await user.click(
    screen.getByRole("button", { name: /Tue/i })
  );

  expect(screen.getByText("24°C")).toBeInTheDocument();
});