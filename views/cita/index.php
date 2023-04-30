<h1 class="nombre-pagina">Crear nueva cita</h1>

<p class="descripcion-pagina">Elige tus servicios a continuación</p>

<div id="app">

    <nav class="tabs">
        <!-- Se crean atributos nuevos en html colocando data-nombre de atributo
        en este caso se crean los atributos para los botones como sigue -->
        <button class="actual" type="button" data-paso="1" id="serv">Servicios</button>
        <button class="ninguno" type="button" data-paso="2" id="info">Información Cita</button>
        <button class="ninguno" type="button" data-paso="3" id="res">Resumen</button>
    </nav>


    <div class="mostrar" id="paso-1">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div class="ocultar" id="paso-2">
        <h2>Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y la fecha de la cita</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre" value="<?php echo $nombre; ?>" disabled>
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha">
                <script>
                let fechaActual = new Date().toISOString().substr(0, 10);
                document.getElementById("fecha").setAttribute("min", fechaActual);
                </script>
            </div>
            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora" step="600">
                <script>
                
                </script>
            </div>
            <input type="hidden" id="id" value="<?php echo $id; ?>">
        </form>
    </div>
    <div class="ocultar contenido-resumen" id="paso-3">
        <h2>Resumen</h2>
        <p>Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button id="anterior" class="boton" >&laquo; Anterior</button>
        <br>
        <button id="siguiente" class="boton" >Siguiente &raquo;</button>
    </div>

</div>

<?php
    $script = "
        <script src='https://unpkg.com/sweetalert/dist/sweetalert.min.js'></script>
        <script src='build/js/app.js'></script>
    ";
?>