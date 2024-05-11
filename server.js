const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
var path = require('path'); //LO USO PARA CSS
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());

app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos desde el directorio "views"
app.use(express.static("views"));

app.use('/public', express.static(`${__dirname}/src/uploads`))

// Middleware para analizar los cuerpos de las solicitudes codificados en URL
app.use(bodyParser.urlencoded({ extended: false }));



const rutasEquipo = require('./routes/equipo')
const rutasJugador = require('./routes/jugador')


app.use('/api', rutasEquipo);
app.use('/api', rutasJugador);




//Configuramos express-session
app.use(session({
    secret: '1212abab',
    resave: false,
    saveUninitialized: false
}));



// Middleware para guardar el rol del usuario en la sesión después del inicio de sesión
const saveUserRoleToSession = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.session.userRole = user.rol;
                req.session.pais = user.pais;
            }
        } catch (error) {
            console.error('Error al guardar el rol y el país del usuario en la sesión:', error);
        }
    }
    next();
};


// Middleware para verificar si el usuario tiene el rol de administrador
const requireAdminRole = (req, res, next) => {
    if (!req.session.userRole || req.session.userRole !== 'administrador') {
        res.sendFile(__dirname + '/views/acceso_denegado.html');
    } else {
        next();
    }
};




// Aplicar middleware para guardar el rol del usuario en la sesión
app.use(saveUserRoleToSession);

// Rutas sesión

// Página de inicio
app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, '/views/welcome.html'));
})

app.get('/inicio', (req, res) => {
    const id = req.query.id;
  
    res.sendFile(path.join(__dirname, '/views/inicio.html'));
  });

//PaginaEquipo con ID
app.get('/equipo', (req, res) => {
    const id = req.query.id;
  
    res.sendFile(path.join(__dirname, '/views/equipo.html'));
  });


// Mostrar formulario de registro
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

// Mostrar formulario de inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/user', (req, res) => {
    const userInfo = {
        username: req.session.username || '',
        pais: req.session.pais || ''
    };
    res.json(userInfo);
});


//RUTAS API

app.get("/backend",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/backend.html'))

app.get("/insertEquipos",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/insertEquipos.html'))

app.get("/updateEquipos",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/updateEquipos.html'))

app.get("/deleteEquipos",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/deleteEquipos.html'))

app.get("/insertJugadores",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/insertJugadores.html'))

app.get("/updateJugadores",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/updateJugadores.html'))

app.get("/deleteJugadores",requireAdminRole, (req,res) =>
res.sendFile(__dirname + '/views/deleteJugadores.html'))

// Registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, apellidos, correo, pais, contrasena } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            res.sendFile(__dirname + '/views/registered_ko.html'); // Usuario ya registrado
        } else {
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const newUser = new User({
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                pais: pais,
                contrasena: hashedPassword,
            });
            // Guardar el nuevo usuario en la base de datos
            await newUser.save();
            res.sendFile(__dirname + '/views/registered.html'); // Usuario registrado con éxito
        }
    } catch {
        console.error("Error en el registro");
        res.status(500).send('Internal server error');
    }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ correo });
        // Verificar si el usuario existe y la contraseña es correcta
        if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
            res.sendFile(__dirname + '/views/login_ko.html'); // Usuario no encontrado o contraseña incorrecta
        } else {
            req.session.userId = user._id; // guardar el id
            req.session.username = user.nombre; // guarda el nombre

            res.redirect('/'); // Redirigir al usuario a la página de inicio
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Internal server error');
    }
});



// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


//Conectarse a la base de datos 
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
