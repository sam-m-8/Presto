import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../components/BackButton";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Back Button Test", () => {
  it("navigates back to the specified path on click", () => {
    const mockNavigate = vi.fn();
    const path = "/test-path";

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <BackButton path={path} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith(path);
  });
});