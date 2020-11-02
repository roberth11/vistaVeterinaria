$( document ).ready(function() {
    Cliente();
    TablaMascota();

    function Cliente(){
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/cliente.php',
            type : 'GET',
            dataType : 'json',
            success : function(json) {

                for (let index = 0; index < json.length ; index++) {
                    
                    $('#selectCliente').prepend("<option value="+json[index].id_cliente+">"+json[index].nombres+"</option>");
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
    $("#btnAgregarMascota").click(function(){

        var nombre_mascota=$('#nombremascota').val();
        var tamano=$('#tamano').val();
        var color=$('#color').val();
        var edad=$('#edad').val();
        var sexo=$('#sexo').val();
        var id_cliente=$('#selectCliente').val();
    
        $.ajax({
           
            url : 'http://localhost/ApiVeterinaria/Api/mascota.php',
            type : 'POST',
            data : { 'nombremascota' : nombre_mascota,'tamano' : tamano,'color' : color,'edad' : edad,'sexo' : sexo,'selectCliente' : id_cliente },
            dataType : 'json',
            success : function(json) {
                alert("Se creo la mascota correctamente");
                $('#modalRegistrarMascota').modal('hide');
                $("#tablaanimales").append('""');
                TablaMascota();
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

});
 function TablaMascota(){
        $("#tablaanimales").empty();
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/mascota.php',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                $("#tablaanimales").append('<thead class="thead-dark"><tr><th scope="col">NOMBRE DE LA MASCOTA</th>'+
                '<th scope="col">TAMAÑO</th>'+
                '<th scope="col">COLOR</th>'+
                '<th scope="col">EDAD</th>'+
                '<th scope="col">SEXO</th>'+
                '<th scope="col">ELIMINAR</th>'+
                '<th scope="col">EDITAR</th>'+
                '<th scope="col">REGISTRAR HISTORIA CLINICA</th></tr></thead>'
                );
                for (let index = 0; index < json.length ; index++) {
                    $("#tablaanimales").append('<tr>' + 
                        '<th scope="row">' + json[index].nombre_mascotas + '</td>'+
                        '<td>' + json[index].tamano + '</td>'+
                        '<td>' + json[index].color + '</td>'+
                        '<td>' + json[index].edad + '</td>'+
                        '<td>' + json[index].sexo + '</td>'+
                        '<td> <button type="button" id="boton-eliminar" class="btn btn-danger" onclick="javascript:eliminarMascota('+json[index].id_mascotas+')">Eliminar Mascota</button></td>'+
                        '<td> <button type="button" id="boton-eliminar" class="btn btn-primary">Editar Mascota</button></td>'+
                        '<td> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistroHistoriaClinica" id="registrarHistoria" onclick="javascript:DatosMascotaHistoria('+json[index].id_mascotas+')" value="'+json[index].id_mascotas+'">Registrar Historia Clinica</button></td>'+
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


function DatosMascotaHistoria(dato){
    $('#datosmascota').empty();
    $('#datosmascota1').empty();
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/mascota.php?idmascota='+dato,
        data : { 'idmascota' : dato},
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            $('#datosmascota').append('<div class="col"><label for="NombreMascota">Nombre Macota</label>'+
            '<input type="text" class="form-control" name="NombreMascota" id="NombreMascota" aria-describedby="emailHelp" placeholder="NombreMascota" value="'+json[0].nombre_mascotas+'" disabled></div>'+
            '<div class="col"><input type="text" class="form-control" name="idmascota" id="idmascota" aria-describedby="emailHelp" placeholder="idmascota" value="'+dato+'" hidden><label for="Tamano">Tamaño</label>'+
            '<input type="text" class="form-control" name="Tamano" id="Tamano" aria-describedby="emailHelp" placeholder="Tamaño" value="'+json[0].tamano+'" disabled></div>'+
            '<div class="col"><label for="color">Color</label>'+
            '<input type="text" class="form-control" name="color" id="color" aria-describedby="emailHelp" placeholder="color" value="'+json[0].color+'" disabled></div>');
            $('#datosmascota1').append('<div class="col"><label for="edad">Edad</label>'+
            '<input type="text" class="form-control" name="edad" id="edad" aria-describedby="emailHelp" placeholder="Edad" value="'+json[0].edad+'" disabled></div>'+
            '<div class="col"><label for="sexo">Sexo</label>'+
            '<input type="text" class="form-control" name="sexo" id="sexo" aria-describedby="emailHelp" placeholder="sexo" value="'+json[0].sexo+'" disabled></div>'+
            '<div class="col"><label for="id_cliente">Id_cliente</label>'+
            '<input type="text" class="form-control" name="id_cliente" id="id_cliente" aria-describedby="emailHelp" placeholder="id_cliente" value="'+json[0].id_cliente+'" disabled></div>');
            
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

function eliminarMascota(dato){
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/mascota.php?idmascota='+dato,
        data : { 'idmascota' : dato},
        type : 'DELETE',
        dataType : 'json',
        success : function(json) {
            alert("se elimino la mascota correctamente");
            TablaMascota();
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

$("#EnviarHistoria").click(function(){
    idmascota
    var idmascota=$('#idmascota').val();
    var temperatura=$('#temperatura').val();
    var peso=$('#peso').val();
    var frecuencia=$('#frecuencia').val();
    var fecha=$('#fecha').val();
    var hora=$('#hora').val();
    var descripcion=$('#descripcion').val();
    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php',
        type : 'POST',
        data : { 'temperatura' : temperatura,'peso' : peso,'frecuencia' : frecuencia,'fecha' : fecha,'hora' : hora,'descripcion' : descripcion ,'idmascota' : idmascota },
        dataType : 'json',
        success : function(json) {
            $('#modalRegistroHistoriaClinica').modal('hide');
            $('#idmascota').val('');
            $('#temperatura').val('');
            $('#peso').val('');
            $('#frecuencia').val('');
            $('#fecha').val('');
            $('#hora').val('');
            $('#descripcion').val('');
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



/*$("#boton-eliminar").click(function(){
    $.ajax({
        // la URL para la petición
        url : 'http://localhost/servicios/Api/Usuario.php?id=54645677',
    
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
    
        // especifica si será una petición POST o GET
        type : 'DELETE',
    
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        data : { 'id' : '546456782' },
    
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            alert(json);
            $("#Table").append('<tr><td>ID</td>'+
            '<td>Nombre</td>');

            for (let index = 0; index < 3; index++) {
              
            }       
        },
    
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.statusText); 
            alert(xhr.responseText); 
            alert(xhr.status); 
            alert(thrownError); 
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            
        }
    });
});


$("#boton-usuarios").click(function(){
    $.ajax({
        // la URL para la petición
        url : 'http://localhost/servicios/Api/Usuario.php',
    
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { id : 123 },
    
        // especifica si será una petición POST o GET
        type : 'GET',
    
        // el tipo de información que se espera de respuesta
        dataType : 'json',
    
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            $("#Table").append('<tr><td>ID</td>'+
            '<td>Nombre</td>');

            for (let index = 0; index < json.length ; index++) {
                $("#Table").append('<tr>' + 
                    '<td align="center" style="dislay: none;">' + json[index].NoDocumento + '</td>'+
                    '<td align="center" style="dislay: none;">' + json[index].PrimerNombre + '</td></tr>'); 
            }       
        },
    
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            
        }
    });
});*/
