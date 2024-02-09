var nombreHost = new URL (window.location.origin).hostname;

async function registro() {

  let inputnombre = document.getElementById('nombreRegister').value;
  let inputemail = document.getElementById('emailRegister').value;
  let inputcontrasena = document.getElementById('contrasenaRegister').value;
  console.log(inputnombre + " " + inputemail + " " + inputcontrasena);

  try {
    const response = await fetch(`http://${nombreHost}:8083/api/registro`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputnombre,
        email: inputemail,
        password: inputcontrasena
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.access_token);

      $("#BodyPortada").css("display", "none");
      $("#BodyLoginForm").css("display", "block");
      
    } else {
      console.error('Registro fallido:', response.status);

    }
  } catch (err) {
    console.error(err);

  }
}



async function logueo() {
  let inputemail = document.getElementById('emailLogin').value;
  let inputcontrasena = document.getElementById('contrasenaLogin').value;
  console.log(inputemail + " " + inputcontrasena);
  try {
    const response = await fetch(`http://${nombreHost}:8083/api/logueo`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputemail,
        password: inputcontrasena

      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.access_token);
      $("#BodyPortada").css("display", "none");
      $("#BodyLoginForm").css("display", "block");
      

    }
  } catch (err) {
    console.error(err);
  }
}
/*
async function CierreSesion() {
  var tokenUsuario = localStorage.getItem('token');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenUsuario}`
    }
  };


  
    //Lugares Selecionados por el usuario
    const response = await fetch(`http://${nombreHost}:8083/api/cerrarSesion`, options)
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      $("#BodyPortada").css("display", "block");
      $("#BodyLoginForm").css("display", "none");
      localStorage.clear();
    }
}*/


