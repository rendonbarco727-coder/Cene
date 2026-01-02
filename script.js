/* ====== DATOS ====== */
const peliculas = [
  { titulo: "The Room", id: "1HhUWsZt3nq7t3i3aj9uIjp9WFMSu_Htj", portada: "img/room.jpg" },
  { titulo: "Tron Ares", id: "1fbWC5HmXXLj7_FG1eu5m3JYYHg8X8xyw", portada: "img/tron.jpg" },
  { titulo: "Teléfono Negro 1", id: "13GMvzhbQ3BwcQmvW7nhq3FSjTqL4dJap", portada: "img/tel1.jpg" },
  { titulo: "Teléfono Negro 2", id: "1iyauAE-pxdlZRjoYmz1ZkIFDRYqRfghF", portada: "img/tel2.jpg"},
  { titulo: "El Abismo Secreto", id: "1PtdXB3D3LJOHCc_lS7vc88q4i-x1dlFG", portada: "img/abi.jpg"},
  { titulo: "Bambi", id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV", portada: "img/bambi.jpg"},
  { titulo: "Doctor Sueño", id: "173OExhru7h7P9zq8fQWp879fYXKd3SyI", portada: "img/doc.jpg"},
  { titulo: "Trust", id: "1zF7nJapnl2dJUSLL2jrZbTzWz9S9o85x", portada: "img/trust.jpg"},
  { titulo: "Yo antes de Ti", id: "1L1CO0MHu2mwsSJx-LvAziteUObL2Kk7-", portada: "img/yo.jpg"},
  { titulo: "Five Nights at Freddy's 2", id: "16831kM6d-15tNBOqQIq_tCk25rBDTwce", portada: "img/freddy.jpg"},
  { titulo: "Five Nights at Freddy's", id: "1xs9uVvlE4nVKfuuikDLCHYmY_2DgD8PL", portada: "img/five.jpg"},
  { titulo: "Cosas imposibles", id: "1S-O5BiPPZYUl9nVUicPAYywXhIKqM1VP", portada: "img/cosas.jpg"},
  { titulo: "Caramelo", id: "1dn-DmNz7NZTmz0EvFIHuMMNeTSdmZHS3", portada: "img/Caramelo.jpg"},
  { titulo: "Asi en la Tierra como en el Infierno", id: "1A8_ndAD0G5jjTuYEJqRZQWuGEe4kOxAx", portada: "img/asi.jpg"},
  { titulo: "Gretel y Hansel", id: "1xHYWt6QpCDf84dUB8DOdJtsEl04T87qd", portada: "img/gretel.jpg"},
  { titulo: "Apocalypto", id: "1Zq8sNv1350sF6vmzZLerULFZ3E64hike", portada: "img/apocalipto.jpg"},
  { titulo: "Los 4 Fantasticos", id: "1m7c5HjR2OcT5KfBJrLL9o4TK8dTzjL4U", portada: "img/4fan.jpg"},
  { titulo: "Pearl Harbor", id: "1pdHWRgVOVA6-PYDbtxh9T6KrJteyr9Nr", portada: "img/pear.jpg"}
];

const series = {
  "IT (Eso)": [
    { titulo: "Capítulo 01", id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo", portada: "img/eso.jpg" },
    { titulo: "T1 - E02", id: "1UM9Pl6JP00ruYSsglltJ6yx3FvGCLKn-", portada: "img/It.jpg" },
    { titulo: "T1 - E03", id: "1dOztKuSgXOqfe9o4j2NE633XfAWpDu-1", portada: "img/eso.jpg" },
    { titulo: "T1 - E04", id: "1MIqeU9ZwdpKuF2FGltndNpDF4d4ZNNE9", portada: "img/It.jpg" },
    { titulo: "T1 - E05", id: "1SV1gig2L8Gj3uti-7-8EAyq5riPd1GcO", portada: "img/eso.jpg" },
    { titulo: "T1 - E06", id: "1wyeG-X3cz2R2GTiLQQHEFxcCqtHCzMO7", portada: "img/It.jpg" },
    { titulo: "T1 - E07", id: "1j7hZcvGGO4nF5bLHgQYPazBCArKOdX4Y", portada: "img/eso.jpg" },
    { titulo: "T1 - E08", id: "1Fmjp23Thga2jkLG6R6GHL9PfapXqZKsu", portada: "img/It.jpg" }
  ],
  "Loki": [
    { titulo: "T1 - E01", id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY", portada: "img/Loki2.jpg" },
    { titulo: "T1 - E02", id: "14sKUI7KOn9XJSS4TNB4uL5GSB9BJz476", portada: "img/Loki.jpg"},
    { titulo: "T1 - E03", id: "1jQkqvFTYzC6T33RaljStFVdWziCFEjjT", portada: "img/Loki2.jpg"},
    { titulo: "T1 - E04", id: "1hbwZ1AcK8kry6ELE9JNHvRq2YNcTUWvZ", portada: "img/Loki.jpg"},
    { titulo: "T1 - E05", id: "1QYiGoqko3Fi3uMzfBn100GYuqMT8-YK-", portada: "img/Loki2.jpg"},
    { titulo: "T1 - E06", id: "14TZou4-Fpg-kjIz4MUU9aJ6WLiHQkM_z", portada: "img/Loki.jpg"}
  ] 
};

const novelas = {
  "Domenica Montero": [
    { titulo: "Capítulo 01", id: "1HKZBxjcB8VfNWIWQoINQ1__kGQH3KzLY", portada: "img/domenica.jpg" },
    { titulo: "Capítulo 02", id: "1H9PtFDGUj2KIZQBZ-4T4A_RbPjjTXN7o", portada: "img/domenica.jpg" },
    { titulo: "Capítulo 03", id: "1WbFeQ4cHKwNH4bZg8ir7rOItmqJnzsJ9", portada: "img/domenica.jpg" },
    { titulo: "Capítulo 04", id: "1NQ8kdWVQ51oo9o6yya-s0pICxgT6X8fu", portada: "img/domenica.jpg" },
    { titulo: "Capítulo 05", id: "1Oj86ov9uRsrOYMPJmzG7Yl561U7aE3v7", portada: "img/domenica.jpg" },
    { titulo: "Capítulo 06", id: "1KUVqvtU4JHaYTlMHtE7f2kprOGjVCmWN", portada: "img/domenica.jpg" }
  ]
};

/* ====== SISTEMA HISTORIAL (VISTOS) ====== */
let vistos = JSON.parse(localStorage.getItem('cinema_vistos')) || [];

function marcarVisto(id) {
  if (!id) return;
  if (!vistos.includes(id)) {
    vistos.push(id);
    localStorage.setItem('cinema_vistos', JSON.stringify(vistos));
  }
}

/* ====== NAVEGACION ====== */
let seccionActual = 'peliculas';

function mostrarSeccion(id) {
  seccionActual = id;
  document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
  document.getElementById(`sec-${id}`).classList.remove('hidden');
  
  const hero = document.getElementById('header-slider');
  id === 'peliculas' ? hero.classList.remove('hidden') : hero.classList.add('hidden');
  
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
  window.scrollTo(0,0);
}

function volver() { mostrarSeccion(seccionActual); }

/* ====== RENDER ====== */
function crearCard(titulo, portada, accion, id = null) {
  const div = document.createElement('div');
  div.className = 'card';
  // Si ya fue visto, añadimos la clase visual
  if (id && vistos.includes(id)) div.classList.add('visto');
  
  div.innerHTML = `
    <div class="check-visto">✓</div>
    <img src="${portada}">
    <p>${titulo}</p>
  `;
  
  div.onclick = (e) => {
    e.stopPropagation();
    if (id) {
        marcarVisto(id);
        div.classList.add('visto'); // Actualizar visualmente al instante
    }
    accion();
  };
  return div;
}

function cargarTodo() {
  const gridPeli = document.getElementById('grid-peliculas');
  peliculas.forEach(p => gridPeli.appendChild(crearCard(p.titulo, p.portada, () => reproducir(p.id), p.id)));

  const gridSeries = document.getElementById('grid-series');
  Object.keys(series).forEach(s => {
    gridSeries.appendChild(crearCard(s, series[s][0].portada, () => verDetalle(s, series[s])));
  });

  const gridNovelas = document.getElementById('grid-novelas');
  Object.keys(novelas).forEach(n => {
    gridNovelas.appendChild(crearCard(n, novelas[n][0].portada, () => verDetalle(n, novelas[n])));
  });
}

function reproducir(id) {
  const p = document.getElementById('player');
  const frame = document.getElementById('videoFrame');
  frame.src = `https://drive.google.com/file/d/${id}/preview`;
  p.classList.remove('hidden');
}

function cerrar() {
  document.getElementById('player').classList.add('hidden');
  document.getElementById('videoFrame').src = "";
}

function filtrarContenido() {
  const q = document.getElementById('buscador').value.toLowerCase();
  const activa = document.querySelector('.content-section:not(.hidden)');
  if(!activa) return;
  
  activa.querySelectorAll('.card').forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
}

/* ====== SLIDER ====== */
let current = 0;
function initSlider() {
  const wrapper = document.getElementById('slider');
  peliculas.slice(0, 6).forEach(p => {
    const img = document.createElement('img');
    img.src = p.portada;
    wrapper.appendChild(img);
  });
  setInterval(() => {
    const imgs = wrapper.querySelectorAll('img');
    if(imgs.length > 0) {
        current = (current + 1) % imgs.length;
        wrapper.style.transform = `translateX(-${current * 100}%)`;
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  cargarTodo();
});
