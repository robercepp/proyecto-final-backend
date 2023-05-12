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
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "elemento no encontrado" };
      } else {
        return data[0];
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async getByMongoId(id){
    try {
      const data = await this.model.findById(`${id}`)
      if(data.error) {
        return { error: "elemento no encontrado" };
      } else {
        return data
      }
    } catch (err) {
      logger.error(err)
      return {error: err}
    }
  }

  async getByCat(category) {
    try {
      const data = await this.model.find({ codigo: category });
      if (data.length == 0) {
        return { error: "elemento no encontrado" };
      } else {
        return data;
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async getCategories() {
    try {
      const inventory = await this.getAll();
      const categorias = Object.keys(
        inventory.reduce((acc, obj) => {
          acc[obj.codigo] = true;
          return acc;
        }, {})
      );
      return categorias;
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async saveProduct(object) {
    try {
      const data = await this.model.find({});
      const ids = data.map((producto) => producto.id);
      const idMaximo = Math.max(...ids);
      if (!object.nombre) {
        return {
          error: "no se agregó un nombre. el producto no fue guardado",
        };
      } else if (!object.precio) {
        return { error: "atención, no se ha introducido un precio" };
      } else if (!object.codigo) {
        return { error: "atención, no se ha introducido un codigo" };
      } else if (!object.thumbnail) {
        return { error: "atención, no se ha introducido un thumbnail" };
      } else if (!object.stock) {
        return { error: "atención, no se ha introducido un stock" };
      } else if (!object.detalle) {
        return { error: "atención, no se ha introducido un detalle" };
      } else if (idMaximo == -Infinity) {
        object.id = 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return null;
      } else {
        const idMaximo = Math.max(...ids);
        object.id = idMaximo + 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return object;
      }
    } catch (err) {
      logger.error("error!: ", err);
      return { error: err };
    }
  }

  async updateProduct(object, id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "producto no encontrado" };
      } else if (!object.nombre) {
        return { error: "atención, no se ha introducido un nombre" };
      } else if (!object.precio) {
        return { error: "atención, no se ha introducido un precio" };
      } else if (!object.codigo) {
        return { error: "atención, no se ha introducido un codigo" };
      } else if (!object.thumbnail) {
        return { error: "atención, no se ha introducido un thumbnail" };
      } else if (!object.stock) {
        return { error: "atención, no se ha introducido un stock" };
      } else if (!object.detalle) {
        return { error: "atención, no se ha introducido un detalle" };
      } else {
        object.id = id;
        object.timestamp = data.timestamp;
        await this.model.updateOne(
          { id: id },
          {
            $set: {
              nombre: object.nombre,
              precio: object.precio,
              codigo: object.codigo,
              thumbnail: object.thumbnail,
              stock: object.stock,
              detalle: object.detalle,
            },
          }
        );
      }
    } catch (err) {
      logger.error("error!: ", err);
      return { error: err };
    }
  }

  async deleteById(id) {
    try {
      const data = await this.model.find({ id: id });
      if (data.length == 0) {
        return { error: "producto no encontrado" };
      } else {
        await this.model.deleteOne({ id: id });
      }
    } catch (err) {
      logger.error("error!: ", err);
      return { error: err };
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
};
