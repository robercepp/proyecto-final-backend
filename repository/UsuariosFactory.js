const userMongoDb = require("../daos/userMongoDb.js");
const model = require("../models/user.Model.js");
const { run } = require("../server.js");
const DTO = require("../dtos/usuariosDTO.js");

function factoryRepository(type) {
  this.createRepository = function () {
    if (type === "dev") {
      return new Repository(model);
    } else if (type === "prod") {
      return new Repository(model);
    }
  };
  class Repository extends userMongoDb {
    constructor(source) {
      super(source);
    }
    async listAll() {
      const data = await this.getAll();
      const dtoResponse = new DTO(data);
      return dtoResponse.readMultipleUsers();
    }
    async listById(id) {
      const data = await this.getById(id);
      const dtoResponse = new DTO(data);
      return dtoResponse.readSingleUser();
    }

    async listByMail(mail) {
      const data = await this.getByMail(mail)
      const dtoResponse = new DTO(data)
      return dtoResponse.readSingleUser()
    }

    async setUserLogged(object) {
      const data = await this.userLogged(object);
      return data;
    }
    async save(user) {
      const data = await this.saveUser(user);
      return data;
    }
    async update(user, id) {
      const data = await this.updateUser(user, id);
      return data;
    }
    async delete(id) {
      const data = await this.deleteById(id);
      return data;
    }
  }
}

var userFactory = new factoryRepository(run).createRepository();

module.exports = { userFactory };
