$( document ).ready(function() {
    Cliente();
    TablaMascota();
    Veterinario();
    Raza();
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
    function Raza(){
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/raza.php',
            type : 'GET',
            dataType : 'json',
            success : function(json) {

                for (let index = 0; index < json.length ; index++) {
                    
                    $('#raza').prepend("<option value="+json[index].id_raza+">"+json[index].raza+"</option>");
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

    function Veterinario(){
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
    $("#btnAgregarMascota").click(function(){

        var nombre_mascota=$('#nombremascota').val();
        var tamano=$('#tamano').val();
        var color=$('#color').val();
        var edad=$('#edad').val();
        var sexo=$('#sexo').val();
        var raza=$('#raza').val();

        var id_cliente=$('#selectCliente').val();
    
        $.ajax({
           
            url : 'http://localhost/ApiVeterinaria/Api/mascota.php',
            type : 'POST',
            data : { 'nombremascota' : nombre_mascota,'tamano' : tamano,'color' : color,'edad' : edad,'sexo' : sexo,'raza' : raza,'selectCliente' : id_cliente },
            dataType : 'json',
            success : function(json) {
                alert("Se creo la mascota correctamente");
                $('#modalRegistrarMascota').modal('hide');
                $("#tablaanimales").append('""');
                    $('#nombremascota').val('');
                    $('#tamano').val('');
                    $('#color').val('');
                    $('#edad').val('');
                    $('#sexo').val('');
                    $('#selectCliente').val('');
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
                $("#tablaanimales").append('<thead class="thead-dark"><tr><th scope="col">ID</th><th scope="col">NOMBRE</th>'+
                '<th scope="col">TAMAÑO</th>'+
                '<th scope="col">COLOR</th>'+
                '<th scope="col">EDAD</th>'+
                '<th scope="col">SEXO</th>'+
                '<th scope="col">REGISTRAR HISTORIA CLINICA</th></tr></thead>'
                );
                for (let index = 0; index < json.length ; index++) {
                    $("#tablaanimales").append('<tr>' + 
                        '<th scope="row">' + json[index].id_mascotas + '</td>'+
                        '<td>' + json[index].nombre_mascotas + '</td>'+
                        '<td>' + json[index].tamano + '</td>'+
                        '<td>' + json[index].color + '</td>'+
                        '<td>' + json[index].edad + '</td>'+
                        '<td>' + json[index].sexo + '</td>'+
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
function datosActualizarMascota(dato){

    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/mascota.php?idmascota='+dato,
        data : { 'idmascota' : dato},
        type : 'GET',
        dataType : 'json',
        success : function(json) {
            
            $('#idmascota').val(dato);
            $('#nombremascota').val(json[0].nombre_mascotas);
            $('#tamano').val(json[0].tamano);
            $('#color').val(json[0].color);
            $('#edad').val(json[0].edad);
            $('#sexo').val(json[0].sexo);
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
            '<div class="col"><label for="id_cliente">Nombre Cliente</label>'+
            '<input type="text" class="form-control" name="id_cliente" id="id_cliente" aria-describedby="emailHelp" placeholder="id_cliente" value="'+json[0].id_cliente+'" disabled hidden>'+
            '<input type="text" class="form-control" name="nombreCliente" id="nombreCliente" aria-describedby="emailHelp" placeholder="nombreCliente" value="'+json[0].nombres+'" disabled> </div>');
            
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

$("#btnBuscarMascota").click(function(){
   
    var buscar=$('#textBuscarMascota').val();
    if (buscar.length<=0) {
        $("#tablaanimales").empty();
        TablaMascota();
    }else{
        $("#tablaanimales").empty();
        $.ajax({
            url : 'http://localhost/ApiVeterinaria/Api/mascota.php?idmascota='+buscar,
            data : { 'idmascota' : buscar},
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                $("#tablaanimales").append('<thead class="thead-dark"><tr><th scope="col">NOMBRE DE LA MASCOTA</th>'+
                    '<th scope="col">TAMAÑO</th>'+
                    '<th scope="col">COLOR</th>'+
                    '<th scope="col">EDAD</th>'+
                    '<th scope="col">SEXO</th>'+
                    '<th scope="col">REGISTRAR HISTORIA CLINICA</th></tr></thead>'
                );
                $("#tablaanimales").append('<tr>' + 
                    '<th scope="row">' + json[0].nombre_mascotas + '</td>'+
                    '<td>' + json[0].tamano + '</td>'+
                    '<td>' + json[0].color + '</td>'+
                    '<td>' + json[0].edad + '</td>'+
                    '<td>' + json[0].sexo + '</td>'+
                    '<td> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistroHistoriaClinica" id="registrarHistoria" onclick="javascript:DatosMascotaHistoria('+json[0].id_mascotas+')" value="'+json[0].id_mascotas+'">Registrar Historia Clinica</button></td>'+
                   
                    '</tr>'
                ); 
                        
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

$("#EnviarHistoria").click(function(){
    
    var idmascota=$('#idmascota').val();
    var temperatura=$('#temperatura').val();
    var peso=$('#peso').val();
    var frecuencia=$('#frecuencia').val();
    var fecha=$('#fecha').val();
    var hora=$('#hora').val();
    var descripcion=$('#descripcion').val();
    var id_veterinario=$('#veterinario').val();

    $.ajax({
        url : 'http://localhost/ApiVeterinaria/Api/HistoriaClinica.php',
        type : 'POST',
        data : { 'temperatura' : temperatura,'peso' : peso,'frecuencia' : frecuencia,'fecha' : fecha,'hora' : hora,'descripcion' : descripcion ,'idmascota' : idmascota ,'veterinario' :id_veterinario },
        dataType : 'json',
        success : function(json) {
            alert('Se registro la historia');
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