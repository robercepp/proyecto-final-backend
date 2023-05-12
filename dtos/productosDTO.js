module.exports = class ProductosDTO {
    constructor (data) {
        this.data = data
    }
    readMultipleProducts() {
        if(this.data.error) {
            return this.data
        } else {
            const products = []
            this.data.forEach(product => {
                const item = {
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    codigo: product.codigo,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    detalle: product.detalle
                }
                products.push(item)
            });
            return products
        }
    }

    readSingleProduct(){
        if(this.data.error){
            return this.data
        } else {
            const product = {
                id: this.data.id,
                nombre: this.data.nombre,
                precio: this.data.precio,
                codigo: this.data.codigo,
                thumbnail: this.data.thumbnail,
                stock: this.data.stock,
                detalle: this.data.detalle
            }
            return product
        }
    }
}