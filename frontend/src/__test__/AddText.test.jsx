import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SlideTextModal from "../components/SlideTextModal";
import { Context } from "../context";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Add Text to Slide Tests", () => {
  const renderWithContext = (isModalOpen, status, contextValue, closeModal) => {
    return render(
      <MemoryRouter initialEntries={["/presentation/1/1"]}>
        <Context.Provider value={contextValue}>
          <Routes>
            <Route
              path="/presentation/:id/:slideNum"
              element={
                <SlideTextModal
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  status={status}
                />
              }
            />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );
  };

  it("successfully adds text to the current slide", async () => {
    const mockSetPresentations = vi.fn();
    const mockCloseModal = vi.fn();

    const contextValue = {
      getters: {
        presentations: {
          "1": {
            slides: [
              { components: {} }
            ],
          },
        },
      },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(true, "create", contextValue, mockCloseModal);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: "New Slide Text" } });
      fireEvent.change(screen.getByLabelText(/Width/i), { target: { value: 50 } });
      fireEvent.change(screen.getByLabelText(/Height/i), { target: { value: 30 } });
      fireEvent.change(screen.getByLabelText(/Font Size/i), { target: { value: 2 } });
      fireEvent.change(screen.getByLabelText(/Font Colour/i), { target: { value: "#FF5733" } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));
    });

    expect(mockSetPresentations).toHaveBeenCalled();
    const updatedPresentation = mockSetPresentations.mock.calls[0][0]["1"];
    const slide = updatedPresentation.slides[0];
    const componentKey = Object.keys(slide.components)[0];
    
    expect(slide.components[componentKey]).toMatchObject({
      type: "text",
      width: "50",
      height: "30",
      content: "New Slide Text",
      fontSize: "2",
      fontFamily: "Arial, sans-serif",
      fontColour: "#FF5733",
    });
  });
  
  it("shows an error and does not submit if required fields are missing", () => {
    const mockSetPresentations = vi.fn();
    const mockCloseModal = vi.fn();
    const contextValue = {
      getters: {
        presentations: {
          "123": {
            slides: [
              {
                components: {},
              },
            ],
          },
        },
      },
      setters: {
        setPresentations: mockSetPresentations,
      },
    };

    renderWithContext(true, "create", contextValue, mockCloseModal);

    // Leave the "Content" field empty
    fireEvent.change(screen.getByLabelText(/Width/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/Height/i), { target: { value: "30" } });
    fireEvent.change(screen.getByLabelText(/Font Size/i), { target: { value: "2" } });

    // Attempt to submit the form
    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    // Ensure setPresentations and closeModal are not called
    expect(mockSetPresentations).not.toHaveBeenCalled();
    expect(mockCloseModal).not.toHaveBeenCalled();

    // Verify that the "Content" field shows a validation message
    expect(screen.getByLabelText(/Content/i).validationMessage).toBe("Constraints not satisfied");
  });
});