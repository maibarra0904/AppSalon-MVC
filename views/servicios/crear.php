<h1 class="nombre-servicios">Crear Servicio</h1>

<p class="descripcion-pagina">Añade servicios a la barbería</p>


<?php
    include_once __DIR__ . '/../templates/barra.php';
    include_once __DIR__ . '/../templates/alertas.php';
?>


<form action="/servicios/crear" method="POST" class="formulario">
    <!-- <button onclick="location.href='/admin'" type="button" class="boton">Regresar</button> -->

    <?php include_once __DIR__ . '/formulario.php' ?>
    
    <input type="submit" class="boton" value="Guardar Servicio">
    
</form>