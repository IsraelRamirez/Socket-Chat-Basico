class Usuarios {
    constructor() {
        this.usuarios = []
    }
    agregarUsuario(id, nombre, sala) {
        const usuario = { id, nombre, sala }
        this.usuarios.push(usuario)
        return this.getUsuariosBySala(sala)
    }
    getUsuario(id) {
        const usuario = this.usuarios.filter((usuario) => usuario.id === id)[0]

        return usuario
    }

    getUsuarios() {
        return this.usuarios
    }

    getUsuariosBySala(sala) {
        return this.usuarios.filter(usuario => usuario.sala === sala)
    }

    deleteUsuario(id) {
        const deleteUsuario = this.getUsuario(id)

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)

        return deleteUsuario
    }
}

module.exports = {
    Usuarios
}