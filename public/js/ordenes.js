orderContainer = document.getElementById('order-container')

const array = [
    {objeto: 1},
    {objeto: 2},
    {objeto: 3},
    {objeto: 4},
    {objeto: 5},
    {objeto: 6},
]

fetch(`/api/orden/${email}`)
.then((response) => response.json())
.then((ordenes) => {
    const orden = ordenes.ordenes.map((ordn) =>{
        const productos = ordn.orden.map((prd) => `
        <div class="product">
        -nombre: ${prd.item}<br>
        -cantidad: ${prd.cantidad}<br>
        -categoría: ${prd.categoria}<br>
        -precio unitario: ${prd.precio}<br>
        -detalle: ${prd.detalle}
        </div>
        `).join("");
        return`
        <div class="orden-container">
        <div class="order-title">Orden n°: ${ordn.id}</div>
        -Solicitado el: ${ordn.fechayhora}<br>
        -Estado: ${ordn.estado}<br>
        <div class=products-container>
        <div class="list-title">Productos solicitados:</div>
        ${productos}
        </div>
        </div>
        `;
    }).join("");
    orderContainer.innerHTML = orden
})