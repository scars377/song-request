const IO = require('socket.io');

let io;

module.exports = {
  listen(server) {
    io = IO(server);
  },
  emit(msg, ...args) {
    if (!io) return;
    io.emit(msg, ...args);
  },
};
