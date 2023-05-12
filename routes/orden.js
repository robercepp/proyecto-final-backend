//modulos requeridos
const express = require("express");
const router = express.Router();
const {auth} = require ('../utils/authModules.js')

//controlador requerido
const order = require('../controllers/orden.js')

//rutas de las ordenes de productos
router.get("/", auth, order.listAll);

router.get("/:email", auth, order.listByMail);

router.post("/", auth, order.saveOrder);

module.exports = router