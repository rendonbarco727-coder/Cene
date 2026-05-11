/* ====== DATOS ====== */
let peliculas = [];
let series    = {};
let novelas   = {};

/* ====== SPINNER ====== */
function ocultarLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

/* ====== ELIMINAR DUPLICADOS (por título) ====== */
function eliminarDuplicados(lista) {
  const vistosTitulos = new Set();
  return lista.filter(peli => {
    if (vistosTitulos.has(peli.titulo)) return false;
    vistosTitulos.add(peli.titulo);
    return true;
  });
}

/* ====== CARGA DEL CATÁLOGO ====== */
async function cargarCatalogo() {
  try {
    const res = await fetch(`catalogo.json?v=${Date.now()}`);
    const data = await res.json();
    // Eliminar duplicados en películas
    peliculas = eliminarDuplicados(data.peliculas || []);
    series    = data.series   || {};
    novelas   = data.novelas  || {};
    console.log(`Cargadas ${peliculas.length} películas únicas.`);
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
  if (titulo.includes('yo antes de ti') || titulo.includes('cosas imposibles') || titulo.includes('caramelo') ||
      titulo.includes('verdad y traición') || titulo.includes('soy frankela') || titulo.includes('sonido de libertad') ||
      titulo.includes('babel') || titulo.includes('dejar el mundo atrás') || titulo.includes('trust') ||
      titulo.includes('asi en la tierra') || titulo.includes('el día que todo cambió') || titulo.includes('together')) {
    return 'Drama';
  }
  if (titulo.includes('tron ares') || titulo.includes('apocalypto') || titulo.includes('4 fantasticos') ||
      titulo.includes('pearl harbor') || titulo.includes('la torre oscura') || titulo.includes('crimen perfecto') ||
      titulo.includes('pantera negra') || titulo.includes('eyes of wakanda') || titulo.includes('estado eléctrico') ||
      titulo.includes('mario galaxy') || titulo.includes('the dinosaur proyect') || titulo.includes('la torre obscura') ||
      titulo.includes('michael jackson')) {
    return 'Acción';
  }
  if (titulo.includes('bambi') || titulo.includes('como entrenar a tu dragón') || titulo.includes('sobinor') ||
      titulo.includes('onward') || titulo.includes('mufasa') || titulo.includes('robot salvaje') ||
      titulo.includes('harry potter')) {
    return 'Animación';
  }
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
  
  document.querySelectorAll('.genero-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.genero-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const generoSeleccionado = btn.getAttribute('data-genero');
      filtrarPeliculasPorGenero(generoSeleccionado);
    });
  });
  
  window.generosMap = generosMap;
  generosContainer.style.display = (seccionActual === 'peliculas') ? 'flex' : 'none';
}

function filtrarPeliculasPorGenero(genero) {
  const grid = document.getElementById('grid-peliculas');
  grid.innerHTML = '';
  let pelisAMostrar = [];
  if (genero === 'todos') {
    pelisAMostrar = [...peliculas].sort((a,b) => a.titulo.localeCompare(b.titulo));
  } else {
    pelisAMostrar = (window.generosMap[genero] || []).sort((a,b) => a.titulo.localeCompare(b.titulo));
  }
  pelisAMostrar.forEach(peli => {
    const card = crearCard(peli.titulo, peli.portada, () => mostrarDetallePelicula(peli), peli.id, peli.idiomas);
    grid.appendChild(card);
  });
}

/* ====== FUNCIÓN DE DESCARGA ====== */
function descargarVideo(id, nombreArchivo = 'video.mp4') {
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  const link = document.createElement('a');
  link.href = url;
  link.download = nombreArchivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ====== VISTA DETALLE CON REPRODUCTOR GRANDE Y MANEJO DE ERRORES ====== */
function mostrarDetallePelicula(peli) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const detailSection = document.getElementById('sec-movie-detail');
  detailSection.classList.remove('hidden');

  const container = document.getElementById('movie-detail-container');
  
  // Construir opciones de calidad/idioma
  let qualityOptions = '';
  if (peli.calidades && peli.calidades.length) {
    qualityOptions = `<select id="qualitySelect">${peli.calidades.map(q => `<option value="${q.id}">${q.label}</option>`).join('')}</select>`;
  } else {
    qualityOptions = `<select id="qualitySelect"><option value="${peli.id}">Original</option></select>`;
  }
  
  let langOptions = '';
  if (peli.idiomas && peli.idiomas.length) {
    langOptions = `<select id="langSelect">${peli.idiomas.map(l => `<option value="${l.id}">${l.lang}</option>`).join('')}</select>`;
  } else {
    langOptions = `<select id="langSelect" style="display:none;"></select>`;
  }
  
  // Obtener películas similares (sin duplicados)
  const generoActual = asignarGenero(peli);
  const similares = peliculas
    .filter(p => asignarGenero(p) === generoActual && p.titulo !== peli.titulo)
    .slice(0, 6);
  
  let similaresHTML = '';
  if (similares.length) {
    similaresHTML = `<h4>🎬 Películas similares</h4><div class="similares-grid" id="similaresGrid"></div>`;
  }
  
  const html = `
    <div class="movie-detail-layout">
      <div class="movie-detail-poster">
        <img src="${peli.portada}" alt="${peli.titulo}">
        <div class="movie-controls">
          <label>🎞️ Calidad</label> ${qualityOptions}
          <label>🌐 Idioma</label> ${langOptions}
          <button id="applySettingsBtn">▶ Aplicar y reproducir</button>
          <button id="downloadBtn">⬇️ Descargar</button>
        </div>
      </div>
      <div class="movie-detail-video">
        <iframe id="detalleIframe" src="about:blank" frameborder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowfullscreen 
          style="width:100%; aspect-ratio:16/9; border-radius:12px; background:#000;"></iframe>
        <div id="videoErrorMsg" style="color:#ff6b6b; margin-top:8px; display:none;">⚠️ No se pudo cargar el video. Verifica que el archivo sea público o intenta con otro idioma/calidad.</div>
        <div class="sinopsis">${peli.sinopsis ? `📖 ${peli.sinopsis}` : ''}</div>
        ${peli.director ? `<div><strong>Director:</strong> ${peli.director}</div>` : ''}
        ${peli.actores ? `<div><strong>Actores:</strong> ${peli.actores}</div>` : ''}
      </div>
    </div>
    ${similaresHTML}
  `;
  container.innerHTML = html;
  
  const iframe = document.getElementById('detalleIframe');
  const errorMsg = document.getElementById('videoErrorMsg');
  const qualitySelect = document.getElementById('qualitySelect');
  const langSelect = document.getElementById('langSelect');
  const applyBtn = document.getElementById('applySettingsBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  
  function obtenerIdActual() {
    let selectedId = qualitySelect.value;
    if (langSelect.style.display !== 'none' && langSelect.value) {
      selectedId = langSelect.value;
    }
    return selectedId;
  }
  
  function actualizarReproductor() {
    const selectedId = obtenerIdActual();
    if (!selectedId) {
      errorMsg.style.display = 'block';
      errorMsg.innerText = '⚠️ No hay ID de video válido.';
      return;
    }
    const videoUrl = `https://drive.google.com/file/d/${selectedId}/preview`;
    iframe.src = videoUrl;
    marcarVisto(selectedId);
    
    // Ocultar mensaje de error previo y mostrar carga
    errorMsg.style.display = 'none';
    // Opcional: detectar error de carga del iframe
    iframe.onerror = () => {
      errorMsg.style.display = 'block';
      errorMsg.innerText = '⚠️ No se pudo cargar el video. Asegúrate de que el archivo esté compartido públicamente.';
    };
    // Timeout para considerar que si no carga en 5 segundos, mostrar error
    clearTimeout(window.videoTimeout);
    window.videoTimeout = setTimeout(() => {
      // No podemos saber realmente si cargó, pero si el iframe sigue en about:blank, mostramos error
      if (iframe.src === 'about:blank' || iframe.src.includes('about:blank')) {
        errorMsg.style.display = 'block';
      }
    }, 5000);
  }
  
  applyBtn.addEventListener('click', actualizarReproductor);
  downloadBtn.addEventListener('click', () => {
    const selectedId = obtenerIdActual();
    const nombre = `${peli.titulo.replace(/[^a-z0-9]/gi, '_')}.mp4`;
    descargarVideo(selectedId, nombre);
  });
  
  // Inicializar
  actualizarReproductor();
  
  // Renderizar similares
  const similaresGrid = document.getElementById('similaresGrid');
  if (similaresGrid) {
    similares.forEach(sim => {
      const card = document.createElement('div');
      card.className = 'similares-card';
      card.innerHTML = `<img src="${sim.portada}" loading="lazy"><p>${sim.titulo}</p>`;
      card.onclick = () => mostrarDetallePelicula(sim);
      similaresGrid.appendChild(card);
    });
  }
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

/* ====== REPRODUCTOR LEGACY (para series/novelas) ====== */
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

  div.onclick = (e) => {
    e.stopPropagation();
    if (typeof accion === 'function') accion();
  };
  return div;
}

/* ====== RENDER PRINCIPAL ====== */
function cargarTodo() {
  renderizarGeneros();
  filtrarPeliculasPorGenero('todos');

  const gs = document.getElementById('grid-series');
  gs.innerHTML = '';
  Object.keys(series).forEach(s => {
    const primeraPortada = series[s][0].portada;
    const card = crearCard(s, primeraPortada, () => verDetalle(s, series[s]));
    gs.appendChild(card);
  });

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
