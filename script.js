/* ====== DATOS ====== */
const peliculas = [
    { titulo: "The Room", id: "1HhUWsZt3nq7t3i3aj9uIjp9WFMSu_Htj", portada: "img/room.jpg" },
    { titulo: "Tron Ares", id: "1fbWC5HmXXLj7_FG1eu5m3JYYHg8X8xyw", portada: "img/tron.jpg" },
    { titulo: "Teléfono Negro 1", id: "13GMvzhbQ3BwcQmvW7nhq3FSjTqL4dJap", portada: "img/tel1.jpg" },
    { titulo: "Teléfono Negro 2", id: "1iyauAE-pxdlZRjoYmz1ZkIFDRYqRfghF", portada: "img/tel2.jpg" },
    { titulo: "Doctor Sueño", id: "173OExhru7h7P9zq8fQWp879fYXKd3SyI", portada: "img/doc.jpg" },
    { titulo: "Five Nights at Freddy's", id: "1xs9uVvlE4nVKfuuikDLCHYmY_2DgD8PL", portada: "img/five.jpg" }
];

const series = {
    "IT (Eso)": [
        { titulo: "Capítulo 01", id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo", portada: "img/It.jpg" },
        { titulo: "Capítulo 02", id: "1UM9Pl6JP00ruYSsglltJ6yx3FvGCLKn-", portada: "img/It.jpg" }
    ],
    "Loki": [
        { titulo: "Temporada 1 - E01", id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY", portada: "img/Loki.jpg" },
        { titulo: "Temporada 1 - E02", id: "14sKUI7KOn9XJSS4TNB4uL5GSB9BJz476", portada: "img/Loki.jpg" }
    ]
};

const novelas = {
    "Domenica Montero": [
        { titulo: "Capítulo 01", id: "1HKZBxjcB8VfNWIWQoINQ1__kGQH3KzLY", portada: "img/domenica.jpg" },
        { titulo: "Capítulo 02", id: "1H9PtFDGUj2KIZQBZ-4T4A_RbPjjTXN7o", portada: "img/domenica.jpg" },
        { titulo: "Capítulo 03", id: "1WbFeQ4cHKwNH4bZg8ir7rOItmqJnzsJ9", portada: "img/domenica.jpg" }
    ]
};

/* ====== NAVEGACIÓN Y VISTAS ====== */
function mostrarSeccion(id) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`sec-${id}`).classList.remove('hidden');
    
    // Slider solo en películas
    const slider = document.getElementById('header-slider');
    id === 'peliculas' ? slider.classList.remove('hidden') : slider.classList.add('hidden');
}

function verDetalle(titulo, listaCapitulos) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    const vista = document.getElementById('vista-detalles');
    vista.classList.remove('hidden');
    
    document.getElementById('detalle-titulo').innerText = titulo;
    const grid = document.getElementById('grid-detalles');
    grid.innerHTML = "";

    listaCapitulos.forEach(cap => {
        grid.appendChild(crearCard(cap.titulo, cap.portada, () => reproducir(cap.id)));
    });
}

function volver() {
    mostrarSeccion('series'); // Por defecto vuelve a series
}

/* ====== RENDERIZADO ====== */
function crearCard(titulo, portada, accion) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<img src="${portada}" alt="${titulo}"><p>${titulo}</p>`;
    div.onclick = accion;
    return div;
}

function cargarContenido() {
    // Cargar Películas
    const gridPeli = document.getElementById('grid-peliculas');
    peliculas.forEach(p => gridPeli.appendChild(crearCard(p.titulo, p.portada, () => reproducir(p.id))));

    // Cargar Series (Agrupadas)
    const gridSeries = document.getElementById('grid-series');
    Object.keys(series).forEach(nombre => {
        gridSeries.appendChild(crearCard(nombre, series[nombre][0].portada, () => verDetalle(nombre, series[nombre])));
    });

    // Cargar Novelas (Agrupadas)
    const gridNovelas = document.getElementById('grid-novelas');
    Object.keys(novelas).forEach(nombre => {
        gridNovelas.appendChild(crearCard(nombre, novelas[nombre][0].portada, () => verDetalle(nombre, novelas[nombre])));
    });
}

/* ====== REPRODUCTOR Y OTROS ====== */
function reproducir(id) {
    const player = document.getElementById('player');
    document.getElementById('videoFrame').src = `https://drive.google.com/file/d/${id}/preview`;
    player.classList.remove('hidden');
}

function cerrar() {
    document.getElementById('player').classList.add('hidden');
    document.getElementById('videoFrame').src = "";
}

function filtrarContenido() {
    const query = document.getElementById('buscador').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
}

// Slider Automático
let index = 0;
function initSlider() {
    const slider = document.getElementById('slider');
    peliculas.slice(0, 5).forEach(p => {
        const img = document.createElement('img');
        img.src = p.portada;
        img.onclick = () => reproducir(p.id);
        slider.appendChild(img);
    });
    setInterval(() => {
        index = (index + 1) % 5;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    initSlider();
    cargarContenido();
});
