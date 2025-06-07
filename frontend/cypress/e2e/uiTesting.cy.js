
window.describe("user happy path", () => {
  window.it("should test the successful path of basic user actions", () => {
    const userEmail = `${Date.now()}@email.com`;
    // Attempts to visit landing page
    window.cy.visit("localhost:3000/");
    window.cy.url().should("include", "localhost:3000/");

    //======================== Registering a user ===========================
    // Attempts to click on register button
    window.cy.contains("button", "Register")
      .click();

    // User should be taken to register page
    window.cy.url().should("include", "/register");

    // Writes new user's name into input field
    window.cy.get("#register-name")
      .focus()
      .type("Betty");


    // Writes new user's email into input field
    window.cy.get("#register-email")
      .focus()
      .type(userEmail);

    // Writes new user's password into input field
    window.cy.get("#register-password")
      .focus()
      .type("cardigan");

    // Writes same password as previous password input into password confirm input
    window.cy.get("#register-confirm-password")
      .focus()
      .type("cardigan");

    // Attempts to submit form, creating new user
    window.cy.contains("button", "Register")
      .click();

    window.cy.wait(4000);
    // User should be taken to dashboard page
    window.cy.url().should("include", "localhost:3000/dashboard");


    //==================== Creating a presentation ===========================
    // User attempts to create new presentation
    window.cy.contains("button", "Create").click();

    window.cy.get("#title-update")
      .focus()
      .type("New Presentation");

    window.cy.get("#description-update")
      .focus()
      .type("This is a new presentation!");

    window.cy.get("#thumbnail-update")
      .focus()
      .type("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");

    // User clicks to submit form and new presentation should be made
    window.cy.get("button[type='submit']").click();


    //==================== Edit presentation details =========================
    // Clicks on new presentation to enter presentation edit mode,
    // is taken to edit url
    window.cy.contains("h3", "New Presentation").click();
    window.cy.url().should("match", /\/presentations\/\d+\/1$/);

    // User tries to update the current presentation's title and thumbnail
    window.cy.get("img[alt='Update presentation title and description']")
      .click();

    window.cy.get("#title-update")
      .clear()
      .focus()
      .type("Updated Title");

    window.cy.get("#thumbnail-update")
      .clear()
      .focus()
      .type("https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg");

    window.cy.get("button[type='submit']").click();

    // Check title has been updated
    window.cy.get("h1").then(el => {
      window.expect(el.text()).to.contain("Updated Title");
    });

    // Return to dashboard and check whether image has been updated
    window.cy.contains("button", "Back").click();

    window.cy.get("img[src='https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg']")
      .click();

    //==================== Add new slides =========================
    // Adds three new slides to presentation
    window.cy.get("button[aria-label='Add new slide']").click();
    window.cy.get("button[aria-label='Add new slide']").click();
    window.cy.get("button[aria-label='Add new slide']").click();

    //==================== Switch between slides =========================
    // Moves forward until end of slides
    window.cy.get("button[aria-label='Move to next slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/2$/);

    window.cy.get("button[aria-label='Move to next slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/3$/);

    window.cy.get("button[aria-label='Move to next slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/4$/);

    // When at end of slides, next button should be disabled
    window.cy.get("button[aria-label='Move to next slide']").then(el => {
      window.expect(el).to.be.disabled;
    });

    window.cy.get("button[aria-label='Move to previous slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/3$/);

    window.cy.get("button[aria-label='Move to previous slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/2$/);

    window.cy.get("button[aria-label='Move to previous slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/1$/);

    // When at start of slides, previous button should be disabled
    window.cy.get("button[aria-label='Move to previous slide']").then(el => {
      window.expect(el).to.be.disabled;
    });

    //==================== Delete Presentation =========================
    window.cy.contains("button", "Delete Presentation").click();
    window.cy.get("#delete-presentation-button").click();

    // User should be taken back to dashboard and presentation should
    // not be there
    window.cy.url().should("include", "localhost:3000/dashboard");
    window.cy.get("img[alt='Thumbnail']").should('not.exist');

    //==================== Logout =========================
    window.cy.contains("button", "Log out").click();
    window.cy.url().should("include", "localhost:3000/");

    //==================== Log back in =========================
    window.cy.contains("button", "Log in").click();
    window.cy.url().should("include", "localhost:3000/login");

    window.cy.get("#login-email")
      .focus()
      .type(userEmail);

    window.cy.get("#login-password")
      .focus()
      .type("cardigan");

    window.cy.get("button[type='submit']").click();
    window.cy.url().should("include", "localhost:3000/dashboard");
  });
});



window.describe("slide component interaction path", () => {
  window.it("should test basic slide interactions like adding new elements", () => {
    const userEmail = `${Date.now()}@email.com`;

    // Attempts to visit landing page
    window.cy.visit("localhost:3000/");
    window.cy.url().should("include", "localhost:3000/");

    // ======================== Registering a user ===========================
    // Attempts to click on register button
    window.cy.contains("button", "Register").click();

    // User should be taken to register page
    window.cy.url().should("include", "/register");

    // Writes new user's name into input field
    window.cy.get("#register-name")
      .focus()
      .type("James");

    // Writes new user's email into input field
    window.cy.get("#register-email")
      .focus()
      .type(userEmail);

    // Writes new user's password into input field
    window.cy.get("#register-password")
      .focus()
      .type("betty");

    // Writes same password as previous password input into password confirm input
    window.cy.get("#register-confirm-password")
      .focus()
      .type("betty");

    // Attempts to submit form, creating new user
    window.cy.contains("button", "Register")
      .click();

    window.cy.wait(4000);
    // User should be taken to dashboard page
    window.cy.url().should("include", "localhost:3000/dashboard");

    // ================== Create presentation ======================
    // User attempts to create new presentation with only presentation title
    window.cy.contains("button", "Create").click();

    window.cy.get("#title-update")
      .focus()
      .type("Show and Tell");

    // User clicks to submit form and new presentation should be made
    window.cy.get("button[type='submit']").click();

    // Presentation card should not have description or thumbnail
    window.cy.get("p").should("be.empty");
    window.cy.get("img[alt='thumbnail']").should("not.exist");

    window.cy.contains("h3", "Show and Tell").click();
    window.cy.url().should("match", /\/presentations\/\d+\/1$/);

    // ================= Adding Text to slide ==================
    window.cy.get("button[aria-label='Add text element'").click();

    window.cy.get("#width-set")
      .clear()
      .focus()
      .type("50");

    // Leaves height field as default value

    window.cy.get("#font-size-set")
      .clear()
      .focus()
      .type("2");

    window.cy.get("#text-set")
      .focus()
      .type("My pet, Rocky!");

    // Uses the font dropdown to select a different font
    window.cy.get("#font-dropdown")
      .select("'Times New Roman', serif");

    // Types desired hex colour into input
    window.cy.get("#font-colour-set")
      .clear()
      .focus()
      .type("#5108da");

    // Submits form, text box should appear on current slide
    window.cy.get("button[type='submit']").click();

    // Check new element has all the correct properties
    window.cy.get("div[name='interactable-container']")
      .eq(0)
      .should("have.css", "left", "0px")
      .should("have.css", "top", "0px");

    window.cy.contains("div", "My pet, Rocky!")
      .should("exist")
      .should("have.css", "color", "rgb(81, 8, 218)")
      .should("have.css", "font-family", '"Times New Roman", serif');

    // ================= Adding Image to slide ==================
    window.cy.get("button[aria-label='Add image element'").click();

    window.cy.get("#width-set")
      .clear()
      .focus()
      .type("60");

    window.cy.get("#height-set")
      .clear()
      .focus()
      .type("55");

    const url = "https://www.partypeople.company/wp-content/uploads/2024/08/100-funny-pet-rock-names-3-1024x576.jpg";
    window.cy.get("#image-set")
      .focus()
      .type(url);

    window.cy.get("#alt-set")
      .focus()
      .type("Indiana Stones");

    window.cy.get("button[type='submit']").click();

    // Check image appears on slide
    window.cy.get(`img[src="${url}"]`)
      .should("exist");

    // ==================== Click and drag an image ======================
    // Try to select image component
    window.cy.get(`img[src="${url}"]`)
      .click();

    // Attempt to click and drag the image
    window.cy.get(`img[src="${url}"]`)
      .trigger("mousedown", {which: 1})
      .trigger("mousemove", {clientX: 600, cientY: 600})
      .trigger("mouseup", {force: true});

    // Check image is no longer at 0, 0
    window.cy.get("div[name='interactable-container']")
      .eq(1)
      .should("not.have.css", "left", "0px")
      .should("have.css", "top", "0px");

    // ==================== Visit slide with arrow key ==================
    // Create new slide and move to it (move with arrow key instead of click)
    window.cy.get("button[aria-label='Add new slide']").click();
    window.cy.get("body").trigger('keydown', { key: 'ArrowRight' });
    window.cy.url().should("match", /\/presentations\/\d+\/2$/);

    // ========================= Delete slide ============================
    window.cy.get("button[aria-label='Delete current slide']").click();
    window.cy.url().should("match", /\/presentations\/\d+\/1$/);

    // Should only be one slide so right key should be disabled
    window.cy.get("body").trigger('keydown', { key: 'ArrowRight' });
    window.cy.url().should("match", /\/presentations\/\d+\/1$/);

    // ====================  Preview current presentation =============
    window.cy.window().then((win) => {
      window.cy.stub(win, "open").as("windowOpen");
    });

    window.cy.contains("button", "Preview").click();

    // Check that the window was going to open in a new tab with the correct
    // url
    window.cy.get("@windowOpen")
      .should("have.been.calledWithMatch", /^\/presentations\/\d+\/1\/present$/);

    // ==================== Log out from edit screen ===================
    // Log out from the presentation edit screen
    window.cy.contains("button", "Log out").click();
    window.cy.url().should("include", "localhost:3000/");
  });

});