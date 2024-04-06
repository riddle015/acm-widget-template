# Widget Template for acm-widgets

This is a template to build a widget for the [ACM Widgets](https://github.com/me-julian/acm-widgets) challenge conducted at [Austin Code Mentorship](https://www.meetup.com/austin-code-mentorship/).

It's intended as a simple coding exercise for two or more people to work on together and finish in a short period of time.

## Widget Ideas

Here are some ideas for what you could build:

-   Automatically pair attendees for mentorship or generally following up after ACM that month
-   Mini-profiles for attendees
-   Carousel/slider of other meetups/events
-   Form to add attendees to the database
-   Countdown to next ACM meet
-   Generate a QR Code that leads somewhere useful like the Meetup or Slack pages.
-   Build an animated/interactive logo for ACM, maybe even using Three.js
-   Use Speech-To-Text to automatically catalog attendees and their interests from their introduction

## Prerequisites

-   Git
-   Node.js/NPM
-   [An NPM Account](#publishing-to-npm) (Optional)

## Getting Started

### Overview

You are given a ~500x400px box on the page in which you can build your widget.

This project is built so all widgets can be built independently, published to NPM, and imported into the main repo/site with minimal changes.

This is all handled by the project setup for you, but pay attention to the instructions for where and what changes you should make when building your widget.

> Also be mindful of what you check into source control and publish to NPM. Don't share or hardcode personal information, tokens, or any other sensitive data.

A basic [Prettier](https://prettier.io/) auto-formatting config is provided (`/.prettierrc`). Enabling format on save is recommended. It may be best not to use it unless everyone working on your widget does.

### Instructions

1. Clone this template repository.

Click the green "Use this template" button in the top-right of the repo's Github page and create your own repo.

If you have any collaborators, decide who will clone the repo, then make sure you go to your repo's Settings > Collaborators > Add people and invite them so they can make changes.

2. If you want your widget to be imported into the main site for demonstration, follow the instructions in [Publishing to NPM](#publishing-to-npm).

3. Run `npm install`

4. Run `npm run dev:backend` and `npm run dev:frontend` in separate terminals to start the dev servers.

5. Open `localhost:5173` to view the site.

6. Edit files in `/frontend/src/widget` to work on the frontend, add API route handlers in `/backend/router.js` and set up your database tables in `/backend/db.js`.

More details [below](#tech-stack-details).

## Important Project Structure

Files/directories wrapped in \*\* \*\* are safe to edit.

```bash
├── backend
│ ├── api.js
│ ├── **db.js** # Initialize your database tables and seed data here
│ ├── **router.js** # All of your API endpoints go here
├── frontend
│ ├── src
│ ├───── **widget** # All of your frontend code goes here
│ │ │ ├── Widget.jsx
│ │ │ ├── widget.css
│ │ ├── App.jsx
│ │ ├── App.css
│ │ ├── main.jsx
│ ├── index.html
├── .prettierrc # Auto-formatting, recommended if everyone uses it.
├── config.js # Shared frontend & backend config
├── index.js # Exports your code when publishing on NPM
├── package.json
└── vite.config.js
```

## Tech Stack Details

### Frontend

-   [ReactJS](https://react.dev/)
-   [Vite](https://vitejs.dev/)

The frontend is written using vanilla ReactJS using Vite. There is a copy of the site for testing, but you will build your widget in the `/frontend/src/widget` folder. A basic example component is provided.

Contain all your changes to the frontend to the widget component (or subcomponents you create) and any CSS you apply within it.

When making calls to the backend, use the `apiUrl` prop passed to your Widget as the base of your url. Example:

```js
const response = await fetch(`${apiUrl}/attendees/1`, options);
```

The init.js script will ensure your routes don't conflict with anyone else's.

#### Styling

The project uses standard CSS. The provided styling is written using the [Block Element Modifier](https://getbem.com/) method, but this method is specifically made to be modular so you should be able to add styles however you like without much worry.

Please keep your widget contained within its grid container.

### Backend

-   [Express.js](https://expressjs.com/)
-   [SQLite3](https://www.sqlite.org/docs.html)

The backend is comprised of an Express.js REST API server and an in-memory SQLite database.

Don't make any changes to `api.js`.

#### REST API

Add all of your API endpoint handlers in `router.js`. Feel free to use any endpoint urls, your router will be separate from everyone else's. A couple example POST endpoints are already provided.

#### Database

Every widget will get a unique in-memory SQLite3 database in `db.js`. Some examples are provided but you can find the Node API docs [here](https://github.com/TryGhost/node-sqlite3/wiki)

## Publishing to NPM

Publishing to NPM will allow us to show all of the widgets together on the same page, even during development! It should only take a few simple steps.

1. Create/log in to your [NPM account](https://www.npmjs.com/)

> **Only do this on a trusted machine.** This will authenticate your local NPM installation to act as this user.

Run `npm adduser`, which should prompt you to log in/sign up via your browser.

2. Have Julian invite your account to the @acm-widgets organization

Let me know your account's username or email. The invite will arrive in the email you signed up with.

3. Initialize your package

In the root of the project, run `node init.js` and pick a unique, all lowercase, alphabetic widget name. This will automatically replace the name throughout the project and prepare the package for publishing.

4. Publish the package

Run `npm publish --access public`, and your local code will be published to NPM! Now the package can be imported into the main repo.

5. Update your package

If you want to re-publish/update your package, run `npm version major` to increment your version number and then re-run `npm publish --access public`.

Using 'major' suggests breaking backwards compatability, which is the safest option.

Note that you need to sync your git repository with origin in order to update.
