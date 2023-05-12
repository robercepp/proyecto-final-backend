//modulos requeridos
const express = require ('express')
const router = express.Router()
const {auth, notAuth} = require ('../utils/authModules.js')
const {upload} = require('../utils/multer.js')

//controllers requeridos
const usr = require('../controllers/usuarios.js')

//rutas de usuarios
router.get("/", auth, usr.listAll);

router.get("/:id", auth, usr.listById);

router.post("/", notAuth, upload.single("avatar"), usr.createUser);

router.put("/:id", auth, usr.modifyUser);

router.delete("/:id", notAuth, usr.deleteUser);

router.post('/login', auth, usr.login)

module.exports = router;