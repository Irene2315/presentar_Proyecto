let ciudad = "";
var lugaresSeleccionados = [];
var lugaresSeleccionadosUnicos = new Set(lugaresSeleccionados);
var nombreHost = new URL (window.location.origin).hostname;



function mapaTodos() {
    //definidos en el estilo por defecto
    const rootStyles = getComputedStyle(document.documentElement);
    const initialLat = parseFloat(rootStyles.getPropertyValue('--map-initial-lat'));
    const initialLng = parseFloat(rootStyles.getPropertyValue('--map-initial-lng'));
    const initialZoom = parseFloat(rootStyles.getPropertyValue('--map-initial-zoom'));

    
    var map = L.map('mapid').setView([initialLat, initialLng], initialZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };


    fetch(`http://${nombreHost}:8083/api/conseguirLugares`, options)
        .then(response => response.json())
        .then(data => {
            data = Object.values(data);
            //console.log(data);

            var lugares = [];

            data.forEach(lugarData => {
                lugares.push({
                    id: lugarData.id,
                    nombre: lugarData.nombre,
                    latitud: lugarData.latitud,
                    longitud: lugarData.longitud,
                    idProvincia: lugarData.idProvincia,
                    activo: false
                });
            });

            //console.log(lugares);
            let listaSeleccion = ''
            listaSeleccion += '<table id="lugaresT" ><tr class="primera-fila"><td>Ciudades Seleccionadas</td></tr>';

            lugares.forEach(lugar => {

                var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
                marker._icon.classList.add(lugar.id);
                marker.bindTooltip(lugar.nombre);

                marker.on('click', function () {
                    var lugarFila = document.getElementById(lugar.id);
                    if (lugar.activo == false) {
                        $(marker._icon).css("filter", "hue-rotate(150deg)");

                        lugaresSeleccionadosUnicos.add(lugar.id);

                        console.log(lugaresSeleccionadosUnicos);


                        if (!lugarFila) {
                            document.getElementById("lugaresT").innerHTML += `<tr><td id="${lugar.id}">${lugar.nombre}</td></tr>`;
                        }
                        lugar.activo = true;
                        //console.log(lugar);
                    } else {
                        if (lugarFila) {
                            lugarFila.remove();
                        }

                        lugaresSeleccionadosUnicos.delete(lugar.id);

                        console.log(lugaresSeleccionadosUnicos);


                        $(marker._icon).css("filter", "hue-rotate(0deg)");
                        lugar.activo = false;
                        //console.log(lugar);
                    }




                });
            });

            listaSeleccion += '</table>';
            document.getElementById("listaLugares").innerHTML = listaSeleccion;

            return (lugaresSeleccionadosUnicos);

        })
        .catch(err => console.error(err));
}

let lugaresUsuarios = mapaTodos();


function guardadoLugares() {
    console.log("Hola funcion");
    console.log(JSON.stringify(Array.from(lugaresSeleccionadosUnicos)));
    localStorage.setItem('lugaresSeleccion', JSON.stringify(Array.from(lugaresSeleccionadosUnicos)));
    console.log("Peticiones_Enviadas_Lugares");
}
