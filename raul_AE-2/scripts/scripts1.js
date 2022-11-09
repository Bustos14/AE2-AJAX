
const RECURSO = "ingredientes.json"
const URL_DESTINO = "http://localhost:5500/PRUEBA_AE-2/"


window.onload = function(){

    //console.log('correcto')

    document.querySelector('#envDatosIng').addEventListener('click', traerDatosIngredientes);
    

    function traerDatosIngredientes(){
        console.log('funcion ingredientes activada')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);
                //console.log(datos);
                document.getElementById('resIng').innerHTML='';
                //console.log(this.responseText)

                let dviIng = document.getElementById('resIng');
                for(let item of datos){

                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let td1 = document.createElement("td");
 
                    let tamInput = document.createElement('input');
                    
                    tamInput.type = 'checkbox';
                    tamInput.name = 'ingredientes';
                    tamInput.id = `${item.nombre}`;
                    tamInput.value = `${item.pvp}`;
                    tamInput.class = 'tamanios';

                    let tamLabel = document.createElement('label');
                    let tamLabelPvp = document.createElement('label');

                    tamLabel.appendChild(document.createTextNode(`${item.nombre}`));
                    tamLabelPvp.appendChild(document.createTextNode(`${item.pvp}`));

                    dviIng.appendChild(tr)
                    tr.appendChild(td)
                    td.appendChild(tamLabel);
                    
                    tr.appendChild(td1)
                    td1.appendChild(tamLabelPvp);
                    dviIng.appendChild(tamInput); 
                    }
                    document.querySelector('#CARNE_PICADA').checked = true;
                    document.querySelector('#CHAMPIÑONES').checked = true;
                    document.querySelector('#EXTRA_QUESO').checked = true;
                }
        }

        xhttp.open('GET','ingredientes.json',true);
        xhttp.send()
    }

    document.querySelector('#envDatosTam').addEventListener('click',traerDatosTam);

    function traerDatosTam(){
        console.log('funcion tamaños activada')
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos = JSON.parse(this.responseText);

                document.getElementById('resTam').innerHTML = '';

                let divTam = document.getElementById('resTam');
                for(let item of datos){

                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let td1 = document.createElement("td");
 
                    let tamInput = document.createElement('input');
                    tamInput.name= 'tamaños';
                    tamInput.type = 'radio';
                    tamInput.id = `${item.nombre}`;
                    tamInput.value = `${item.pvp}`;
                    tamInput.class = 'ingredientes';

                    let tamLabel = document.createElement('label');
                    let tamLabelPvp = document.createElement('label');

                    tamLabel.appendChild(document.createTextNode(`${item.nombre}`));
                    tamLabelPvp.appendChild(document.createTextNode(`${item.pvp}`));

                    divTam.appendChild(tr)
                    tr.appendChild(td)
                    td.appendChild(tamLabel);
                    
                    tr.appendChild(td1)
                    td1.appendChild(tamLabelPvp);
                    divTam.appendChild(tamInput);


                }
                document.querySelector('#PORCION_PIZZA').checked = true;
            }
        }
        
            xhttp.open('GET','tamanios.json',true);
            xhttp.send();
    }

    
    let formulario = document.querySelector('.formulario');
    formulario.onsubmit = validarForm;
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
            document.getElementById('warning').innerHTML = `
            <span class="warning">Debes introducir los campos obligatorios, un tamaño de pizza y al menos un ingrediente</span>
            `
        } if(form.telefono.value.trim() == ''){
            document.querySelector('.warningTelefono').innerHTML = `
            <span class="warning">Debes introducir tu telefono, porfavor</span>
            `
            document.getElementById('warning').innerHTML = `
            <span class="warning">Debes introducir los campos obligatorios, un tamaño de pizza y al menos un ingrediente</span>
            `
        } if(form.direccion.value.trim() == ''){
            document.querySelector('.warningDireccion').innerHTML = `
            <span class="warning">Debes introducir tu direccion, porfavor</span>
            `
            document.getElementById('warning').innerHTML = `
            <span class="warning">Debes introducir los campos obligatorios, un tamaño de pizza y al menos un ingrediente</span>
            `
        } if(form.email.value.trim() == ''){
            document.querySelector('.warningEmail').innerHTML = `
            <span class="warning">Debes introducir tu email, porfavor</span>
            `
            document.getElementById('warning').innerHTML = `
            <span class="warning">Debes introducir los campos obligatorios, un tamaño de pizza y al menos un ingrediente</span>
            `
        }

        form.nombre.focus();
        sumaTotal();
        return false;
    }

    function sumaTotal(){
        if(document.querySelectorAll('input[type=radio]').length == 0){
            alert('Debes sellecionar el tamaño de la pizza')
        } if (document.querySelectorAll('input[type=checkbox]').length == 0){
            alert('Debes seleccionar almnenos un ingrediente')
        } if (document.querySelectorAll('input[type=radio]').length != 0 && document.querySelectorAll('input[type=checkbox]').length != 0) {
        total = 0;
        total += mostrarChecks();
        total += mostrarRadios();
        alert(`El total de tu pizza será ${total}€`)
        document.getElementById('warning').innerHTML = `
            <span class="warning">El total de tu pizza será ${total}€</span>
            `
        }
    }

    function mostrarRadios(){
        let total = 0;
        let misradios = document.querySelectorAll('input[type=radio]');
        for(let ele of misradios){
            if(ele.checked){
                total += Number(ele.value);
            }
        }

        return total;
    }

    function mostrarChecks(){
        let total = 0;
        let misChecks = document.querySelectorAll('input[name=ingredientes]');
        for(let ele of misChecks){
            if(ele.checked){
                total += Number(ele.value);
            } 
        }

        return total;
    }


}