module.exports = class CarritosDTO {
  constructor(data) {
    this.data = data;
  }
  readMultipleCarts() {
    if (this.data.error) {
      return this.data;
    } else {
      const carts = [];
      this.data.forEach((cart) => {
        const crt = {
          id: cart.id,
          productos: cart.productos.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            detalle: producto.detalle,
            codigo: producto.codigo,
            thumbnail: producto.thumbnail,
            precio: producto.precio,
            stock: producto.stock,
          })),
        };
        carts.push(crt);
      });
      return carts;
    }
  }

  readSingleCart() {
    if (this.data.error) {
      return this.data;
    } else {
      const cart = [];
      this.data.forEach((product) => {
        const crt = {
          id: product.id,
          nombre: product.nombre,
          detalle: product.detalle,
          codigo: product.codigo,
          thumbnail: product.thumbnail,
          precio: product.precio,
          stock: product.stock,
        };
        cart.push(crt);
      });
      return this.data;
    }
  }
};
