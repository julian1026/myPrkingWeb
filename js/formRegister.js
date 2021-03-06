
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.replace('../login');
    }
})

//function that upload images to storage of firebase
async function uploadImages() {

    let imagenes = document.getElementById('file-image').files;
    let nombre = '';
    let tamano = imagenes.length;
    let metadata = null;
    let tasks = null;
    let arrayImages = [];

    if (tamano == 0) {
        return Swal.fire("Mensaje de Advertencia", "como minimo seleccione una imagen", "warning")
    } if (tamano > 3) {
        return Swal.fire("Mensaje de Advertencia", "como Maximo 4 Imagenes", "warning");
    }
    else {
        for (let i = 0; i < tamano; i++) {
            nombre = new Date() + '-' + imagenes[i].name;
            metadata = {
                contentType: imagenes[i].type
            }
            tasks = ref.child('parkingImage/' + nombre).put(imagenes[i], metadata);

            await tasks
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then(url => {
                    arrayImages[i] = url;
                }).catch(error => console.log(error))
        }
    }

    return arrayImages;
}


function registrar() {

    let nombre = document.getElementById('txt_nombre').value;
    let longitud = parseFloat(document.getElementById('txt_longitud').value);
    let latitud = parseFloat(document.getElementById('txt_latitud').value);
    let direccion = document.getElementById('txt_direccion').value;
    let descripcion = document.getElementById('txt_descripcion').value;


    if (nombre.trim().length == 0 || !longitud || !latitud || direccion.trim().length == 0 || descripcion.trim().length == 0) {
        return Swal.fire("Mensaje de Advertencia", "todos los campos son necesarios.", "warning");
    }

    uploadImages().then((imagesURL) => {

        if (Array.isArray(imagesURL)) {//verifico que images sea un arreglo

            db.collection('parqueaderos').doc().set({
                nombre: nombre,
                'locacion': {
                    'latitude': latitud,
                    'longitude': longitud,
                    'latitudeDelta': 0.001,
                    'longitudeDelta': 0.001
                },
                'descripcion': descripcion,
                'direccion': direccion,
                'imagenes': imagesURL,
                'quantityVoting': 0,
                'rating': 0,
                'ratingTotal': 0,
                'estado': true,
                'createAt': new Date(),
                'createBy': null
            })
            Swal.fire("Mensaje de Confirmacion", "Registro Exitoso", "success");
            limpiar();
            queryParking();
        }
    })

}




function limpiar() {
    document.getElementById('txt_nombre').value = '';
    document.getElementById('txt_longitud').value = '';
    document.getElementById('txt_latitud').value = '';
    document.getElementById('txt_direccion').value = '';
    document.getElementById('txt_descripcion').value = '';
    document.getElementById('file-image').value = '';

}


var queryParking = (async () => {
    var parking = [];
    var id = [];
    var count = 0;
    await db.collection('parqueaderos').get()
        .then((query) => {
            query.forEach((doc) => {
                parking.push(doc.data());
                id.push(doc.id);
                // console.log(doc.data());
                // console.log(doc.id);

            })
            for (d of parking) {
                d['id'] = id[count];
                count++;
            }
            // console.log(parking);
            listParking(parking);
        }).catch((error) => {
            console.log(error);
        })

});






var tabla;
function listParking(datos1) {
    tabla = $("#txt_tablaparqueaderos").DataTable({
        // deferLoading: true,
        // retrieve: true,
        // processing: true,
        bDestroy: true,
        bAutoWidth: false,
        "lengthMenu": [[3, 12, 24, 48, -1], [3, 12, 24, 48, "All"]],
        "pageLength": 3,
        "destroy": true,
        "async": false,
        "processing": true,
        language: {
            processing: "procesando...",
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontro resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            search: "Buscar: ",
            paginate: {
                first: "primero",
                last: "ultimo",
                next: "siguiente",
                previous: "Anterior",
            },
            processing: "procesando...",
        },

        responsive: "true",
        data: datos1,
        columns: [
            { data: 'nombre' }, { data: 'locacion.latitude' }, { data: 'locacion.longitude' }, { data: 'direccion' }, { data: 'descripcion' },
            {
                data: 'estado', render: function (data) {
                    if (data == true) {
                        return "<div><span class='material-icons bg-success'>check</span> activo</div>";
                    } else {
                        return "<div><span class='material-icons bg-danger'>cancel</span> inactivo</div>";
                    }
                }
            },
            {
                defaultContent:
                    "<button class='estado' data-toggle='tooltip' data-placement='left' title='estado' style='background-color:#008B8B; color:#FFFAFA; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #008B8B;'  ><span class='material-icons'>check</span></button>&nbsp;"
                    +
                    "<button   class='editar' data-toggle='tooltip' data-placement='left' title='Registrar' style='background-color:#2F4F4F; color:#FFFAFA; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #2F4F4F;' ><span class='material-icons'>create</span></button>&nbsp;"
                    +
                    "<button class='image' data-toggle='tooltip' data-placement='left' title='imagenes' style='background-color:; color:#2F4F4F; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #2F4F4F;' ><span class='material-icons'>collections</span></button>&nbsp;"
            },
        ],

    });
}


//activar o desactivar parqueadero
$('#txt_tablaparqueaderos').on('click', '.estado', function () {
    var data = tabla.row($(this).parents('tr')).data();
    // console.log(data);
    if (tabla.row(this).child.isShown()) {
        var data = tabla.row(this).data();
    }

    identificador = data.id;
    estado = !data.estado;
    if (estado) {
        title = "activar  parqueadero?"
        text = "Una vez hecho esto el parqueadero aparecera en el mapa"
    } else {
        title = "Esta seguro de desactivar el parqueadero?"
        text = "Una vez hecho esto el parqueadero no aparecera en el mapa"
    }

    var objecto = { 'estado': estado }//variable de cambio de estado

    console.log(data);
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si!'
    }).then((result) => {
        if (result.value) {
            updateStatus(identificador, objecto)
        }
    })

})


// update data of parkings
$('#txt_tablaparqueaderos').on('click', '.editar', function () {
    var data = tabla.row($(this).parents('tr')).data();
    // console.log(data);
    if (tabla.row(this).child.isShown()) {
        var data = tabla.row(this).data();
    }
    console.log(data);
    $("#modalupdateparqueadero").modal({ backdrop: 'static', keyboard: false });
    $("#modalupdateparqueadero").modal('show');

    identificador = data.id;
    $("#txt_update_nombre").val(data.nombre);
    $("#txt_update_latitud").val(data.locacion.latitude);
    $("#txt_update_longitud").val(data.locacion.longitude);
    $("#txt_update_direccion").val(data.direccion);
    $("#txt_update_descripcion").val(data.descripcion);
})



// carrusel image
$('#txt_tablaparqueaderos').on('click', '.image', function () {
    var data = tabla.row($(this).parents('tr')).data();
    // console.log(data);
    if (tabla.row(this).child.isShown()) {
        var data = tabla.row(this).data();
    }
    console.log(data);
    $("#modalupdateCarrusel").modal({ backdrop: 'static', keyboard: false });
    $("#modalupdateCarrusel").modal('show');

    identificador = data.id;
    cargarCarrusel(data.imagenes);

})

function cargarCarrusel(imageArray) {
    let carrusel = document.querySelector('#carrusel');
    let other = ["carousel-item active", "carousel-item", "carousel-item", "carousel-item"]
    let alt = ["First slide", "Second slide", "Third slide", "Fourth slide"]

    let aux = '';
    imageArray.map((imageURL, index) => {
        aux += `
        <div class= "${other[index]}" >
              <img class="d-block w-100" style="width:100px; height: 300px;" src=${imageURL} alt="${alt[index]}" >
            </div>
        `
    })
    carrusel.innerHTML = aux;
}



function updateParking() {
    nombre = $("#txt_update_nombre").val();
    longitud = $("#txt_update_longitud").val();
    latitud = $("#txt_update_latitud").val();
    direccion = $("#txt_update_direccion").val();
    descripcion = $("#txt_update_descripcion").val();

    if (nombre.trim().length == 0 || !longitud || !latitud || direccion.trim().length == 0 || descripcion.trim().length == 0) {
        return Swal.fire("Mensaje de Advertencia", "todos los campos son necesarios.", "warning");
    }

    var objecto1 = {
        'nombre': nombre,
        'locacion': {
            'latitude': parseFloat(latitud),
            'longitude': parseFloat(longitud),
            'latitudeDelta': 0.001,
            'longitudeDelta': 0.001
        },
        'direccion': direccion,
        'descripcion': descripcion
    }
    updateStatus(identificador, objecto1);
}




var updateStatus = (async (id, objeto) => {
    await db.collection('parqueaderos')
        .doc(id).update(objeto)
        .then(() => {
            queryParking();
            $("#modalupdateparqueadero").modal('hide');
            Swal.fire("Mensaje de Confirmacion", "Peticion Exitosa", "success");

        })
        .catch(() => {
            Swal.fire("Mensaje de Confirmacion", "Peticion fallida", "warning");
        })

})


// cerrar Sesion

var cerrarsession = document.querySelector('#cerrar-session');

cerrarsession.addEventListener('click', e => {
    e.preventDefault();



    auth.signOut().then(() => {
        console.log('sign out')
    })
})



queryParking();