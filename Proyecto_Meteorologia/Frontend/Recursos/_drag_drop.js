
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

    // Permitir que el contenedor de items desactivados  reciba elementos arrastrados
    $("#items_Desactivados").on('dragover', function (event) {
        //console.log(event.target.id);

        //Si el item se está moviendo sobre items desactivados el fondo del contenedor de ítems desactivados tornará a rojo
        $("#items_Desactivados").css("background-color", "rgb(157, 6, 6)");

        //Característica principal para que el item pueda ser dragable en el contenedor de ítems desactivados 
        event.preventDefault();


    });

    // Permitir que el contenedor de ítems activados reciba elementos arrastrados
    $("#items_Activados").on('dragover', function (event) {

        //console.log(event.target.id);

        //Si el item se está moviendo sobre items activados, el fondo del contenedor de ítems activados tornará a azul
        $("#items_Activados").css("background-color", "rgb(7, 7, 87)");

        //Característica principal para que el item pueda ser dragable en el contenedor de ítems activados 
        event.preventDefault();


    });


    /*Cuando el item deje de estar sobre el contenedor, ya sea en el contenedor 
    de ítems desactivados o el de ítems activados el contenedor tornará a blanco semi opaco*/ 
    $("#items_Activados, #items_Desactivados").on('dragleave', function (event) {
        $(this).css("background-color", "rgba(255, 255, 255, 0.650)");
    });

    // Manejar la acción de soltar el elemento ya sea en el contenedor de ítems desactivados o el de ítems activados 
    $("#items_Desactivados, #items_Activados").on('drop', function (event) {

        //Cuando un item se suelte en el contenedor de ítems activados o desactivados el fondo tornará a blanco semi opaco 
        $("#items_Activados,#items_Desactivados").css("background-color", "rgba(255, 255, 255, 0.650)");

        //Recogemos el id del elemento soltado en el contenedor
        var data = event.originalEvent.dataTransfer.getData("text/plain")
        var draggedElement = document.getElementById(data);

        //En un item no se pueda soltar sobre otro ítem 
        if (event.target !== draggedElement) {
            // Agregar el elemento al área general
            $(this).append(draggedElement);

            // Actualizar el conjunto de IDs sin duplicados en contenedor de ítems activados y desactivados 

            // Si dejamos un item en el contenedor de ítems activados se añadirá al set de ítemsActivadosUnicos
            $("#items_Activados").children().each(function () {
                var idElemento = $(this).attr('id');
                elementosActivadosUnicos.add(idElemento);
            });

            // Si dejamos un item en el contenedor de  ítems desactivados, se eliminará del set de ítemsActivadosUnicos
            $("#items_Desactivados").children().each(function () {
                var idElemento = $(this).attr('id');
                elementosActivadosUnicos.delete(idElemento);
            });

         
            //Devolveremos los items activados únicos ya filtrados 
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