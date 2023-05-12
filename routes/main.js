//modulos requeridos
const express = require("express");
const router = express.Router();
const passport = require("passport");
const main = require("../controllers/main.js");
const { auth, notAuth } = require("../utils/authModules.js");

//rutas que no forman parte de las apis de usuarios, productos o carritos
router.get("/", notAuth, main.loginGet);
router.get("/productos", auth, main.main); //en las rúbricas se solicita "/productos", pero yo le hubiera puesto "/index"
router.get("/productos/:id", auth, main.item);
router.post(
  "/login",
  notAuth,
  passport.authenticate("local", {
    successRedirect: "/productos",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/info", main.info);

router.get("/register", notAuth, main.registerGet);

router.post("/purchase", auth, (req, res) => {
  main.notifyPurchase(req.body);
});
router.get("/exit", (req, res) => {
  req.logout();
  return res.redirect("/");
});
router.get("/logout", auth, (req, res) => {
  res.render("logout.hbs", {
    nombre: req.user.nombre,
    titulo: "cierre de sesión",
  });
});

//rutas del canal de chat
router.get("/chat", auth, main.chat);
router.get("/chat/:email", main.chatPersonal);

//ruta para visualizar las órdenes(para frontend)
router.get('/orden', auth, main.ordenes)

//ruta para visualizar la configuración del servidor (frontend)
router.get('/server', auth, main.server)

module.exports = router;
