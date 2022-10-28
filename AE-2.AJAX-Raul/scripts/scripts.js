/*
//Cuando esl documento esté listo ocultamos las tablas
$(document).ready(()=>{
    //Buscamos por id, la tabla de los tamaños
    $('#tamanios').hide(); //La ocultamos con .hide()

    //Buscamos por id el botón que eramos darle la funcionalidad click
    $('#importarTamanios').click(function(){//Cuando pulsemos click invocamos la función
        //invocamos la función ajax
        $.ajax({ //declaramos el tipo de solicitud
            type: 'GET',
            //declaramos la url donde está el json
            url: 'tamanios.json',
            //declaramos el tipo de documento
            dataType: 'json'
            //cuando la lecutra se ha producido de forma satisfactoria usamos la siguiente función
        }).done((data) => { 
            //Con un each iteramos data (que es la lista de objetos del archivo .json)
            $.each(data, function(indice,tamanios){ //usamos el índice para recorrer la lista y tamanios para los objetos que la componen
                //Creamos fila
                let fila = $('<tr>');
                //Agregamos cada una de las filas a la tabla #tamanios
                fila.append($(`<td>${tamanios.nombre}</td>`));
                fila.append($(`<td>${tamanios.pvp}</td>`));
                //Nos ubicamos dentro de la tabla, en tbody y agregamos una nueva fila por cada iteración
                $('#tamanios tbody').append(fila);
            });
            //Por último hacemos visible a la tabla
            $('#tamanios').show();
        });
    });

    //Buscamos por id, la tabla de los ingredientes
    $('#ingredientes').hide();  //La ocultamos  
    
    //Buscamos por id el botón deseado
    $('#importarIngredientes').click(function(){//Le asignamos el evento click
        //Invocamos la función ajax
        $.ajax({ //Declaramos el tipo de solicitud
            type: 'GET',
            //declaramos la url donde está el json
            url: 'ingredientes.json',
            //declaramos el tipo de documento
            dataType: 'json'
            //Si todo ha ido ok seguimos con la lectura de los datos
        }).done((data) => {
            //Usamos un each para recorrer la lista
            $.each(data, function(indice,ingredientes){
                //Creamos la fila
                let fila = $('<tr>');
                //Agregamos a la fila el valor correspondiente a imprimir
                fila.append($(`<td>${ingredientes.nombre}</td`));
                fila.append($(`<td>${ingredientes.pvp}</td`));
                //Vamos a la tabla y en tbody agregamos la fila por cada iteración, con la información encontrada
                $('#ingredientes tbody').append(fila);
            });
            //Por úlltiumo hacemos visible la tabla con la información
            $('#ingredientes').show();
        });
    });
});

*/
$(document).ready(function() {    
    //Buscamos por id, la tabla de los tamaños
    $('#tamanios').hide(); //La ocultamos con .hide()
    //Buscamos por id, la tabla de los ingredientes
    $('#ingredientes').hide();  //La ocultamos  

    $('#importarTamanios').click(function(){
        $.get('tamanios.json',function(datos){
            $.each(datos, function(indice, tamanios){
                let fila = $('<tr>');

                fila.append($(`<td>${tamanios.nombre}</td>`));
                fila.append($(`<td>${tamanios.pvp}</td>`));

                $('#tamanios tbody').append(fila);
            });
            $('#tamanios').show();
        });
    });

    $('#importarIngredientes').click(function(){
        $.get('ingredientes.json', function(datos1){
            $.each(datos1, function(indice, ingredientes){
                let fila1 = $('<tr>');

                fila1.append($(`<td>${ingredientes.nombre}</td>`));
                fila1.append($(`<td>${ingredientes.pvp}</td>`));

                $('#ingredientes tbody').append(fila1);
            });
            $('#ingredientes').show();
        });
    });

});

