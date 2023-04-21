<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password a continuación:</p>


<?php 
    include_once __DIR__ . "/../templates/alertas.php";
    if($error) return;
?>


<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu nuevo password">
        <input type="submit" class="boton" value="Guardar Nuevo Password">
    </div>
</form>


<div class="acciones">
    <a href="/">¿Quieres iniciar sesión directamente?</a>
</div>