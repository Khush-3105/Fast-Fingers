// import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import "@testing-library/jest-dom";
import Home from "../src/components/Home";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

describe("Home Component", () => {
  test('Clicking "Start Game" button without entering a name shows an alert', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Mock the alert function
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Click the "Start Game" button
    fireEvent.click(screen.getByText(/start game/i));

    // Expect an alert to be called with the specified message
    expect(window.alert).toHaveBeenCalledWith("Please enter your name.");

    jest.restoreAllMocks();
  });

  test('Clicking "Start Game" button with a name navigates to the /game route', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Mock useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockImplementation(
      () => mockNavigate
    );

    // Enter a name
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: "Khush" },
    });

    // Click the "Start Game" button
    fireEvent.click(screen.getByText(/start game/i));

    // Expect the navigate function to be called with the correct route and state
    expect(mockNavigate).toHaveBeenCalledWith("/game", {
      state: { name: "Khush", diff: "1" },
    });
    jest.clearAllMocks();
  });
});

