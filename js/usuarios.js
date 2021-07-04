
var iniciarSession = document.querySelector('#form-iniciar');

iniciarSession.addEventListener('submit', (e) => {
    e.preventDefault();
    let _email = document.querySelector('#txt_email').value;
    let _password = document.querySelector('#txt_password').value;

    if (_email.trim().length == 0 || _password.trim().length == 0) {
        return Swal.fire('Mensaje de Advertencia', 'ingresar valores en los campos requeridos...', 'warning');
    }

    auth.signInWithEmailAndPassword(_email, _password)
        .then((data) => {
            let id = data.user.uid;
            vereficarEstadoUser(id);
        }).catch((error) => {
            // console.log(error)
            if (error.code == 'auth/wrong-password') {
                Swal.fire('Mensaje de Advertencia', 'Contrasena Incorrecta :( !', 'warning');
            }
            if (error.code == 'auth/user-not-found') {
                Swal.fire('Mensaje de Advertencia', 'El Email no se encuentra registrado en el sistema :( !', 'warning');
            }
        });
})

function vereficarEstadoUser(id) {
    db.collection("users").doc(id).get()
        .then(res => {

            if (res.data().status) {
                if (res.data().rol == 'admin') {
                    iniciarSession.reset();
                    Swal.fire('Mensaje de Confirmacion', 'Ingresando al sistema :) !', 'success');
                    window.location.replace('../view/index.html');
                } else {
                    Swal.fire('Mensaje de Advertencia', 'Comunicate con el Administrador para que te de acceso... :() !', 'warning');
                    auth.signOut();
                }

            } else {
                Swal.fire('Mensaje de Advertencia', 'El usuario se encuentra desactivado... :) !', 'warning');
                auth.signOut();
            }


        }).catch(error => console.log(error));
}


auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get()
            .then(res => {
                if (res.data().status) {
                    if (res.data().rol == 'admin') {
                        iniciarSession.reset();
                        window.location.replace('../view/index.html');
                    } else {
                        auth.signOut();
                    }
                } else {
                    auth.signOut();
                }
            }).catch(error => console.log(error));
    }
})



