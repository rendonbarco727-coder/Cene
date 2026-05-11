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
  
  // Ocultar/mostrar barra de géneros según sección
  const generosBar = document.getElementById('generos-container');
  if (generosBar) {
    generosBar.style.display = seccion === 'peliculas' ? 'flex' : 'none';
  }
}

function volver() {
  mostrarSeccion(seccionActual);
}

/* ====== CLASIFICACIÓN POR GÉNEROS ====== */
function asignarGenero(pelicula) {
  const titulo = pelicula.titulo.toLowerCase();
  // Terror / Horror
  if (titulo.includes('teléfono negro') || titulo.includes('el abismo secreto') || titulo.includes('doctor sueño') ||
      titulo.includes('five nights') || titulo.includes('el resplandor') || titulo.includes('destino final') ||
      titulo.includes('the sand') || titulo.includes('exterminio') || titulo.includes('el conjuro') ||
      titulo.includes('chucky') || titulo.includes('terrifier') || titulo.includes('silent hill') ||
      titulo.includes('muñeco diabólico') || titulo.includes('tarot') || titulo.includes('the room') ||
      titulo.includes('gretel') || titulo.includes('la novia de chucky') || titulo.includes('el hijo de chucky') ||
      titulo.includes('la hermanastra fea') || titulo.includes('scream') || titulo.includes('return to silent hill') ||
      titulo.includes('the jester') || titulo.includes('pecadores')) {
    return 'Terror';
  }
  // Drama / Romance
  if (titulo.includes('yo antes de ti') || titulo.includes('cosas imposibles') || titulo.includes('caramelo') ||
      titulo.includes('verdad y traición') || titulo.includes('soy frankela') || titulo.includes('sonido de libertad') ||
      titulo.includes('babel') || titulo.includes('dejar el mundo atrás') || titulo.includes('trust') ||
      titulo.includes('asi en la tierra') || titulo.includes('el día que todo cambió') || titulo.includes('together')) {
    return 'Drama';
  }
  // Acción / Aventura
  if (titulo.includes('tron ares') || titulo.includes('apocalypto') || titulo.includes('4 fantasticos') ||
      titulo.includes('pearl harbor') || titulo.includes('la torre oscura') || titulo.includes('crimen perfecto') ||
      titulo.includes('pantera negra') || titulo.includes('eyes of wakanda') || titulo.includes('estado eléctrico') ||
      titulo.includes('mario galaxy') || titulo.includes('the dinosaur proyect') || titulo.includes('la torre obscura') ||
      titulo.includes('michael jackson')) {
    return 'Acción';
  }
  // Animación / Familiar
  if (titulo.includes('bambi') || titulo.includes('como entrenar a tu dragón') || titulo.includes('sobinor') ||
      titulo.includes('onward') || titulo.includes('mufasa') || titulo.includes('robot salvaje') ||
      titulo.includes('harry potter')) {
    return 'Animación';
  }
  // Ciencia ficción
  if (titulo.includes('first moon') || titulo.includes('exterminio la evolución') || titulo.includes('28 semanas') ||
      titulo.includes('estado eléctrico')) {
    return 'Ciencia Ficción';
  }
  return 'Otros';
}

function obtenerPeliculasPorGenero() {
  const generos = {};
  peliculas.forEach(peli => {
    const gen = asignarGenero(peli);
    if (!generos[gen]) generos[gen] = [];
    generos[gen].push(peli);
  });
  return generos;
}

function renderizarGeneros() {
  const generosMap = obtenerPeliculasPorGenero();
  const generosList = Object.keys(generosMap).sort();
  
  let generosContainer = document.getElementById('generos-container');
  if (!generosContainer) {
    generosContainer = document.createElement('div');
    generosContainer.id = 'generos-container';
    generosContainer.className = 'generos-bar';
    // Insertar justo después del navbar o antes del slider
    const navbar = document.querySelector('.navbar');
    navbar.parentNode.insertBefore(generosContainer, navbar.nextSibling);
  }
  generosContainer.innerHTML = '<button class="genero-btn active" data-genero="todos">🎬 Todos</button>';
  generosList.forEach(gen => {
    const btn = document.createElement('button');
    btn.className = 'genero-btn';
    btn.textContent = gen;
    btn.setAttribute('data-genero', gen);
    generosContainer.appendChild(btn);
  });
  
  // Eventos de filtro
  document.querySelectorAll('.genero-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.genero-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const generoSeleccionado = btn.getAttribute('data-genero');
      filtrarPeliculasPorGenero(generoSeleccionado);
    });
  });
  
  window.generosMap = generosMap;
  // Mostrar solo si estamos en películas
  generosContainer.style.display = (seccionActual === 'peliculas') ? 'flex' : 'none';
}

function filtrarPeliculasPorGenero(genero) {
  const grid = document.getElementById('grid-peliculas');
  grid.innerHTML = '';
  let pelisAMostrar = [];
  if (genero === 'todos') {
    pelisAMostrar = peliculas;
  } else {
    pelisAMostrar = window.generosMap[genero] || [];
  }
  pelisAMostrar.forEach(peli => {
    const card = crearCard(peli.titulo, peli.portada, () => mostrarDetallePelicula(peli), peli.id, peli.idiomas);
    grid.appendChild(card);
  });
}

/* ====== VISTA DETALLE PARA SERIES/NOVELAS ====== */
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

/* ====== VISTA DETALLE PARA PELÍCULAS ====== */
function mostrarDetallePelicula(peli) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const detailSection = document.getElementById('sec-movie-detail');
  detailSection.classList.remove('hidden');

  const container = document.getElementById('movie-detail-container');
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

/* ====== REPRODUCTOR ====== */
function abrirReproductor(id) {
  const frame = document.getElementById('videoFrame');
  frame.src = `https://drive.google.com/file/d/${id}/preview`;
  document.getElementById('player').classList.remove('hidden');
}

function cerrarPlayer() {
  document.getElementById('player').classList.add('hidden');
  document.getElementById('videoFrame').src = "";
}

/* ====== CREAR TARJETA ====== */
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
  // Películas: se mostrarán mediante el filtro de géneros
  renderizarGeneros();   // crea barra y guarda datos
  filtrarPeliculasPorGenero('todos'); // muestra todas

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
