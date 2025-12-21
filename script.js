/* ====== PELÍCULAS ====== */
const peliculas = [
  {
    titulo: "Bambi",
    id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV",
    portada: "img/bambi.jpg"
  },
  {
    titulo: "Cosas imposibles",
    id: "1S-O5BiPPZYUl9nVUicPAYywXhIKqM1VP",
    portada: "img/cosas.jpg"
  },
  {
    titulo: "Caramelo",
    id: "1dn-DmNz7NZTmz0EvFIHuMMNeTSdmZHS3",
    portada: "img/Caramelo.jpg"
  }
];

/* ====== NOVELAS ====== */
const novela = [
  {
    titulo: "Domenica Montero Capítulo 01",
    id: "1HKZBxjcB8VfNWIWQoINQ1__kGQH3KzLY",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 02",
    id: "1H9PtFDGUj2KIZQBZ-4T4A_RbPjjTXN7o",
    portada: "img/domenica.jpg"
  }
];

/* ====== SERIES (AGRUPADAS) ====== */
const series = {
  "IT": [
    {
      titulo: "Temporada 1 - Episodio 1",
      id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo",
      portada: "img/It.jpg"
    },
    {
      titulo: "Temporada 1 - Episodio 2",
      id: "1UM9Pl6JP00ruYSsglltJ6yx3FvGCLKn-",
      portada: "img/It.jpg"
    },
    {
      titulo: "Temporada 1 - Episodio 3",
      id: "1dOztKuSgXOqfe9o4j2NE633XfAWpDu-1",
      portada: "img/It.jpg"
}
  ],
  "Loki": [
    {
      titulo: "Temporada 1 - Episodio 1",
      id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY",
      portada: "img/Loki.jpg"
    },
    {
      titulo: "Temporada 1 - Episodio 2",
      id: "14sKUI7KOn9XJSS4TNB4uL5GSB9BJz476",
      portada: "img/Loki.jpg"
    }
  ]
};

/* ====== FUNCIONES ====== */
function cargar(lista, contenedor) {
  const div = document.getElementById(contenedor);
  if (!div) return;

  lista.forEach(v => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${v.portada}">
      <p>${v.titulo}</p>
    `;
    card.onclick = () => reproducir(v.id);
    div.appendChild(card);
  });
}

function cargarSeriesPorFila(seriesObj) {
  const contenedor = document.getElementById("series");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  Object.keys(seriesObj).forEach(nombreSerie => {
    const titulo = document.createElement("h3");
    titulo.textContent = nombreSerie;
    titulo.className = "titulo-serie";

    const fila = document.createElement("div");
    fila.className = "fila-horizontal";

    seriesObj[nombreSerie].forEach(ep => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${ep.portada}">
        <p>${ep.titulo}</p>
      `;
      card.onclick = () => reproducir(ep.id);
      fila.appendChild(card);
    });

    contenedor.appendChild(titulo);
    contenedor.appendChild(fila);
  });
}

function reproducir(id) {
  const player = document.getElementById("player");
  const frame = document.getElementById("videoFrame");
  frame.src = `https://drive.google.com/file/d/${id}/preview`;
  player.classList.remove("hidden");
}

function cerrar() {
  const player = document.getElementById("player");
  const frame = document.getElementById("videoFrame");
  frame.src = "";
  player.classList.add("hidden");
}

/* ====== CARGA INICIAL ====== */
document.addEventListener("DOMContentLoaded", () => {
  cargar(peliculas, "peliculas");
  cargar(novela, "novela");
  cargarSeriesPorFila(series);
});

// Simular acumulación progresiva de nieve
setInterval(() => {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("snowed");
  });
}, 5000);
