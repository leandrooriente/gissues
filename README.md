# GISSUES

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d7ce97e-fe7a-4ab8-9ba7-b35634bf5a5d/deploy-status)](https://app.netlify.com/sites/gissues/deploys)
![test workflow](https://github.com/leandrooriente/gissues/actions/workflows/tests.yml/badge.svg)
![e2e workflow](https://github.com/leandrooriente/gissues/actions/workflows/e2e.yml/badge.svg)

[https://gissues.netlify.app/](https://gissues.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

This website uses Github APIs. The default rate limit for API requests is quite low. You can increase it by using a [Github API key](https://github.com/settings/tokens).

Eg:
`REACT_APP_GH_KEY="ghp_secr3tK3y" yarn start`

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Runs Eslint and checks for code issues.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

Pushing anything to `main` will automatically trigger the CI on `Netlify` that publishes this website to [https://gissues.netlify.app/](https://gissues.netlify.app/)

## Technologies

### CSS

Most of the heavy work is being done by this wonderful framework called [NES.css](https://nostalgic-css.github.io/NES.css/).

It's not specifically made for React, so you have to include its global classes on your React Elements.

I have no intention of adding anything else that would expose CSS selectors, so I decided to also write regular CSS for this project instead of using some CSS-in-JS library or CSS Modules.

### State Management

I could have written this project using React Context and the Reducer Hook. The application state is quite simple and I have no intention on adding all the Github functionalities into it.

I decided to use Redux and Redux Toolkit because it's been a while since I used Redux for the last time and the new Redux Toolkit reduced a lot of the required boilerplate.

In terms of boilerplate, it became closer to Mobx State Tree which is interesting since its core logic is still understandable and easy to follow.

### Tests

I like to have 2 to 3 layers of testing besides using TypeScript and linters.

Unit test for the state management logic, helper functions, and any Component that holds some complex logic on it.

Integration tests with `Jest` and `React Testing Library`. My approach is to mock API requests, and the browser history by using `MemoryRouter` from `React Router`. Everything else must work as it would on a browser.

This allows me to test it simulating user interactions and real user journeys using `React Testing Library`.

There are several benefits of doing that using `jsdom` compared to regular `E2E`.

- Your tests will run much faster since you don't have to load a whole browser.
- You can test pretty much all the possible scenarios. Some of those scenarios are quite hard to test in a real environment due to API restrictions or hard to reproduce user journeys.
- If implemented correctly you shouldn't have any flakiness on your tests.

E2E tests are still important though, and I like to test all critical paths in a real browser using real APIs.
