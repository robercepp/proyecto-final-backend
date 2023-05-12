const express = require ('express')
const router = express.Router()
const {auth, notAuth} = require ('../utils/authModules.js')

//controllers requeridos
const cart = require('../controllers/carrito.js')

//rutas de carrito
router.get("/", auth, cart.listAll);

router.get("/:id/productos", auth, cart.listById);

router.post("/", auth, cart.createCart);

router.post("/:id/productos", auth, cart.addProduct);

router.delete("/:id", notAuth, cart.deleteCart);

router.delete("/:id/productos/:id_prod", auth, cart.removeProductById);

module.exports = router;