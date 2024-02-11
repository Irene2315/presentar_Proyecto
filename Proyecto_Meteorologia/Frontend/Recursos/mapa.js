//Definimos el array que guardara los lugares seleccionados y el set que guardara aquellos que no se repiten 
//Definimos el host del servidor que se ajustará en base a la IP del servidor principal aunque la IP halla cambiado 
var lugaresSeleccionados = [];
var lugaresSeleccionadosUnicos = new Set(lugaresSeleccionados);
var nombreHost = new URL (window.location.origin).hostname;

//Está función construirá un mapa con todos los lugares disponibles en la base de datos
//Además también guardara los seleccionados 

function mapaTodos() {
    //definidos en el estilo por defecto necesario para el uso del responsive
    const rootStyles = getComputedStyle(document.documentElement);
    const initialLat = parseFloat(rootStyles.getPropertyValue('--map-initial-lat'));
    const initialLng = parseFloat(rootStyles.getPropertyValue('--map-initial-lng'));
    const initialZoom = parseFloat(rootStyles.getPropertyValue('--map-initial-zoom'));

    //Definimos un objeto mapa referente a la apenstreetmap
    var map = L.map('mapid').setView([initialLat, initialLng], initialZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    //Construimos un mapa vacio
    }).addTo(map);

    //El token de este encabezado hace referencia al token del usuario logueado 
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };

    //Realizamos la petición al servidor de todos los lugares de la base de datos 
    fetch(`http://${nombreHost}:8083/api/conseguirLugares`, options)
        .then(response => response.json())
        .then(data => {
            data = Object.values(data);
            //console.log(data);

            //Creamos un array vacío en el cual se guardarán los lugares 
            var lugares = [];

            data.forEach(lugarData => {
                //Llenamos el array de los lugares de la base de datos
                lugares.push({
                    id: lugarData.id,
                    nombre: lugarData.nombre,
                    latitud: lugarData.latitud,
                    longitud: lugarData.longitud,
                    idProvincia: lugarData.idProvincia,
                    //Crearemos una variable que el lugar por defecto no esté activo
                    activo: false
                });
            });

            //console.log(lugares);
            //Crearé una tabla para que el usuario pueda ver los lugares que ha seleccionado 
            let listaSeleccion = ''
            listaSeleccion += '<table id="lugaresT" ><tr class="primera-fila"><td>Ciudades Seleccionadas</td></tr>';
  
            //Construiremos el mapa con los lugares a través de este foreach
            lugares.forEach(lugar => {
      
                //Construimos un marcador con su latitud y longitud 
                var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
                marker._icon.classList.add(lugar.id);

                //Tendrá su propio tooltip con el nombre 
                marker.bindTooltip(lugar.nombre);

                //Si se clica en el elemento se guardara en un  set de lugaresSeleccionadosUnicos
                marker.on('click', function () {
                    //Recogemos el lugar seleccionado a través de su id
                    var lugarFila = document.getElementById(lugar.id);
                    //Si el lugar no está activo 
                    if (lugar.activo == false) {

                        //Lo ponemos el marcador en rojo
                        $(marker._icon).css("filter", "hue-rotate(150deg)");

                        //Lo guardamos en lugaresSeleccionadosUnicos
                        lugaresSeleccionadosUnicos.add(lugar.id);

                        console.log(lugaresSeleccionadosUnicos);


                        //Si este lugar no está lo añadiremos a la tabla
                        if (!lugarFila) {
                            document.getElementById("lugaresT").innerHTML += `<tr><td id="${lugar.id}">${lugar.nombre}</td></tr>`;
                        }
                        //Pasaremos el lugar a estado activo
                        lugar.activo = true;
                        //console.log(lugar);
                    } else {
                        //En caso de deselecionarlo eliminaremos el lugar de lugar fila
                        if (lugarFila) {
                            lugarFila.remove();
                        }

                        //Y también del array principal de lugaresselecciondosunicos
                        lugaresSeleccionadosUnicos.delete(lugar.id);

                        console.log(lugaresSeleccionadosUnicos);


                        //Pondremos el marcador en color azul nuevamente 
                        $(marker._icon).css("filter", "hue-rotate(0deg)");
                        lugar.activo = false;
                        //console.log(lugar);
                    }




                });
            });

            listaSeleccion += '</table>';
            //Guardaremos el html de lista de lugares seleccionados en el contenedor de lista lugares 
            document.getElementById("listaLugares").innerHTML = listaSeleccion;

            return (lugaresSeleccionadosUnicos);

        })
        .catch(err => console.error(err));
}

//Llamaremos a la función de mapa todos
mapaTodos();

//Guardaremos los lugares seleccionados en localStorage
function guardadoLugares() {
    
    console.log(JSON.stringify(Array.from(lugaresSeleccionadosUnicos)));
    localStorage.setItem('lugaresSeleccion', JSON.stringify(Array.from(lugaresSeleccionadosUnicos)));
    console.log("Peticiones_Enviadas_Lugares");
}
