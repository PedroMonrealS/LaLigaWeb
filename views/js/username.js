var banderaUsuario;

fetch('/user')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const username = data.username;
    if (!username) {
      document.getElementById('nombreUsuario').textContent = "🔒";
    } else {
      document.getElementById('nombreUsuario').textContent = 'Bienvenido ' + username;
      document.getElementById('pais').src = getPais(data.pais);
    }
  })
  .catch(error => {
    console.error('error:', error);
  });

function getPais(paisData) {
  var bandera;

  switch (paisData) {
    case "España":
      bandera = "https://img.icons8.com/?size=256&id=ZGEFKpJoPdJQ&format=png";
      break;
    case "Francia":
      bandera = "https://img.icons8.com/?size=256&id=5RtaKEr09Jy6&format=png";
      break;
    case "Alemania":
      bandera = "https://img.icons8.com/?size=256&id=OyqucOGoByl9&format=png";
      break;
    case "Italia":
      bandera = "https://img.icons8.com/?size=256&id=JfBHeXaPw7Gu&format=png";
      break;
    case "Reino_unido":
      bandera = "https://img.icons8.com/?size=256&id=xapj7ZzAUZKI&format=png";
      break;
    case "Portugal":
      bandera = "https://img.icons8.com/?size=48&id=U7gojzqjuzog&format=png";
      break;
    case "Suecia":
      bandera = "https://img.icons8.com/?size=256&id=INQZPwNNw3L8&format=png";
      break;
    case "Holanda":
      bandera = "https://img.icons8.com/?size=256&id=7Rco5PqWIoaC&format=png";
      break;
    case "Suiza":
      bandera = "https://img.icons8.com/?size=256&id=nz6Zx2vJbzRG&format=png";
      break;
    case "Noruega":
      bandera = "https://img.icons8.com/?size=256&id=JZr09lm1sOOE&format=png";
      break;
    default:
      bandera = " ";
      break;
  }

  banderaUsuario = bandera;
  return banderaUsuario;
}
