const peliculas = [
  {
    titulo: "Bambi",
    id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV",
    portada: "img/bambi.jpg"
  },
  {
    titulo: "Caramelo",
    id: "1dn-DmNz7NZTmz0EvFIHuMMNeTSdmZHS3",
    portada: "img/Caramelo.jpg"
  }
];

const series = [
  {
    titulo: "IT Temporada 1 - Episodio 1",
    id: "109rkG4sPdh38wXWjAca6YAldG7AK2amo",
    portada: "img/It.jpg"
  },
  {
    titulo: "IT Temporada 1 - Episodio 2",
    id: "1UM9Pl6JP00ruYSsglltJ6yx3FvGCLKn-",
    portada: "img/It.jpg"
  },
  {
    titulo: "Loki Temporada 1 - Episodio 1",
    id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY",
    portada: "img/Loki.jpg"
  }
  {
    titulo: "Loki Temporada 1 - Episodio 2",
    id: "14sKUI7KOn9XJSS4TNB4uL5GSB9BJz476",
    portada: "img/Loki.jpg"
},
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
