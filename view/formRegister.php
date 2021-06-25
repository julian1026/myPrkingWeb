<!-- <script type="text/javascript" src="../js/formRegister.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.1/html2pdf.bundle.min.js"></script>

<script type="text/javascript" src="../js/formRegister.js?rev=<?php echo time(); ?>"></script>


<div class="col-md-12 mt-4">
  <div class="card text-white " style="background-color: #2F4F4F;">
    <div class="card-header" style="font-weight: bold; ">Formulario de Registrar Parqueadero</div>
    <div class="card-body" id="r">
      <form id="registro" autocomplete="false" onsubmit="return false">
        <div class="row">
          <div class="col-md-3 mt-2">
            <!-- <label for="">Nombre de Parqueadero</label> -->
            <input type="text" class="form-control" id="txt_nombre" placeholder="ingresar nombre" />
          </div>
          <div class="col-md-3 mt-2">
            <!-- <label for="">Latitud</label> -->
            <input type="text" class="form-control" id="txt_latitud" placeholder="ingresar latitud" />
          </div>

          <div class="col-md-3 mt-2">
            <!-- <label for="">Longitud</label> -->
            <input type="text" class="form-control" id="txt_longitud" placeholder="ingresar Longitud" />
          </div>

          <div class="col-md-3 mt-2">
            <!-- <label for="">Longitud</label> -->
            <input type="text" class="form-control" id="txt_direccion" placeholder="ingresar direccion" />
          </div>
          <div class="col-md-3 mt-2">
            <!-- <label for="">Longitud</label> -->
            <textarea name="des" id="txt_descripcion" cols="30" class="form-control" rows="1"></textarea>
          </div>
          <div class="col-md-3 mt-2">
            <label for="files" class="btn btn-block buttomSuccess">
              <span class="material-icons float-left mr-2">
                file_upload
              </span>
              Seleccionar Imagenes</label>
            <input type="file" accept="image/png,image/jpeg" id="files" style="visibility:hidden;" name="foe" multiple>
          </div>



          <div class="col-md-3 mt-2">
            <button class="btn  btn-block buttomSuccess" onclick="registrar()">
              <span class="material-icons float-left mr-2">add_circle_outline</span>Registrar Parqueadero</button>

          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="table-responsive col-md-12 mt-2">
  <table id="txt_tablaparqueaderos" class="table table-striped table-bordered" style="width: 100%">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Longitud</th>
        <th>Latitud</th>
        <th>direccion</th>
        <th>descripcion</th>
        <th>calificacion</th>
        <!-- <th>estado</th> -->
        <th>opcion</th>
      </tr>
    </thead>
    <tbody>

    </tbody>

  </table>
</div>

<!-- modal update -->
<div class="modal fade" id="modalupdateparqueadero" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Actualizar Parqueadero</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- formulario Updata -->
        <form autocomplete="false" onsubmit="return false">
          <div class="row">
            <div class="col-md-4 mt-2">
              <label for="">Nombre</label>
              <input type="text" class="form-control" id="txt_update_nombre" />
            </div>
            <div class="col-md-4 mt-2">
              <label>Latitud</label>
              <input type="text" class="form-control" id="txt_update_latitud" />
            </div>

            <div class="col-md-4 mt-2">
              <label>Longitud</label>
              <input type="text" class="form-control" id="txt_update_longitud" />
            </div>
          </div>
        </form>
        <!-- cierre de modal -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">
          <span class="material-icons float-left mr-2">
            cancel
          </span>
          Cancelar
        </button>

        <button type="button" class="btn buttomSuccess" onclick="updateParking()">
          <span class="material-icons float-left mr-2">
            update
          </span>Actualizar</button>
      </div>
    </div>
  </div>
</div>
<!-- cerrar -->
<script>
  $(document).ready(function() {
    $("#txt_tablaparqueaderos").DataTable({
      responsive: true,
      dom: "Bfrtip",
      buttons: [],
    });
  });
</script>