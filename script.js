const peliculas = [
  {
    titulo: "Bambi",
    id: "1OKlsC4GLkGUYF6Cnsh0eeP39PrKTMyjV",
    portada: "https://www.google.com/search?sca_esv=9fc1c8ab75c29480&sxsrf=AE3TifNYuY9DGp3wtkys8ULNJUO5q6g0tg:1766169006585&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKBv8IM7dq8CEqHDU3BN7lblo0LLC9Cn6mkAPuJ2pf_5AB2jIEfeNRohPjG4KBYb9QnJ3LOx-aFia41xcHY5Xo44QSagjPBpSXbh_mG9t4XBpj6aCqFmtAXdLsg5uGKhX9ta3PxLq9cCaZJfFhoH-lQBWT3wTOcR1P5sYMlP6DuQK65PDQ3BK2kLRdtxLhpRg08uxBrk&q=bambi+live+action&sa=X&ved=2ahUKEwjoyoCipMqRAxW5mGoFHYO9M3QQtKgLegQIExAB&biw=406&bih=813&dpr=3#sv=CAMS-wQa2wQKjQIKuQEStgEKd0FMa3RfdkVFY1JXQVBrUnI2VnpHTnZTTGNyT3dkYWpOR0tfRzR4Y0hsWWpxS2t6Zm1lWTVnQjJGQzFHS0RZS0c4cmc2d01KLTdjV2p4NWhjOVEtZ3lQY2g5NEVEaEVfVWlpeTg1MXJTRHd2SlZIbXk1ZnRXbEcwEhdzWmxGYWRhU0Y1Q3JxdHNQajhIbHNRSRoiQUZNQUdHcnlRZl9kMWpWdHR4QlFtLUdXSUhzSkpVWHFSdxIDODQ5GgEzIhYKAXESEWJhbWJpIGxpdmUgYWN0aW9uIgcKA3RicxIAIiYKBGVxbGQSHkNnSUlBQkFBT2dRSUFSQUFWWDFBS3o5dEhUQ1BQZxK2AgrPARLMAQqMAUFMa3RfdkUwOHAtYXlzSVJuQ3VhSjlRVzB5dzMtV1lzUFNQREVpSExQcmEyTHdpc2VTN0x2clVmdlBUajdMVFNoY2owVDE0dWMtLWpBU1U4RnMtaDBWUEpjWmZ0MTlSTGJlUTkzZXpqY3V0T2RpbXB1cXllbWJzODdHWnJzQTFoLW9mTl9JX3lFWlBLEhdzWmxGYWRhU0Y1Q3JxdHNQajhIbHNRSRoiQUZNQUdHb2Z6bGltdFhnQ0owWndNM0tlcHFCLVp3QmhDQRIENDY5OBoBMyIYCgZpbWdkaWkSDnJnVEJ2MU9RUHN3RDVNIhcKBWRvY2lkEg5SNjlhMXFGZ2xMQXBxTSImCgRlcWxkEh5DZ0lJQUJBQU9nUUlBUkFBVlgxQUt6OXRIVENQUGcqEGUtcmdUQnYxT1FQc3dENU0gBCoXCgFzEhBlLXJnVEJ2MU9RUHN3RDVNGAEwARgHIM-5hLgLMAFKCggCEAIYAiACKAI"
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
    titulo: "Loki Temporada 1 - Episodio 1",
    id: "1o9uQKpwDFanF5K8Cpj75KRdn3eYguHnY",
    portada: "https://www.google.com/search?q=loki+serie&client=ms-android-xiaomi-terr1-rso2&hs=ABLU&sca_esv=28538b201051a5f8&udm=2&biw=406&bih=813&sxsrf=AE3TifPBLilCSj8q9uoQV-Z0PZdfEDDF0A%3A1766167211193&ei=q5JFaevDC4e3qtsPqLKL6AM&oq=loki+serie&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciCmxva2kgc2VyaWUyCBAuGIAEGLEDMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiKDlCkBli3DXAAeACQAQCYAXSgAacEqgEDMy4zuAEDyAEA-AEBmAIGoALkBMICDRAuGIAEGLEDGEMYigXCAgYQABgHGB7CAggQABiABBixA8ICCxAuGIAEGLEDGIMBwgIKEAAYgAQYQxiKBZgDAIgGAZIHAzMuM6AH9R-yBwMzLjO4B-QEwgcHMi0zLjIuMcgHOoAIAA&sclient=mobile-gws-wiz-img#sv=CAMS9AQa1AQKhgIKuQEStgEKd0FMa3RfdkdtTUxTTU1CbzhpRnNfSjExWExjTkxSWDVRMzg1eHlSNmlqU0RGR0R3UEI3Mjl1WTM0d0V6cWt1VnVadWJnUkdXeWJWWlZfUFIyUHl5akhlTWZtODhnYVF6MGVTYjA0SDhUQmMxRFI2SzJUYmNoRHNnEhdycEpGYWJPdkQ1dTFxdHNQN3V6ODRBbxoiQUZNQUdHcGc2Q3MtSmJ5WDFESm1ZUmkyWFlMZF9CYTJaQRIDODQ5GgEzIg8KAXESCmxva2kgc2VyaWUiBwoDdGJzEgAiJgoEZXFsZBIeQ2dJSUFCQUFPZ1FJQVJBQVZVOTRIejl0SVc5MFBnErYCCs8BEswBCowBQUxrdF92SEdMdXhkcm9QenFZeEhMSWtGOFg3UFFLR2dPQ3lYQzR1bTgwbEkzWGNJYjdNU1NCV3ZrUDV6S2hjcDBPN3lqbXlHWFQwYVppaTJ5ZE9hZXhObl9DaHJfWTRQMVJJcGdiY0Q4bmdQM0RteXpkYUtaSlpFRG9Fd0pnTmlhbGlKMjJoMUtUdUoSF3JwSkZhYk92RDV1MXF0c1A3dXo4NEFvGiJBRk1BR0dyaXE0NE95ZHoyNXNVQVM1cWFrTWNmbXJXV1BREgQ0Njk4GgEzIhgKBmltZ2RpaRIOTG0xUnhobGVoYWppWE0iFwoFZG9jaWQSDmwwSi0tbU5PRVNLYTFNIiYKBGVxbGQSHkNnSUlBQkFBT2dRSUFSQUFWVTk0SHo5dElXOTBQZyoQZS1MbTFSeGhsZWhhamlYTSAEKhcKAXMSEGUtTG0xUnhobGVoYWppWE0YATABGAcgvZy30gIwAUoKCAIQAhgCIAIoAg"
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
