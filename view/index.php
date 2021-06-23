<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Jekyll v4.1.1">
  <title>MyParking.com</title>

  <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/dashboard/">





  <!-- Bootstrap core CSS -->
  <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="../assets/DataTables/datatables.min.css" />
  <link rel="stylesheet" type="text/css" href="../assets/DataTables/DataTables-1.10.23/css/dataTables.bootstrap4.min.css" />
  <!-- <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet"> -->
  <!--   mataria desing -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">



  <style>
    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
  </style>
  <!-- Custom styles for this template -->
  <link href="../plantilla/dashboard.css" rel="stylesheet">
  <link href="../styles.css" rel="stylesheet">

</head>

<body>
  <nav class="navbar navbar-dark sticky-top  flex-md-nowrap p-0 shadow" style="background-color: #008B8B;">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" style="font-weight: bold; " href="index.php">MyParking</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="hidden">
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" style="font-weight: bold; ">Sign out</a>
      </li>
    </ul>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="sidebar-sticky" style="background-color: #008B8B;">

          <ul class="nav flex-column" style="justify-content:center; align-items:center">
            <li class="nav-item mt-3">
              <figure>
                <img src="../assets/image/img3.png" class="imagenDasboard">
              </figure>

            </li>
            <li class="nav-item mt-3">
              <figure>
                <img src="../assets/image/myparking.jpg" class="imagenDasboard">
              </figure>

            </li>
            <li class="nav-item mt-3">
              <figure>
                <img src="../assets/image/carrera.jpg" class="imagenDasboard">
              </figure>

            </li>

          </ul>



        </div>
      </nav>
      <!-- <script src="../js/formRegister.js" /> -->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div class="col-md-12 row" id='contenido_principal'>



        </div>
      </main>
    </div>

  </div>

  <script>
    var idioma_espanol = {
      select: {
        rows: "%d fila seleccionada"
      },
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ning&uacute;n dato disponible en esta tabla",
      "sInfo": "Registros del (_START_ al _END_) total de _TOTAL_ registros",
      "sInfoEmpty": "Registros del (0 al 0) total de 0 registros",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "<b>No se encontraron datos</b>",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      },
      "buttons": {
        "copyTitle": 'Informacion copiada',
        "copyKeys": 'Use your keyboard or menu to select the copy command',
        "copySuccess": {
          "_": '%d filas copiadas al portapapeles',
          "1": '1 fila copiada al portapapeles'
        },

        "pageLength": {
          "_": "Mostrar %d filas",
          "-1": "Mostrar Todo"
        }
      }

    }


    function cargar_contenido(contenedor, contenido) {
      $("#" + contenedor).load(contenido);
    }
  </script>


  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script>
    window.jQuery || document.write('<script src="../assets/js/vendor/jquery.slim.min.js"><\/script>')
  </script>
  <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
  <script src="../plantilla/dashboard.js"> </script>

  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>



  <script>
    cargar_contenido('contenido_principal', '../view/formRegister.php');
  </script>

  <!-- firebase -->
  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.10/firebase-firestore.js"></script>
  <script src="../js/api.js"> </script>

  <!-- cierre firebase -->




  <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
  <script src="../assets/sweetalert2/sweetalert2.js"></script>
  <script type="text/javascript" src="../assets/DataTables/datatables.min.js"></script>
  <script type="text/javascript" src="../assets/DataTables/DataTables-1.10.23/js/dataTables.bootstrap4.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</html>