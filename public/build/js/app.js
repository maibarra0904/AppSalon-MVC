let paso=1,pasoInicial=1,pasoFinal=3;const cita={nombre:"",fecha:"",hora:"",servicios:[]};function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.replace("mostrar","ocultar");const t="paso-"+paso;document.getElementById(t).className="mostrar"}function sombreaBoton(){document.getElementById("serv").addEventListener("click",(function(){document.getElementById("serv").className="actual",document.getElementById("info").className="ninguno",document.getElementById("res").className="ninguno"})),document.getElementById("info").addEventListener("click",(function(){document.getElementById("serv").className="ninguno",document.getElementById("info").className="actual",document.getElementById("res").className="ninguno"})),document.getElementById("res").addEventListener("click",(function(){document.getElementById("serv").className="ninguno",document.getElementById("info").className="ninguno",document.getElementById("res").className="actual"}))}function iniciarApp(){tabs()}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar"),document.getElementById("serv").className="actual",document.getElementById("info").className="ninguno",document.getElementById("res").className="ninguno"):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),document.getElementById("serv").className="ninguno",document.getElementById("info").className="ninguno",document.getElementById("res").className="actual"):(e.classList.remove("ocultar"),t.classList.remove("ocultar"),document.getElementById("serv").className="ninguno",document.getElementById("info").className="actual",document.getElementById("res").className="ninguno")}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=pasoFinal||(paso++,botonesPaginador(),mostrarSeccion(),sombreaBoton())}))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=pasoInicial||(paso--,botonesPaginador(),mostrarSeccion(),sombreaBoton())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:n,precio:o}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=n;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$"+o;const s=document.createElement("DIV");s.classList.add("servicio"),s.dataset.idServicio=t,s.onclick=function(){seleccionarServicio(e)},s.appendChild(a),s.appendChild(c),document.querySelector("#servicios").appendChild(s)})}function seleccionarServicio(e){const{id:t}=e,{servicios:n}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);n.some(e=>e.id===t)?(cita.servicios=n.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...n,e],o.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Horarios disponibles entre las 10:00 y las 18:00","error")):cita.hora=e.target.value}))}function mostrarAlerta(e,t){if(document.querySelector(".alerta"))return;const n=document.createElement("DIV");n.textContent=e,n.classList.add("alerta"),n.classList.add(t);document.querySelector(".formulario").appendChild(n),setTimeout(()=>{n.remove()},2e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp(),tabs(),botonesPaginador(),sombreaBoton(),paginaSiguiente(),paginaAnterior(),consultarAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora()}));