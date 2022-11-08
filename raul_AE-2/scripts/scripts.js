
const RECURSO = "ingredientes.json"
const URL_DESTINO = "http://localhost:5500/PRUEBA_AE-2/"


window.onload = function(){

    //console.log('correcto')

    document.querySelector('#envDatosIng').addEventListener('click', traerDatosIngredientes);
    

    function traerDatosIngredientes(){
        //console.log('funcion activada')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);
                //console.log(datos);
                document.getElementById('resIng').innerHTML='';
                //console.log(this.responseText)

                for(let item of datos){
                    document.getElementById('resIng').innerHTML += `
                        <tr>
                            <td>${item.nombre}</td>
                            <input type="checkbox" name="ingredientes" id="${item.nombre}" value="1" class="ingred">
                            <td>${item.pvp}</td>
                        </tr>
                    `
                }
                document.querySelector('#CEBOLLA').checked = true;
                document.querySelector('#POLLO').checked = true;
                document.querySelector('#PIMIENTO').checked = true;
            }
        }

        xhttp.open('GET','ingredientes.json',true);
        xhttp.send()
    }

    document.querySelector('#envDatosTam').addEventListener('click',traerDatosTam);

    function traerDatosTam(){
        console.log('funcion activada')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);

                document.getElementById('resTam').innerHTML = '';

                for(let item of datos){
                    document.getElementById('resTam').innerHTML += `
                        <tr>
                            <td>${item.nombre}</td> <input type="radio" name="tamaño" id="${item.nombre}" value="${item.pvp}" class="tamanio">
                            <td>${item.pvp}</td>
                        </tr>
                    `
                }
                document.querySelector('#INDIVIDUAL').checked = true;
            }
        }
        
            xhttp.open('GET','tamanios.json',true);
            xhttp.send();
    }

    
    let formulario = document.querySelector('.formulario');
    formulario.onsubmit = validarForm;
}


function sumaTotal(){
    let radios = document.querySelectorAll('ingred');
    let checks = document.querySelectorAll('tamanio');
    console.log(checks)
    /*
    let total = 0;
    for(let ele = 0; ele < radios.length; i++){
        total += parseFloat(ele.value);
     }
     alert(`El total de la compra es ${total}`);
    */
}


function validarForm(){
    var form = document.querySelector('.formulario');

    if(form.nombre.value.trim() == '' || form.telefono.value.trim() == '' || 
        form.direccion.value.trim() == '' || form.email.value.trim() == ''){
        alert("Todos los campos son obligatorios");
        if(form.nombre.value.trim() == ''){
            document.querySelector('.warningNombre').innerHTML = `
            <span class="warning">Debes introducir tu nombre, porfavor</span>
            `
        } if(form.telefono.value.trim() == ''){
            document.querySelector('.warningTelefono').innerHTML = `
            <span class="warning">Debes introducir tu telefono, porfavor</span>
            `
        } if(form.direccion.value.trim() == ''){
            document.querySelector('.warningDireccion').innerHTML = `
            <span class="warning">Debes introducir tu direccion, porfavor</span>
            `
        } if(form.email.value.trim() == ''){
            document.querySelector('.warningEmail').innerHTML = `
            <span class="warning">Debes introducir tu email, porfavor</span>
            `
        }

        form.nombre.focus();
        return false;
    }


    
    document.querySelector('#btnEnviar').addEventListener('click', sumaTotal);

}