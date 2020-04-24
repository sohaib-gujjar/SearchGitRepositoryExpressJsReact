## Search Github Repositories

Example project to search for Github repositories using Github search api [Git Api](​https://developer.github.com/v3/) using ExpressJS and ReactJS.

### Getting started

To get the Node server running locally:

- Clone this repo
- Run the following commands to install all required dependencies, for both client and server.
```sh
cd node_backend/ && npm install
cd react_frontend/ && npm install
```
- In the fronend and backend directory, you can run: `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Enter search term in text input box then press search.
The repositories will be displayed in table.
At the end of each row there is button to add repository to bookmark or remove if already bookmarked.

To view bookmarked repositories press `repositories` in menu.

## Documentation
- see the api documentation at [http://localhost:3001/api/](http://localhost:3001/api/)

## Application Structure

### Backend

```txt
node_backend /
    |---- src/			              // source files
        |---- @base                // common classes
        |---- entity                // database entities folder
        |---- service                // model classes
            |---- github_repository.service.js      // provide list of repositories (js)
            |---- git.service.ts      // model class provide bussiness logic (typescript) 
        |---- routes/			         
            |---- git.router.ts      // NodeJS endpoints in typescript 
            |---- routes.js			    // NodeJS endpoints in js
        |---- swagger.json           // swagger documentation defination
        |---- index.ts           // typescript to start server & register routes for js app
    |---- app.js		        // register routes for js app
    |---- bin/WWW.js		        // start server
    |---- package.json		        // node package configuration
    |---- tsconfig.json		        // typescript configuration file
    |---- ormconfig.js	      // mysql server configuration file
    |---- webpack.config.ts   //  decrease the time it takes to restart
```

##### Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [typeorm](https://github.com/typeorm/typeorm)
- [node-fetch](https://www.npmjs.com/package/node-fetch) - To call Github API
- [mysql](www.mysql.com/downloads)
- [lodash](https://lodash.com/) - Array handling
- [node-global-storage](https://www.npmjs.com/package/node-global-storage) - Node module for global scope variable managing and storing data making it accessible in multiple Javascript files.
- [dotenv]: module that loads environment variables from a .env file
- [ts-loader]: A TypeScript loader for webpack
- [webpack]: webpack is a module bundler. Its main purpose is to bundle JavaScript files 
- [webpack-cli]: provides a flexible set of commands
- [webpack-node-externals]: exclude Node.js modules from a webpack bundle


### Frontend

```txt
node_backend /
    |---- src/			            // source files
        |---- index.js		        // start page of react app
        |---- App.js		        // Start point of react application, implementation of `Routes`
        |---- App.scss	            // css style sheets
        |---- pages/			    // pages
            |---- 404Page.js		// display this page if route isn't define 
            |---- DefaultPage.js    // Home page
            |---- Search.js         // Search repositories
            |---- BookMarkedRepos.js    // display bookmarked repositories
        |---- components/			// small components
            |---- Header.js		    // app header and menu
            |---- TextInput.js		// text imput component
    |---- .env		                // enviroment variables
    |---- public/index.html		    // index page for react app
    |---- package.json		        // package configuration
```