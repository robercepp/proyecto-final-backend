const {productosFactory} = require('../repository/ProductosFactory.js')
const {errorChecker} = require('../utils/errorChecker.js')
//productos
async function listAll(req, res) {
    const resultado = await productosFactory.listAll();
    errorChecker(req, res, resultado)
};

async function listById(req, res) {
    let { id } = req.params;
    const resultado = await productosFactory.listById(id);
    errorChecker(req, res, resultado)
};

async function listByMongoId(req, res) {
    let {id} = req.params;
    const resultado = await productosFactory.listByMongoId(id);
    errorChecker(req, res, resultado)
}

async function listByCategory(req, res) {
    let {categoria} = req.params;
    const resultado = await productosFactory.listByCategory(categoria)
    errorChecker(req, res, resultado)
}

async function enumerateCategories(req, res) {
const resultado = await productosFactory.Categories()
errorChecker(req, res, resultado)
}

async function createProduct(req, res) {
    const resultado = await productosFactory.save(req.body);
    errorChecker(req, res, resultado)
};

async function modifyProduct(req, res) {
    const resultado = await productosFactory.update(req.body, req.params.id);
    errorChecker(req, res, resultado)
};

async function deleteProduct(req, res) {
    const resultado = await productosFactory.delete(req.params.id);
    errorChecker(req, res, resultado)
}

module.exports = { listAll, listById, listByMongoId, listByCategory, enumerateCategories, createProduct, modifyProduct, deleteProduct }