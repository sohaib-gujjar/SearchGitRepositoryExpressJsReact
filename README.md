Example project to search for Github repositories using Github search api(​https://developer.github.com/v3/) using ExpressJS and ReactJS.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies, for both node and react.
Run `cd node_backend/ && npm install`,  `cd react_frontend/ && npm install`


## Available Scripts

In the fronend and backend directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Enter search term in text input box then press search.
The repositories will be displayed in table.
At the end of each row there is button to add repository to bookmark or remove if already bookmarked.

To view bookmarked repositories press `repositories` in menu.

## Application Structure

## Backend

- `app.js` - The entry point to application.
- `routes/repository.js` - This file contains the route definitions for API, contains application endpints for retrieve repositories and GET, POST, DELETE bookmarks.
- `src/entity` - This folder contains the schema definitions for database entities.
- `src/service/github_repository.service.js` provide bussiness logic to endpoints.
- `ormconfig.js` - Contains database configuration
- `tsconfig.js` - Contains typescript configuration

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [typeorm](https://github.com/typeorm/typeorm)
- [node-fetch](https://www.npmjs.com/package/node-fetch) - To call Github API
- [mysql](www.mysql.com/downloads)
- [lodash](https://lodash.com/) - Array handling
- [node-global-storage](https://www.npmjs.com/package/node-global-storage) - Node module for global scope variable managing and storing data making it accessible in multiple Javascript files.

## Frontend

- `src/App.js` - Start point of react application, implementation of `Routes`
- `pages, component` Folder contains react component