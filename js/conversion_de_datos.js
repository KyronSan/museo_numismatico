let monedas = [];

function procesarCSV(data) {
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

  poblarSelectorSeries();
  aplicarFiltros();
}
