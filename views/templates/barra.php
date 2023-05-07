<div class="barra">
    <p>Hola, <?php echo $nombre ?? '' ?></p>
    <a href="/logout" class="boton">Cerrar Sesión</a>
</div>

<?php
    if(isset($_SESSION['admin'])) {
        //debuguear($_SERVER);
?>

        <div class="barra-servicios">
            <?php if($_SERVER['REQUEST_URI']==='/servicios' || $_SERVER['REQUEST_URI']==='/servicios/crear') { ?> 
                <a class="boton" href="/admin">Ver Citas</a> 
            <?php }; ?>

            <?php if($_SERVER['REQUEST_URI']==='/admin' || $_SERVER['REQUEST_URI']==='/servicios/crear') { ?>
                <a class="boton" href="/servicios">Ver Servicios</a>
            <?php }; ?>

            <?php if($_SERVER['REQUEST_URI']==='/admin' || $_SERVER['REQUEST_URI']==='/servicios') { ?>
                <a class="boton" href="/servicios/crear">Nuevo Servicio</a>
            <?php }; ?>
        </div>
<?php
    };
?>