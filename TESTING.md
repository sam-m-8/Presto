# COMPONENT TESTING
Tested 7 fundamental components of the webpage to establish their robustness under various conditions, as these components made up some of the main interactions users would have with the webpage.

### Registration
+ Created a mock token for a mock context since receiving a token is part of the registration process.
+ Tested that a user can successfully register by rendering the form, and filling out the fields with valid values.
+ This aims to test the registration checks such as password matching and backend errors
**Success case**
+ Checked success by verifying that the mock setToken value used the mockToken value, and that local storage stored the mock token.
+ Edge case: passwords do not match
+ Checked that if a user entered a confirming password that didn’t match the password field, the error modal containing the text “Passwords do not match” appears on the screen.
**Edge case: backend error**
+ Checked that any errors thrown by the backend is caught by the frontend by checking that the error modal contains the error thrown by the backend.

### Login
+ Similar to register – created a mock token and mock setToken.
**Success case**
+ Tested that a user is able to login given valid login details by verifying that the mocked setToken function was called with the correct mock token value and that local storage was set to the mock token.
**Edge case: invalid login**
+ Checked that any errors thrown by the backend (in this case invalid login details) would result in the error modal coming onto screen with the relevant error message.

### Create Presentation
+ Tested the create presentation form by passing in values to its fields and submitting the form.
+ A successful presentation creation is verified by checking that the updatedPresentations object (which is the result of the mockSetPresentation call) has values that match the values inputted in the create presentation form fields.
+ This aims to test that the setPresentations functionality accurately sets the presentations object with the correct values

### Delete Presentation
+ Used a stub presentation id to render the delete presentation modal.
+ This aims to verify the functionality of the confirm button and delete logic, as well as the behaviour of clicking the cancel button
**Success case**
+ Has a stub presentations object with one presentation.
+ Checks that the presentation was successfully deleted by checking that the mock setPresentations was called and that the stub presentation is not in the presentations object.
**Edge case: cancel button clicked**
+ Verifies that upon clicking cancel in the delete presentation modal, the presentation is still there and that the modal is closed.
+ Checks that the mock setPresentations was not called and closeModal was called.

### Add Text Component
+ Checks that the Slide Text Modal properly handles adding text to a slide.
+ This aims to check that components can be added onto the correct presentation’s slide, and that the form constraints work when not all required fields are filled in.
**Success case**
+ If the user fills in the modal’s form fields correctly and clicks confirm, the test verifies that the slide contains the newly added component.
+ Checks that the presentation object with the relevant slide has components that match the values passed in the form fields.
**Edge case: unfilled fields**
+ Checks that the required fields are filled in the firm by verifying that a validation message appears on the form with the issue.
+ Checks that the form has not been submitted by checking that setPresentations was not called and that closeModal was also not called.

### Context Menu
+ Renders a mock context menu to verify opening and closing functionality on click.
+ Aims to check the interactable container component by specifically testing the context menu feature.
**Success case: opening the menu**
+ Checks that on right click, the context menu appears on the screen by verifying that elements in the context menu, such as the delete and duplicate buttons are present on screen.
**Success case: closing the menu**
+ Checks that the context menu closes on click of the document body 
+ Verifies this through checking that the elements in the context menu are not in the document.

### Back Button 
+ Verifies that upon clicking the back button, the user is navigated back to the dashboard.
+ This aims to test the navigation and routing functionality.
+ It creates a mock dashboard path and simulates a click of the back button, then checks that the mock navigate function has been called with our mocked dashboard path.


# COMPONENT TESTING

### Happy Path
+ Tests whether a user can successfully register
+ creates a new presentation with all three fields, title, thumbnail and description as this will be one of the most commonly traversed features
+ Updates the thumbnail and title, checking whether the title in the header also changes and then going back to the dashboard to see if the thumbnail is present on the slide card
+ Add slide cards, testing whether multiple can be added in succession, a key feature of the application is slides so its important adding more is functional
+ Switch between slides using the provided arrow keys, testing whether they are correctly disabled at the start and end of the slide deck
+ Test successfully deleting a presentation, and confirmation modal when the delete button is pressed
+ Logs user out from the dashboard and checks whether they are correctly returned to the landing page
+ Logs back in to check whether the data store is correctly implemented and log in is one of the most common features once users have registered

### Testing Slide Components
+ Tests registering a user correctly takes them to dashboard
+ Attempts to make presentation as before but instead only provides title, leaving thumbnail and description blank. This is to ensure that users who simply want to create presentations and do not mind whether they have a thumbnail or description or not can still successfully use the platform
+ Checks whether the new presentation card on the dashboard has the correct title but does not have an image or description
+ When user clicks on presentation checks correctly takes them to the edit url
+ Tests adding a new text component, correctly opening the modal
+ Once the modal is open, tests typing in valid inputs for all the given fields, also leaving height field as default to check default values work as some users may rely on the resizing feature once they have created a component rather than the number input when creating an element
+ Tests using the dropdown for font family
+ Once the form is submitted, it tests whether the new component correctly appears on the page
+ checks the position of the element to ensure it starts in the top left corner
+ also checks valid css properties to ensure that the form details correctly map over to the new component
+ Attempts to make a new image component, using the create image button and modal as images are one of the most common features used for presentations so its important to check that the platform correctly fetches them
+ Once submitted the slide card is checked to see if the image exists
+ Testing interaction with components is also very important as otherwise users will not be able to interact with their elements so this is the next step in the path that was tested
+ testing selecting the image element to see if can be correctly selected
+ Then tests whether the mousedown mousemove and mouseup all correctly move the image across the slide into a new position
+ Adds a new slide to the presentation and then moves to it using the arrow key instead of the button unlike the first test as its important to ensure the website correctly follows the same procedure for different valid inputs
+ Attempts to delete the slide to check whether users can validly delete slides and that they are correctly returned to the previous slide in the deck
+ Attempts to open the presentation preview mode, checking whether a new page is called to open with the correct url
+ Finally tests logging a user out from the edit screen instead of the dashboard as this will likely be a more common area where users log out from.
