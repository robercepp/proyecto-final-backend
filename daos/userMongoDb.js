require("dotenv").config();
const bcript = require("bcryptjs");
const { enviarMail } = require("../utils/mailer.js");
const logger = require("../utils/logger.js");
const main = require("../main.js");
const chatHandler = require('./chatMongoDb.js')
const chatModel = require('../models/chat.Model.js')
const chat = new chatHandler(chatModel)

module.exports = class userHandler {
  constructor(model) {
    this.model = model;
  }

  userLogged(object) {
    main.userLogged = object.id;
    return { exito: `usuario ${object.id} activo` };
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

  async getById(id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else {
        return data[0];
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async getByMail(email) {
    try {
      const data = await this.model.find({ email: email });
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else {
        return data[0];
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async saveUser(data) {
    const user = await this.model.findOne({ email: data.email });
    if (user) {
      return { error: "usuario ya registrado con ese e-mail." };
    } else if (!data.nombre) {
      return { error: "no se ha introducido un nombre" };
    } else if (!data.apellido) {
      return { error: "no se ha introducido un apellido" };
    } else if (!data.edad) {
      return { error: "no se ha introducido una edad" };
    } else if (!data.direccion) {
      return { error: "no se ha introducido una dirección" };
    } else if (!data.telefono) {
      return { error: "no se ha introducido un telefono" };
    } else if (!data.email) {
      return { error: "no se ha introducido un email" };
    } else if (!data.avatar) {
      return { error: "no se ha introducido un avatar" };
    } else if (!data.admin) {
      return { error: "no se ha seteado el tipo de admin" };
    } else if (!data.password) {
      return { error: "no se ha introducido una contraseña" };
    } else {
      try {
        const encPass = await bcript.hash(data.password, 10);
        const newUser = {
          id: await this.getHighestId(),
          nombre: data.nombre,
          apellido: data.apellido,
          edad: data.edad,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          avatar: data.avatar,
          admin: data.admin,
          password: encPass,
        };
        await this.model.create(newUser);
        logger.info("Nuevo Usuario creado Satisfactoriamente");
        const nuevaCuentaChat ={
          tipo: this.setUserType(data.admin),
          email: data.email,
          nombre: `${data.nombre} ${data.apellido}`,
        }
        await chat.createChannel(nuevaCuentaChat)
        this.notificarAdmin(newUser);
      } catch (err) {
        logger.error(err);
        return { error: err };
      }
    }
  }

  async updateUser(user, id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else if (!user.nombre) {
        return { error: "no se ha introducido un nombre" };
      } else if (!user.apellido) {
        return { error: "no se ha introducido un apellido" };
      } else if (!user.edad) {
        return { error: "no se ha introducido una edad" };
      } else if (!user.direccion) {
        return { error: "no se ha introducido una dirección" };
      } else if (!user.telefono) {
        return { error: "no se ha introducido un telefono" };
      } else if (!user.email) {
        return { error: "no se ha introducido un email" };
      } else if (!user.avatar) {
        return { error: "no se ha introducido un avatar" };
      } else if (!user.admin) {
        return { error: "no se ha seteado el tipo de admin" };
      } else {
        user.id = id;
        user.timestamp = data.timestamp;
        await this.model.updateOne(
          { id: id },
          {
            $set: {
              nombre: user.nombre,
              apellido: user.apellido,
              edad: user.edad,
              direccion: user.direccion,
              telefono: user.telefono,
              email: user.email,
              avatar: user.avatar,
              admin: user.admin,
            },
          }
        );
      }
    } catch (err) {
      logger.error("error!: ", err);
      return {error: err}
    }
  }

  async deleteById(id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else {
        await this.model.deleteOne({ id: id });
      }
    } catch (err) {
      logger.error("error!: ", err);
      return {error: err}
    }
  }

  //funciones auxiliares (evitan redundancia de código)
  async getHighestId() {
    const data = await this.model.find({}, { id: 1, _id: 0 });
    if (data.length == 0) {
      return 1;
    } else {
      const highest = Math.max(...data.map((o) => o.id));
      const result = highest + 1;
      return result;
    }
  }

  setUserType(user){
    if(user.admin === "true"){
      return "sistema"
    } else {
      return "usuario"
    }
  }

  async notificarAdmin(nuevoUsuario) {
    const message = {
      asunto: "Nuevo Registro",
      mensaje: `Un nuevo usuario se ha registrado.
      datos del usuario:
      - nombre y apellido: ${nuevoUsuario.nombre} ${nuevoUsuario.apellido},
      - edad: ${nuevoUsuario.edad},
      - dirección: ${nuevoUsuario.direccion},
      - telefono: ${nuevoUsuario.telefono},
      - email: ${nuevoUsuario.email}.`,
    };
    enviarMail(message.asunto, message.mensaje, process.env.EMAIL_DESTINATION);
  }
};
