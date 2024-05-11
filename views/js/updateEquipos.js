//Flecha atrás
var icono = document.createElement("i");
icono.classList.add("fa-solid", "fa-arrow-left");
icono.setAttribute("onclick", "volver()");
var elemento = document.body.firstChild;
document.body.insertBefore(icono, elemento);


function volver() {
  window.location.href = '/backend'
}
axios.get('http://localhost:3000/api/equipos', {
        responseType: 'json'

})
    .then(function(res) {
        if(res.status==200) {
          console.log(res.data);
          mostrar(res.data);
        }
    })
    .catch(function (err) {
        console.log(err);

})


function mostrar(data) {

  var datos = document.getElementById("datos");

  for (var i = 0; i < data.length; i++) {
    var boton = document.createElement("button");
    boton.id = i;
    boton.classList.add("actualizarButton");
    boton.textContent = "Actualizar";
    var equipo = document.createElement("div");
    var dat = document.createElement("div");
    equipo.classList.add("equipoExistente");
    dat.classList.add("datosEquipo");
    var imageUrl = data[i].fotoEscudo;
    equipo.style.backgroundImage = "url('" + imageUrl + "')";

    var nombreEquipo = document.createElement("h1");
    nombreEquipo.textContent = "Nombre equipo: " + data[i].nombreEquipo;
    var nombreEstadio = document.createElement("h1");
    nombreEstadio.textContent = "Nombre estadio: " + data[i].nombreEstadio;
    var capacidadEstadio = document.createElement("h1");
    capacidadEstadio.textContent = "Capacidad estadio: " + data[i].capacidadEstadio;
    var anoFundacion = document.createElement("h1");
    anoFundacion.textContent = "Año fundación: " + data[i].anoFundacion + "";
    var fotoEstadio = document.createElement("img");
    fotoEstadio.src = data[i].fotoEstadio;
    fotoEstadio.classList.add("fotoEstadio");

    datos.appendChild(equipo);
    equipo.appendChild(dat);
    dat.appendChild(boton);
    dat.appendChild(nombreEquipo);
    dat.appendChild(nombreEstadio);
    dat.appendChild(capacidadEstadio);
    dat.appendChild(anoFundacion);
    dat.appendChild(fotoEstadio);

    boton.addEventListener('click', function (event) {
      var idElemento = event.target.id;
      console.log("El ID del elemento es: " + idElemento);
      var ID = document.getElementById("inputID");
      ID.value = data[idElemento]._id;

      var nombreEquipo = document.getElementById("nombreEquipo");
      nombreEquipo.value = data[idElemento].nombreEquipo;

      var nombreEstadio = document.getElementById("nombreEstadio");
      nombreEstadio.value = data[idElemento].nombreEstadio;

      var capacidadEstadio = document.getElementById("capacidadEstadio");
      capacidadEstadio.value = data[idElemento].capacidadEstadio;

      var anoFundacion = document.getElementById("anoFundacion");
      console.log("Valor de anoFundacion en data: " + data[idElemento].anoFundacion);
      anoFundacion.value = data[idElemento].anoFundacion;

      var fotoEscudo = document.getElementById("fotoEscudo");
      fotoEscudo.value = data[idElemento].fotoEscudo;

      var fotoEstadio = document.getElementById("fotoEstadio");
      fotoEstadio.value = data[idElemento].fotoEstadio;

      window.scrollTo({
        top: 0,
      });
    });

  }
}
