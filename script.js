/* ====== DATOS — carga desde catalogo.json ====== */
let peliculas = [];
let series    = {};
let novelas   = {};

async function cargarCatalogo() {
  try {
    const res  = await fetch(`catalogo.json?v=${Date.now()}`);
    const data = await res.json();
    peliculas  = data.peliculas || [];
    series     = data.series   || {};
    novelas    = data.novelas  || {};
  } catch (e) {
    console.error('Error cargando catalogo.json:', e);
  }
}

/* ====== LÓGICA DE VISTOS ====== */
let vistos = JSON.parse(localStorage.getItem('vistos_strange')) || [];

function marcarVisto(id) {
  if (!id || vistos.includes(id)) return;
  vistos.push(id);
  localStorage.setItem('vistos_strange', JSON.stringify(vistos));
}

function borrarHistorial() {
  const confirmar = confirm("¿Seguro que quieres borrar todas las marcas de 'visto'?");
  if (confirmar) {
    vistos = [];
    localStorage.removeItem('vistos_strange');
    document.querySelectorAll('.card').forEach(card => card.classList.remove('visto'));
    console.log("Historial de vistos eliminado correctamente.");
    alert("Historial borrado.");
  }
}

/* ====== NAVEGACIÓN ====== */
let seccionActual = 'peliculas';

function mostrarSeccion(seccion) {
  seccionActual = seccion;
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  document.getElementById(`sec-${seccion}`).classList.remove('hidden');

  const hero = document.getElementById('header-slider');
  seccion === 'peliculas' ? hero.classList.remove('hidden') : hero.classList.add('hidden');

  document.getElementById('buscador').value = "";
  document.querySelectorAll('.card').forEach(c => c.style.display = "block");
}

function verDetalle(titulo, lista) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const vista = document.getElementById('vista-detalles');
  vista.classList.remove('hidden');
  document.getElementById('detalle-titulo').innerText = titulo;

  const grid = document.getElementById('grid-detalles');
  grid.innerHTML = "";
  lista.forEach(item => {
    grid.appendChild(crearCard(item.titulo, item.portada, () => reproducir(item.id), item.id));
  });
  window.scrollTo(0, 0);
}

function volver() { mostrarSeccion(seccionActual); }

/* ====== RENDER ====== */
function crearCard(titulo, portada, accion, id = null) {
  const div = document.createElement('div');
  div.className = 'card';
  if (id && vistos.includes(id)) div.classList.add('visto');

  div.innerHTML = `
    <div class="badge-visto">✓</div>
    <img src="${portada}">
    <p>${titulo}</p>
  `;

  div.onclick = (e) => {
    e.stopPropagation();
    if (id) { marcarVisto(id); div.classList.add('visto'); }
    accion();
  };
  return div;
}

function cargarTodo() {
  const gp = document.getElementById('grid-peliculas');
  peliculas.forEach(p =>
    gp.appendChild(crearCard(p.titulo, p.portada, () => reproducir(p.id), p.id))
  );

  const gs = document.getElementById('grid-series');
  Object.keys(series).forEach(s =>
    gs.appendChild(crearCard(s, series[s][0].portada, () => verDetalle(s, series[s])))
  );

  const gn = document.getElementById('grid-novelas');
  Object.keys(novelas).forEach(n =>
    gn.appendChild(crearCard(n, novelas[n][0].portada, () => verDetalle(n, novelas[n])))
  );
}

/* ====== VIDEO ====== */
function reproducir(id) {
  const frame = document.getElementById('videoFrame');
  frame.src   = `https://drive.google.com/file/d/${id}/preview`;
  document.getElementById('player').classList.remove('hidden');
}

function cerrar() {
  document.getElementById('player').classList.add('hidden');
  document.getElementById('videoFrame').src = "";
}

/* ====== BUSCADOR ====== */
function filtrarContenido() {
  const q      = document.getElementById('buscador').value.toLowerCase();
  const activa = document.querySelector('.content-section:not(.hidden)');
  if (!activa) return;
  activa.querySelectorAll('.card').forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}

/* ====== SLIDER DINÁMICO ====== */
function initSlider() {
  const wrapper     = document.getElementById('slider');
  let todasLasFotos = [...new Set(peliculas.map(p => p.portada))];

  todasLasFotos.forEach(ruta => {
    const img   = document.createElement('img');
    img.src     = ruta;
    img.onerror = () => img.style.display = 'none';
    wrapper.appendChild(img);
  });

  let indiceCual = 0;
  if (todasLasFotos.length > 0) {
    setInterval(() => {
      indiceCual = (indiceCual + 1) % todasLasFotos.length;
      wrapper.style.transform = `translateX(-${indiceCual * 100}%)`;
    }, 5000);
  }
}

/* ====== INIT ====== */
document.addEventListener("DOMContentLoaded", async () => {
  await cargarCatalogo();
  initSlider();
  cargarTodo();
});
