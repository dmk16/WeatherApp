import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentWeather } from "./openWeatherService";

describe("getWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.clearAllMocks();
  });

  it("returns mapped weather data", async () => {
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "London",
        main: { temp: 20, humidity: 50 },
        wind: { speed: 10 },
        weather: [{ description: "clear sky", icon: "01d" }],
      }),
    } as Response);

    const result = await getCurrentWeather("London");

    expect(result).toEqual({
      city: "London",
      temperature: 20,
      windSpeed: 10,
      humidity: 50,
      description: "clear sky",
      icon: "01d",
    });
  });

  it("throws 'City not found' on 404 response", async () => {
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(getCurrentWeather("FakeCity")).rejects.toThrow(
      "City not found",
    );
  });

  it("throws 'Unable to fetch weather data' on non-404 error", async () => {
    const mockFetch = vi.mocked(fetch);

    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(getCurrentWeather("London")).rejects.toThrow(
      "Unable to fetch weather data",
    );
  });
});
