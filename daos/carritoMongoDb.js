const main = require("../main.js");
const productoModel = require("../models/producto.Model.js"); //no borrar! muy importante, sin esto añadir al carrito no funciona
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
  async getById(id) {
    try {
      const data = await this.model.find({ id: id }, { productos: 1, _id: 0 });
      if (data.length == 0) {
        return { error: "usuario no encontrado" };
      } else {
        return data[0].productos;
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async saveCart(data) {
    try {
      if ((await this.cartFinder(data.id)) == 0) {
        data.productos = []
        this.newCart(data);
        return { id: main.userLogged };
      } else {
        return { error: `el carrito con id ${main.userLogged} ya existe` };
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async deleteCart(id) {
    const idParsed = parseInt(id);
    if ((await this.cartFinder(main.userLogged).length) == 0) {
      return { error: "carrito no encontrado" };
    } else {
      try {
        await this.model.deleteOne({ id: idParsed });
      } catch (err) {
        logger.error(err);
        return { error: err };
      }
    }
  }
  async addToCart(data) {
    const item = await productoModel.find({ id: data.id });
    if (main.userLogged == 0) {
      return {
        error: "no hay un usuario logueado.",
      };
    } else if (item.length == 0) {
      return {
        error:
          "el producto no se encuentra en la base de datos, no se puede agregar",
      };
    } else if (data.cantidad == undefined) {
      return {
        error: "no se ha especificado ninguna cantidad de items a cargar",
      };
    } else if ((await this.cartFinder(main.userLogged)) == 0) {
      const productoAnadido = this.productBuilder(item[0], data.cantidad);
      const cartPayload = {
        id: main.userLogged,
        email: data.email,
        domicilio: data.domicilio,
        productos: [productoAnadido]
      }
      await this.newCart(cartPayload);
      return {
        error:
          "el carrito del usuario no existía, se ha creado uno en su lugar con el producto solicitado",
      };
    } else {
      try {
        const productoAnadido = this.productBuilder(item[0], data.cantidad);
        if ((await this.productExistence(data.id)) == 0) {
          await this.model.updateOne(
            { id: main.userLogged },
            { $addToSet: { productos: productoAnadido } }
          );
        } else {
          const query = { id: main.userLogged, "productos.id": parseInt(data.id) };
          const updateDocument = {
            $set: { "productos.$.stock": parseInt(data.cantidad) },
          };
          await this.model.updateOne(query, updateDocument);
        }
      } catch (err) {
        return { error: err };
      }
    }
  }

  async deleteFromCart(idUser, idProd) {
    const idUsrParsed = parseInt(idUser);
    const idPrdParsed = parseInt(idProd);
    if ((await this.cartFinder(idUser)) == 0) {
      return { error: "carrito no encontrado" };
    } else if ((await this.productExistence(idPrdParsed)) == 0) {
      return { error: "producto no encontrado" };
    } else {
      await this.model.updateOne(
        { id: idUsrParsed },
        { $pull: { productos: { id: idPrdParsed } } }
      );
    }
  }

  // funciones auxiliares (evitan redundancia de codigo)
  productBuilder(source, cant) {
    const producto = {
      id: source.id,
      timestamp: source.timestamp,
      nombre: source.nombre,
      detalle: source.detalle,
      codigo: source.codigo,
      thumbnail: source.thumbnail,
      precio: source.precio,
      stock: cant,
    };
    return producto;
  }

  async newCart(cartData) {
    const cart = { id: cartData.id, timestamp: Date.now(), email: cartData.email, domicilio: cartData.domicilio, productos: cartData.productos };
    await this.model.create(cart);
  }

  async cartFinder(id) {
    const data = await this.model.find({ id: id });
    return data.length;
  }

  async productExistence(id) {
    const idParsed = parseInt(id);
    const result = await this.model.find({
      $and: [{ id: main.userLogged }, { "productos.id": idParsed }],
    });
    return result.length;
  }
};
