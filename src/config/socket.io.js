const { Server } = require('socket.io');
const { ALLOWED_ORIGIN } = require('./cors.config');

let io = null;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: ALLOWED_ORIGIN,
      credentials: true,
    },
  });

  return io;
}

function getIO() {
  if (!io) throw new Error('Socket.IO no inicializado. Llama a init(server) primero.');
  return io;
}

module.exports = { init, getIO };