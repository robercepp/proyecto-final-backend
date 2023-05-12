const logger = require("./logger");
const {
  leerCanales,
  enviarMensaje,
  leerCanal,
} = require("../controllers/chat.js");

//"connection" se ejecuta la primera vez que se abre una nueva conexion
module.exports = (io) => {
  io.on("connection", async (socket) => {
    logger.info("Nuevo cliente conectado");

    //canales
    //Envio de los mensajes al cliente que se conecto
    socket.emit("canales", await leerCanales());
    
    //escucho los mensajes enviados por el cliente
    socket.on("join-room", (roomName, cb) => {
      socket.rooms.forEach(room => {
        if(room !== socket.id){
          socket.leave(room)
        }
      });
      socket.join(roomName);
    });
    socket.on("single-channel", async (email) => {
      socket.emit('channel', await leerCanal(email))
    })
    socket.emit("start", "canal")
    socket.on("new-message", async (mensaje) => {
      await enviarMensaje(mensaje);
      io.to(mensaje.destino).emit('recibir-mensajes', await leerCanal(mensaje.destino))
      socket.emit("canales", await leerCanales());
    });
    socket.on('change-room', async (room) => {
      socket.emit('switch-room', await leerCanal(room))
    })
    socket.on('disconnect', () => {
      logger.info("usuario desconectado")
    })
  });
};
