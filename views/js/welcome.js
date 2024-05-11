
//Barra abajo
var footer = document.createElement("div");
footer.classList.add("footer");
var texto = document.createElement("h1");
texto.textContent = ("Pedro Monreal Sánchez");
footer.appendChild(texto);
document.body.appendChild(footer);


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

let datos;

axios.get('http://localhost:3000/api/jugadores', {
        responseType: 'json'

})
    .then(function(res) {
        if(res.status==200) {
          console.log(res.data);
          datos = res.data;
          empezar();
        }
    })
    .catch(function (err) {
        console.log(err);

})

function empezar() {
  var slider = document.getElementById("slider");
  var nombreFoto = document.getElementById("nombreFoto");

  for (var e = 0; e < datos.length; e++) {
    var fotoJugador = document.createElement("div");
    fotoJugador.style.display = "none";
    fotoJugador.classList.add("divFoto");
    fotoJugador.style.backgroundImage = "url('" + datos[e].fotoJugadorPortada + "')";
    var nombreFoto = document.createElement("h1");
    nombreFoto.textContent = datos[e].nombreJugador + " " + datos[e].apellidosJugador;
    fotoJugador.appendChild(nombreFoto);
    fotoJugador.id = e;
    slider.appendChild(fotoJugador);
  }

  var fotos = slider.querySelectorAll('.divFoto'); //Para actuar sobre todos los elementos

  function mostrarFotoAleatoria() {
    fotos.forEach(function(foto) {
      foto.style.display = "none";
    });
    var randomIndex = Math.floor(Math.random() * datos.length);
    fotos[randomIndex].style.display = "block";
    nombreFoto.textContent = datos[randomIndex].nombreJugador + " " + datos[randomIndex].apellidosJugador;

  }

  mostrarFotoAleatoria();

  setInterval(mostrarFotoAleatoria, 1000);
}
