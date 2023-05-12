const express = require ('express')
const router = express.Router()
const {auth} = require ('../utils/authModules.js')

//controllers requeridos
const prod = require('../controllers/productos.js')

//ruta de produtos 
router.get("/", auth, prod.listAll);

router.get("/categoria/:categoria", auth, prod.listByCategory)

router.get("/categorias", auth, prod.enumerateCategories)

router.get("/:id", auth, prod.listById);

router.get("/mongo/:id", auth, prod.listByMongoId);

router.post("/", auth, prod.createProduct);

router.put("/:id", auth, prod.modifyProduct);

router.delete("/:id", auth, prod.deleteProduct);

module.exports = router;