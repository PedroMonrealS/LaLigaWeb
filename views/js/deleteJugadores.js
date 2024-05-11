//Flecha atrás
var icono = document.createElement("i");
icono.classList.add("fa-solid", "fa-arrow-left");
icono.setAttribute("onclick", "volver()");
var elemento = document.body.firstChild;
document.body.insertBefore(icono, elemento);


function volver() {
  window.location.href = '/backend'
}

axios.get('http://localhost:3000/api/jugadores', {
        responseType: 'json'

})
    .then(function(res) {
        if(res.status==200) {
          console.log(res.data);
          datosJugadores(res.data);
        }
    })
    .catch(function (err) {
        console.log(err);

})


function datosJugadores(data) {
  var plantillaData = document.createElement("div");
  var equipo = document.getElementById("jugadores")
  plantillaData.classList.add("plantillaData")
  equipo.appendChild(plantillaData);

  for (var e = 0; e < data.length; e++) {
    var boton = document.createElement("button");
    boton.id = e;
    boton.classList.add("eliminarButton");
    boton.textContent = "Eliminar";
    var jugador = document.createElement("div");
    jugador.classList.add("jugador");
    var jugador_ = document.createElement("div");
    jugador_.classList.add("jugador_");
    var jugadorDatos = document.createElement("div");
    jugadorDatos.classList.add("jugadorDatos");
    var posicionJugador = document.createElement("h1");
    posicionJugador.textContent = data[e].posicionJugador;
    posicionJugador.classList.add("posicionJugador");
    var posicionDIV = document.createElement("div");
    posicionDIV.appendChild(posicionJugador);
    posicionDIV.classList.add("posicionDIV");
    var nombreJugador = document.createElement("h1");
    nombreJugador.textContent = data[e].nombreJugador + " " + data[e].apellidosJugador
    var cargoJugador = document.createElement("h1");
    cargoJugador.textContent = data[e].rolJugador;
    jugadorDatos.appendChild(cargoJugador);
    cargoJugador.classList.add("cargoJugador");
    var nacionalidadJugador = document.createElement("h1");
    nacionalidadJugador.textContent = "Nacionalidad: " + data[e].nacionalidadJugador;
    var fechaNacimiento = document.createElement("h1");
    fechaNacimiento.textContent = "Fecha Nacimiento : " + data[e].fechaNacimientoJugador;
    var estaturaJugador = document.createElement("h1");
    estaturaJugador.textContent = "Estatura : " + data[e].estaturaJugador + "cm";
    var pesoJugador = document.createElement("h1");
    pesoJugador.textContent = "Peso : " + data[e].pesoJugador + "Kg";
    jugador.style.backgroundImage = "url('" + data[e].fotoJugador + "')";
    jugador.appendChild(boton);
    jugador.appendChild(cargoJugador);
    jugador.appendChild(jugador_);
    jugador_.appendChild(jugadorDatos)
    jugadorDatos.appendChild(nombreJugador);
    plantillaData.appendChild(jugador);
    jugador_.appendChild(posicionDIV);
    jugadorDatos.appendChild(nacionalidadJugador);
    jugadorDatos.appendChild(fechaNacimiento);
    jugadorDatos.appendChild(estaturaJugador);
    jugadorDatos.appendChild(pesoJugador);



    boton.addEventListener('click', function (event) {
      var idElemento = event.target.id;
      console.log("El ID del elemento es: " + idElemento);
      var ID = document.getElementById("inputID");
      ID.value = data[idElemento]._id;

      window.scrollTo({
        top: 0,
      });


    });

  }
}
