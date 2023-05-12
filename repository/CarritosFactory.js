const carritoMongoDb = require("../daos/carritoMongoDb.js");
const carritoFileSystem = require("../daos/carritoFileSystem.js");
const model = require("../models/carrito.Model.js");
const archivo = "./db/carrito.txt";
const { run } = require("../server.js");
const DTO = require('../dtos/carritosDTO.js')

let extention = null;
if (run === "dev") {
  extention = true;
}
if (run === "prod") {
  extention === false;
}

function factoryRepository(type) {
  this.createRepository = function () {
    if (type === "dev") {
      return new Repository(archivo);
    } else if (type === "prod") {
      return new Repository(model);
    }
  };
  class Repository extends (extention ? carritoFileSystem : carritoMongoDb) {
    constructor(source) {
      super(source);
    }
    async listAll() {
      const data = await this.getAll();
      const dtoResponse = new DTO(data)
      return dtoResponse.readMultipleCarts();
    }
    async listById(id) {
      const data = await this.getById(id);
      const dtoResponse = new DTO(data)
      return dtoResponse.readSingleCart();
    }
    async createCart(payload) {
      const data = await this.saveCart(payload);
      return data;
    }
    async updateCart(payload) {
      const data = await this.addToCart(payload);
      return data;
    }
    async removeCart(id) {
      const data = await this.deleteCart(id);
      return data;
    }
    async removeProduct(idUser, idProd) {
      const data = await this.deleteFromCart(idUser, idProd);
      return data;
    }
  }
}

var carritoFactory = new factoryRepository(run).createRepository();

module.exports = { carritoFactory };
