import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/RegisterForm";
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

describe("Register Form Tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("registers user successfully", async () => {
    const mockToken = "testToken";
    axios.post.mockResolvedValueOnce({ data: { token: mockToken } });

    renderWithContext(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith(mockToken);
      expect(localStorage.getItem("token")).toBe(mockToken);
    });
  });

  it("shows error modal if passwords do not match", async () => {
    renderWithContext(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "password456" } });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  it("shows error modal on server error", async () => {
    const errorMessage = "Server error";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    renderWithContext(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
