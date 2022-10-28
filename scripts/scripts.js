
let validarFormulario = function(e){    
    const parrafo = document.getElementById("warning");
    console.log("entrando en validarFormulario")
    let ok = true;
    if(nombre.value.trim() == ""){
        parrafo.innerHTML="Compruebe el formulario, le faltan campos"
        ok = false;
    } if (telefono.value.trim() == ""){

    }
    return ok;
}

//función sumar
function sumar(a=0,b=0){
    pTotal.innerHTML = `El precio total es ${a + b} €`;
}

window.onload = function(){
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.onclick = function(e){
    
    if(!validarFormulario()){
        e.preventDefault();
    }
}

btnEnviar.onclick = function(e){
    
    //Variable para seleccionar los radios con el nombre tamaño y esten chekeados
    let radioActivo = document.querySelector('input[name="tamaño"]:checked');
    //Variable para seleccionar los check con el nombre ingredientes
    let checks = document.querySelectorAll('input[type="checkbox"]:checked');
    //Creo una variable que me dirá la cantidad total de checkbox checkeados
    let cont = 0; 
    //Creo variable para seleccionar el p con el id = total
    let pTotal = document.getElementById("total");
    let total = 0;
    //Si hay algun radio activo
    if(radioActivo) {
        //a total le sumamos el valor del radio
        total += Number(radioActivo.value);
    if(checks){
         //Recorremos con un for la lista de los checks marcados, por cada check marcado
        //le sumamos 1 (de 1€) por ingrediente
        for(let i = 0; i < checks.length; i++){
            if(checks[i].checked){
                cont = cont + 1;
            }
        }
        if(cont==0){
            e.preventDefault();
            alert('Debes introducir al menos 1 ingrediente, gracias');
        }
        //Su mamos al total la cantidad de checks marcados
        total = total + cont;
    }
        //En caso de que no haya ningun radio marcado lanzamos el mensaje mediante alert
    }else {
        e.preventDefault();
        alert('Debes seleccionar un tamaño y almenos un ingrediente');
    }

    if(nombre.value.trim() == "" || telefono.value.trim() == ""|| direccion.value.trim() == "" || email.value.trim() == ""){
        pTotal.innerHTML = `Debes introducir todos los campos`
    } else {
        alert(`El precio total será ${total}€ gracias por todo!`)
        pTotal.innerHTML = `El precio total es ${total} €`
    }
    //Por último modificamos el HTML del <p> con id total y le introducimos el total de la pizza
    //Muestro por alert lo mismo que en parrafo
    alert(`El precio total será ${total} €`)

}




nombre.onmouseout = function(e){
    if(nombre.value.trim() == ""){
        // parrafoAlert.innerHTML = "Debes introducir un nombre"
        // parrafoAlert.className += " warning"
    }
}
//Funciones prueba

btnEnviar.onmouseover = function(e){
    console.log("Entrando en mouseover")
}

btnEnviar.onmouseout = function(e){
    console.log("saliendo");
}




}

