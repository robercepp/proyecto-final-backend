const orderMongoDb = require('../daos/ordenMongoDb.js')
const ordenModel = require('../models/orden.Model.js')


module.exports = class OrderRepository extends orderMongoDb {
    constructor(){
        super(ordenModel)
    }
    async getAllOrders() {
        const data = await this.getAll()
        return data
    }
    async getOrderByMail(email) {
        const data = await this.getByMail(email)
        return data
    }
    async addOrder(payload) {
        const data = await this.generateOrder(payload)
        return data
    }
}