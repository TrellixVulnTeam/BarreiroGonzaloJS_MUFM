const container = document.querySelector('#pokemon-container')
const btnanterior = document.querySelector('#anterior')
const btnsiguiente = document.querySelector('#siguiente')

let id = 1
const llamarpokemon = async () => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await resp.json()

    const {name, sprites: {front_default: img}} = data

    container.innerHTML = `
        <h4>${name}</h4>
        <img src=${img} alt=${img}/>
    `
}

btnsiguiente.addEventListener('click', () => {
    id++

    llamarpokemon()
})
btnanterior.addEventListener('click', () => {
    if(id === 1) {return}{
        id --
        llamarpokemon()
    }
})

llamarpokemon() 


const url = 'https://pokeapi.co/api/v2/pokemon/20/'
fetch(url)
.then(response => response.json())
.then(data => {
    let element = document.getElementById('elem')
    element.innerHTML = `<p>${data.name}</p>
    <img src='${data.sprites.front_default}'>
    `

    console.log(data)
})
.catch(err => console.log(err))

fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(json => console.log(json))


// LOCAL STORAGE
let usuario
const usuarioLS = localStorage.getItem('user')
if (usuarioLS) {
    usuario = usuarioLS
} else {
    usuario = prompt("Ingrese su nombre")
    localStorage.setItem("user", usuario)
}


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

const welcomeTitle = document.querySelector("#welcome")
welcomeTitle.innerText = `Hi, ${usuario}! Welcome to`

// USO DE SWEETALERT2

Swal.fire({
    title: 'Are you sure?',
    text: "You are about to enter the world of BJJ",
    icon: 'warning',
    confirmButtonColor: '#198754',
    confirmButtonText: 'I accept!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        `Your welcome ${usuario}!`
      )}
  })




//  TEST TOASTIFY
const shop = document.querySelector('#shop')
shop.addEventListener('click', () => {

    Toastify({
        text: 'Go to the upper menu and select your option!',
        duration: 5000,
        gravity: 'top',
        className: 'UkeBJJ',
        style: {
            background: "linear-gradient(to right, #62C456 , #198754)",
          }
    }).showToast()
})

const productosContainer = document.querySelector('#productos-container')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const contadorCantidades = document.querySelector('#contador-cantidades')
const precioTotal = document.querySelector('#precioTotal')

const btnVaciar = document.getElementById('vaciarCarrito')
const btnComprar = document.getElementById('comprar')

//const carrito = JSON.parse(localStorage.getItem('carrito')) || []
const carritoEnLS = JSON.parse( localStorage.getItem('carrito') )



/* let stock = []
//  FETCH
fetch('./stock.json')
    .then((resp) => resp.json())
    .then((data) => {
        stock = data

        data.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
                    <img src="${producto.img}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button id="cart" onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary"><strong>Add to cart</strong><i class="fas fa-shopping-cart"></i></button>
                 `
                productosContainer.append(div) 
        })
    })
 */

// FUNCIÓN AGREGAR AL CARRITO

const agregarAlCarrito = (productId) => {

    const itemInCart = carrito.find((producto) => producto.id === productId)
        if (itemInCart) {
            itemInCart.cantidad ++
            showMensaje(itemInCart.nombre)
        } else {
            const {id, nombre, precio} = stockProductos.find( (producto) => producto.id === productId) 
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

// TOASTIFY AGREGAR PRODUCTO

const showMensaje = (nombre) => {

    Toastify({
        text: `Have added "${nombre}"`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: 'blue',
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

btnComprar.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'red',
        confirmButtonText: 'Buy Now!',
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
            <h3>${item.nombre}</h3>
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
//
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

















