const mongoose = require('mongoose');

const equipoSchema = mongoose.Schema({
    nombreEquipo:{
        type: String,
        required:true
    },
    nombreEstadio:{
        type: String,
        required:true
    },
    capacidadEstadio:{
        type: Number,
        required:true
    },
    anoFundacion:{
        type: Number,
        required:true
    },
    fotoEscudo:{
        type: String,
        required:true
    },
    fotoEstadio:{
        type: String,
        required:true
    },
});


/* equipoSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.fotoEscudo = `public/${filename}`;
} */

equipoSchema.methods.setImgUrl = function setImgUrl(filename, field) {
    if (field === 'fotoEscudo') {
        this.fotoEscudo = `public/${filename}`;
    } else if (field === 'fotoEstadio') {
        this.fotoEstadio = `public/${filename}`;
    } else {
        throw new Error('Campo de imagen no válido');
    }
}


module.exports = mongoose.model('equipo', equipoSchema);