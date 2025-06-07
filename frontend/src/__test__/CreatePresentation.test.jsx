import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdatePresentationInfoModal from "../components/UpdatePresentationInfoModal";
import { Context } from "../context";

describe("UpdatePresentationInfoModal", () => {
  const renderWithContext = (isModalOpen, type, contextValue, closeModal) => {
    return render(
      <Context.Provider value={contextValue}>
        <UpdatePresentationInfoModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalTitle="Create New Presentation"
          type={type}
        />
      </Context.Provider>
    );
  };

  it("creates a new presentation successfully", async () => {
    const mockSetPresentations = vi.fn();
    const mockCloseModal = vi.fn();
    const contextValue = {
      getters: { presentations: {} },
      setters: { setPresentations: mockSetPresentations },
    };

    renderWithContext(true, "create", contextValue, mockCloseModal);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Presentation" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "This is a test description." } });
    fireEvent.change(screen.getByLabelText(/Thumbnail URL/i), { target: { value: "https://example.com/image.jpg" } });

    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    expect(mockSetPresentations).toHaveBeenCalledOnce();
    const updatedPresentations = mockSetPresentations.mock.calls[0][0];
    const newId = Object.keys(updatedPresentations)[0];

    expect(updatedPresentations[newId]).toMatchObject({
      title: "Test Presentation",
      description: "This is a test description.",
      thumbnail: "https://example.com/image.jpg",
      transition: "none",
      slides: [
        {
          background: "#ffffff",
          components: [],
        },
      ],
      archive: {},
    });

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
