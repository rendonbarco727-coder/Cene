/* ====== DATOS (Simplificados para el ejemplo) ====== */
const peliculas = [
  { titulo: "The Room", id: "1HhUWsZt3nq7t3i3aj9uIjp9WFMSu_Htj", portada: "img/room.jpg" },
  { titulo: "Tron Ares", id: "1fbWC5HmXXLj7_FG1eu5m3JYYHg8X8xyw", portada: "img/tron.jpg" },
  { titulo: "Teléfono Negro 1", id: "13GMvzhbQ3BwcQmvW7nhq3FSjTqL4dJap", portada: "img/tel1.jpg" },
  { titulo: "Five Nights at Freddy's", id: "1xs9uVvlE4nVKfuuikDLCHYmY_2DgD8PL", portada: "img/five.jpg" }
];

const series = {
  "IT (Eso)": [{ titulo: "Capítulo 01", id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo", portada: "img/It.jpg" }],
  "Loki": [{ titulo: "T1 - E01", id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY", portada: "img/Loki.jpg" }]
};

const novelas = {
  "Domenica Montero": [{ titulo: "Capítulo 01", id: "1HKZBxjcB8VfNWIWQoINQ1__kGQH3KzLY", portada: "img/domenica.jpg" }]
};

/* ====== NAVEGACIÓN ====== */
function mostrarSeccion(id) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  document.getElementById(`sec-${id}`).classList.remove('hidden');
  
  const hero = document.getElementById('header-slider');
  id === 'peliculas' ? hero.style.display = 'block' : hero.style.display = 'none';
}

function verDetalle(titulo, lista) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  const vista = document.getElementById('vista-detalles');
  vista.classList.remove('hidden');
  document.getElementById('detalle-titulo').innerText = titulo;
  
  const grid = document.getElementById('grid-detalles');
  grid.innerHTML = "";
  lista.forEach(item => {
    grid.appendChild(crearCard(item.titulo, item.portada, () => reproducir(item.id)));
  });
}

function volver() { mostrarSeccion('series'); }

/* ====== RENDER ====== */
function crearCard(titulo, portada, accion) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<img src="${portada}"><p>${titulo}</p>`;
  div.onclick = accion;
  return div;
}

function cargarTodo() {
  const gridPeli = document.getElementById('grid-peliculas');
  peliculas.forEach(p => gridPeli.appendChild(crearCard(p.titulo, p.portada, () => reproducir(p.id))));

  const gridSeries = document.getElementById('grid-series');
  Object.keys(series).forEach(s => gridSeries.appendChild(crearCard(s, series[s][0].portada, () => verDetalle(s, series[s]))));

  const gridNovelas = document.getElementById('grid-novelas');
  Object.keys(novelas).forEach(n => gridNovelas.appendChild(crearCard(n, novelas[n][0].portada, () => verDetalle(n, novelas[n]))));
}

function reproducir(id) {
  const p = document.getElementById('player');
  document.getElementById('videoFrame').src = `https://drive.google.com/file/d/${id}/preview`;
  p.classList.remove('hidden');
}

function cerrar() {
  document.getElementById('player').classList.add('hidden');
  document.getElementById('videoFrame').src = "";
}

function filtrarContenido() {
  const q = document.getElementById('buscador').value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}

// Slider
let current = 0;
function initSlider() {
  const wrapper = document.getElementById('slider');
  peliculas.forEach(p => {
    const img = document.createElement('img');
    img.src = p.portada;
    wrapper.appendChild(img);
  });
  setInterval(() => {
    current = (current + 1) % peliculas.length;
    wrapper.style.transform = `translateX(-${current * 100}%)`;
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  cargarTodo();
});
