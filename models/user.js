const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre:{
        type: String
    },
    apellidos:{
        type: String
    },
    correo:{
        type: String
    },
    pais:{
        type: String
    },
    contrasena:{
        type: String
    },
    rol: {
        type: String,
        enum: ['usuario', 'administrador'],
        default: 'usuario'
    }
});

module.exports = mongoose.model('user', userSchema);
