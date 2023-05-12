mongoose = require('mongoose')

const ordenCollections = 'ordenes'

const ordenesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    ordenes: {type: Array, required: true}
})

module.exports = mongoose.model(ordenCollections, ordenesSchema)