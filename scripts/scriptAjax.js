const datosDimensiones = "ingredientes.json"
const urlDestino = "http://localhost:5500/AE2_AJAX-FORMULARIOS/"

window.onload = function(){
    enviarDatos();
}

function enviarDatos(){

    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange= function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                creacionDatos(this.responseText)//Obtenemos el valor en texto
            } else {
                alert("¡Error en la obtencion de datos!")
            }
        }  
    }
    xmlHttp.open('GET', urlDestino + datosDimensiones, true)
    xmlHttp.send(null)
}

function creacionDatos(jsonDoc) {
    var objetoJson = JSON.parse(jsonDoc)
    //Convertimos un texto a un objeto JSON
    let arrayIngredientes = objetoJson.CATALOGO.INGREDIENTES;
    let divIngredientes = document.createElement("div");
    console.log(arrayIngredientes);
    let divContenedor = document.getElementById("ingredientesContent");
    for( let ing of arrayIngredientes){    
        const checkLabel = document.createElement("label");
        checkLabel.textContent=ing.NOMBRE;
        const check = document.createElement("input");
        check.type = "checkbox";
        check.name = "ingrediente"
        divContenedor.appendChild(checkLabel);
        divContenedor.appendChild(check);
    }

}