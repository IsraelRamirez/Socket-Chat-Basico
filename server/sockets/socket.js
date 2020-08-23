const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utils')
const usuarios = new Usuarios()

io.on('connection', (client) => {

    console.log('Usuario conectado');
    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala)
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesarios'
            })
        client.join(usuario.sala)

        const newUsuarios = usuarios.agregarUsuario(client.id, usuario.nombre, usuario.sala)
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuarios.getUsuario(client.id).nombre} entró al chat`))
        client.broadcast.to(usuario.sala).emit('listaUsuarios', usuarios.getUsuariosBySala(usuario.sala))
        callback(newUsuarios)
    })

    client.on('crearMensaje', (data, callback) => {
        const usuario = usuarios.getUsuario(client.id)
        callback(crearMensaje(usuario.nombre, data.mensaje))
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje(usuario.nombre, data.mensaje))
    })

    client.on('mensajePrivado', data => {
        const usuario = usuarios.getUsuario(client.id)

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(usuario.nombre, data.mensaje))
    })
    client.on('disconnect', () => {
        const usuarioDesconectado = usuarios.deleteUsuario(client.id)

        client.broadcast.to(usuarioDesconectado.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuarioDesconectado.nombre} abandonó el chat`))
        client.broadcast.to(usuarioDesconectado.sala).emit('listaUsuarios', usuarios.getUsuariosBySala(usuarioDesconectado.sala))
    })

})