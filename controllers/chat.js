const ChatRepository = require("../repository/ChatRepository.js");
const chat = new ChatRepository();

async function leerCanales() {
  const resultado = await chat.getAllChannels();
  return resultado;
}

async function leerCanal(mail) {
  const resultado = await chat.getChannelByMail(mail);
  return resultado;
}

async function enviarMensaje(mensaje) {
  const resultado = await chat.sendMessage(mensaje);
  return resultado;
}

module.exports = { leerCanales, leerCanal, enviarMensaje };
