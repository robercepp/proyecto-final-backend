const mongoose = require('mongoose') ;

const carritoCollections = 'carrito'

const carritoSchema = new mongoose.Schema({
    id: {type: Number, required: true, dropDups: true},
    email:{type: String, required: true},
    domicilio: {type: String, required: true},
    timestamp: {type: Date, default: Date.now(), required: true},
    productos: {type: Array, required: true},
})

module.exports = mongoose.model(carritoCollections, carritoSchema)