const logger = require("../utils/logger.js");

module.exports = class Contenedor {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    try {
      const data = await this.model.find({});
      return data;
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async getByMail(email) {
    try {
      const data = await this.model.find({ email: email });
      return data[0];
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async generateOrder(data) {
    const orden = {
      email: data.email,
      id: 1,
      fechayhora: new Date().toLocaleString(),
      estado: "generada",
      orden: data.orden,
    };
    const finder = await this.accountFinder(data.email);
    try {
      if (finder == 0) {
        this.newOrder(orden);
      } else {
        orden.id = await this.getNextId(data.email);
        await this.model.updateOne(
          { email: `${data.email}` },
          { $addToSet: { ordenes: orden } }
        );
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  //funciones auxiliares

  async newOrder(orden) {
    const newOrder = { email: orden.email, ordenes: [orden] };
    await this.model.create(newOrder);
  }

  async getNextId(email) {
    const data = await this.getByMail(email);
    const ids = data.ordenes.map((producto) => producto.id);
    const idMaximo = Math.max(...ids);
    return idMaximo + 1;
  }

  async accountFinder(email) {
    const data = await this.model.find({ email: email });
    return data.length;
  }
};
