import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { Context } from "../context";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { vi, describe, afterEach, it } from "vitest";

vi.mock("axios");
const mockSetToken = vi.fn();

const renderWithContext = (ui) => {
  const contextValue = {
    setters: {
      setToken: mockSetToken,
    },
  };
  return render(
    <BrowserRouter>
      <Context.Provider value={contextValue}>
        {ui}
      </Context.Provider>
    </BrowserRouter>
  );
};

describe("Login Form Tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("logins user successfully", async () => {
    const mockToken = "testToken";
    axios.post.mockResolvedValueOnce({ data: { token: mockToken } });

    renderWithContext(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "isabel@mail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "meow" } });

    fireEvent.click(screen.getByRole("button", { name: /Log in/i }));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith(mockToken);
      expect(localStorage.getItem("token")).toBe(mockToken);
    });
  });

  it("shows error modal on server error", async () => {
    const errorMessage = "Incorrect login details";
    axios.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    renderWithContext(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: "isabel@mail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByRole("button", { name: /Log in/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
