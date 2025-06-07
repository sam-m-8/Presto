# Presto

## Overview
Presto is a presentation editor and presentor application that allows for users to create, edit and present
slides. Users can add components like text, images, videos and code blocks to slides. They can then, drag
these elements around, resize them and edit them. There are numerous features available such as version history,
slide order rearranging, and slide transitions.

This project just uses a simple backend, as the frontend design of the application was the focus.

## How to use the application
To start the backend:

1. Change your current working directory to the backend directory.
2. Run ```npm install```
3. Run ```nvm use```
4. Run ```npm start```

To start the frontend:

1. In a seperate terminal, navigate to the frontend directory.
2. Run ```npm install```
3. Run ```npm run dev```

## Features

### Login & presentation Creation

Users are initially taken to a landing page that allows them to either login or register.
This feature includes a landing screen, a login screen and a register screen. When the user successfully logs in or
registers, they are taken to the dashboard. When logged in, a button is always visible for a user to click that will
log them out of the application.


### Creating Presentations

- When logged in, users are presented with a dashboard that contains a button, only visible on the dashboard, for creating a new presentation.
- When this button is pressed, a popup modal appears, where a user can enter the `name`, `description` and add thumbnail of a new presentation
- This popup contains a "Create" button for user to click and create a presentation. The popup disappears after user clicked "Create" button, a new presentation is created and appears on the dashboard. It is a default presentation containing a single empty slide.
- Each presentation made by this user is listed on the dashboard and can be clicked on to take the user to the editor page for this presentation.

### Presentation Controls
- Users can click left and right arrow buttons, or use the arrow keys to navigate between slides.
- Users can click a plus button to create a new blank slide
- Users can click a 'delete presentation' button to delete the presentation.
- Users can click a button to delete the slide they are currently viewing

### Title & Thumbnail editing
- When viewing a particular presentation, the title of the presentation is visible at all times above the slideshow deck regardless of which slide users are on.
- Next to the title there is an icon button that users can click to bring up a modal to edit the title of the presentation and the presentation thumbnail.

### Slide Components
- Users are able to add text, images, videos and code to slides.
- All elements added to slides are resizeable by clicking and dragging the element
- All elements on slides are resizeable by clicking and dragging the corners of the element block.
- Text blocks have the ability to change font colour, change font type and change text content.
- Videos can be set to auto-play when in presentation mode
- Double clicking an element will bring up a modal that allows a user to edit the contents and options of the component they clicked on.
- Elements can be right clicked to bring up a context menu that allows for the component to be duplicated or deleted.

### Extra Features
#### Background picker
- Users can change the background of all slides or specific slides
- Slide backgrounds can be set as a solid colour, a colour gradient, or an image.

#### Preview viewing
- Each slideshow deck has a button that users can click to preview the presentation
- Previewing the presentation simply opens another tab in your browser where:
  - The slideshow deck is visible to the full size of the screen in your browser
  - The arrow controls and slide numbers are still visible and functional, clicking on the arrows displays the previous/next slide accordingly.
  - Each blocks border is removed.

#### Slide Re-arranging
- Users are able to rearrange the order of slides
- The slide re-arrange screen displays every slide as a rectangle, where each slide has a number inside it to indicate the index of the slide among all slides.
- Users can click and drag a particular slide and drop it between another two slides to re-arrange it.

#### Revision History
- Users can click a button that brings up the version history page.
- This shows a list of moments in history such that users can "restore", which restores all slides in the deck to a previous state.
- These previous state moments are captured on every modification of the slideshow deck that occurs with a minimum of 1 minute between saves.
