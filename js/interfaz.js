const contenedor = document.getElementById("contenedor-monedas");
const buscador = document.getElementById("buscador");
const contador = document.getElementById("contador");
const selectorSerie = document.getElementById("selector-serie");

function mostrarMonedas(lista) {
  contenedor.innerHTML = "";
  lista.forEach(moneda => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const img = document.createElement("img");
    img.src = moneda.mostrarFrente ? moneda.imagen_frente : moneda.imagen_detras;
    img.alt = moneda.mostrarFrente ? "Frente de la moneda" : "Reverso de la moneda";
    tarjeta.appendChild(img);

    const boton = document.createElement("button");
    boton.textContent = moneda.mostrarFrente ? "Mostrar Reverso" : "Mostrar Frente";
    boton.addEventListener("click", () => {
      moneda.mostrarFrente = !moneda.mostrarFrente;
      aplicarFiltros();
    });

    tarjeta.innerHTML += `
      <h3>${moneda.nombre}</h3>
      <p><strong>País:</strong> ${moneda.pais}</p>
      <p><strong>Año:</strong> ${moneda.año}</p>
      <p><strong>Código:</strong> ${moneda.codigo} - ${moneda.estado?.charAt(0) || ""}</p>
      <p><strong>Serie:</strong> ${moneda.serie}</p>
    `;
    tarjeta.appendChild(boton);
    contenedor.appendChild(tarjeta);
  });

  contador.textContent = `Monedas encontradas: ${lista.length}`;
}

function poblarSelectorSeries() {
  const seriesUnicas = [...new Set(monedas.map(m => m.serie))];
  seriesUnicas.forEach(serie => {
    const option = document.createElement("option");
    option.value = serie;
    option.textContent = serie;
    selectorSerie.appendChild(option);
  });
}
