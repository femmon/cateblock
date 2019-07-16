# CatBlock Documentation

## NPM Dependencies:

### Dependencies:

#### Frontend:
* normalize.css
* react, react-dom:
  * styled-components

#### Backend:
* express:
  * express-session:
    * connect-redis
  * helmet
* mysql

### Dev-Dependencies:
* cross-env
* eslint:
  * eslint-config-react-app:
    * @typescript-eslint/eslint-plugin
    * @typescript-eslint/parser
    * babel-eslint
    * eslint-plugin-flowtype
    * eslint-plugin-import
    * eslint-plugin-jsx-a11y
    * eslint-plugin-react
    * eslint-plugin-react-hooks
* dotenv
* nodemon
* npm-run-all
* webpack, webpack-cli, webpack-dev-server:
  * babel-loader:
    * @babel/core
    * @babel/preset-env
    * @babel/preset-react
    * babel-plugin-styled-components
  * clean-webpack-plugin
  * css-loader, style-loader
  * file-loader
  * html-loader:
    * html-webpack-plugin

## Other Dependencies:
* Bash environment
* Heroku-cli - version 7.26.2
* (Optional) Ngrok - version 2.3.30:
  * Tunnel for fast testing on mobile
  * Run with `./ngrok http -host-header="localhost:8080" 8080`
