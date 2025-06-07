import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractableContainer from "../components/InteractableContainer";
import { Context } from "../context";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Context Menu Tests", () => {
  const renderWithContext = (contextValue, componentProps) => {
    return render(
      <MemoryRouter initialEntries={["/presentation/1/1"]}>
        <Context.Provider value={contextValue}>
          <Routes>
            <Route
              path="/presentation/:id/:slideNum"
              element={<InteractableContainer {...componentProps} />}
            />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );
  };

  it("opens context menu on right-click", () => {
    const mockSetPresentations = vi.fn();
    const contextValue = {
      getters: {
        presentations: {
          "1": {
            slides: [
              {
                components: {
                  "0": {
                    left: 10,
                    top: 10,
                    width: 50,
                    height: 50,
                  },
                },
              },
            ],
          },
        },
      },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(contextValue, {
      children: <div>Child Component</div>,
      width: 50,
      height: 50,
      left: 10,
      top: 10,
      parentRef: { current: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) } },
      componentIndex: "0",
    });

    // Right-click on the container to open the context menu
    fireEvent.contextMenu(screen.getByText(/Child Component/i));

    // Check if the context menu is displayed
    expect(screen.getByText(/duplicate/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });

  it("closes context menu on clicking outside", () => {
    const mockSetPresentations = vi.fn();
    const contextValue = {
      getters: {
        presentations: {
          "1": {
            slides: [
              {
                components: {
                  "0": {
                    left: 10,
                    top: 10,
                    width: 50,
                    height: 50,
                  },
                },
              },
            ],
          },
        },
      },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(contextValue, {
      children: <div>Child Component</div>,
      width: 50,
      height: 50,
      left: 10,
      top: 10,
      parentRef: { current: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }) } },
      componentIndex: "0",
    });

    // Right-click on the container to open the context menu
    fireEvent.contextMenu(screen.getByText(/Child Component/i));

    // Check if the context menu is displayed
    expect(screen.getByText(/duplicate/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();

    fireEvent.click(document.body);

    // Verify the context menu is no longer visible
    expect(screen.queryByText(/duplicate/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
  });
});