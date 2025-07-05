document.addEventListener("DOMContentLoaded", () => {
  const urlCSV = "https://docs.google.com/spreadsheets/d/1fqRXaMgkBzdVksjrZB_uXwOg-qynRUF6rxnwP4Z4keU/export?format=csv";

  const contenedor = document.getElementById("contenedor-monedas");
  const buscador = document.getElementById("buscador");
  const contador = document.getElementById("contador");
  const selectorSerie = document.getElementById("selector-serie");

  let monedas = [];

  fetch(urlCSV)
    .then(res => res.text())
    .then(data => {
      const filas = data.trim().split("\n");
      filas.shift(); // Eliminar encabezado

      monedas = filas.map(fila => {
        const celdas = fila.split(",");
        return {
          nombre: celdas[0],
          pais: celdas[1],
          año: celdas[2],
          serie: celdas[3],
          imagen_frente: celdas[4],
          imagen_detras: celdas[5],
          codigo: celdas[6],
          mostrarFrente: true
        };
      });

      const seriesUnicas = [...new Set(monedas.map(m => m.serie))];
      seriesUnicas.forEach(serie => {
        const option = document.createElement("option");
        option.value = serie;
        option.textContent = serie;
        selectorSerie.appendChild(option);
      });

      mostrarMonedas(monedas);
    })
    .catch(error => {
      console.error("❌ Error al cargar los datos desde Google Sheets:", error);
    });

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
        mostrarMonedas(monedas);
      });

      tarjeta.innerHTML += `
        <h3>${moneda.nombre}</h3>
        <p><strong>País:</strong> ${moneda.pais}</p>
        <p><strong>Año:</strong> ${moneda.año}</p>
        <p><strong>Código:</strong> ${moneda.codigo}</p>
        <p><strong>Serie:</strong> ${moneda.serie}</p>
      `;

      tarjeta.appendChild(boton);
      contenedor.appendChild(tarjeta);
    });

    contador.textContent = `Monedas encontradas: ${lista.length}`;
  }

  function aplicarFiltros() {
    const texto = buscador.value.toLowerCase();
    const serieSeleccionada = selectorSerie.value;

    const resultado = monedas.filter(moneda => {
      const coincideTexto =
        moneda.nombre.toLowerCase().includes(texto) ||
        moneda.pais.toLowerCase().includes(texto) ||
        moneda.año.toLowerCase().includes(texto) ||
        moneda.serie.toLowerCase().includes(texto) ||
        moneda.codigo.toLowerCase().includes(texto);

      const coincideSerie = serieSeleccionada === "" || moneda.serie === serieSeleccionada;

      return coincideTexto && coincideSerie;
    });

    mostrarMonedas(resultado);
  }

  buscador.addEventListener("input", aplicarFiltros);
  selectorSerie.addEventListener("change", aplicarFiltros);
});
