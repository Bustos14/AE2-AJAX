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

