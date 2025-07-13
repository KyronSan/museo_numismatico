function aplicarFiltros() {
  const textoRaw = buscador.value.toLowerCase().trim();
  const textoNormalizado = normalizarTexto(textoRaw);
  const serieSeleccionada = selectorSerie.value;

  const palabrasBusqueda = [textoNormalizado];

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
