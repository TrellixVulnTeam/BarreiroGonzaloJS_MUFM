const stockProductos = [

{
    "id": 7,
    "nombre": "Kingz - Gi - Black",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/blackgirl.webp",
    "precio": 140,
    "cantidad": 1
},
{
    "id": 8,
    "nombre": "Kingz - Gi - White",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/whitegirl.webp",
    "precio": 140,
    "cantidad": 1
},
{
    "id": 9,
    "nombre": "Kingz - Gi - Blue",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/bluegirl.webp",
    "precio": 140,
    "cantidad": 1
},
{
    "id": 10,
    "nombre": "Kingz - Gi - Dark Blue",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/bluemoongirl.webp",
    "precio": 140,
    "cantidad": 1
},
{
    "id": 11,
    "nombre": "Koral - No Gi",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/koralycrawoman2.jpg",
    "precio": 140,
    "cantidad": 1
},
{
    "id": 12,
    "nombre": "Koral - No Gi",
    "descripcion": "Pursue the Gentle Art",
    "img": "../images/koralycrawoman.jpg",
    "precio": 140,
    "cantidad": 1
}
]

const productosContainer = document.querySelector('#productos-container')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')

const btnVaciar = document.getElementById('vaciarCarrito')

//const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const carritoEnLS = JSON.parse( localStorage.getItem('carrito') )



// generar el DOM de todos los productos
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')

    div.innerHTML = `
    
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precioProducto">Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary"><strong>Add to cart</strong><i class="fas fa-shopping-cart"></i></button>
         `
        productosContainer.append(div)
         
})


// function agregarAlCarrito() {

// }

const agregarAlCarrito = (id) => {
    const item = stockProductos.find( (producto) => producto.id === id)

    if (item){
        item.cantidad +1 ;

    } else {

        item.cantidad = 1;
        carrito.push(item);

    }   

    carrito.push(item)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)
    renderCarrito()
    renderCantidad()
    renderTotal()
}

const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

const vaciarCarrito = () => {
    carrito.length = 0

    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

btnVaciar.addEventListener('click', vaciarCarrito)

const renderCarrito = () => {

    
    
    carritoContenedor.innerHTML = ''


    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')


        div.innerHTML = ` 

            <img src="${item.img}">
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p>Precio: $${item.precio}</p>
            <p class="card-text text-dark">Cantidad: ${item.cantidad}<p>
            <button onclick="removerDelCarrito(${item.id})" class="btn btn-warning"><i class="fas fa-trash-alt">Delete</i></button>
      
                    `
        
        carritoContenedor.append(div)

    })
}

const renderCantidad = () => {

 //prueba de aumento de cantidades

 //if (carritoContenedor){
 //   contadorCarrito.cantidad++;
 //} else{
 //   producto.cantidad = 1;
 //   carrito.push(producto);
 //}

 //fin de prueba

    contadorCarrito.innerText = carrito.length
}

//PRUEBA SUMADOR CANTIDADES DE PRODUCTOS
const renderProductos = () => {
    contadorCantidades.innerText = cantidad.length

}

//

const renderTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio
    })

    precioTotal.innerText = total
}



if (carritoEnLS) {
    carrito = carritoEnLS

    renderCarrito()
    renderCantidad()
    renderTotal()
} else {
    carrito = []
}