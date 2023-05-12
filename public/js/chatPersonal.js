const socket = io.connect();

const chatWindow = document.getElementById("chat-window");
const chatImput = document.getElementById("chat-imput");
const sendChatButton = document.getElementById("send-chat");
const setCanalEmail = usuarioActivo.usuario;

function setUserType(type) {
  if (type === "true") {
    return "sistema";
  } else {
    return "usuario";
  }
}

function functionImputs() {
  if (chatImput.value === "") {
    sendChatButton.setAttribute("disabled", sendChatButton);
  } else {
    sendChatButton.removeAttribute("disabled");
  }
}

chatImput.addEventListener("keyup", () => {
  chatImput.setAttribute("value", chatImput.value);
  functionImputs();
});

sendChatButton.addEventListener("click", () => {
  const mensaje = {
    destino: setCanalEmail,
    nombre: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`,
    email: usuarioActivo.usuario,
    tipo: setUserType(usuarioActivo.tipo),
    mensaje: chatImput.value,
  };
  socket.emit("new-message", mensaje);
  chatImput.value = "";
  functionImputs();
});

//Escucho los mensajes enviados por el servidor
socket.on("start", (mensaje) => {
  socket.emit("join-room", usuarioActivo.usuario);
  socket.emit("single-channel", usuarioActivo.usuario);
});

socket.on("channel", (mensaje) => {
  const dialogos = mensaje
    .map(
      (mensaje) => `
          <div class=mensaje-container-${mensaje.tipo}>
          <div class=mail-${mensaje.tipo}>${mensaje.email} escribe:</div>
          <div class=mensaje-${mensaje.tipo}>${mensaje.mensaje}</div>
          <div class=hora-${mensaje.tipo}> enviado el: ${mensaje.fechayhora}</div>
          </div>
          `
    )
    .join("");
  chatWindow.innerHTML = dialogos;
});
socket.on("recibir-mensajes", (mensaje) => {
  const dialogos = mensaje
    .map(
      (mensaje) => `
          <div class=mensaje-container-${mensaje.tipo}>
          <div class=mail-${mensaje.tipo}>${mensaje.email} escribe:</div>
          <div class=mensaje-${mensaje.tipo}>${mensaje.mensaje}</div>
          <div class=hora-${mensaje.tipo}> enviado el: ${mensaje.fechayhora}</div>
          </div>
          `
    )
    .join("");
  chatWindow.innerHTML = dialogos;
});
