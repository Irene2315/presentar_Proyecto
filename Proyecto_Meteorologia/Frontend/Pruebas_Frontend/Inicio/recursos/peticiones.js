async function registro(){
    let inputnombre = document.getElementById('nombreRegister').value;
    let inputemail = document.getElementById('emailRegister').value;
    let inputcontrasena = document.getElementById('contrasenaRegister').value;
    console.log(inputnombre + " " + inputemail + " " + inputcontrasena);
    try {
        const response = await fetch("http://localhost:8083/api/registro", {
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
          window.location.reload();

        }
      } catch (err) {
        console.error(err);
      }
}


async function logueo(){
    let inputemail = document.getElementById('emailLogin').value;
    let inputcontrasena = document.getElementById('contrasenaLogin').value;
    console.log(inputemail + " " + inputcontrasena);
    try {
        const response = await fetch("http://localhost:8083/api/logueo", {
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
          window.location.reload();

        }
      } catch (err) {
        console.error(err);
      }
}

