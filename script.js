/* ====== PELÍCULAS ====== */
const peliculas = [
  {
    titulo: "The Room",
    id: "1HhUWsZt3nq7t3i3aj9uIjp9WFMSu_Htj",
    portada: "img/room.jpg"
  },
  {
    titulo: "Teléfono Negro 1",
    id: "13GMvzhbQ3BwcQmvW7nhq3FSjTqL4dJap",
    portada: "img/tel1.jpg"
  },
  {
    titulo: "Teléfono Negro 2",
    id: "1iyauAE-pxdlZRjoYmz1ZkIFDRYqRfghF",
    portada: "img/tel2.jpg"
  },
    {
    titulo: "El Abismo Secreto",
    id: "1PtdXB3D3LJOHCc_lS7vc88q4i-x1dlFG",
    portada: "img/abi.jpg"
  },
  {
    titulo: "Bambi",
    id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV",
    portada: "img/bambi.jpg"
  },
  {
    titulo: "Doctor Sueño",
    id: "173OExhru7h7P9zq8fQWp879fYXKd3SyI",
    portada: "img/doc.jpg"
  },
  {
    titulo: "Trust",
    id: "1zF7nJapnl2dJUSLL2jrZbTzWz9S9o85x",
    portada: "img/trust.jpg"
  },
  {
    titulo: "Yo antes de Ti",
    id: "1L1CO0MHu2mwsSJx-LvAziteUObL2Kk7-",
    portada: "img/yo.jpg"
  },
  {
    titulo: "Five Nights at Freddy's 2",
    id: "16831kM6d-15tNBOqQIq_tCk25rBDTwce",
    portada: "img/freddy.jpg"
  },
    {
    titulo: "Five Nights at Freddy's",
    id: "1xs9uVvlE4nVKfuuikDLCHYmY_2DgD8PL",
    portada: "img/five.jpg"
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
const novelas = [
  {
    titulo: "Domenica Montero Capítulo 01",
    id: "1HKZBxjcB8VfNWIWQoINQ1__kGQH3KzLY",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 02",
    id: "1H9PtFDGUj2KIZQBZ-4T4A_RbPjjTXN7o",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 03",
    id: "1WbFeQ4cHKwNH4bZg8ir7rOItmqJnzsJ9",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 04",
    id: "1NQ8kdWVQ51oo9o6yya-s0pICxgT6X8fu",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 05",
    id: "1Oj86ov9uRsrOYMPJmzG7Yl561U7aE3v7",
    portada: "img/domenica.jpg"
  },
  {
    titulo: "Domenica Montero Capítulo 06",
    id: "1KUVqvtU4JHaYTlMHtE7f2kprOGjVCmWN",
    portada: "img/domenica.jpg"
  }
];

/* ====== SERIES ====== */
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
    },
    {
      titulo: "Temporada 1 - Episodio 4",
      id: "1MIqeU9ZwdpKuF2FGltndNpDF4d4ZNNE9",
      portada: "img/It.jpg"
    },
    {
      titulo: "Temporada 1 - Episodio 5",
      id: "1SV1gig2L8Gj3uti-7-8EAyq5riPd1GcO",
      portada: "img/It.jpg"
    },
    {
      titulo: "Temporada 1 - Episodio 6",
      id: "1wyeG-X3cz2R2GTiLQQHEFxcCqtHCzMO7",
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

/* ====== SLIDER ENCABEZADO ====== */
let slideIndex = 0;

function cargarSlider() {
  const slider = document.getElementById("slider");
  if (!slider) return;

  slider.innerHTML = "";

  peliculas.forEach(peli => {
    const img = document.createElement("img");
    img.src = peli.portada;
    img.alt = peli.titulo;
    img.onclick = () => reproducir(peli.id);
    slider.appendChild(img);
  });

  setInterval(() => {
    slideIndex = (slideIndex + 1) % peliculas.length;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
  }, 4000);
}

/* ====== FUNCIONES DE CARGA ====== */
function cargarPorFila(lista, contenedor) {
  const div = document.getElementById(contenedor);
  if (!div) return;

  div.innerHTML = "";
  div.classList.add("fila-horizontal");

  lista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.portada}">
      <p>${item.titulo}</p>
    `;
    card.onclick = () => reproducir(item.id);
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

/* ====== REPRODUCTOR ====== */
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
  cargarSlider();
  cargarPorFila(peliculas, "peliculas");
  cargarPorFila(novelas, "novela");
  cargarSeriesPorFila(series);
});

/* ====== EFECTO NIEVE ====== */
setInterval(() => {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("snowed");
  });
}, 5000);
