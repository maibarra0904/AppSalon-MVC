<h1 class="nombre-pagina">Crear nueva cita</h1>

<p class="descripcion-pagina">Elige tus servicios a continuación</p>

<div id="app">
    <div class="seccion" id=paso-1>
        <h2>Servicios</h2>
        <p>Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div class="seccion" id=paso-2>
        <h2>Datos y Cita</h2>
        <p>Coloca tus datos y la fecha de la cita</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre">
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
                <input type="time" id="hora" name="hora" min="<?= date('H:i'); ?>">
                <script>
                
                </script>
            </div>
        </form>
    </div>
    <div class="seccion" id=paso-3>
        <h2>Resumen</h2>
        <p>Verifica que la información sea correcta</p>
    </div>
</div>