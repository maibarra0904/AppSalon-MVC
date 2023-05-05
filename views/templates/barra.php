<div class="barra">
    <p>Hola, <?php echo $nombre ?? '' ?></p>
    <a href="/logout" class="boton">Cerrar Sesión</a>
</div>

<?php
    if(isset($_SESSION['admin'])) {
        //debuguear($_SERVER['PATH_INFO']==='/admin');
?>

        <div class="barra-servicios">
            <?php if($_SERVER['PATH_INFO']==='/servicios' || $_SERVER['PATH_INFO']==='/servicios/crear') { ?> 
                <a class="boton" href="/admin">Ver Citas</a> 
            <?php }; ?>

            <?php if($_SERVER['PATH_INFO']==='/admin' || $_SERVER['PATH_INFO']==='/servicios/crear') { ?>
                <a class="boton" href="/servicios">Ver Servicios</a>
            <?php }; ?>

            <?php if($_SERVER['PATH_INFO']==='/admin' || $_SERVER['PATH_INFO']==='/servicios') { ?>
                <a class="boton" href="/servicios/crear">Nuevo Servicio</a>
            <?php }; ?>
        </div>
<?php
    };
?>