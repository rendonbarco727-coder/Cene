/* ====== DATOS ====== */
let peliculas = [];
let series    = {};
let novelas   = {};

/* ====== SPINNER ====== */
function ocultarLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

/* ====== CARGA DEL CATÁLOGO ====== */
async function cargarCatalogo() {
  try {
    const res = await fetch(`catalogo.json?v=${Date.now()}`);
    const data = await res.json();
    peliculas = data.peliculas || [];
    series    = data.series   || {};
    novelas   = data.novelas  || {};
  } catch (e) {
    console.error('Error cargando catalogo.json:', e);
  } finally {
    ocultarLoader();
  }
}

/* ====== VISTOS ====== */
let vistos = JSON.parse(localStorage.getItem('vistos_strange')) || [];

function marcarVisto(id) {
  if (!id || vistos.includes(id)) return;
  vistos.push(id);
  localStorage.setItem('vistos_strange', JSON.stringify(vistos));
}

function borrarHistorial() {
  if (confirm("¿Seguro que quieres borrar todas las marcas de 'visto'?")) {
    vistos = [];
    localStorage.removeItem('vistos_strange');
    document.querySelectorAll('.card').forEach(card => card.classList.remove('visto'));
    alert("Historial borrado.");
  }
}

/* ====== NAVEGACIÓN ====== */
let seccionActual = 'peliculas';

function mostrarSeccion(seccion) {
  seccionActual = seccion;
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(`sec-${seccion}`);
  if (target) target.classList.remove('hidden');
  const hero = document.getElementById('header-slider');
  hero.style.display = seccion === 'peliculas' ? 'block' : 'none';
  document.getElementById('buscador').value = "";
  document.querySelectorAll('.card').forEach(c => c.style.display = "block");
}

function volver() {
  mostrarSeccion(seccionActual);
}

/* ====== VISTA DETALLE PARA SERIES/NOVELAS (episodios) ====== */
function verDetalle(titulo, lista) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const vista = document.getElementById('vista-detalles');
  vista.classList.remove('hidden');
  document.getElementById('detalle-titulo').innerText = titulo;
  const grid = document.getElementById('grid-detalles');
  grid.innerHTML = "";
  lista.forEach(item => {
    grid.appendChild(crearCard(item.titulo, item.portada, () => abrirReproductor(item.id), item.id));
  });
  window.scrollTo(0, 0);
}

/* ====== VISTA DETALLE PARA PELÍCULAS (con información y botones) ====== */
function mostrarDetallePelicula(peli) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const detailSection = document.getElementById('sec-movie-detail');
  detailSection.classList.remove('hidden');

  const container = document.getElementById('movie-detail-container');
  // Construir HTML con datos disponibles
  let html = `
    <div class="movie-detail-poster">
      <img src="${peli.portada}" alt="${peli.titulo}">
    </div>
    <div class="movie-detail-info">
      <h3>${peli.titulo}</h3>
      ${peli.sinopsis ? `<div class="sinopsis">📖 ${peli.sinopsis}</div>` : ''}
      ${peli.director ? `<div class="director"><strong>Director:</strong> ${peli.director}</div>` : ''}
      ${peli.actores ? `<div class="actores"><strong>Actores:</strong> ${peli.actores}</div>` : ''}
      <div class="idiomas-buttons">
  `;
  if (peli.idiomas && peli.idiomas.length > 0) {
    peli.idiomas.forEach(idi => {
      html += `<button class="btn-idioma" data-id="${idi.id}" data-lang="${idi.lang}">🎧 ${idi.lang}</button>`;
    });
  } else {
    html += `<button class="btn-reproducir" data-id="${peli.id}">🎬 Reproducir</button>`;
  }
  html += `</div></div>`;
  container.innerHTML = html;

  // Asignar eventos a los botones
  container.querySelectorAll('.btn-idioma, .btn-reproducir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoId = btn.getAttribute('data-id');
      if (videoId) {
        marcarVisto(videoId);
        abrirReproductor(videoId);
      }
    });
  });
}

/* ====== ABRIR REPRODUCTOR ====== */
function abrirReproductor(id) {
  const frame = document.getElementById('videoFrame');
  frame.src = `https://drive.google.com/file/d/${id}/preview`;
  document.getElementById('player').classList.remove('hidden');
}

function cerrarPlayer() {
  document.getElementById('player').classList.add('hidden');
  document.getElementById('videoFrame').src = "";
}

/* ====== CREAR TARJETA (card) ====== */
function crearCard(titulo, portada, accion, id = null, idiomas = null) {
  const div = document.createElement('div');
  div.className = 'card';
  if (id && vistos.includes(id)) div.classList.add('visto');

  let badgeIdiomas = '';
  if (idiomas && idiomas.length > 1) {
    badgeIdiomas = `<span style="position:absolute; bottom:5px; left:5px; background:#e50914; padding:2px 6px; border-radius:12px; font-size:10px;">🎧 ${idiomas.length}</span>`;
  }

  div.innerHTML = `
    <div class="badge-visto">✓</div>
    <img src="${portada}" loading="lazy">
    <p>${titulo}</p>
    ${badgeIdiomas}
  `;

  // Precarga ligera (opcional)
  if (id) {
    div.addEventListener('mouseenter', () => {
      if (!div._precargado) {
        const pre = document.createElement('iframe');
        pre.src = `https://drive.google.com/file/d/${id}/preview`;
        pre.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(pre);
        div._precargado = true;
      }
    }, { once: true });
  }

  div.onclick = (e) => {
    e.stopPropagation();
    if (typeof accion === 'function') accion();
  };
  return div;
}

/* ====== RENDER PRINCIPAL ====== */
function cargarTodo() {
  // Películas: ahora todas abren el detalle (sean con idiomas o no)
  const gp = document.getElementById('grid-peliculas');
  gp.innerHTML = '';
  peliculas.forEach(peli => {
    const card = crearCard(peli.titulo, peli.portada, () => mostrarDetallePelicula(peli), peli.id, peli.idiomas);
    gp.appendChild(card);
  });

  // Series
  const gs = document.getElementById('grid-series');
  gs.innerHTML = '';
  Object.keys(series).forEach(s => {
    const primeraPortada = series[s][0].portada;
    const card = crearCard(s, primeraPortada, () => verDetalle(s, series[s]));
    gs.appendChild(card);
  });

  // Novelas
  const gn = document.getElementById('grid-novelas');
  gn.innerHTML = '';
  Object.keys(novelas).forEach(n => {
    const primeraPortada = novelas[n][0].portada;
    const card = crearCard(n, primeraPortada, () => verDetalle(n, novelas[n]));
    gn.appendChild(card);
  });
}

/* ====== BUSCADOR ====== */
function filtrarContenido() {
  const q = document.getElementById('buscador').value.toLowerCase();
  const activa = document.querySelector('.content-section:not(.hidden)');
  if (!activa) return;
  activa.querySelectorAll('.card').forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}

/* ====== CARRUSEL MINI ====== */
function initSlider() {
  const wrapper = document.getElementById('slider');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  let portadasUnicas = [...new Set(peliculas.map(p => p.portada))].slice(0, 15);
  portadasUnicas.forEach(ruta => {
    const img = document.createElement('img');
    img.src = ruta;
    img.onerror = () => img.style.display = 'none';
    wrapper.appendChild(img);
  });
}

/* ====== INICIO ====== */
document.addEventListener("DOMContentLoaded", async () => {
  await cargarCatalogo();
  initSlider();
  cargarTodo();
});
