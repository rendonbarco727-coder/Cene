const peliculas = [
  {
    titulo: "Bambi",
    id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV",
    portada: "imagenes/bambi.jpg"
  },
  {
    titulo: "Caramelo",
    id: "1dn-DmNz7NZTmz0EvFIHuMMNeTSdmZHS3",
    portada: "imagenes/Caramelo.jpg"
  }
];

const series = [
  {
    titulo: "IT Temporada 1 - Episodio 1",
    id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo",
    portada: "imagenes/It.jpg"
  },
  {
    titulo: "Loki Temporada 1 - Episodio 1",
    id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY",
    portada: "imagenes/Loki.jpg"
  }
];

function cargar(lista, contenedor) {
  const div = document.getElementById(contenedor);
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

cargar(peliculas, "peliculas");
cargar(series, "series");
