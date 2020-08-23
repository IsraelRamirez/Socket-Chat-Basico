const divUsuarios = document.querySelector('#divUsuarios')
const formMensaje = document.querySelector('#enviar')
const inputMensaje = formMensaje.querySelector('input')
const chatMensaje = document.querySelector('#divChatbox')
const titulo = document.querySelector('#titulo')

formMensaje.addEventListener('submit', (e) => {
    e.preventDefault()
    const mensaje = inputMensaje.value.trim()
    if (mensaje) {
        socket.emit('crearMensaje', { usuario: getParams(window.location.href).nombre, mensaje }, (mensaje) => {
            renderMsg(mensaje, true)
            inputMensaje.value = ""
        })

    }

})

function renderMsg(mensaje, isMe) {
    const newMsg = document.createElement('li')
    newMsg.innerHTML = ""
    const date = new Date(mensaje.fecha)
    let color = 'info'
    if (mensaje.nombre === 'Administrador')
        color = 'danger'

    if (isMe) {
        newMsg.className = 'reverse'
        newMsg.innerHTML = `
        <div class="chat-content">
            <h5>Yo</h5>
            <div class="box bg-light-inverse">${mensaje.mensaje}</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"></div>
        <div class="chat-time">${date.getHours()}:${date.getMinutes()} </div>
        `

    } else {
        if (mensaje.nombre !== 'Administrador')
            newMsg.innerHTML =
            '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        newMsg.innerHTML +=
            `<div class="chat-content">
        <h5>${mensaje.nombre}</h5>
        <div class="box bg-light-${color}">${mensaje.mensaje}</div>
    </div>
    <div class="chat-time">${date.getHours()}:${date.getMinutes()} </div>
    `
    }


    chatMensaje.appendChild(newMsg)
    scrollBottom()

}

function renderUsers(usuarios, sala) {

    const htmlChat = document.createElement('li')
    htmlChat.innerHTML = '<a href="javascript:void(0)" class="active"> Chat de <span>' + sala.toUpperCase() + '</span></a>'
    divUsuarios.innerHTML = ""
    divUsuarios.appendChild(htmlChat)
    titulo.textContent = sala
    usuarios.forEach(usuario => {
        const htmlUser = document.createElement('li')
        htmlUser.innerHTML = `
    <a data-id="${usuario.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${usuario.nombre} <small class="text-success">online</small></span></a>`
        divUsuarios.appendChild(htmlUser)
    })
    const htmlP = document.createElement('li')
    htmlP.className = "p-20"
    divUsuarios.appendChild(htmlP)
}

function scrollBottom() {
    const divChatbox = $('#divChatbox')
        // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}