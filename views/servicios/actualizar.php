<h1 class="nombre-servicios">Actualizar Servicio</h1>

<p class="descripcion-pagina">Modifica los valores del formulario</p>


<?php
    include_once __DIR__ . '/../templates/barra.php';
    include_once __DIR__ . '/../templates/alertas.php';
?>


<form method="POST" class="formulario">
    <!-- <button onclick="location.href='/admin'" type="button" class="boton">Regresar</button> -->

    <?php include_once __DIR__ . '/formulario.php' ?>
    
    <input type="submit" class="boton" value="Actualizar">
    
</form>