
/* Está función se encargará de gestionar el drag and drop de los distintos elementos 
que moverá el usuario en el formulario */

//Definimos las principales variables de los items meteorológicos
var valorTemp = document.getElementById("valorTemp");
var valorHumedad = document.getElementById("valorHumedad");
var valorViento = document.getElementById("valorViento");
var prevision = document.getElementById("prevision");

//Definimos un array de los ítems activados
var elementosActivados = [];
//Para que la selección de los elementos no se repita será necesario convertir el array en un set
var elementosActivadosUnicos = new Set(elementosActivados);

// Cuando el documento html este listo activaremos la función del drag and drop
$(document).ready(function dragDrop() {

    //Ponemos los contenedores de ítems activados y desactivados a un blanco semi opaco 
    $("#items_Activados,#items_Desactivados").css("background-color", "rgba(255, 255, 255, 0.650)");

    //Ponemos por defecto los items de valorViento y prevision en el contenedor de los ítems  desactivados 
    $('#items_Desactivados').append(valorViento, prevision);

    //Ponemos por defecto los items de varlorTemp y valor humedad en el contenedor de los items desactivados
    $('#items_Activados').append(valorTemp, valorHumedad);

    // Guardaremos los los ides de los elementos activados en el set de elementos activados únicos 
    $("#items_Activados").children().each(function () {
        var idElemento = $(this).attr('id');
        elementosActivadosUnicos.add(idElemento);
    });
    //console.log(elementosActivadosUnicos);


    $("#valorTemp,#valorHumedad,#valorViento,#prevision, body").on('dragstart', function (event) {

        // Recoge el id del elemento que estoy moviendo
        event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
        //console.log(event.target.id);
        objeto = event.target.id;
    });

    // Permitir que el destino reciba elementos arrastrados
    $("#items_Desactivados").on('dragover', function (event) {
        //console.log(event.target.id);

        $("#items_Desactivados").css("background-color", "rgb(157, 6, 6)");
        event.preventDefault();


    });
    $("#items_Activados").on('dragover', function (event) {

        //console.log(event.target.id);

        $("#items_Activados").css("background-color", "rgb(7, 7, 87)");
        event.preventDefault();


    });



    $("#items_Activados, #items_Desactivados").on('dragleave', function (event) {
        $(this).css("background-color", "rgba(255, 255, 255, 0.650)");
    });

    // Manejar la acción de soltar el elemento
    $("#items_Desactivados, #items_Activados").on('drop', function (event) {

        $("#items_Activados,#items_Desactivados").css("background-color", "rgba(255, 255, 255, 0.650)");
        var data = event.originalEvent.dataTransfer.getData("text/plain");

        var draggedElement = document.getElementById(data);


        if (event.target !== draggedElement) {
            // Agregar el elemento al área general
            $(this).append(draggedElement);

            // Actualizar el conjunto de IDs sin duplicados
            $("#items_Activados").children().each(function () {
                var idElemento = $(this).attr('id');
                elementosActivadosUnicos.add(idElemento);
            });
            $("#items_Desactivados").children().each(function () {
                var idElemento = $(this).attr('id');
                elementosActivadosUnicos.delete(idElemento);
            });


            console.log(elementosActivadosUnicos);
            return (elementosActivadosUnicos);
        }
    });



});



function guardadoMeteo() {
    console.log(JSON.stringify(Array.from(elementosActivadosUnicos)));
    localStorage.setItem('guardadoItems', JSON.stringify(Array.from(elementosActivadosUnicos)));
    console.log("Peticiones_Enviadas_Items");
}