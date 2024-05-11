const mongoose = require('mongoose');

const jugadorSchema = mongoose.Schema({
    idEquipo:{
        type: String,
        required:true
    },
    nombreJugador:{
        type: String,
        required:true
    },
    apellidosJugador:{
        type: String,
        required:true
    },
    fechaNacimientoJugador:{
        type: String,
        required:true
    },
    fechaNacimientoJugador:{
        type: Number,
    },
    pesoJugador:{
        type: Number,
    },
    nacionalidadJugador:{
        type: String,
        required:true
    },
    posicionJugador:{
        type:String,
    },
    rolJugador:{
        type:String,
        required:true
    },
    fotoJugador:{
        type:String,
        required:true
    },
    fotoJugadorPortada:{
        type:String,
        required:true
    }
    
});

jugadorSchema.methods.setImgUrl = function setImgUrl(filename, field) {
    if (field === 'fotoJugador') {
        this.fotoJugador = `public/${filename}`;
    } else if (field === 'fotoJugadorPortada') {
        this.fotoJugadorPortada = `public/${filename}`;
    } else {
        throw new Error('Campo de imagen no válido');
    }
}

module.exports = mongoose.model('jugador', jugadorSchema);