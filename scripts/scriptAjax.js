const datosDimensiones = "tamaniosPizza.json"
const datosIngredientes = "ingredientes.json"
const urlDestino = "http://localhost:5500/AE2_AJAX-FORMULARIOS/"

window.onload = function(){
    enviarDatosIngredientes();
    enviarDatosTamanios();
}

function enviarDatosIngredientes(){
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange= function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                creacionDatosIngredientes(this.responseText)
            } else {
                alert("¡Error en la obtencion de datos!")
            }
        }  
    }
    xmlHttp.open('GET', urlDestino + datosIngredientes, true)
    xmlHttp.send(null)
}
function enviarDatosTamanios(){
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange= function(){
        if (this.readyState == 4) {
            if (this.status == 200) {
                creacionDatosTamanios(this.responseText)
            } else {
                alert("¡Error en la obtencion de datos!")
            }
        }  
    }
    xmlHttp.open('GET', urlDestino + datosDimensiones, true)
    xmlHttp.send(null)
}
function creacionDatosIngredientes(jsonDoc) {
    var objetoJson = JSON.parse(jsonDoc)
    //Convertimos un texto a un objeto JSON
    let arrayIngredientes = objetoJson.CATALOGO.INGREDIENTES;
    let table = document.createElement("table");
    let divContenedor = document.getElementById("ingredientesContent");
    for( let ing of arrayIngredientes){    
        let td = document.createElement("td"); 
        const checkLabel = document.createElement("label");
        checkLabel.textContent=ing.NOMBRE+` ${ ing.PVP}€`;
        const check = document.createElement("input");
        check.type = "checkbox";
        check.name = "ingrediente"
        checkLabel.appendChild(check);
        td.appendChild(checkLabel);    
        table.appendChild(td)
    }
      divContenedor.appendChild(table);
}

function creacionDatosTamanios(jsonDoc){
    var objetoJson = JSON.parse(jsonDoc)
    let arrayTamanios = objetoJson.PIZZAS.TAMANIOS;
    let table = document.createElement("table");

    console.log(arrayTamanios);
    let divContenedor = document.getElementById("dimensionesContent");
  
    for( let tm of arrayTamanios){   
        let td = document.createElement("td"); 
        const checkLabel = document.createElement("label");
        checkLabel.textContent=tm.NOMBRE+` ${ tm.PVP}€`;
        const check = document.createElement("input");
        check.type = "radio";
        check.name = "tamanio"
        check.id = tm.NOMBRE;
        td.appendChild(checkLabel);
        checkLabel.appendChild(check);
        table.appendChild(td)
    }   
    table.id = "tableContendor";
    table.setAttribute("style",  "margin: auto;")
    divContenedor.appendChild(table);
    let rdChecked = document.getElementById("PEQUEÑA");
    //checkeo por defecto
    rdChecked.checked = true;
    
}