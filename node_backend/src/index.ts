
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { gitRouter } from "./routes/git.router"
import * as swaggerDocument from "./swagger.json"

dotenv.config();


if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  Configuration
 */

// enable all CORS requests
app.use(cors());

// parse incoming requests with JSON, body object containing the parsed data
app.use(express.json());

/**
 * app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
    req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});
 */

/**
 * Primary app routes.
 */
/**
 * @swagger
 * /get/:string:
 *   get:
 *     description: Returns all 
 *     responses:
 *       '200':
 *         description: An array of 
 */
app.use("/repository", gitRouter);

// api documentation endpoint ************
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/*var options = {
  swaggerDefinition: {
    info: {
      title: "Swagger Documentation", 
      description: "APIs for the backend",
      version: "1.0.0", 
      consumes: ["application/json"],
      produces: ["application/json"],
      schema: ["http", "https"],
      host: "localhost:3001",
      basePath: "/",
    },
  },
  apis: ["index.ts" ,"./routes/*.js"], // Path to the API docs
};

//const swaggerDocument = swagger(options);*/

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// +++++++++++++++++++++


// start server

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("  Press CTRL-C to stop\n");
});

server.on('error', onError);
server.on('listening', onListening);


/**
 * Webpack
 */

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


/**
* Event listener for HTTP server "error" event.
*/

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}