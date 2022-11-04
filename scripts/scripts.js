
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
    enviarDatosIngredientes();
    enviarDatosTamanios();
    const btnEnviar = document.getElementById("btnEnviar");

    btnEnviar.onclick = function(e){
        if(!validarFormulario()){
            e.preventDefault();
        }
    }

    btnEnviar.onclick = function(e){
        
        //Variable para seleccionar los radios con el nombre tamaño y esten chekeados
        let radioActivo = document.querySelector('input[name="tamanio"]:checked');
        //Variable para seleccionar los check con el nombre ingredientes
        let checks = document.querySelectorAll('input[name="ingredientes"]:checked');
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
    
    const btnReset = document.getElementById("btnReset");
    btnReset.onclick = function(){
        let ingContenedor = document.getElementById("ingredientesContent")
        let tmContenedor = document.getElementById("dimensionesContent") 
        if(ingContenedor.hasChildNodes()){
            while(ingContenedor.childNodes.length>=1){
                ingContenedor.removeChild(ingContenedor.firstChild);
            }
            enviarDatosIngredientes();
        } 
        if(tmContenedor.hasChildNodes()){
            while(tmContenedor.childNodes.length>=1){
                tmContenedor.removeChild(tmContenedor.firstChild);
            }
            enviarDatosTamanios();
        } 
       
       
       // enviarDatosTamanios();
    }
}
//AJAX
const datosDimensiones = "tamaniosPizza.json"
const datosIngredientes = "ingredientes.json"
const urlDestino = "http://localhost:5500/AE2_AJAX-FORMULARIOS/"

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
