document.addEventListener("DOMContentLoaded", () => {
  const urlCSV = "https://docs.google.com/spreadsheets/d/1fqRXaMgkBzdVksjrZB_uXwOg-qynRUF6rxnwP4Z4keU/export?format=csv";
  const contenedor = document.getElementById("contenedor-monedas");
  const buscador = document.getElementById("buscador");
  const contador = document.getElementById("contador");
  const selectorSerie = document.getElementById("selector-serie");

  let monedas = [];

  const numeroAPalabra = {
    "1": "un",
    "2": "dos",
    "5": "cinco",
    "10": "diez",
    "20": "veinte",
    "25": "veinticinco",
    "50": "cincuenta",
    "100": "cien",
    "200": "doscientos"
  };

  function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

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
          estado: celdas[7],
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

      aplicarFiltros();
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

  function aplicarFiltros() {
    const textoRaw = buscador.value.toLowerCase().trim();
    const textoNormalizado = normalizarTexto(textoRaw);
    const serieSeleccionada = selectorSerie.value;

    const palabrasBusqueda = [textoNormalizado];

    // Si contiene algún número, lo reemplazamos por su forma escrita
    Object.keys(numeroAPalabra).forEach(numero => {
      const regex = new RegExp(`\\b${numero}\\b`);
      if (regex.test(textoRaw)) {
        const palabra = numeroAPalabra[numero];
        const reemplazado = normalizarTexto(textoRaw.replace(regex, palabra));
        palabrasBusqueda.push(reemplazado);
      }
    });

    const resultado = monedas.filter(moneda => {
      const textoMoneda = normalizarTexto(`
        ${moneda.nombre.toLowerCase()}
        ${moneda.pais.toLowerCase()}
        ${moneda.año.toLowerCase()}
        ${moneda.serie.toLowerCase()}
      `);

      const coincideTexto = palabrasBusqueda.some(palabra =>
        textoMoneda.includes(palabra)
      );

      const coincideSerie = serieSeleccionada === "" || moneda.serie === serieSeleccionada;

      return coincideTexto && coincideSerie;
    });

    mostrarMonedas(resultado);
  }

  buscador.addEventListener("input", aplicarFiltros);
  selectorSerie.addEventListener("change", aplicarFiltros);
});
