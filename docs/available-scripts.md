# Available Scripts

## npm scripts

**[npm run heroku-postbuild](#npm-run-heroku-postbuild)**<br>
**[npm run lint](#npm-run-lint)**<br>
**[npm run local](#npm-run-local)**<br>
**[npm run local-build](#npm-run-local-build)**<br>
**[npm run local-env](#npm-run-local-env)**<br>
**[npm run local-hot-backend](#npm-run-local-hot-backend)**<br>
**[npm run local-hot-frontend](#npm-run-local-hot-frontend)**<br>
**[npm start](#npm-start)**<br>

### `npm run heroku-postbuild`
Heroku hook to compile the front end.

### `npm run lint`
Run linter.<br>
Need to be run manually before commit.

### `npm run local`
Chain `npm local-env`, `npm local-hot-backend`, `npm local-hot-frontend`. Serve client file from http://localhost:8080. Server automatically reloads on modification.<br>
Server-side only works partially. Webpack-dev-server serves compiled front end from memory, and will proxy API request to backend. Hence, we can't test backend routing.

### `npm run local-build`
Build the app for production to `/client/dist` folder.

### `npm run local-env`
Load database credential into `.env`.

### `npm run local-hot-backend`
Server is run at http://localhost:3000. Automatically rerun on modification.

### `npm run local-hot-frontend`
Serve client file from http://localhost:8080. Automatically recompile and reload browser on modification.

### `npm start`
This script assumes to be fed database credentials as environment variables before running.<br>
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

## Others

### `ngrok http -host-header="localhost:8080" 8080`
(As of Ngrok version 2.3.30.) Tunnel traffic from outside to port 8080. This can be used with `npm run local` for fast testing on mobile.
