const socket = io.connect();

const channelSelect = document.getElementById("channel-select");
const chatWindow = document.getElementById("chat-window");
const chatImput = document.getElementById("chat-imput");
const sendChatButton = document.getElementById("send-chat");
const channelSelectorTitle = document.getElementById("channel-select-title");

let setCanalEmail;

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
socket.on("canales", (canales) => {
  setCanalEmail = usuarioActivo.usuario;
  canalesActivos = canales
    .map(
      (usuario) => `
    <div id=${usuario.email} class="open-channel">
    <div class="channel-owner">canal de: <br> ${usuario.nombre} </div>
    <div class="channel-mail">${usuario.email}</div>
    <div class="channel-type">tipo: ${usuario.tipo}</div>
    </div>
    `
    )
    .join("");
  channelSelect.innerHTML = canalesActivos;

  const channelButtons = document.querySelectorAll(".open-channel");
  channelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCanalEmail = button.id;
      const channelSelected = `canal de ${button.id} seleccionado`;
      channelSelectorTitle.innerHTML = channelSelected;
      socket.emit("join-room", button.id);
      socket.emit("change-room", button.id);
    });
  });
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

socket.on("switch-room", (mensaje) => {
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
