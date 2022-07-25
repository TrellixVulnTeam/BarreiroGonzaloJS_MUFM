// LOCAL STORAGE
let usuario
const usuarioLS = localStorage.getItem('user')
if (usuarioLS) {
    usuario = usuarioLS
} else {
    usuario = prompt("Ingrese su nombre")
    localStorage.setItem("user", usuario)
}

const welcomeTitle = document.querySelector('#welcome')
welcomeTitle.innerText = `Hi, ${usuario}! Welcome to`

//test
const carro = document.querySelector('#boton-carrito')
carro.addEventListener('click', () => {
    Toastify({
        text: `Go to "Your products" to buy!`,
        duration: 5000,
        gravity: 'top',
        className: 'UkeBJJ',
        style: {
            background: "linear-gradient(to right, lightblue , blue)",
          }
    }).showToast()
})

/* BOTON SWITCH */
const btnSwitch = document.querySelector('#switch');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('white');
    btnSwitch.classList.toggle('active');
});

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
const carritoEnLS = JSON.parse( localStorage.getItem('carrito') )

// FUNCIÓN AGREGAR AL CARRITO
const agregarAlCarrito = (productId) => {

    const itemInCart = stockProductos.find((producto) => producto.id === productId)
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
        title: "Ready to buy?",
        text: "We wait your purchase",
        icon: "",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'red',
        confirmButtonText: 'Buy Now!',
        
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "THANKS FOR YOUR PURCHASE!",
                text: "Enjoy it!",
                icon: "success",
            })
            Toastify({
                text: 'Solded',
                position: 'center',
                gravity: 'center',
                duration: 1500,
                style:{
                    background: 'green'
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
            <button onclick="removerDelCarrito(${item.id})" class="btn btn-warning"><i class="fas fa-trash-alt"></i></button>
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