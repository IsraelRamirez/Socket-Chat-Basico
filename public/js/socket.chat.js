var socket = io();

const getParams = (fullurl) => {
    const url = new URL(fullurl)

    const nombre = url.searchParams.get('nombre')
    const sala = url.searchParams.get('sala')

    if (!nombre || !sala) {
        window.location.href = 'index.html'
        return new Error('El nombre y sala son necesarios')
    }

    return {
        nombre,
        sala
    }
}

socket.on('connect', function() {

    socket.emit('entrarChat', getParams(window.location.href), function(msg) {
        renderUsers(msg, getParams(window.location.href).sala)
    })
    console.log('Conectado al servidor')

});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor')

})

socket.on('crearMensaje', (msg) => {
    renderMsg(msg, false)
})


//socket.emit('mensajePrivado, {para: <id>, mensaje: <mensaje>})
socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado ', mensaje);
})

socket.on('listaUsuarios', (msg) => {
    renderUsers(msg, getParams(window.location.href).sala)
})