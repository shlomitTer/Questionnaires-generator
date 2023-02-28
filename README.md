## First actions after copying the content to your repo

1. commit and push the skeleton to your repository in Dev branch
2. go into .gitignore file and add the the following :
   `.gitignore` `.prettierignore` `config-overrides.js` `extensions.txt` `install-extensions.ps1`
3. commit and push the changes again to Dev branch

## Linter

No need to run any script. Linting will run automatically on every commit, every time you stage the changes, and commit, linter will run and test the code.
If you want to run linter manually to check your code before commit, you can run `npm run lint`

## Prettier formatting

No need to use prettier extension, Formatting will run automatically when you stage and commit changes.
If you want to run formatter manually, you can run `npm run format`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder. Uses the .env.production file by default.

### `npm run build:dev`

Builds the app for production to the `build-development` folder. Uses the .env.development file by default.

### `npm run build:qa`

Builds the app for production to the `build-qa` folder. Uses the .env.qa file by default.

### `npm run build:stage`

Builds the app for production to the `build-stage` folder. Uses the .env.stage file by default.

# Important note about .ENV file variables

### `REACT_APP_BUILD_PATH`

This env variable controls the build directory name which will be created when running the `npm run build` commands

### `REACT_APP_HASH_ROUTER`

This env variable controls weather the app uses <HashRouter> or <BrowserRouter> wrapper for routing. Check `index.tsx` for the implementation.

### `PUBLIC_URL`

This env variable sets the directory from which the app will be hosted. Most often you will not need to change the default value of / . But if you do need to host the app in a sub-directory of a web server, you will use this variable to set the sub directory name, and also set the `REACT_APP_HASH_ROUTER` to true.

# How-to sources that we used in this skeleton

Injecting the store to be able to use it inside axios interceptors [Inject store into non component files](https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files).

Handle API lifecycle with React, Axios and Redux Toolkit [Api life cycles with axios + RTK](https://levelup.gitconnected.com/handle-api-lifecycle-with-react-axios-and-redux-toolkit-1212645a6a06).
