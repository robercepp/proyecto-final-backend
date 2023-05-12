const {carritoFactory} = require('../repository/CarritosFactory.js')
const{errorChecker} = require ('../utils/errorChecker.js')

//carrito
async function listAll(req, res) {
  const resultado = await carritoFactory.listAll();
  errorChecker(req, res, resultado)
}

async function listById(req, res) {
  const resultado = await carritoFactory.listById(req.params.id);
  errorChecker(req, res, resultado)
}

async function createCart(req, res) {
  const resultado = await carritoFactory.createCart(req.body);
  errorChecker(req, res, resultado)
}

async function addProduct(req, res) {
  const resultado = await carritoFactory.updateCart(req.body);
  errorChecker(req, res, resultado)
}

async function deleteCart(req, res) {
  const resultado = await carritoFactory.removeCart(req.params.id);
  errorChecker(req, res, resultado)
}

async function removeProductById(req, res) {
  const resultado = await carritoFactory.removeProduct(
    req.params.id,
    req.params.id_prod
  );
  errorChecker(req, res, resultado)
}

module.exports = {
  listAll,
  listById,
  createCart,
  addProduct,
  deleteCart,
  removeProductById,
};
