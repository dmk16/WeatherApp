import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("calls onSearch with input value when submitted", () => {
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByPlaceholderText("Enter city..."), {
      target: { value: "London" },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(mockOnSearch).toHaveBeenCalledWith("London");
  });

  it("does not call onSearch when input is empty", () => {
    const mockOnSearch = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.click(screen.getByText("Search"));

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
