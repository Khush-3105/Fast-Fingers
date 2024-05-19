import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import Game from "../src/components/game/Game";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

describe("Home Page", () => {
  test("All Home page components loaded", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /fast fingers/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test('Clicking "Start Game" button without entering a name shows an alert', () => {
    render(<App />);
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Click the "Start Game" button
    fireEvent.click(screen.getByText(/start game/i));

    // Expect an alert to be called with the specified message
    expect(window.alert).toHaveBeenCalledWith("Please enter your name.");
  });

  test('Clicking "Start Game" button with a name navigates to the /game route', () => {
    render(<App />);

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
  });
});

describe("Game Page", () => {
  test("Game page loading corretctly", () => {
    render(
      <MemoryRouter
        initialEntries={["/game", { state: { name: "Khush", diff: "1" } }]}
      >
        <Game />
      </MemoryRouter>
    );
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /user/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /score/i })).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /score board/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /play again/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /quit game/i })
    ).toBeInTheDocument();
  });

  test("handles user input correctly", () => {
    render(
      <MemoryRouter
        initialEntries={["/game", { state: { name: "Khush", diff: "1" } }]}
      >
        <Game />
      </MemoryRouter>
    );

    // Simulate user typing 'hello' into the input field
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });

    // Assert that the input value is updated
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
      "hello"
    );
  });
  test('handles "Quit Game" button click', () => {
    const mockNavigate = jest.fn();

    // Set up the mock to return the mockNavigate function
    require("react-router-dom").useNavigate.mockImplementation(
      () => mockNavigate
    );

    render(
      <MemoryRouter
        initialEntries={["/game", { state: { name: "Khush", diff: "1" } }]}
      >
        <Game />
      </MemoryRouter>
    );

    // Simulate a user click on the "Quit Game" button
    fireEvent.click(screen.getByText("Quit Game"));

    // Assert that the navigate function is called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
