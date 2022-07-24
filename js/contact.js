/* BOTON SWITCH */
const btnSwitch = document.querySelector('#switch');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('white');
    btnSwitch.classList.toggle('active');
});

function capturar() {
    let nombre = document.querySelector("#exampleInputName").value;
    let apellido = document.querySelector("#exampleInputSurname").value;
    let numero = document.querySelector("#exampleInputNumber").value;
    let mail = document.querySelector("#exampleInputEmail").value;
    
    localStorage.setItem("nombre", nombre)
    localStorage.setItem("apellido", apellido)
    localStorage.setItem("numero", numero)
    localStorage.setItem("mail", mail)

    console.log(nombre, apellido, numero, mail)
}

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

