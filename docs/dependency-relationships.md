# Dependency Relationships

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

## Database:
* MySQL (current version is 5.7)
* Redis (current version is 4.0.14)

## Other Dependencies:
* Bash environment
* Heroku-CLI (current version is 7.26.2)
* (Optional) ngrok (current version is 2.3.30)
