const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(express.json());

configureRoutes(server);

module.exports = {
  server,
};
