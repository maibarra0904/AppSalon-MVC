let paso = 1, pasoInicial = 1, pasoFinal = 3;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp(); //Muestra y oculta las secciones
    tabs(); //Cambia las secciones
    botonesPaginador(); //Agrega o quita botones del paginador
    sombreaBoton(); // Sombrea el boton activo del menú
    paginaSiguiente();
    paginaAnterior();

    consultarAPI();
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

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}