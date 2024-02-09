var valorTemp = document.getElementById("valorTemp");
var valorHumedad = document.getElementById("valorHumedad");
var valorViento = document.getElementById("valorViento");
var prevision = document.getElementById("prevision");

var elementosActivados = [];
var elementosActivadosUnicos = new Set(elementosActivados);



$(document).ready(function dragDrop() {

    $("#items_Activados,#items_Desactivados").css("background-color", "rgba(255, 255, 255, 0.650)");
    $('#items_Desactivados').append(valorViento, prevision);
    $('#items_Activados').append(valorTemp, valorHumedad);


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