//const { resume } = require("browser-sync");

let paso = 1, pasoInicial = 1, pasoFinal = 4;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp(); //Muestra y oculta las secciones
    tabs(); //Cambia las secciones
    botonesPaginador(); //Agrega o quita botones del paginador
    sombreaBoton(); // Sombrea el boton activo del menú
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();

    nombreCliente(); // Añade el nombre del cliente al objeto de la cita
    seleccionarFecha(); //Agrega la fecha al objeto cita
    seleccionarHora();
    mostrarResumen();
});

function mostrarSeccion() {
    //Ocultar la división que tenga la clase mostrar
    const divAnterior = document.querySelector('.mostrar');
    if(divAnterior) {
        divAnterior.classList.replace('mostrar','ocultar');
    }
    
    //Seleccionar la división con el paso y mostrarla
    const pasoSelector = `paso-${paso}`;
    const seccion = document.getElementById(pasoSelector).className = 'mostrar';
    const bot = document.querySelector('.mostrar');
    if(paso === 3) {bot.classList.add('contenido-resumen')}

    //Programación para selección del botón actual y deselección del botón anterior
    
}

function sombreaBoton() {

    document.getElementById("serv").addEventListener('click',function(){
        document.getElementById("serv").className = 'actual';
        document.getElementById("info").className = 'ninguno';
        document.getElementById("res").className = 'ninguno';
    })

    document.getElementById("info").addEventListener('click',function(){
        document.getElementById("serv").className = 'ninguno';
        document.getElementById("info").className = 'actual';
        document.getElementById("res").className = 'ninguno';
    })

    document.getElementById("res").addEventListener('click',function(){
        document.getElementById("serv").className = 'ninguno';
        document.getElementById("info").className = 'ninguno';
        document.getElementById("res").className = 'actual';
    })

}

function iniciarApp() {
    tabs(); //Cambia la sección cuando se presione la tecla tab
}



function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    
    //addEventListener solo se puede usar cuando se ha seleccionado un elemento
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            
            paso = parseInt( e.target.dataset.paso ); //Se pueden acceder a los atributos creados en html desde JS
            mostrarSeccion();
            botonesPaginador();
        })
    })
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaASiguiente = document.querySelector('#siguiente');
    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaASiguiente.classList.remove('ocultar');
        document.getElementById("serv").className = 'actual';
        document.getElementById("info").className = 'ninguno';
        document.getElementById("res").className = 'ninguno';
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaASiguiente.classList.add('ocultar');
        document.getElementById("serv").className = 'ninguno';
        document.getElementById("info").className = 'ninguno';
        document.getElementById("res").className = 'actual';
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaASiguiente.classList.remove('ocultar');
        document.getElementById("serv").className = 'ninguno';
        document.getElementById("info").className = 'actual';
        document.getElementById("res").className = 'ninguno';
    }
}

function paginaSiguiente(){
    const paginaAnterior = document.querySelector('#siguiente');

    paginaAnterior.addEventListener('click', function() {
        if(paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
        mostrarSeccion();
        sombreaBoton();
    })
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');

    paginaAnterior.addEventListener('click', function() {
        if(paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
        mostrarSeccion();
        sombreaBoton();
    })
}

async function consultarAPI() {

    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        //Artificio para asignar al evento click sobre un servicio
        //Una llamada al servicio en cuestión
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio fue agregado
    if( servicios.some(agregado => agregado.id === id) ) {
        //Eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        //Agregarlo
        cita.servicios = [...servicios,servicio];
        divServicio.classList.add('seleccionado');
    }

}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay(); //Convierte el día seleccionado en la cita
                                                        // en un número del 0: domingo al 6: sábado
        //Código para evitar que la fecha seleccionada sea sábado o domingo

        //console.log(dia);
        if([6,0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
            temporizarAlerta('.alerta');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];

        if(hora<10 || hora>18) {
            e.target.value = '';
            mostrarAlerta('Horarios disponibles entre las 10:00 y las 18:00', 'error', '.formulario');
            temporizarAlerta('.alerta');
        } else {
            cita.hora = e.target.value;
        }

    });
}

function mostrarAlerta(mensaje, tipo, elemento) {
    //Previenen que se generen alertas múltiples
    const alertaPrevia = document.querySelector('.alerta');
    
    if(alertaPrevia) return;

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

}

function temporizarAlerta(alerta) {

    const alertaActiva = document.querySelector(alerta);
    setTimeout(() => {
        alertaActiva.remove();
    }, 1000);
}

function removerAlerta() {
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }
}

function mostrarResumen() {
    //location.reload();
    const resumen = document.querySelector('.contenido-resumen');
    
    //Limpiar el contenido de resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    
    if(Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Falta seleccionar al menos un servicio, o datos de fecha u hora', 'error', '.contenido-resumen');
        return;
    } 
    
    //Formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha
    const fechaObj = new Date(fecha);
    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate()+2;
    const year = fechaObj.getUTCFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));

    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    //Heading para resumen de servicios
    const heandingServicios = document.createElement('H3');
    heandingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(heandingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

    

    //Heading para cita del cliente
    const heandingInfo = document.createElement('H3');
    heandingInfo.textContent = 'Resumen de cita';
    resumen.appendChild(heandingInfo);


    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resume.appendChild(botonReservar);
}

function reservarCita() {

}