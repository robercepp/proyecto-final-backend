const productosMongoDb = require("../daos/productosMongoDb.js");
const productosFileSystem = require("../daos/productosFileSystem.js");
const model = require("../models/producto.Model.js");
const archivo = "./db/productos.txt";
const { run } = require("../server.js");
const DTO = require ('../dtos/productosDTO.js')

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
  class Repository extends (extention
    ? productosFileSystem
    : productosMongoDb) {
    constructor(source) {
      super(source);
    }
    async listAll() {
      const data = await this.getAll();
      const dtoResponse = new DTO(data)
      return dtoResponse.readMultipleProducts();
    }
    async listById(id) {
      const data = await this.getById(id);
      const dtoResponse = new DTO(data)
      return dtoResponse.readSingleProduct();
    }

    async listByMongoId(id) {
      const data = await this.getByMongoId(id);
      const dtoResponse = new DTO(data)
      return dtoResponse.readSingleProduct();
    }

    async listByCategory(category) {
      const data = await this.getByCat(category);
      const dtoResponse = new DTO(data)
      return dtoResponse.readMultipleProducts();
    }
    async Categories(){
      const data = await this.getCategories()
      return data
    }  
    async save(product) {
      const data = await this.saveProduct(product);
      return data;
    }
    async update(product, id) {
      const data = await this.updateProduct(product, id);
      return data;
    }
    async delete(id) {
      const data = await this.deleteById(id);
      return data;
    }
  }
}

var productosFactory = new factoryRepository(run).createRepository();

module.exports = { productosFactory };
