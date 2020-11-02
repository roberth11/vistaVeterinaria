$( document ).ready(function() {
    TablaHistoria();
    veterinario();
});

function veterinario(){
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/veterinario.php',
        type : 'GET',
        dataType : 'json',
        success : function(json) {

            for (let index = 0; index < json.length ; index++) {
                
                $('#veterinario').prepend("<option value="+json[index].id_veterinario+">"+json[index].nombres+"</option>");
            }      
        },
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
        complete : function(xhr, status) {
            
        }
    });
}

 function TablaHistoria(){
        $("#tablaHistoria").empty();
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                $("#tablaHistoria").append('<thead class="thead-dark"><tr><th scope="col">Temperatura</th>'+
                '<th scope="col">Peso</th>'+
                '<th scope="col">Frecuencia Cardiaca</th>'+
                '<th scope="col">fecha</th>'+
                '<th scope="col">hora</th>'+
                '<th scope="col">Descripcion Historia Clinica</th>'+
                '<th scope="col">Nombre Mascota</th>'+
                '<th scope="col">Eliminar</th>'+
                '<th scope="col">Editar</th></tr></thead>'
                );
                for (let index = 0; index < json.length ; index++) {
                    $("#tablaHistoria").append('<tr>' + 
                        '<th scope="row">' + json[index].temperatura + '</td>'+
                        '<td>' + json[index].peso + '</td>'+
                        '<td>' + json[index].frecuencia_cardiaca + '</td>'+
                        '<td>' + json[index].fecha + '</td>'+
                        '<td>' + json[index].hora + '</td>'+
                        '<td>' + json[index].descripcion_historia__clinica + '</td>'+
                        '<td>' + json[index].nombre_mascotas + '</td>'+
                        '<td> <button type="button" id="boton-eliminar" class="btn btn-danger" onclick="javascript:eliminarHistoria('+json[index].id_historia_clinica+')">Eliminar Historia</button></td>'+
                        '<td> <button type="button" id="boton-actualizar" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistroHistoriaClinica" id="registrarHistoria" onclick="javascript:DatosMascotaHistoria('+json[index].id_mascota+','+json[index].id_historia_clinica+')">Editar Historia</button></td>'+
                        '</tr>'
                    ); 
                        
                }      
            },
            error : function(xhr, ajaxOptions, thrownError) {
                alert(xhr.statusText); 
                alert(xhr.responseText); 
                alert(xhr.status); 
                alert(thrownError); 
            },
            complete : function(xhr, status) {
                
            }
        });
}


function DatosMascotaHistoria(dato1,dato2){
    $('#datosmascota').empty();
    $('#datosmascota1').empty();

    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/mascota.php?idmascota='+dato1,
        data : { 'idmascota' : dato1},
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            $('#datosmascota').append('<div class="col"><label for="NombreMascota">Nombre Macota</label>'+
            '<input type="text" class="form-control" name="NombreMascota" id="NombreMascota" aria-describedby="emailHelp" placeholder="NombreMascota" value="'+json[0].nombre_mascotas+'" disabled></div>'+
            '<div class="col"><input type="text" class="form-control" name="idmascota" id="idmascota" aria-describedby="emailHelp" placeholder="idmascota" value="'+dato1+'" hidden><label for="Tamano">Tamaño</label>'+
            '<input type="text" class="form-control" name="idhistoria" id="idhistoria" aria-describedby="emailHelp" placeholder="idhistoria" value="'+dato2+'" hidden>'+
            '<input type="text" class="form-control" name="Tamano" id="Tamano" aria-describedby="emailHelp" placeholder="Tamaño" value="'+json[0].tamano+'" disabled></div>'+
            '<div class="col"><label for="color">Color</label>'+
            '<input type="text" class="form-control" name="color" id="color" aria-describedby="emailHelp" placeholder="color" value="'+json[0].color+'" disabled></div>');
            $('#datosmascota1').append('<div class="col"><label for="edad">Edad</label>'+
            '<input type="text" class="form-control" name="edad" id="edad" aria-describedby="emailHelp" placeholder="Edad" value="'+json[0].edad+'" disabled></div>'+
            '<div class="col"><label for="sexo">Sexo</label>'+
            '<input type="text" class="form-control" name="sexo" id="sexo" aria-describedby="emailHelp" placeholder="sexo" value="'+json[0].sexo+'" disabled></div>'+
            '<div class="col"><label for="id_cliente">Nombre Cliente</label>'+
            '<input type="text" class="form-control" name="id_cliente" id="id_cliente" aria-describedby="emailHelp" placeholder="id_cliente" value="'+json[0].id_cliente+'" disabled hidden>'+
            '<input type="text" class="form-control" name="nombreCliente" id="nombreCliente" aria-describedby="emailHelp" placeholder="nombreCliente" value="'+json[0].nombres+'" disabled></div>');
            datosHistoria(dato2);
        },
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
        complete : function(xhr, status) {
            
        }
    });
}
function datosHistoria(dato){
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php?idHistoria='+dato,
        data : { 'idHistoria' : dato},
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            $('#idhistoria').val(dato);
            $('#temperatura').val(json[0].temperatura);
            $('#peso').val(json[0].peso);
            $('#frecuencia').val(json[0].frecuencia_cardiaca);
            $('#fecha').val(json[0].fecha);
            $('#hora').val(json[0].hora);
            $('#descripcion').val(json[0].descripcion_historia__clinica);
        },
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
        complete : function(xhr, status) {
        }
    });

}
function eliminarHistoria(dato){
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php?idHistoria='+dato,
        data : { 'idHistoria' : dato},
        type : 'DELETE',
        dataType : 'json',
        success : function(json) {
            alert("Eliminada la historia correctamente");
            TablaHistoria();
        },
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
        complete : function(xhr, status) {
        }
    });
}

$("#btnFormularioActualizarHistoria").click(function(){
    
    var idhistoria=$('#idhistoria').val();
    var idmascota=$('#idmascota').val();
    var temperatura=$('#temperatura').val();
    var peso=$('#peso').val();
    var frecuencia=$('#frecuencia').val();
    var fecha=$('#fecha').val();
    var hora=$('#hora').val();
    var descripcion=$('#descripcion').val();
    var actualizar="Actualizar";
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php',
        type : 'GET',
        data : { 'actualizar' : actualizar,'idHistoria' : idhistoria,'temperatura' : temperatura,'peso' : peso,'frecuencia' : frecuencia,'fecha' : fecha,'hora' : hora,'descripcion' : descripcion ,'idmascota' : idmascota },
        dataType : 'json',
        success : function(json) {
            alert("Actualizado correctamente");
            $('#modalRegistroHistoriaClinica').modal('hide');
            $('#idmascota').val('');
            $('#temperatura').val('');
            $('#peso').val('');
            $('#frecuencia').val('');
            $('#fecha').val('');
            $('#hora').val('');
            $('#descripcion').val('');
            TablaHistoria();
        },
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
        complete : function(xhr, status) {
            
        }
    });
});

$("#btnBuscarHistoria").click(function(){
   
    var buscar=$('#textBuscarHistoria').val();
    var Texbuscar="1";
    if (buscar.length<=0) {
        $("#tablaHistoria").empty();
        TablaHistoria();
    }else{
        $("#tablaHistoria").empty();
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php?idHistoria='+buscar,
            data : { 'idHistoria' : buscar,'buscar' : Texbuscar},
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                $("#tablaHistoria").append('<thead class="thead-dark"><tr><th scope="col">Temperatura</th>'+
                '<th scope="col">Peso</th>'+
                '<th scope="col">Frecuencia Cardiaca</th>'+
                '<th scope="col">fecha</th>'+
                '<th scope="col">hora</th>'+
                '<th scope="col">Descripcion Historia Clinica</th>'+
                '<th scope="col">Nombre Mascota</th>'+
                '<th scope="col">Eliminar</th>'+
                '<th scope="col">Editar</th></tr></thead>'
                );
                for (let index = 0; index < json.length ; index++) {
                    $("#tablaHistoria").append('<tr>' + 
                        '<th scope="row">' + json[index].temperatura + '</td>'+
                        '<td>' + json[index].peso + '</td>'+
                        '<td>' + json[index].frecuencia_cardiaca + '</td>'+
                        '<td>' + json[index].fecha + '</td>'+
                        '<td>' + json[index].hora + '</td>'+
                        '<td>' + json[index].descripcion_historia__clinica + '</td>'+
                        '<td>' + json[index].nombre_mascotas + '</td>'+
                        '<td> <button type="button" id="boton-eliminar" class="btn btn-danger" onclick="javascript:eliminarHistoria('+json[index].id_historia_clinica+')">Eliminar Historia</button></td>'+
                        '<td> <button type="button" id="boton-actualizar" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistroHistoriaClinica" id="registrarHistoria" onclick="javascript:DatosMascotaHistoria('+json[index].id_mascota+','+json[index].id_historia_clinica+')">Editar Historia</button></td>'+
                        '</tr>'
                    ); 
                }
                          
            },
            error : function(xhr, ajaxOptions, thrownError) {
                alert(xhr.statusText); 
                alert(xhr.responseText); 
                alert(xhr.status); 
                alert(thrownError); 
            },
            complete : function(xhr, status) {
                
            }
        });
    }
});