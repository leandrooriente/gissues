# GISSUES

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d7ce97e-fe7a-4ab8-9ba7-b35634bf5a5d/deploy-status)](https://app.netlify.com/sites/gissues/deploys)
![test workflow](https://github.com/leandrooriente/gissues/actions/workflows/tests.yml/badge.svg)

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
