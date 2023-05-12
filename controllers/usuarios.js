const { userFactory } = require("../repository/UsuariosFactory.js");
const { errorChecker } = require("../utils/errorChecker.js");

//usuarios
async function listAll(req, res) {
  const resultado = await userFactory.listAll();
  errorChecker(req, res, resultado);
}

async function listById(req, res) {
  const resultado = await userFactory.listById(req.params.id);
  errorChecker(req, res, resultado);
}

async function createUser(req, res) {
  const file = req.file;
  req.body.avatar = `avatars/${file.filename}`;
  const resultado = await userFactory.save(req.body);
  errorChecker(req, res, resultado);
}

async function modifyUser(req, res) {
  const resultado = await userFactory.update(req.body, req.params.id);
  errorChecker(req, res, resultado);
}

async function deleteUser(req, res) {
  const resultado = await userFactory.delete(req.params.id);
  errorChecker(req, res, resultado);
}

function login(req, res) {
  const resultado = userFactory.setUserLogged(req.body);
  errorChecker(req, res, resultado);
}

module.exports = {
  listAll,
  listById,
  createUser,
  modifyUser,
  deleteUser,
  login,
};
