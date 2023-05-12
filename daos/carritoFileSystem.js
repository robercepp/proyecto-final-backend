const fs = require("fs");
const main = require("../main.js");
const logger = require("../utils/logger.js");

module.exports = class Carrito {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async getAll() {
    await main.fileChecker(this.archivo);
    try {
      const allCarts = await this.fileCatcher(this.archivo);
      return allCarts;
    } catch (err) {
      logger.error("error!: ", err);
      return { error: err };
    }
  }

  async getById(id) {
    await main.fileChecker(this.archivo);
    if ((await this.cartFinder(id)) == -1) {
      return { error: "carrito no encontrado" };
    } else {
      try {
        const productos = await this.cartViewer(id);
        return productos;
      } catch (err) {
        logger.error(err);
        return { error: err };
      }
    }
  }

  async saveCart(data) {
    await main.fileChecker(this.archivo);
    try {
      if ((await this.cartFinder(data.id)) == -1) {
        data.productos = []
        this.newCart(data);
        return { id: main.userLogged };
      } else {
        return {
          alerta: "el carrito con id " + main.userLogged + " ya existe",
        };
      }
    } catch (err) {
      logger.error(err);
      return { error: err };
    }
  }

  async addToCart(data) {
    await main.fileChecker(this.archivo);
    const carts = await this.fileCatcher(this.archivo);
    const cart = carts[await this.cartFinder(main.userLogged)];
    const producto = await this.productFinder(data.id, "./db/productos.txt");
    const productoAnadido = this.productBuilder(producto, data.cantidad);
    if (main.userLogged == 0) {
      return {
        error: "no hay un usuario logueado.",
      };
    } else if (producto == false) {
      return {
        error:
          "el producto no se encuentra en la base de datos, no se puede agregar",
      };
    } else if (data.cantidad == undefined) {
      return {
        error: "no se ha especificado ninguna cantidad de items a cargar",
      };
    } else if ((await this.cartFinder(main.userLogged)) == -1) {
      const cartPayload = {
        id: main.userLogged,
        email: data.email,
        domicilio: data.domicilio,
        productos: [productoAnadido]
      }
      await this.newCart(cartPayload);
      return {
        error:
          "el carrito del usuario no existía, se ha creado uno en su lugar",
      };
    } else {
      const userProducts = await this.cartViewer(main.userLogged);
      const index = await userProducts.findIndex(
        (producto) => producto.id == data.id
      );
      const userCart = {
        id: cart.id,
        email: data.email,
        domicilio: data.domicilio,
        timestamp: cart.timestamp,
        productos: userProducts,
      };
      if (index == -1) {
        userProducts.push(productoAnadido);
        carts.splice(await this.cartFinder(main.userLogged), 1, userCart);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(carts, null, 2)
        );
        return null;
      } else {
        userProducts.splice(index, 1, productoAnadido);
        carts.splice(await this.cartFinder(main.userLogged), 1, userCart);
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(carts, null, 2)
        );
        return null;
      }
    }
  }

  async deleteCart(id) {
    await main.fileChecker(this.archivo);
    if ((await this.cartFinder(id)) == -1) {
      return { error: "carrito no encontrado" };
    } else {
      try {
        await this.cartSplicer(id);
      } catch (err) {
        logger.error(err);
        return { error: err };
      }
    }
  }

  async deleteFromCart(idUser, idProd) {
    await main.fileChecker(this.archivo);
    if ((await this.cartFinder(idUser)) == -1) {
      return { error: "carrito no encontrado" };
    } else if ((await this.cartProductIndexer(idUser, idProd)) == -1) {
      return { error: "producto no encontrado" };
    } else {
      const carts = await this.fileCatcher(this.archivo);
      const cart = carts[await this.cartFinder(idUser)];
      const products = await this.cartViewer(idUser);
      const index = await this.cartProductIndexer(idUser, idProd);
      products.splice(index, 1);
      const userCart = {
        id: cart.id,
        timestamp: cart.timestamp,
        productos: products,
      };
      carts.splice(await this.cartFinder(idUser), 1, userCart);
      await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, 2));
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
    const file = await this.fileCatcher(this.archivo);
    const cart = { id: cartData.id, timestamp: Date.now(),email: cartData.email, domicilio: cartData.domicilio, productos: cartData.productos };
    file.push(cart);
    await fs.promises.writeFile(this.archivo, JSON.stringify(file, null, 2));
  }

  async cartFinder(id) {
    const file = await this.fileCatcher(this.archivo);
    const index = file.findIndex((cart) => cart.id == id);
    return index;
  }

  async cartProductIndexer(idUser, idProduct) {
    const products = await this.cartViewer(idUser);
    const index = products.findIndex((producto) => producto.id == idProduct);
    return index;
  }

  async cartViewer(id) {
    const file = await this.fileCatcher(this.archivo);
    return file[await this.cartFinder(id)].productos;
  }

  async productFinder(id, source) {
    try {
      const file = await this.fileCatcher(source);
      const index = file.findIndex((producto) => producto.id == id);
      return file[index] || false;
    } catch (error) {
      logger.error(error);
    }
  }

  async cartSplicer(id) {
    const file = await this.fileCatcher(this.archivo);
    file.splice(await this.cartFinder(id), 1);
    await fs.promises.writeFile(this.archivo, JSON.stringify(file, null, 2));
  }

  async fileCatcher(source) {
    const file = await fs.promises.readFile(source, "utf-8");
    const data = JSON.parse(file);
    return data;
  }
};
