import http from 'http';
import mongoose from 'mongoose';
import app from './api';
import config from './config';
import { normalizePort } from './utils/server';

const { MONGO_URI, PORT } = config;

mongoose.connect(MONGO_URI, {
  server: { socketOptions: { keepAlive: 1 } },
  useNewUrlParser: true,
});

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${MONGO_URI}`);
});

const dbConnection = mongoose.connection;

dbConnection.once('open', () => {
  const port = normalizePort(PORT);
  app.set('port', port);
  const server = http.createServer(app);
  server.listen(port);

  const onError = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  };

  server.on('error', onError);
  server.on('listening', onListening);
});
