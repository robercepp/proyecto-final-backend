const {errorChecker} = require ('../utils/errorChecker.js')
const orderRepository = require ('../repository/OrdenRepository.js')
const order = new orderRepository()

//ordenes
async function listAll(req, res) {
    const resultado = await order.getAllOrders()
    errorChecker(req, res, resultado)
}

async function listByMail(req, res) {
    const {email} = req.params
    const resultado = await order.getOrderByMail(email)
    errorChecker(req, res, resultado)
}

async function saveOrder(req, res) {
    const resultado = await order.addOrder(req.body)
    errorChecker(req, res, resultado)
}


module.exports = {listAll, listByMail, saveOrder}