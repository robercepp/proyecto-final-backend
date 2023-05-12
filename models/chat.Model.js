const mongoose = require('mongoose')

const chatCollections ='mensajes'

const chatSchema = new mongoose.Schema({
    tipo: {type: String, required: true},
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    mensajes: {type: Array, required: true},
})

module.exports = mongoose.model(chatCollections, chatSchema)