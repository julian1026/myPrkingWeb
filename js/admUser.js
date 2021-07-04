var cargarUsuarios = document.querySelector('#usuarios');
var cargarInicio = document.querySelector('#inicio');

cargarUsuarios.addEventListener('click', (e) => {
    console.log('oeoeo')
    cargar_contenido('contenido_principal', '../view/admUser.html');
})
cargarInicio.addEventListener('click', (e) => {
    cargar_contenido('contenido_principal', '../view/formRegister.html');
})

var queryUsers = (async () => {
    var users = [];
    var id = [];
    var count = 0;
    await db.collection('users').get()
        .then((query) => {
            query.forEach((doc) => {
                users.push(doc.data());
                id.push(doc.id);
            })
            for (d of users) {
                d['id'] = id[count];
                count++;
            }

            listUsers(users);
        }).catch((error) => {
            console.log(error);
        })

});


var cargarRoles = (async () => {
    let datos = [];
    await db.collection('roles').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                datos.push(doc.data());
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });

    let roles = datos[0].rol;

    var selectRoles = document.querySelector('#txt_com_rol');

    selectRoles.innerHTML = `<option value="ninguno">Selecionar</option>`;

    roles.forEach(element => {
        selectRoles.innerHTML += `
                <option value="${element}">${element} </option>
                `
    });

})





var tabla;
function listUsers(datos1) {
    tabla = $("#txt_usuarios").DataTable({
        // deferLoading: true,
        // retrieve: true,
        // processing: true,
        bDestroy: true,
        bAutoWidth: false,
        "lengthMenu": [[4, 12, 24, 48, -1], [4, 12, 24, 48, "All"]],
        "pageLength": 4,
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
            { data: 'displayName' }, { data: 'email' }, { data: 'rol' },
            {
                data: 'status', render: function (data) {
                    if (data == true) {
                        return "<div><span class='material-icons bg-success'>check</span> activo</div>";
                    } else {
                        return "<div><span class='material-icons bg-danger'>cancel</span> inactivo</div>";
                    }
                }
            },
            {
                defaultContent:
                    "<button   class='estado' style='background-color:#008B8B; color:#FFFAFA; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #008B8B;'  ><span class='material-icons'>check</span></button>&nbsp;"
                    +
                    "<button   class='editar' style='background-color:#2F4F4F; color:#FFFAFA; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #2F4F4F;' ><span class='material-icons'>create</span></button>&nbsp;"
                    +
                    "<button class='image' style='background-color:; color:#2F4F4F; font-weight: bold; font-size:5px; border-radius: 50%; border: 5px solid #2F4F4F;' ><span class='material-icons'>collections</span></button>&nbsp;"
            },
        ],

    });
}

// update data of parkings
$('#txt_usuarios').on('click', '.editar', function () {
    var data = tabla.row($(this).parents('tr')).data();
    // console.log(data);
    if (tabla.row(this).child.isShown()) {
        var data = tabla.row(this).data();
    }
    console.log(data);
    $("#modalupdateUsers").modal({ backdrop: 'static', keyboard: false });
    $("#modalupdateUsers").modal('show');

    uid = data.id;
    $("#txt_com_rol").val(data.rol);


})

function updateRol() {

    let rol = nombre = $("#txt_com_rol").val();
    console.log(rol);
    if (rol == 'ninguno') {
        return Swal.fire("Mensaje de Advertencia", "Seleccione un rol", "warning");
    }

    db.collection('users')
        .doc(uid).update({ rol })
        .then(() => {
            queryUsers();
            $("#modalupdateUsers").modal('hide');
            Swal.fire("Mensaje de Confirmacion", "Peticion Exitosa", "success");

        })
        .catch(() => {
            Swal.fire("Mensaje de Advertencia", "Peticion fallida", "warning");
        })
}



//activar o desactivar parqueadero
$('#txt_usuarios').on('click', '.estado', function () {
    var data = tabla.row($(this).parents('tr')).data();
    // console.log(data);
    if (tabla.row(this).child.isShown()) {
        var data = tabla.row(this).data();
    }

    identificador = data.id;
    estado = !data.status;
    if (estado) {
        title = "activar Usuario?"
        text = "Una vez hecho esto el usuario tendra acceso al sistema"
    } else {
        title = "Esta seguro de desactivar el Usuario?"
        text = "Una vez hecho esto el usuario no podra acceder al sistema"
    }

    var objecto = { 'status': estado }//variable de cambio de estado

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


var updateStatus = (async (id, objeto) => {
    await db.collection('users')
        .doc(id).update(objeto)
        .then(() => {
            queryUsers();
            $("#modalupdateparqueadero").modal('hide');
            Swal.fire("Mensaje de Confirmacion", "Peticion Exitosa", "success");

        })
        .catch(() => {
            Swal.fire("Mensaje de Confirmacion", "Peticion fallida", "warning");
        })

})
