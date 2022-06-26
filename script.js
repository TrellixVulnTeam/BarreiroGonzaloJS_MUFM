





let stockProductos = [
    {
        "id": 1,
        "nombre": "Kingz - Gi - White",
        "descripcion": "Pursue the Gentle Art",
        "img": "images/kingzwhite.webp",
        "precio": 100,
        "cantidad": 1
    },
    {
        "id": 2,
        "nombre": "Kingz - Gi - White",
        "descripcion": "The ONE",
        "img": "images/kingzwhite2.webp",
        "precio": 90,
        "cantidad": 1
    },
    {
        "id": 3,
        "nombre": "Kingz - Gi - Grey",
        "descripcion": "Pursue the Gentle Art",
        "img": "images/kingzgrey.webp",
        "precio": 200,
        "cantidad": 1
    },
    {
        "id": 4,
        "nombre": "Kingz - Gi - Avocado",
        "descripcion": "Ultralight 2.0",
        "img": "images/kingzgreen.webp",
        "precio": 150,
        "cantidad": 1
    },
    {
        "id": 5,
        "nombre": "Kingz - Gi - Blue",
        "descripcion": "Balistico",
        "img": "images/kingzblue.webp",
        "precio": 100,
        "cantidad": 1
    },
    {
        "id": 6,
        "nombre": "Kingz - Gi - Black",
        "descripcion": "Balistico TOTAL BLACK",
        "img": "./images/kingzblack.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 7,
        "nombre": "Kingz - Gi - Black",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/blackgirl.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 8,
        "nombre": "Kingz - Gi - White",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/whitegirl.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 9,
        "nombre": "Kingz - Gi - Blue",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/bluegirl.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 10,
        "nombre": "Kingz - Gi - Dark Blue",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/bluemoongirl.webp",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 11,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/koralycrawoman2.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 12,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/koralycrawoman.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 13,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/koralycraman.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 14,
        "nombre": "Koral - No Gi",
        "descripcion": "Pursue the Gentle Art",
        "img": "./images/koralycraman2.jpg",
        "precio": 140,
        "cantidad": 1
    },
    {
        "id": 15,
        "nombre": "Koral - No Gi",
        "descripcion": "Black & purple",
        "img": "./images/koralycraman3.jpg",
        "precio": 80,
        "cantidad": 1
    }
]


const productosContainer = document.querySelector('#productos-container')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')

const btnVaciar = document.getElementById('vaciarCarrito')

let carrito
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


        //<div class="pro-container">
        //<div class="pro">

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
    contadorCarrito.innerText = carrito.length
}

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






























//console.log(document)
//console.log(header)
//
//
//console.log("Este es un mensaje en consola")
//console.log("Inicio de sesión")
//
//
//const titulo = document.getElementById("titulo")
//console.log(titulo.innerText)
//
//console.log(titulo.innerHTML)
//
//const texto = document.getElementById("texto")
//console.log(texto)
//
//const welcome = document.getElementById("welcome")
//console.log(welcome.innerText)
//
//const usuario = prompt('Ingrese su nombre')
//welcome.innerText = "Hi " + usuario + "! Welcome to UKE BJJ "




//const productosContainer = document.querySelector('#contenedor-productos')
//const carritoContenedor = document.querySelector('#carrito-contenedor')
//
//const contadorCarrito = document.querySelector('#contadorCarrito')
//const precioTotal = document.querySelector('#precioTotal')
//
//const btnVaciar = document.getElementById('vaciarCarrito')
//
//let carrito
//const carritoEnLS = JSON.parse( localStorage.getItem('carrito') )
//
//
//
//// generar el DOM de todos los productos
//stockProductos.forEach((producto) => {
//    const div = document.createElement('div')
//    div.classList.add('producto')
//
//    div.innerHTML = `
//                    <img src=${producto.img} alt="">
//                    <h3>${producto.nombre}</h3>
//                    <p>${producto.desc}</p>
//                    <p>Talle: ${producto.talle}</p>
//                    <p class="precioProducto">Precio: $${producto.precio}</p>
//                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
//                `
//
//    productosContainer.append(div)
//})
//
//
//// function agregarAlCarrito() {
//
//// }
//
//const agregarAlCarrito = (id) => {
//    const item = stockProductos.find( (producto) => producto.id === id)
//    carrito.push(item)
//
//    localStorage.setItem('carrito', JSON.stringify(carrito))
//
//    console.log(carrito)
//    renderCarrito()
//    renderCantidad()
//    renderTotal()
//}
//
//const removerDelCarrito = (id) => {
//    const item = carrito.find((producto) => producto.id === id)
//    const indice = carrito.indexOf(item)
//    carrito.splice(indice, 1)
//
//    localStorage.setItem('carrito', JSON.stringify(carrito))
//
//    renderCarrito()
//    renderCantidad()
//    renderTotal()
//}
//
//const vaciarCarrito = () => {
//    carrito.length = 0
//
//    localStorage.setItem('carrito', JSON.stringify(carrito))
//
//    renderCarrito()
//    renderCantidad()
//    renderTotal()
//}
//
//btnVaciar.addEventListener('click', vaciarCarrito)
//
//const renderCarrito = () => {
//    carritoContenedor.innerHTML = ''
//
//    carrito.forEach((item) => {
//        const div = document.createElement('div')
//        div.classList.add('productoEnCarrito')
//
//        div.innerHTML = `
//                    <p>${item.nombre}</p>
//                    <p>Precio: $${item.precio}</p>
//                    <button onclick="removerDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
//                    `
//        
//        carritoContenedor.append(div)
//    })
//}
//
//const renderCantidad = () => {
//    contadorCarrito.innerText = carrito.length
//}
//
//const renderTotal = () => {
//    let total = 0
//    carrito.forEach((producto) => {
//        total += producto.precio
//    })
//
//    precioTotal.innerText = total
//}
//
//
//if (carritoEnLS) {
//    carrito = carritoEnLS
//
//    renderCarrito()
//    renderCantidad()
//    renderTotal()
//} else {
//    carrito = []
//}
//
//const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
//const botonAbrir = document.getElementById('boton-carrito')
//const botonCerrar = document.getElementById('carritoCerrar')
//const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
//
//botonAbrir.addEventListener('click', ()=>{
//    contenedorModal.classList.toggle('modal-active')
//})
//botonCerrar.addEventListener('click', ()=>{
//    contenedorModal.classList.toggle('modal-active')
//})
//contenedorModal.addEventListener('click', ()=>{
//    botonCerrar.click()
//})
//modalCarrito.addEventListener('click', (event)=>{
//    event.stopPropagation()
//})


//const contadorCarrito = document.querySelector('#contadorCarrito')
//const btnVaciar = document.getElementById('vaciarCarrito')
//const carritoContenedor = document.querySelector('#carrito-contenedor')


//const carrito = [];
//
//let total = 0;
//
//
//function renderizarproductos (){
//
//    let tienda = document.getElementById('tienda');
//
//    let filtro = document.getElementById('filtro');
//    filtro.innerHTML = `
//    
//    <button class="btn btn-warning mb-5 ms-3" onClick="filtroPrecio()">Filtrar mayor 120</button>
//    
//    `
//
//    BBDD.forEach((e)=>{
//        
//
//        let productoHTML = 
//      
//        `
//        <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
//        <div class="card" style="width: 20rem;">
//            <img src="${e.img}" class="card-img-top" alt="">
//                <div class="card-body">
//                  <h5 class="card-title text-dark">${e.nombre}</h5>
//                  <p class="card-text text-dark">${e.descripcion}</p>
//                  <p class="card-text text-dark">${e.precio}</p>
//                  <button class="btn btn-primary" onClick="agregarProductoAlCarrito(${e.id})">Add to cart</a>
//                </div>
//        </div>
//        </div>
//        
//        `
//        tienda.innerHTML += productoHTML
//
//    });
//    
//
//}
//
//renderizarproductos ();
//
//function agregarProductoAlCarrito (id){
//
//    let producto = BBDD.find(producto => producto.id == id);
//
//    let productoEnCarrito = carrito.find(producto => producto.id == id);
//
//    if (productoEnCarrito){
//
//        productoEnCarrito.cantidad ++ ;
//    
//    } else {
//
//        producto.cantidad = 1;
//        carrito.push(producto);
//
//    }
//
//    renderizarCarrito ()
//
//
//}
//
//function renderizarCarrito (){
//
//    carritoContenedor.innerHTML = ''
//
//    let carritoHTML = document.getElementById('carrito');
//
//    html = '';
//
//    carrito.forEach((producto, id)=>{
//
//        html +=     `
//        <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
//        <div class="card" style="width: 20rem;">
//        <img src="${producto.img}" class="card-img-top" alt="">
//            <div class="card-body">
//              <h5 class="card-title text-dark">${producto.nombre}</h5>
//              <p class="card-text text-dark">${producto.descripcion}</p>
//              <p class="card-text text-dark">${producto.precio}</p>
//              <p class="card-text text-dark">Cantidad: ${producto.cantidad}<p>
//              <button class="btn btn-danger" onClick="eliminarProductoDelCarrito(${id})">Delete</a>
//            </div>
//        </div>
//        </div>
//        
//        
//        `
//
//    })
//
//    carritoHTML.innerHTML = html;
//
//    calcularTotal ();
//
//}
//
//function calcularTotal (){
//
//    let total = 0
//
//    carrito.forEach((producto) => {
//
//        total += producto.cantidad * producto.precio;
//
//    });
//
//    console.log(total);
//
//}
//
//const eliminarProductoDelCarrito = (id) => {
//
//    console.log(carrito[id].cantidad);
//    carrito[id].cantidad --;
//    console.log(carrito[id].cantidad);
//
//    if(carrito[id].cantidad == 0)
//
//        carrito.splice(id, 1);
//
//    renderizarCarrito ();
//
//}
//
//const filtroPrecio = () => {
//
//    let bd = BBDD.filter(producto => producto.precio > 120)
//    console.log(bd);
//
//}
//
//const precioTotal = document.querySelector('#precioTotal')
//
//const renderTotal = () => {
//    let total = 0
//    carrito.forEach((producto) => {
//        total += producto.precio
//    })
//
//    precioTotal.innerText = total
//}
//
//
//const vaciarCarrito = () => {
//    carrito.length = 0
//
//    renderCarrito()
//    renderCantidad()
//    renderTotal()
//}
//
//btnVaciar.addEventListener('click', vaciarCarrito)


