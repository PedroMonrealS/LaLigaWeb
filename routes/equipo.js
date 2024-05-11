const express = require('express');
const equipoSchema = require('../models/equipo')
const router = express.Router();
const upload = require('../src/libs/storage');

// Crear equipo
/* router.post('/equipos', upload.single('fotoEscudo'), (req, res) => {
    const equipo = equipoSchema(req.body)
    if(req.file){
        const{filename}=req.file
        equipo.setImgUrl(filename)
    }
    equipo.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
}); */

router.post('/equipos', upload.fields([{ name: 'fotoEscudo', maxCount: 1 }, { name: 'fotoEstadio', maxCount: 1 }]), (req, res) => {
    const equipoData = req.body;
    const equipo = new equipoSchema(equipoData);

    if (req.files['fotoEscudo']) {
        equipo.setImgUrl(req.files['fotoEscudo'][0].filename, 'fotoEscudo');
    }
    if (req.files['fotoEstadio']) {
        equipo.setImgUrl(req.files['fotoEstadio'][0].filename, 'fotoEstadio');
    }

    equipo.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});



//BACKEND


router.post('/equiposINSERT', (req, res) => {
    const nuevoEquipo = new equipoSchema(req.body);

    //Guardar el nuevo equipo en la base de datos
    nuevoEquipo.save()
        .then((equipoGuardado) => {
            //Mostrar popup y volver a backend
            res.send('<script>alert("Equipo guardado exitosamente"); window.location.href = "/backend";</script>');

        })
        .catch((error) => {
            res.status(500).json({ mensaje: 'Error al guardar el equipo', error: error });
        });
});


router.post('/equiposINSERT', (req, res) => {
    const nuevoEquipo = new equipoSchema(req.body);

    //Guardar el nuevo equipo en la base de datos
    nuevoEquipo.save()
        .then((equipoGuardado) => {
            //Mostrar popup y volver a backend
            res.send('<script>alert("Equipo guardado exitosamente"); window.location.href = "/backend";</script>');

        })
        .catch((error) => {
            res.status(500).json({ mensaje: 'Error al guardar el equipo', error: error });
        });
});


//LISTAR TODOS LOS EQUIPOS

router.get('/equipos', (req, res) => {
    equipoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})



//ACTUALIZAR UN EQUIPO POR ID

router.put('/equipos/:id', (req, res) => {
    const {id} = req.params;
    const {nombreEquipo, nombreEstadio, capacidadEstadio, anoFundacion, fotoEscudo, fotoEstadio} = req.body;
    equipoSchema
    .updateOne({_id : id}, {$set: { nombreEquipo, nombreEstadio, capacidadEstadio, anoFundacion, fotoEscudo, fotoEstadio}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:(error)}))

});



//ACTUALIZAR POR BACKEND 
router.post('/equiposUPDATE', (req, res) => {
    const { ID, nombreEquipo, nombreEstadio, capacidadEstadio, anoFundacion, fotoEscudo, fotoEstadio } = req.body;

    equipoSchema
        .findByIdAndUpdate(ID, { nombreEquipo, nombreEstadio, capacidadEstadio, anoFundacion, fotoEscudo, fotoEstadio }, { new: true })
        .then((equipoActualizado) => {
            res.send('<script>alert("Equipo actualizado exitosamente"); window.location.href = "/backend";</script>');
        })
        .catch((error) => {
            res.status(500).json({ mensaje: 'Error al actualizar el equipo', error: error });
        });
});



//BORRAR UN EQUIPO

router.delete('/equipos/:id', (req, res) => {
    const {id} = req.params;
    equipoSchema
    .deleteOne ({ _id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message:(error)}))
});


//BORRAR POR BACKEND 
router.post('/equiposDELETE', (req, res) => {
    const { id } = req.body;
    const { confirmar } = req.body;
    console.log(req.body)
    console.log(id)

    if (confirmar === 'CONFIRMAR') {
        equipoSchema
            .deleteOne({ _id: id })
            .then((data) => {
                if (data.deletedCount === 1) {
                    res.send('<script>alert("Equipo eliminado exitosamente"); window.location.href = "/backend";</script>');
                } else {
                    res.status(404).send('<script>alert("No se encontró el equipo con el ID proporcionado"); window.location.href = "/backend";</script>');
                }
            })
            .catch((error) => {
                res.status(500).send('<script>alert("Error al eliminar el equipo"); window.location.href = "/backend";</script>');
            });
    } else {
        res.status(400).send('<script>alert("Confirmación incorrecta. Por favor, escriba \'CONFIRMAR\' para eliminar el equipo."); window.location.href = "/backend";</script>');
    }
});



module.exports = router;
