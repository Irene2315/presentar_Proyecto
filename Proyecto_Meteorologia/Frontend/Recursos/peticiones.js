//Está variable recogerá la IP del servidor independiente si cambia o no
var nombreHost = new URL (window.location.origin).hostname;

//Función que recogerá los datos de registro y los guardara en la base de datos
async function registro() {

  let inputnombre = document.getElementById('nombreRegister').value;
  let inputemail = document.getElementById('emailRegister').value;
  let inputcontrasena = document.getElementById('contrasenaRegister').value;
  console.log(inputnombre + " " + inputemail + " " + inputcontrasena);

  try {
    //Una vez recibidos todos los datos se enviaran al fecht
    const response = await fetch(`http://${nombreHost}:8083/api/registro`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //El cuerpo serán los datos que ha enviado el usuario 
      body: JSON.stringify({
        name: inputnombre,
        email: inputemail,
        password: inputcontrasena
      })
    });

    if (response.ok) {
      //Si el resultado es correcto solicitaremos el token de sesión del usuario y activaremos el formulario principal 
      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.access_token);

      $("#BodyPortada").css("display", "none");
      $("#BodyLoginForm").css("display", "block");
      
    } else {
      //Sino veremos que fallos ha habido en la petición 
      console.error('Registro fallido:', response.status);

    }
  } catch (err) {
    console.error(err);

  }
}


//Está función verificará si el usuario está logueado 
async function logueo() {
  //Recogeremos todos los datos introducidos en el formulario de login
  let inputemail = document.getElementById('emailLogin').value;
  let inputcontrasena = document.getElementById('contrasenaLogin').value;
  console.log(inputemail + " " + inputcontrasena);
  try {
    //El fect esperará hasta que se llenen todos los datos
    const response = await fetch(`http://${nombreHost}:8083/api/logueo`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //Enviare los datos recogidos en el encabezado en el cuerpo de la solicitud
        email: inputemail,
        password: inputcontrasena

      })
    });

    if (response.ok) {
      //Si el logueo es correcto recogeremos el token de la sesión 
      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.access_token);
      $("#BodyPortada").css("display", "none");
      $("#BodyLoginForm").css("display", "block");
      

    }
  } catch (err) {
    //Sino nos dará detalles del error
    console.error(err);
  }
}

//Está función cerrará la sesión del usuario (estado producción)

async function CierreSesion() {
  //Recibirá el token del usuario
  var tokenUsuario = localStorage.getItem('token');

  const options = {
    method: 'GET',
    //Lo enviaremos en el encabezado 
    headers: {
      Authorization: `Bearer ${tokenUsuario}`
    }
  };


  
    //El  esperará a recibir el token para cerrar la sesión 
    const response = await fetch(`http://${nombreHost}:8083/api/cerrarSesion`, options)
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      //Desactivaremos el formulario y el de resultados y activaremos la página de bienvenida 
      $("#BodyPortada").css("display", "block");
      $("#BodyLoginForm").css("display", "none");
      $("#bodyLoginResultados").css("display", "none");
      //Por último limpiaremos el local storage 
      localStorage.clear();
    }
}


