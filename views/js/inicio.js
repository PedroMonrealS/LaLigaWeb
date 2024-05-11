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

  for (i = 0; i < data.length; i++) {
    var equipo = document.createElement("div");
    equipo.id = i;
    equipo.addEventListener("click", function () {
      clickEquipo(this.id);
    });

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
    capacidadEstadio.textContent = "Capacidad estadio: " + data[i].capacidadEstadio + " espectadores";
    var fotoEstadio = document.createElement("img");
    fotoEstadio.src = data[i].fotoEstadio;


    fotoEstadio.classList.add("fotoEstadio");

    datos.appendChild(equipo);
    equipo.appendChild(dat);
    dat.appendChild(nombreEquipo);
    dat.appendChild(nombreEstadio);
    dat.appendChild(capacidadEstadio);
    dat.appendChild(fotoEstadio);

  }
}


//Barra abajo
var footer = document.createElement("div");
footer.classList.add("footer");
var texto = document.createElement("h1");
texto.textContent = ("Pedro Monreal Sánchez");
footer.appendChild(texto);


document.body.appendChild(footer);

function clickEquipo(id) {
  console.log(id);


  window.location.href = "/equipo?id=" + id;
}


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