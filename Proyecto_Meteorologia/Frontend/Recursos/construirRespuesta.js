//Este js se encargará de gestionar la respuesta de los datos guardados en el localHost

//Guardamos la IP de servidor y aunque cambie de IP siempre cogerá la actualización con esta variable 
var nombreHost = new URL(window.location.origin).hostname;

//Está función se encargará de construir las cards en base a los datos recibidos por el localStorage 
function construccionCards() {

    //Recogemos los lugares seleccionados y los items seleccionados por el localStorage 
    var cadenaLugares = localStorage.getItem('lugaresSeleccion');
    var cadenaItemsMeteo = localStorage.getItem('guardadoItems');


    var arrayItems = JSON.parse(cadenaItemsMeteo);

    //Token de acceso de la petición (simulación del referencia al token de usuario)
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };

    //console.log(arrayLugares);
    //console.log(arrayItems);

    //Inicializamos el array que guardara los lugares seleccionados
    var lugaresSelect = [];

    //Se realiza la petición a laravel de los lugares seleccionados en el formulario 
    fetch(`http://${nombreHost}:8083/api/lugaresSeleccionados/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            //console.log("Respuesta_LugaresSeleccion:");
            //console.log(data);

            //Recogemos el objetivo de cada lugar seleccionado y lo guardamos en un array
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


    //Petición a Euskalmet para construir el tooltip
    //Este tooltip nos mostrará la previsión de mañana

    //Para construir la petición será necesario establecer que la fecha es de hoy para mañana 
    //El primer paso sería que si el mes o día es inferior a 10 se construya con un 0 delante
    var f = new Date();
    function formatearNumeroConCero(numero) {
        if (numero < 10) {
            return '0' + numero;
        } else {
            return numero;
        }
    }

    //Para construir la petición serán necesarios dos formatos de fecha 

    //El primero año/mes/dia actual que hará referencia a la fecha actual 
    var formatoFecha_1 = (f.getFullYear() + "/" + formatearNumeroConCero(f.getMonth() + 1) + "/" + formatearNumeroConCero(f.getDate()));
    console.log("fecha_1");
    console.log(formatoFecha_1);

    var fm = new Date();
    fm.setDate(fm.getDate() + 1); // Sumar un día a la fecha actual

    //El segundo hará referencia a la fecha de mañana y el formato será añomesdia
    var formatoFecha_2 = (fm.getFullYear() + "" + formatearNumeroConCero(fm.getMonth() + 1) + "" + formatearNumeroConCero(fm.getDate()));
    console.log("fecha_2");
    console.log(formatoFecha_2);

    //Definimos las distintas consultas que haremos según el lugar seleccionado 
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
    //Inicializamos el contenedor que construirá las cards
    let contenedorCards = document.getElementById("contenedorCards");

    //Inicializamos el html principal de cards
    let construirCards = '';


    //Con esta petición solicitamos a laravel que nos dé el dato más reciente del lugar
    fetch(`http://${nombreHost}:8083/api/itemsLugarAhora/ ` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            
            //Buscamos la petición con el mismo id de lugar que el lugar seleccionado 
            data.forEach(itemsLugarSelectAhora => {
                const peticionActual = consultas.find(consulta => consulta.idLugar == itemsLugarSelectAhora.idLugar);

                //Realizamos la consulta del lugar seleccionado
                fetch(peticionActual.consulta, options)
                    .then(response => response.text())
                    .then(text => {
                        //Usamos un decodificador para que no se bugge las las tildes del mensaje 
                        const decoder = new TextDecoder('iso-8859-1');
                        const decodedText = decoder.decode(new Uint8Array(text.split('').map(char => char.charCodeAt(0))));

                        try {
                            //Parseamos el decodificador en un json
                            const jsonData = JSON.parse(decodedText);

                            //Usamos el decodificador en el objetivo que recogerá nuestra previsión 
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

    //Inicializamos la función del intervalo para que las cartas no tarden en cargar
    Intervalo();

    //En las siguientes ocasiones el intervalo será de 3 segundos 
    setInterval(Intervalo, 3000);

    //Las cards se generarán la primera vez y las siguientes cada 3 segundos 
    function Intervalo() {
        //Activamos el tooltip en la card
        $(".card").tooltip("dispose");

        //Construimos la estructura base donde irá la card
        construirCards = '';
        construirCards += `<div class="container">`;
        construirCards += `<div class="row">`;

        //Realizamos la petición de los items meteorológicos actuales de ese lugar
        fetch(`http://${nombreHost}:8083/api/itemsLugarAhora/` + cadenaLugares, options)
            .then(response => response.json())
            .then(data => {
                data.forEach(itemsLugarSelectAhora => {

                    //Buscamos el nombre de lugar y la petición de ese lugar
                    const lugarCorrespondiente = lugaresSelect.find(lugar => lugar.id == itemsLugarSelectAhora.idLugar);
                    const peticionActual = consultas.find(consulta => consulta.idLugar == itemsLugarSelectAhora.idLugar);

                    construirCards += `<div class="col-lg-3 col-md-6 col-sm-12">`;

                    //Construimos la card con su id "nombre lugar" correspondiente 
                    construirCards += `<div class="card" id="${lugarCorrespondiente.nombre}" data-toggle="tooltip" title="${peticionActual.prevision}" >`;
                    construirCards += `<div class="card-body">`;

                    //En la cara frontal de la card mostraremos el nombre de lugar y el parte meteorologico
                    construirCards += `<div class="caraFrontal">`;
                    construirCards += `<h5 class="card-title colorLetra">${lugarCorrespondiente.nombre}</h5>`;
                    arrayItems.forEach(itemActivo => {
                        if (itemActivo == "prevision") {
                            //Identificamos la imagen con el parte recibido 
                            construirCards += `<img class="imgFront" src="/recursos/Fotos/Prevision/${itemsLugarSelectAhora.prevision}.svg">`;
                        }
                    });
                    construirCards += `</div>`;
                    construirCards += `<div class="caraLateral">`;

                    //En este apartado guardaremos los items meteorológicos seleccionados temperatura actual,valor viento
                    construirCards += `<h5 class="card-title colorLetra">MEDICIONES</h5>`;
                    construirCards += `<div class="mediciones-container">`;
                    arrayItems.forEach(itemActivo => {
                        //Para saber si el item está activo revisaremos si está en el localStorage y si es así lo mostraremos
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

                //Metemos todas las cards construidas en el contenedor 
                contenedorCards.innerHTML = construirCards;
                $(".card").tooltip();
            });
    }

}

let lugarSeleccionado = '';

//Está otra función se encargará de construir el selector principal de los lugares a seleccionar 
function construirSelector() {
    //Recogemos los  lugares del localStorage
    var cadenaLugares = localStorage.getItem('lugaresSeleccion');

    var arrayLugares = JSON.parse(cadenaLugares);

    console.log(arrayLugares);

    //Header simulación del token del usuario logueados
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
        }
    };

    // Lugares seleccionados por el usuario
    let lugaresSelect = [];

    //Recogemos todos los lugares seleccionados por el usuario a través de la petición fecht
    fetch(`http://${nombreHost}:8083/api/lugaresSeleccionados/` + cadenaLugares, options)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta_LugaresSeleccion:");
            console.log(data);

            data.forEach(lugarDataSelect => {
                console.log(lugarDataSelect)
                //Creamos un array de los lugares seleccionados
                lugaresSelect.push({
                    id: lugarDataSelect.id,
                    nombre: lugarDataSelect.nombre,
                    latitud: lugarDataSelect.latitud,
                    longitud: lugarDataSelect.longitud,
                    idProvincia: lugarDataSelect.idProvincia
                });
            });

            //Creamos una variable del contenedor del select de lugares
            let contenedorSelect = document.getElementById("selectorLugar");

            //Inicializamos la variante en la que se construirá el select
            let construirSelect = '';

            //Construimos la estructura principal del select
            construirSelect += `<label for="selectorLugar">Opciones lugares</label>`
            construirSelect += `<select name="lugar" id="lugares">`
            construirSelect += `<option disabled selected>Selecciona un lugar</option>`
            //Construimos los distintos lugares a seleccionar del select con el array de lugaresSelect
            lugaresSelect.forEach(lugar => {
                construirSelect += `<option value="${lugar.id}">${lugar.nombre}</option>`
            });
            construirSelect += `</select>`

            //Añadimos el html al contenedor del select
            contenedorSelect.innerHTML = construirSelect;

            // Manejar el cambio en la selección directamente
            $("#lugares").on("change", function () {
                lugarSeleccionado = $(this).val();
            });
        })
        .catch(error => console.error(error));
}


//Está función se encargará de construir el calendario de selección 

function construirCalendario() {
    //Estructura principal de jquery para construir el calendario 

    //Definimos un formato concreto 
    var dateFormat = "dd/mm/yy",
        // creamos la variable en la que se guardara la fecha desde
        desde = $("#desde")
            .datepicker({
                //Que sea la fecha en español y con el calendario en español
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
        //Creamos la variable que guardara la fecha hasta
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
            //Evento que escuchará a los distintos cambios de selección de fecha que pueda haber 
            .on("change", function () {
                desde.datepicker("option", "maxDate", getDate(this));
            });

    //Conseguiremos los datos de las dos variables y lo devolveremos 
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
//Inicializamos los arrays necesarios para construir el gráfico 

var fechas = [];
var temperaturas = [];
var humedades = [];

//Está función construirá el gráfico en base al selector y el intervalo de fechas selecionado
function datosGrafico() {

    //Recogemos los datos de las variables de fecha desde y hasta
    var fechaDesde = $("#desde").val();
    var fechaHasta = $("#hasta").val();

    //El cambio de formato será necesario porque laravel trabaja en formato de fecha inglés no españos
    function cambiarFormatoFecha(fecha) {
        var partes = fecha.split('/');
        if (partes.length === 3) {
            return partes[1] + '/' + partes[0] + '/' + partes[2];
        }
        return fecha;
    }

    //Cambiamos el formato 
    var fechaDesdeDate = new Date(cambiarFormatoFecha(fechaDesde));
    var fechaHastaDate = new Date(cambiarFormatoFecha(fechaHasta));

    console.log(fechaDesdeDate);
    console.log(fechaHastaDate);


    //Para que el mes y el día si es inferior a 10 salga con un 0 delante será necesario está conversación 
    function formatearNumeroConCero(numero) {
        if (numero < 10) {
            return '0' + numero;
        } else {
            return numero;
        }
    }

    //Guardamos el formato de fecha que le enviaremos a laravel
    //Guardar con una hora concreta es necesario por mi campo en laravel es dateTime ...por lo tanto podré desde el principio del primer día hasta el final del último dia
    var formatoPeticionDesde = (fechaDesdeDate.getFullYear() + "-" + formatearNumeroConCero(fechaDesdeDate.getMonth() + 1) + "-" + formatearNumeroConCero(fechaDesdeDate.getDate()) + " " + "00:00:00");
    var formatoPeticionHasta = (fechaHastaDate.getFullYear() + "-" + formatearNumeroConCero(fechaHastaDate.getMonth() + 1) + "-" + formatearNumeroConCero(fechaHastaDate.getDate()) + " " + "23:59:59");


    console.log(formatoPeticionDesde);
    console.log(formatoPeticionHasta);

    //Si los campos están vacíos notificará al usuario que lo rellene informándole con un mensaje emergente
    if (fechaDesde.trim() == '' || fechaHasta.trim() == '' || lugarSeleccionado.trim() == '') {

        $("#casoCamposVacios").css("visibility", "visible");

    }

    else {
        //En caso contrario ocultaremos el mensaje emergente 

        $("#casoCamposVacios").css("visibility", "hidden");

        console.log("Fecha Desde:", fechaDesde);
        console.log("Fecha Hasta:", fechaHasta);
        console.log('Lugar seleccionado:', lugarSeleccionado);

        //Está cabezera simula el token del usuario logueado
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXhAcGxhaWF1bmRpLm5ldCJ9.NEd10ft7DTb8HCohv5WId_rRKtgQj-Pc5dLNdCsmSTgypZxyGSkNJIuPulVAOvcZrfs9sXMjus-06iDa6kZlOnMGQeY0LsajlWakvGGXmDN3FKSfJT-9BCDtMyh89P34Jt3uneIt7H0we82G4_URRfUwIGQg83FCT_zO6Pu2joqBRURMC80Hs_x4voWpmGCwg6LPcb4sO0bGNqJq36zp1WB0LHPjBQ6pd3_mjiXsE6h892841vwcdyElpX2gCKV9JEH6Xm1LBVbcTakWUO_jGjAGhO4SdBOXuqNcmKDOJbsURVMlNc-_2kYvYlxPa9xj9B9PrXwNq7tNDlDq6ooKYA'
            }
        };


        //Realizamos la petición al servidor laravel de el lugar seleccionado en un intervalo de fechas concreto

        fetch(`http://${nombreHost}:8083/api/itemsLugar/${lugarSeleccionado}/${formatoPeticionDesde}/${formatoPeticionHasta}`, options)
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta_ItemsLugar:");
                //console.log(data);

                //Creamos un array por elementos que construiremos en nuestro gráfico 
                fechas = [];
                temperaturas = [];
                humedades = [];

                data.forEach(itemDataSelect => {
                    //console.log(itemDataSelect);

                    //Recogemos la fecha y la pasamos al formato español 
                    var fecha = new Date(itemDataSelect.fecha);
                    var formatoFecha = (formatearNumeroConCero(fecha.getDate()) + "/" + formatearNumeroConCero(fecha.getMonth() + 1) + "/" + fecha.getFullYear());
                    
                    //Recogemos la temperatura y humedad y lo convertimos en float para asegurarnos que lo coja como un valor numérico 
                    var mediaTemp = parseFloat(itemDataSelect.mediaTemp);
                    var mediaHumedad = parseFloat(itemDataSelect.mediaHumedad);

                    //Guardamos cada datos en su array correspondiente 

                    fechas.push(formatoFecha);
                    temperaturas.push(mediaTemp);
                    humedades.push(mediaHumedad);
                });

                //Llamamos a la función que construirá el  gráfico 
                construirGrafico();

            })
            .catch(err => console.error(err));


    }

}

let grafico = null;

// Está función será la que construirá el gráfico 
function construirGrafico() {
    //Si ya hay un gráfico se actualizarán a los valores nuevos que el usuario a seleccionado 
    if (grafico) {
        
        grafico.data.labels = fechas;
        grafico.data.datasets[0].data = temperaturas;
        grafico.data.datasets[1].data = humedades;

        grafico.update();
    } else {
        //Sino se creará un gráfico en canvas
        const canvas = document.createElement("canvas");
        canvas.id = "grafico";
        //Guardaremos el gráfico en este contenedor
        document.getElementById("ContenedorGrafico").appendChild(canvas);

        //Configuración charts canvas
        const config = {
            //Tipo de gráfico 
            type: 'line',
            data: {
                //Introducimos el array de fechas
                labels: fechas,
                datasets: [{
                    label: 'Temperatura',
                    //Introducimos el array de tempaeraturas
                    data: temperaturas,
                    backgroundColor: 'rgba(255, 26, 104, 0.2)',
                    borderColor: 'rgba(255, 26, 104, 1)',
                    tension: 0.4,
                    yAxisID: 'temperatura'
                }, {
                    label: 'Humedad',
                    //Introducimos el array de humedad
                    data: humedades,
                    backgroundColor: 'rgba(0, 26, 104, 0.2)',
                    borderColor: 'rgba(0, 26, 104, 1)',
                    tension: 0.4,
                    yAxisID: 'humedad'
                }]
            },
            options: {
                scales: {
                    //Posición de rango de medidas de temperatura 
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
                    //Posición de rango de medidas de humedad 
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
    //Activamos la visibilidad del gráfico 
    $("#grafico").css("display", "block");
}
