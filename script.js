/* ====== DATOS ====== */
// (Mantén tus arrays de peliculas, novelas y series igual que antes)

/* ====== NAVEGACIÓN ====== */
function mostrarSeccion(seccionId) {
  // Ocultar todo
  document.getElementById('sec-peliculas').classList.add('hidden');
  document.getElementById('sec-series').classList.add('hidden');
  document.getElementById('sec-novela').classList.add('hidden');
  document.getElementById('vista-detalles').classList.add('hidden');
  document.getElementById('header-slider').classList.remove('hidden');

  // Mostrar la seleccionada
  document.getElementById(`sec-${seccionId}`).classList.remove('hidden');
  
  // Si no es películas, ocultamos el slider para que no estorbe
  if(seccionId !== 'peliculas') {
    document.getElementById('header-slider').classList.add('hidden');
  }
}

/* ====== RENDERIZADO DE GRUPOS (SERIES/NOVELAS) ====== */
function cargarCatalogos() {
  // Cargar Películas
  cargarGrid(peliculas, "peliculas");

  // Cargar Series (Agrupadas)
  const listaSeries = document.getElementById("lista-series");
  Object.keys(series).forEach(nombre => {
    const portada = series[nombre][0].portada; // Toma la portada del primer capítulo
    const card = crearCard(nombre, portada, () => verDetalle(nombre, series[nombre]));
    listaSeries.appendChild(card);
  });

  // Cargar Novelas (Agrupadas por nombre base)
  // Nota: Para novelas, como están en un array plano, las agrupamos manualmente
  const listaNovelas = document.getElementById("lista-novelas");
  const novelaUnica = {
    "Domenica Montero": "img/domenica.jpg"
  };

  Object.keys(novelaUnica).forEach(nombre => {
    const card = crearCard(nombre, novelaUnica[nombre], () => {
      const caps = novelas.filter(n => n.titulo.includes(nombre));
      verDetalle(nombre, caps);
    });
    listaNovelas.appendChild(card);
  });
}

function crearCard(titulo, portada, accion) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${portada}"><p>${titulo}</p>`;
  card.onclick = accion;
  return card;
}

function cargarGrid(lista, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  lista.forEach(item => {
    const card = crearCard(item.titulo, item.portada, () => reproducir(item.id));
    contenedor.appendChild(card);
  });
}

/* ====== VISTA DETALLE (CAPÍTULOS) ====== */
function verDetalle(titulo, capitulos) {
  document.getElementById('sec-series').classList.add('hidden');
  document.getElementById('sec-novela').classList.add('hidden');
  document.getElementById('vista-detalles').classList.remove('hidden');
  
  document.getElementById('detalle-titulo').textContent = titulo;
  const grid = document.getElementById('detalle-grid');
  grid.innerHTML = "";

  capitulos.forEach(cap => {
    const card = crearCard(cap.titulo, cap.portada, () => reproducir(cap.id));
    grid.appendChild(card);
  });
}

function volverAlCatalogo() {
  document.getElementById('vista-detalles').classList.add('hidden');
  // Detectar cual estaba activa antes o volver a series por defecto
  document.getElementById('sec-series').classList.remove('hidden');
}

/* ====== BUSCADOR ====== */
function filtrarContenido() {
  const query = document.getElementById("buscador").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const texto = card.innerText.toLowerCase();
    card.style.display = texto.includes(query) ? "block" : "none";
  });
}

// ... (Mantén tus funciones de reproducir, cerrar y cargarSlider igual) ...

document.addEventListener("DOMContentLoaded", () => {
  cargarSlider();
  cargarCatalogos();
  // Mostrar películas por defecto
  mostrarSeccion('peliculas');
});
