//Flecha atrás
var icono = document.createElement("i");
icono.classList.add("fa-solid", "fa-arrow-left");
icono.setAttribute("onclick", "volver()");
var elemento = document.body.firstChild;
document.body.insertBefore(icono, elemento);


function volver() {
    window.location.href = '/inicio'
}


var equiposData;
var jugadoresData;
var equipoID;

function subir() {
    var tapa = document.getElementById("tapa");
    var foto = document.getElementById("foto");

    tapa.style.opacity = "0%";

    setTimeout(function () {
        tapa.style.display = "none";
    }, 1000);


}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        subir();
    }, 1000);
})

function obtenerDatosEquipos() {
    axios.get('http://localhost:3000/api/equipos', {
        responseType: 'json'

})
    .then(function(res) {
        if(res.status==200) {
            console.log(res.data);
            equiposData = res.data;
            obtenerDatosJugadores();
            mostrarEquipo(res.data);
        }
    })
    .catch(function (err) {
        console.log(err);

})
}
function obtenerDatosJugadores() {

    axios.get('http://localhost:3000/api/jugadores', {
        responseType: 'json'

})
    .then(function(res2) {
        if(res2.status==200) {
            jugadoresData = res2.data;
            plantilla(res2.data);
            console.log(res2.data);
        }
    })
    .catch(function (err) {
        console.log(err);

})
}

function mostrarEquipo(data) {
    var navbar = document.getElementById("navbar");
    navbar.style.display = "flex";
    const urlParams = new URLSearchParams(window.location.search);
    equipoID = urlParams.get('id');
    const i = equipoID;

    var equipo = document.createElement("div");
    var equipoINTRO = document.createElement("div");
    equipoINTRO.classList.add("equipoINTRO");

    equipo.id = "equipo";
    equipo.classList.add("equipo");
    var datosEquipo = document.createElement("div")
    var datosEquipo_ = document.createElement("div");
    datosEquipo.classList.add("datosEquipo");
    datosEquipo_.classList.add("datosEquipo_");
    datosEquipo_.style.backgroundImage = "url('" + data[i].fotoEstadio + "')";

    var nombreEquipo = document.createElement("h1");
    nombreEquipo.textContent = data[i].nombreEquipo;
    nombreEquipo.classList.add("nombreEquipo");
    var fotoEscudo = document.createElement("img");
    fotoEscudo.src = data[i].fotoEscudo;
    fotoEscudo.classList.add("fotoEscudo");
    var nombreEstadio = document.createElement("h1");
    nombreEstadio.classList.add("nombreEstadio");
    nombreEstadio.textContent = data[i].nombreEstadio;
    var capacidadEstadio = document.createElement("h1");
    capacidadEstadio.textContent = "Capacidad estadio:" + data[i].capacidadEstadio + " personas";
    var anoFundacion = document.createElement("h1");
    anoFundacion.textContent = "Fundado en " + data[i].anoFundacion;
    datosEquipo.appendChild(nombreEquipo);
    datosEquipo.appendChild(fotoEscudo);
    datosEquipo.appendChild(nombreEstadio);
    datosEquipo.appendChild(capacidadEstadio);
    datosEquipo.appendChild(anoFundacion);
    equipo.appendChild(equipoINTRO);
    equipoINTRO.appendChild(datosEquipo_)
    datosEquipo_.appendChild(datosEquipo);

    var pos = document.getElementById("datos");
    pos.appendChild(equipo);
}

const orden = ["Presidente", "Entrenador", "Capitán", "Jugador"]

function plantilla(data) {
    var plantillaData = document.createElement("div");
    var equipo = document.getElementById("jugadores")
    plantillaData.classList.add("plantillaData")
    plantillaData.id = "plantillaData";
    equipo.appendChild(plantillaData);

    for (var ordens = 0; ordens < orden.length; ordens++) {
        for (var jugador = 0; jugador < jugadoresData.length; jugador++) {
            if (jugadoresData[jugador] && jugadoresData[jugador].rolJugador === orden[ordens]) {
                crearElementoJugador(jugador)
            }
        }
    }
}

obtenerDatosEquipos();

function crearElementoJugador(jugador) {
    if (jugadoresData[jugador] && jugadoresData[jugador].idEquipo === equiposData[equipoID]._id) {

        var plantillaData = document.getElementById("plantillaData");
        var jugadorDiv = document.createElement("div");
        jugadorDiv.id = jugador;
        jugadorDiv.addEventListener("click", function () {
            mostrarJugadorExclusivo(this.id);
        })


        jugadorDiv.classList.add("jugador");
        var jugador_ = document.createElement("div");
        jugador_.classList.add("jugador_");
        var jugadorDatos = document.createElement("div");
        jugadorDatos.classList.add("jugadorDatos");
        var posicionJugador = document.createElement("h1");


        if (jugadoresData[jugador].rolJugador == "Presidente" || jugadoresData[jugador].rolJugador == "Entrenador") {

            posicionJugador.textContent = jugadoresData[jugador].rolJugador;
            posicionJugador.classList.add("posicionJugador");
            var posicionDIV = document.createElement("div");
            posicionDIV.appendChild(posicionJugador);
            posicionDIV.classList.add("posicionDIV");

    
        }
        else
        {


        posicionJugador.textContent = jugadoresData[jugador].posicionJugador;
        posicionJugador.classList.add("posicionJugador");
        var posicionDIV = document.createElement("div");
        posicionDIV.appendChild(posicionJugador);
        posicionDIV.classList.add("posicionDIV");
    }
        var nombreJugador = document.createElement("h1");
        nombreJugador.textContent = jugadoresData[jugador].nombreJugador + " " + jugadoresData[jugador].apellidosJugador
        var fotoJugador = document.createElement("img");
        fotoJugador.classList.add("fotoJugador");
        fotoJugador.src = jugadoresData[jugador].fotoJugador;
        fotoJugador.classList.add("fotoJugador");
        var cargoJugador = document.createElement("h1");
        cargoJugador.textContent = jugadoresData[jugador].rolJugador;
        jugadorDatos.appendChild(cargoJugador);
        cargoJugador.classList.add("cargoJugador");
        var nacionalidadJugador = document.createElement("h1");
        nacionalidadJugador.textContent = "Nacionalidad: " + jugadoresData[jugador].nacionalidadJugador;
    
        if (jugadoresData[jugador].rolJugador === "Presidente") {

            cargoJugador.style.backgroundColor = "#E3C05F";
            posicionDIV.style.backgroundColor = "#E3C05F";
        } else if
            (jugadoresData[jugador].rolJugador === "Entrenador") {

            cargoJugador.style.backgroundColor = "#E3C4AB";
            posicionDIV.style.backgroundColor = "#E3C4AB";


        } else if
            (jugadoresData[jugador].rolJugador === "Capitán") {

            cargoJugador.style.backgroundColor = "#E36C5F";
            posicionDIV.style.backgroundColor = "#E36C5F";

        }

        jugadorDiv.appendChild(cargoJugador);
        jugadorDiv.appendChild(jugador_);
        jugador_.appendChild(jugadorDatos)
        jugadorDatos.appendChild(nombreJugador);
        plantillaData.appendChild(jugadorDiv);
        jugador_.appendChild(fotoJugador);
        jugador_.appendChild(posicionDIV);
        jugadorDatos.appendChild(nacionalidadJugador);
    }
}



function calcularEdad(fechaNacimiento) {
    var fechaNacimiento = new Date(fechaNacimiento);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (fechaNacimiento.getMonth() > fechaActual.getMonth() || (fechaNacimiento.getMonth() === fechaActual.getMonth() && fechaNacimiento.getDate() > fechaActual.getDate())) {
        edad--;
    }
    return edad;
}

function mostrarJugadorExclusivo(jugadorID) {
    var navbar = document.getElementById("navbar");
    navbar.style.display = "none";
    var divgeneralNuevo = document.getElementById("nuevoDiv");
    var cruz = document.createElement("i");
    cruz.classList.add("cruz");
    cruz.classList.add("fa-solid");
    cruz.classList.add("fa-x");
    cruz.addEventListener("click", function () {
        location.reload();
    })

    divgeneralNuevo.appendChild(cruz);
    divgeneralNuevo.style.backgroundImage = "url('" + equiposData[equipoID].fotoEstadio + "')";


    var divOcultar = document.getElementById("general")
    divOcultar.style.display = "none";
    console.log(jugadorID)

    var DIVJugadorNuevo = document.createElement("div");
    DIVJugadorNuevo.classList.add("DIVJugadorNuevo");
    var DIVJugador = document.createElement("div");
    DIVJugador.classList.add("divJugador")
    var nombreJugador = document.createElement("h1");
    nombreJugador.textContent = jugadoresData[jugadorID].nombreJugador + " " + jugadoresData[jugadorID].apellidosJugador;
    var fechaNacimiento = document.createElement("h1");
    fechaNacimiento.textContent = "Edad: " + calcularEdad(jugadoresData[jugadorID].fechaNacimientoJugador) + " años "
    var nacionalidad = document.createElement("h1");
    nacionalidad.textContent = "Nacionalidad: " + jugadoresData[jugadorID].nacionalidadJugador;
    if (jugadoresData[jugadorID].rolJugador != "Jugador") {
        var rol = document.createElement("h1");
        rol.textContent = jugadoresData[jugadorID].rolJugador;
        DIVJugador.appendChild(rol);

    }
    var datosarriba = document.createElement("div");
    datosarriba.classList.add("datosarriba");
    datosarriba.appendChild(nombreJugador);

    if (jugadoresData[jugadorID].rolJugador !== "Presidente" && jugadoresData[jugadorID].rolJugador !== "Entrenador") {
        var posicion = document.createElement("h1");
        posicion.textContent = jugadoresData[jugadorID].posicionJugador;
        DIVJugador.appendChild(posicion);
    }
    DIVJugador.appendChild(datosarriba);
    var fotoJugador = document.createElement("img");
    fotoJugador.src = jugadoresData[jugadorID].fotoJugador;
    fotoJugador.classList.add("fotoJugador");
    DIVJugador.appendChild(fotoJugador);
    DIVJugador.appendChild(fechaNacimiento);
    DIVJugador.appendChild(nacionalidad);


    if (jugadoresData[jugadorID].rolJugador !== "Presidente" && jugadoresData[jugadorID].rolJugador !== "Entrenador") {
        var estatura = document.createElement("h1");
        estatura.textContent = "Estatura: " + jugadoresData[jugadorID].estaturaJugador + " cm";
        var peso = document.createElement("h1");
        peso.textContent = "Peso: " + jugadoresData[jugadorID].pesoJugador + "Kg";
        DIVJugador.appendChild(estatura);
        DIVJugador.appendChild(peso);

    }







    DIVJugadorNuevo.appendChild(DIVJugador);
    var DIVlugar = document.getElementById("DIVdatos");
    DIVlugar.appendChild(DIVJugadorNuevo);


    var DIVFOTO = document.getElementById("DIVoto")
    var foto = document.createElement("img");
    foto.src = jugadoresData[jugadorID].fotoJugadorPortada;
    DIVfoto.appendChild(foto);

}