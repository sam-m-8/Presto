import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DeletePresentationModal from "../components/DeletePresentationModal";
import { Context } from "../context";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Delete Presentation Tests", () => {
  const renderWithContext = (isModalOpen, id, contextValue, closeModal) => {
    return render(
      <MemoryRouter initialEntries={["/presentation"]}>
        <Context.Provider value={contextValue}>
          <Routes>
            <Route
              path="/presentation"
              element={
                <DeletePresentationModal
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  id={id}
                />
              }
            />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );
  };

  it("deletes a presentation successfully", async () => {
    const mockSetPresentations = vi.fn();
    const mockCloseModal = vi.fn();

    const contextValue = {
      getters: {
        presentations: {
          "test-id": { id: "test-id", title: "Test Presentation" },
        },
        token: "test-token",
      },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(true, "test-id", contextValue, mockCloseModal);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    });

    expect(mockSetPresentations).toHaveBeenCalledOnce();
    expect(mockSetPresentations.mock.calls[0][0]).not.toHaveProperty("test-id");
  });
  
  it("closes the delete modal and does not delete the presentation", async () => {
    const mockSetPresentations = vi.fn();
    const mockCloseModal = vi.fn();

    const contextValue = {
      getters: {
        presentations: {
          "test-id": { id: "test-id", title: "Test Presentation" },
        },
        token: "test-token",
      },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(true, "test-id", contextValue, mockCloseModal);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    });

    expect(mockCloseModal).toHaveBeenCalled();
  });
});