# Project Structure

## Entry file: `app.js`
This is where we set up routing and serves resources.

## Server: `server` folder
Server responsibilities are:
* Database: configuration, schema, and query.
* API end point.
* Session configuration.

## Client: `client` folder
The client is a React project. Everything is transpiled and bundled with Webpack in advance (opposite of on request).

Top level `component` folder is for common components that is used across the project.

`screens` is kind of like pages of traditional multi-page website.
