const logger = require("../utils/logger.js");
require("dotenv").config();
const { enviarMail } = require("../utils/mailer.js");
const { enviarSMS } = require("../utils/enviarSMS.js");
const { serverInfo } = require("../utils/systemInfo.js");
const { userFactory } = require("../repository/UsuariosFactory.js");

async function main(req, res) {
  res.render("main.hbs", {
    titulo: "Anabella Avena - Ecommerce",
    usuario: req.user.email,
    nombre: req.user.nombre,
    apellido: req.user.apellido,
    avatar: req.user.avatar,
    domicilio: req.user.direccion,
    tipo: req.user.admin,
    id: req.user.id,
  });
}

async function item(req, res) {
  const { id } = req.params;
  res.render("item.hbs", {
    usuario: req.user.email,
    nombre: req.user.nombre,
    apellido: req.user.apellido,
    avatar: req.user.avatar,
    domicilio: req.user.direccion,
    tipo: req.user.admin,
    id: req.user.id,
    productId: id,
  });
}

async function chat(req, res) {
  const params = {
    titulo: "Anabella Avena - Ecommerce - Chat",
    user: {
      usuario: req.user.email,
      nombre: req.user.nombre,
      apellido: req.user.apellido,
      avatar: req.user.avatar,
      tipo: req.user.admin,
      id: req.user.id,
    },
  };
  res.render("chat.hbs", params);
}

async function chatPersonal(req, res) {
  const { email } = req.params;
  const userData = await userFactory.listByMail(email);
  const params = {
    titulo: "Anabella Avena - Ecommerce - Chat",
    user: {
      usuario: userData.email,
      nombre: userData.nombre,
      apellido: userData.apellido,
      tipo: userData.admin,
    },
  };
  res.render("chatPersonal.hbs", params);
}

async function info(req, res) {
  const params = {
    titulo: "Información del servidor",
    args: serverInfo().args,
    plat: serverInfo().plat,
    version: serverInfo().version,
    memoria: serverInfo().memoria,
    exe: serverInfo().exe,
    id: serverInfo().id,
    path: serverInfo().path,
    numCPUs: serverInfo().numCPUs,
  };
  res.render("info.pug", params);
}

async function loginGet(req, res) {
  return res.render("login.hbs", { titulo: "Anabella Avena - Login" });
}

async function registerGet(req, res) {
  return res.render("register.hbs", { titulo: "Anabella Avena - Registro" });
}

async function notifyPurchase(data) {
  const destino = "cirrus.eagle@gmail.com";
  enviarMail(data.asunto, data.mensaje, destino);
  enviarSMS(data.mensajeSms);
}

async function ordenes(req, res) {
  return res.render("ordenes.hbs", {
    nombre: req.user.nombre,
    apellido: req.user.apellido,
    email: req.user.email,
  });
}

async function server(req, res) {
  return res.render("serverConfig.hbs", {
    puerto: process.env.PORT,
    modo: process.env.mode,
    run: process.env.run,
    secret: process.env.SESSION_SECRET,
    mongourl: process.env.MONGOURL,
    gmailMail: process.env.GMAIL_MAIL,
    gmailPass: process.env.GMAIL_PASS,
    twillioAcctSid: process.env.TWILIO_ACCTSID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioSenderNumber: process.env.TWILIO_SENDER_NUMBER,
    twilioReceiverNumber: process.env.TWILIO_RECEIVER_NUMBER,
    emailNotificacion: process.env.EMAIL_DESTINATION,
    expiracionSesion: process.env.COOKIE_EXPIRATION_TIME,
  });
}

async function notFound(req, res) {
  return res
    .status(404)
    .render("error.ejs", { status: 404, error: "dirección no encontrada" });
}

module.exports = {
  main,
  item,
  loginGet,
  registerGet,
  notFound,
  notifyPurchase,
  info,
  chat,
  chatPersonal,
  ordenes,
  server,
};
