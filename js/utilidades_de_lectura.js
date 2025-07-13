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
