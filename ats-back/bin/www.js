#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app.js";
import Debug from "debug";
import http from "http";

const debug = Debug('crm:server');
/**
 * Get port from environment and store in Express.
 */

const portHttps = normalizePort(process.env.PORT || '443');

const port = normalizePort(process.env.PORT || '4000');

// const port = normalizePort(process.env.PORT || '80');
// const port = normalizePort(process.env.PORT || '4000');

/**
 * Create HTTP server.
 */

// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/crm.ats.am/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/crm.ats.am/fullchain.pem'),
// };
// const server = http.createServer(app);
// const serverHttps = https.createServer(options,app);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// serverHttps.listen(portHttps);
server.on('error', onError);
// serverHttps.on('error', onError);
server.on('listening', onListening);
// serverHttps.on('listening', onListening);




/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  console.log(error)
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log(server.address())
  const addr = server.address();
  // const addrHttps = serverHttps.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
  // const bindHttps = typeof addrHttps === 'string'
  //     ? 'pipe ' + addrHttps
  //     : 'port ' + addrHttps.port;
  // debug('Listening on ' + bindHttps);
  // console.log(bindHttps)

}

