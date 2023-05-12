const logger = require("../utils/logger.js");

module.exports = class ChatMongoDb {
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
  async getByEmail(email) {
    try {
      const data = await this.model.find(
        { email: email },
        { mensajes: 1, _id: 0 }
      );
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else {
        const result = data[0].mensajes;
        const resultReverse = result.reverse()
        return resultReverse;
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }
  async createChannel(data) {
    try {
      if ((await this.channelFinder(data.destino)) == 0) {
        const channel = {tipo: data.tipo, email: data.email, nombre: data.nombre, mensajes: [] };
        await this.model.create(channel);
        return { email: data.email };
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async addMessage(message) {
    try {
        if((await this.channelFinder(message.email)) == 0) {
            await this.newChannel(message)
        } else {
            const mensajeNuevo = this.messageBuilder(message)
           await this.model.updateOne(
            {email: `${message.destino}`}, 
            {$addToSet: {mensajes: mensajeNuevo}})
        }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  messageBuilder(message) {
    const fechaYHora = new Date().toLocaleString();
    const mensaje = {
      email: message.email,
      tipo: message.tipo,
      fechayhora: fechaYHora,
      mensaje: message.mensaje,
    };
    return mensaje;
  }

  async newChannel(data) {
    try {
      const channel = {tipo: data.tipo, email: data.email, nombre: data.nombre, mensajes: [this.messageBuilder(data)] };
      await this.model.create(channel);
    } catch (err){
      logger.error(err)
      return {error: err}
    }
  }

  async channelFinder(email) {
    const data = await this.model.find({ email: email });
    return data.length;
  }
};
