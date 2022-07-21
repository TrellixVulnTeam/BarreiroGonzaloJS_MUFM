let usuario
const usuarioLS = localStorage.getItem('user')
if (usuarioLS) {
    usuario = usuarioLS
}
Swal.fire(`Welcome to Men's section, ${usuario}. Choose your favourite clothes`)

const compra = document.querySelector('#compra')
compra.addEventListener('click', () => {

    Toastify({
        text: 'Please, scroll down to start shopping',
        duration: 5000,
        gravity: 'top',
        className: 'UkeBJJ',
        style: {
            background: "linear-gradient(to right, #383938 , #0d6efd)",
          }
    }).showToast()
})

/* REMOVER DATOS DEL STORAGE */
const clearData = () => {
    localStorage.removeItem('user')
    localStorage.removeItem("nombre")
    localStorage.removeItem("apellido")
    localStorage.removeItem("numero")
    localStorage.removeItem("mail") 
    localStorage.removeItem('carrito') 
    window.location.reload()
}

document.querySelector("#clear-data").addEventListener('click', clearData)

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

const agregarAlCarrito = (productId) => {
    const item = carrito.find( (producto) => producto.id === productId)
    if (item) {
        item.cantidad++
        showMensaje(item.nombre)
    } else {
        const {id, nombre, precio} = stockProductos.find((producto) => producto.id === productId)
        const itemToCart = {
            id,
            nombre,
            precio,
            cantidad: 1
        }
        carrito.push(itemToCart)
        showMensaje(nombre)
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
    renderCarrito()
    renderCantidad()
    renderTotal()
}

const showMensaje = (producto) => {
    Toastify({
        text: `Have added "${producto}"`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: '#0d6efd',
        }
    }).showToast()
}


const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    deletedMensaje(item.nombre)

    item.cantidad -= 1
    if (item.cantidad === 0){
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito()
    renderCantidad()
    renderTotal()
}

const deletedMensaje = (producto) => {
    Toastify({
        text: `"${producto}" has been deleted`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'red',
        }
    }).showToast()
}

const vaciarCarrito = () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderCarrito()
    renderCantidad()
    renderTotal()
}

btnVaciar.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'red',
        confirmButtonText: 'I agree',
        cancelButtonText: 'Cancel'
        
      }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito ()
            Toastify({
                text: 'The cart has been deleted',
                position: 'center',
                gravity: 'center',
                duration: 4000,
                style:{
                    background: 'red'
                }
            }).showToast ()
        }
      });
})

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
    contadorCarrito.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
}

const renderTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
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