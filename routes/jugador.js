const express = require('express');
const jugadorSchema = require('../models/jugador')
const router = express.Router();
const upload = require('../src/libs/storage');

// Crear jugador
/* router.post('/jugadores', (req, res) => {
    const jugador = jugadorSchema(req.body);
    jugador.save()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => res.json({ mensaje: error }));
}); */

router.post('/jugadores', upload.fields([{ name: 'fotoJugador', maxCount: 1 }, { name: 'fotoJugadorPortada', maxCount: 1 }]), (req, res) => {
    const jugadorData = req.body;
    const jugador = new jugadorSchema(jugadorData);

    if (req.files['fotoJugador']) {
        jugador.setImgUrl(req.files['fotoJugador'][0].filename, 'fotoJugador');
    }
    if (req.files['fotoJugadorPortada']) {
        jugador.setImgUrl(req.files['fotoJugadorPortada'][0].filename, 'fotoJugadorPortada');
    }

    jugador.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});


//BACKEND


router.post('/jugadoresINSERT', (req, res) => {
    const nuevoJugador = new jugadorSchema(req.body);

    //Guardar el nuevo jugador en la base de datos
    nuevoJugador.save()
        .then((jugadorGuardado) => {
            //Mostrar popup y volver a backend
            res.send('<script>alert("Jugador guardado exitosamente"); window.location.href = "/backend";</script>');

        })
        .catch((error) => {
            res.status(500).json({ mensaje: 'Error al guardar el jugador', error: error });
        });
});


//LISTAR TODOS LOS JUGADORES

router.get('/jugadores', (req, res) => {
    jugadorSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;

//ACTUALIZAR UN JUGADOR POR ID


router.put('/jugadores/:id', (req, res) => {
    const {id} = req.params;
    const {idEquipo, nombreJugador, apellidosJugador, fechaNacimientoJugador, estaturaJugador, pesoJugador, nacionalidadJugador, posicionJugador, rolJugador, fotoJugador, fotoJugadorPortada } = req.body;
    jugadorSchema
    .updateOne({_id : id}, {$set: {idEquipo, nombreJugador, apellidosJugador, fechaNacimientoJugador, estaturaJugador, pesoJugador, nacionalidadJugador, posicionJugador, rolJugador, fotoJugador, fotoJugadorPortada }})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:(error)}))

});



//ACTUALIZAR POR BACKEND 
router.post('/jugadoresUPDATE', (req, res) => {
    const { ID, idEquipo, nombreJugador, apellidosJugador, fechaNacimientoJugador, estaturaJugador, pesoJugador, nacionalidadJugador, posicionJugador, rolJugador, fotoJugador, fotoJugadorPortada } = req.body;

    jugadorSchema
        .findByIdAndUpdate(ID, { idEquipo, nombreJugador, apellidosJugador, fechaNacimientoJugador, estaturaJugador, pesoJugador, nacionalidadJugador, posicionJugador, rolJugador, fotoJugador, fotoJugadorPortada }, { new: true })
        .then((equipoActualizado) => {
            res.send('<script>alert("Jugador actualizado exitosamente"); window.location.href = "/backend";</script>');
        })
        .catch((error) => {
            res.status(500).json({ mensaje: 'Error al actualizar el jugador', error: error });
        });
});



//BORRAR UN JUGADOR

router.delete('/jugadores/:id', (req, res) => {
    const {id} = req.params;
    jugadorSchema
    .deleteOne ({ _id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:(error)}))
});


//BORRAR POR BACKEND 
router.post('/jugadoresDELETE', (req, res) => {
    const { id } = req.body;
    const { confirmar } = req.body;
    console.log(req.body)
    console.log(id)

    if (confirmar === 'CONFIRMAR') {
        jugadorSchema
            .deleteOne({ _id: id })
            .then((data) => {
                if (data.deletedCount === 1) {
                    res.send('<script>alert("Jugador eliminado exitosamente"); window.location.href = "/backend";</script>');
                } else {
                    res.status(404).send('<script>alert("No se encontró el jugador con el ID proporcionado"); window.location.href = "/backend";</script>');
                }
            })
            .catch((error) => {
                res.status(500).send('<script>alert("Error al eliminar el jugador"); window.location.href = "/backend";</script>');
            });
    } else {
        res.status(400).send('<script>alert("Confirmación incorrecta. Por favor, escriba \'CONFIRMAR\' para eliminar el jugador."); window.location.href = "/backend";</script>');
    }
});
