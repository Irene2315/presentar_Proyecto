var nombreHost = new URL (window.location.origin).hostname;

function gestionDeRespuesta() {

    var cadenaLugares = localStorage.getItem('lugaresSeleccion');
    var cadenaItemsMeteo = localStorage.getItem('guardadoItems');

    var arrayLugares = JSON.parse(cadenaLugares);
    var arrayItems = JSON.parse(cadenaItemsMeteo);

    console.log(arrayLugares);
    console.log(arrayItems);


    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };



    //Lugares Selecionados por el usuario
    fetch(`http://${nombreHost}:8083/api/lugaresSeleccionados/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta_LugaresSeleccion:");
            console.log(data);

            var lugaresSelect = [];

            data.forEach(lugarDataSelect => {
                console.log(lugarDataSelect)
                lugaresSelect.push({
                    id: lugarDataSelect.id,
                    nombre: lugarDataSelect.nombre,
                    latitud: lugarDataSelect.latitud,
                    longitud: lugarDataSelect.longitud,
                    idProvincia: lugarDataSelect.idProvincia,
                    activo: true
                });
            });
            console.log(lugaresSelect);
        })
        .catch(error => console.error(error));
    //Historico de items de lugares selecionados
    fetch(`http://${nombreHost}:8083/api/itemsLugares/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta_ItemsLugares:");
            console.log(data);

            var itemsLugarSelect = [];

            data.forEach(itemDataSelect => {
                console.log(itemDataSelect)
                itemsLugarSelect.push({
                    id: itemDataSelect.id,
                    idLugar: itemDataSelect.idLugar,
                    fecha_hora: itemDataSelect.fecha_hora,
                    valorTemp: itemDataSelect.valorTemp,
                    valorViento: itemDataSelect.valorViento,
                    prevision: itemDataSelect.prevision
                });
            });
            console.log(itemsLugarSelect);
        })
        .catch(err => console.error(err));
    //Items Lugar Ahora
    fetch(`http://${nombreHost}:8083/api/itemsLugarAhora/ `+ cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta_LugarAhora:");
            console.log(data);

            var itemsLugarSelectAhora = [];

            data.forEach(itemDataSelect => {
                console.log(itemDataSelect)
                itemsLugarSelectAhora.push({
                    id: itemDataSelect.id,
                    idLugar: itemDataSelect.idLugar,
                    fecha_hora: itemDataSelect.fecha_hora,
                    valorTemp: itemDataSelect.valorTemp,
                    valorViento: itemDataSelect.valorViento,
                    prevision: itemDataSelect.prevision
                });
            });
            console.log(itemsLugarSelectAhora);
        })
        .catch(err => console.error(err));


}

function construccionCards() {
    var cadenaLugares = localStorage.getItem('lugaresSeleccion');
    var cadenaItemsMeteo = localStorage.getItem('guardadoItems');

   
    var arrayItems = JSON.parse(cadenaItemsMeteo);


    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };

    //console.log(arrayLugares);
    //console.log(arrayItems);

    var lugaresSelect = [];
    
    fetch(`http://${nombreHost}:8083/api/lugaresSeleccionados/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            //console.log("Respuesta_LugaresSeleccion:");
            //console.log(data);

            data.forEach(lugarDataSelect => {
                //console.log(lugarDataSelect)
                lugaresSelect.push({
                    id: lugarDataSelect.id,
                    nombre: lugarDataSelect.nombre,
                    latitud: lugarDataSelect.latitud,
                    longitud: lugarDataSelect.longitud,
                    idProvincia: lugarDataSelect.idProvincia,
                });
            });
            //console.log(lugaresSelect);
        })
        .catch(error => console.error(error));

    var f = new Date();
    function formatearNumeroConCero(numero) {
        if (numero < 10) {
            return '0' + numero;
        } else {
            return numero;
        }
    }

    var formatoFecha_1 = (f.getFullYear() + "/" + formatearNumeroConCero(f.getMonth() + 1) + "/" + formatearNumeroConCero(f.getDate()));
    console.log("fecha_1");
    console.log(formatoFecha_1);

    var fm = new Date();
    fm.setDate(fm.getDate() + 1); // Sumar un día a la fecha actual

    var formatoFecha_2 = (fm.getFullYear() + "" + formatearNumeroConCero(fm.getMonth() + 1) + "" + formatearNumeroConCero(fm.getDate()));
    console.log("fecha_2");
    console.log(formatoFecha_2);


    let consultas = [
        {
            "id": "1",
            "idLugar": 20018,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/cantabrian_valleys/locations/azpeitia/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "2",
            "idLugar": 20029,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/deba/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "3",
            "idLugar": 20030,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/cantabrian_valleys/locations/eibar/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "4",
            "idLugar": 20045,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "5",
            "idLugar": 20069,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "6",
            "idLugar": 20071,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/cantabrian_valleys/locations/tolosa/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        },
        {
            "id": "7",
            "idLugar": 48017,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/bermeo/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``

        },
        {
            "id": "8",
            "idLugar": 48020,
            "consulta": `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/trends/measures/at/${formatoFecha_1}/for/${formatoFecha_2}`,
            "prevision": ``
        }

    ]
    //Items Lugar Ahora
    let contenedorCards = document.getElementById("contenedorCards");

    let construirCards = '';



    fetch(`http://${nombreHost}:8083/api/itemsLugarAhora/ `+ cadenaLugares, options)
        .then(response => response.json())
        .then(data => {

            data.forEach(itemsLugarSelectAhora => {
                const peticionActual = consultas.find(consulta => consulta.idLugar == itemsLugarSelectAhora.idLugar);
            
                fetch(peticionActual.consulta, options)
                    .then(response => response.text())
                    .then(text => {
                        const decoder = new TextDecoder('iso-8859-1');
                        const decodedText = decoder.decode(new Uint8Array(text.split('').map(char => char.charCodeAt(0))));
            
                        try {
                            const jsonData = JSON.parse(decodedText);
                            peticionActual.prevision = jsonData["trends"]["set"][0]["symbolSet"]["weather"]["descriptionByLang"]["SPANISH"];
                        } catch (error) {
                            console.error(`Error al analizar JSON: ${error}`);
                        }
                    })
                    .catch(err => console.error(err));
            });


        })
        .catch(err => console.error(err));

    console.log(consultas);

    Intervalo();

    setInterval(Intervalo, 3000);

    function Intervalo() {
        $(".card").tooltip("dispose");
        construirCards = '';
        construirCards += `<div class="container">`;
        construirCards += `<div class="row">`;

        fetch(`http://${nombreHost}:8083/api/itemsLugarAhora/` + cadenaLugares, options)
            .then(response => response.json())
            .then(data => {
                data.forEach(itemsLugarSelectAhora => {
                    const lugarCorrespondiente = lugaresSelect.find(lugar => lugar.id == itemsLugarSelectAhora.idLugar);
                    const peticionActual = consultas.find(consulta => consulta.idLugar == itemsLugarSelectAhora.idLugar);

                    construirCards += `<div class="col-lg-3 col-md-6 col-sm-12">`;

                    construirCards += `<div class="card" id="${lugarCorrespondiente.nombre}" data-toggle="tooltip" title="${peticionActual.prevision}" >`;
                    construirCards += `<div class="card-body">`;
                    construirCards += `<div class="caraFrontal">`;
                    construirCards += `<h5 class="card-title colorLetra">${lugarCorrespondiente.nombre}</h5>`;
                    arrayItems.forEach(itemActivo => {
                        if (itemActivo == "prevision") {
                            construirCards += `<img class="imgFront" src="/recursos/Fotos/Prevision/${itemsLugarSelectAhora.prevision}.svg">`;
                        }
                    });
                    construirCards += `</div>`;
                    construirCards += `<div class="caraLateral">`;
                    construirCards += `<h5 class="card-title colorLetra">MEDICIONES</h5>`;
                    construirCards += `<div class="mediciones-container">`;
                    arrayItems.forEach(itemActivo => {
                        if (itemActivo == "valorTemp") {
                            construirCards += `<h5 class="card-texto colorLetra">${itemsLugarSelectAhora.valorTemp.toFixed(2)}ºC</h5>`;
                            construirCards += `<img class="imgLat" src="/recursos/Fotos/Prevision/Temperatura.svg">`;
                        }
                        if (itemActivo == "valorHumedad") {
                            construirCards += `<h5 class="card-texto colorLetra">${itemsLugarSelectAhora.valorHumedad.toFixed(2)}%</h5>`;
                            construirCards += `<img class="imgLat" src="/recursos/Fotos/Prevision/Humedad.svg">`;
                        }
                        if (itemActivo == "valorViento") {
                            construirCards += `<h5 class="card-texto colorLetra">${itemsLugarSelectAhora.valorViento.toFixed(2)}%</h5>`;
                            construirCards += `<img class="imgLat" src="/recursos/Fotos/Prevision/Viento.svg">`;
                        }
                    });
                    construirCards += `</div>`;
                    construirCards += `</div></div></div></div>`;
                });
            })
            .catch(err => console.error(err))
            .finally(() => {
                construirCards += `</div>`;
                construirCards += `</div>`;
                contenedorCards.innerHTML = construirCards;
                $(".card").tooltip();
            });
    }

}

let lugarSeleccionado = '';

function construirSelector() {
    var cadenaLugares = localStorage.getItem('lugaresSeleccion');

    var arrayLugares = JSON.parse(cadenaLugares);

    console.log(arrayLugares);

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };

    // Lugares seleccionados por el usuario
    let lugaresSelect = [];

    fetch(`http://${nombreHost}:8083/api/lugaresSeleccionados/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta_LugaresSeleccion:");
            console.log(data);

            data.forEach(lugarDataSelect => {
                console.log(lugarDataSelect)
                lugaresSelect.push({
                    id: lugarDataSelect.id,
                    nombre: lugarDataSelect.nombre,
                    latitud: lugarDataSelect.latitud,
                    longitud: lugarDataSelect.longitud,
                    idProvincia: lugarDataSelect.idProvincia
                });
            });

            let contenedorSelect = document.getElementById("selectorLugar");
            let construirSelect = '';

            construirSelect += `<label for="selectorLugar">Opciones lugares</label>`
            construirSelect += `<select name="lugar" id="lugares">`
            construirSelect += `<option disabled selected>Selecciona un lugar</option>`
            lugaresSelect.forEach(lugar => {
                construirSelect += `<option value="${lugar.id}">${lugar.nombre}</option>`
            });
            construirSelect += `</select>`

            contenedorSelect.innerHTML = construirSelect;

            // Manejar el cambio en la selección directamente sin promesas
            $("#lugares").on("change", function () {
                lugarSeleccionado = $(this).val();
            });
        })
        .catch(error => console.error(error));
}




function construirCalendario() {
    var dateFormat = "dd/mm/yy",
        desde = $("#desde")
            .datepicker({
                defaultDate: "+1w",
                regional: "es",
                numberOfMonths: 1,
                dateFormat: dateFormat,
                position: {
                    my: "top",
                    at: "bottom"
                }
            })
            .on("change", function () {
                hasta.datepicker("option", "minDate", getDate(this));
            }),
        hasta = $("#hasta").datepicker({
            defaultDate: "+1w",
            regional: "es",
            numberOfMonths: 1,
            dateFormat: dateFormat,
            position: {
                my: "top",
                at: "bottom"
            }
        })
            .on("change", function () {
                desde.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }


}

var fechas = [];
var temperaturas = [];
var humedades = [];

function datosGrafico() {



    var fechaDesde = $("#desde").val();
    var fechaHasta = $("#hasta").val();

    function cambiarFormatoFecha(fecha) {
        var partes = fecha.split('/');
        if (partes.length === 3) {
            return partes[1] + '/' + partes[0] + '/' + partes[2];
        }
        return fecha;
    }

    var fechaDesdeDate = new Date(cambiarFormatoFecha(fechaDesde));
    var fechaHastaDate = new Date(cambiarFormatoFecha(fechaHasta));

    console.log(fechaDesdeDate);
    console.log(fechaHastaDate);


    function formatearNumeroConCero(numero) {
        if (numero < 10) {
            return '0' + numero;
        } else {
            return numero;
        }
    }

    var formatoPeticionDesde = (fechaDesdeDate.getFullYear() + "-" + formatearNumeroConCero(fechaDesdeDate.getMonth() + 1) + "-" + formatearNumeroConCero(fechaDesdeDate.getDate()) + " " + "00:00:00");
    var formatoPeticionHasta = (fechaHastaDate.getFullYear() + "-" + formatearNumeroConCero(fechaHastaDate.getMonth() + 1) + "-" + formatearNumeroConCero(fechaHastaDate.getDate()) + " " + "23:59:59");


    console.log(formatoPeticionDesde);
    console.log(formatoPeticionHasta);

    if (fechaDesde.trim() == '' || fechaHasta.trim() == '' || lugarSeleccionado.trim() == '') {

        $("#casoCamposVacios").css("display", "block");

    }

    else {

        $("#casoCamposVacios").css("display", "none");

        console.log("Fecha Desde:", fechaDesde);
        console.log("Fecha Hasta:", fechaHasta);
        console.log('Lugar seleccionado:', lugarSeleccionado);

        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
            }
        };




        fetch(`http://${nombreHost}:8083/api/itemsLugar/${lugarSeleccionado}/${formatoPeticionDesde}/${formatoPeticionHasta}`, options)
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta_ItemsLugar:");
                //console.log(data);



                data.forEach(itemDataSelect => {
                    //console.log(itemDataSelect);
                    var fecha = new Date(itemDataSelect.fecha);
                    var formatoFecha = (formatearNumeroConCero(fecha.getDate()) + "/" + formatearNumeroConCero(fecha.getMonth() + 1) + "/" + fecha.getFullYear());
                    var mediaTemp = parseFloat(itemDataSelect.mediaTemp);
                    var mediaHumedad = parseFloat(itemDataSelect.mediaHumedad);


                    fechas.push(formatoFecha);
                    temperaturas.push(mediaTemp);
                    humedades.push(mediaHumedad);
                });


                construirGrafico();

            })
            .catch(err => console.error(err));


    }

}

let grafico = null;

function construirGrafico() {
    
    if (grafico) {
        
        grafico.data.labels = fechas;
        grafico.data.datasets[0].data = temperaturas;
        grafico.data.datasets[1].data = humedades;
        grafico.update(); 
    } else {
       
        const canvas = document.createElement("canvas");
        canvas.id = "grafico";
        document.getElementById("ContenedorGrafico").appendChild(canvas);

        const config = {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Temperatura',
                    data: temperaturas,
                    backgroundColor: 'rgba(255, 26, 104, 0.2)',
                    borderColor: 'rgba(255, 26, 104, 1)',
                    tension: 0.4,
                    yAxisID: 'temperatura'
                }, {
                    label: 'Humedad',
                    data: humedades,
                    backgroundColor: 'rgba(0, 26, 104, 0.2)',
                    borderColor: 'rgba(0, 26, 104, 1)',
                    tension: 0.4,
                    yAxisID: 'humedad'
                }]
            },
            options: {
                scales: {
                    temperatura: {
                        beginAtZero: false,
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            callback: function (value) {
                                return `${value} ºC`
                            }
                        }
                    },
                    humedad: {
                        beginAtZero: false,
                        type: 'linear',
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function (value) {
                                return `${value} %`
                            }
                        }
                    }
                }
            }
        };

        // Crear el nuevo gráfico
        grafico = new Chart(canvas, config);
    }

    $("#grafico").css("display", "block");
}


