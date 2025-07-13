document.addEventListener("DOMContentLoaded", () => {
  const urlCSV = "https://docs.google.com/spreadsheets/d/1fqRXaMgkBzdVksjrZB_uXwOg-qynRUF6rxnwP4Z4keU/export?format=csv";

  fetch(urlCSV)
    .then(res => res.text())
    .then(data => procesarCSV(data))
    .catch(error => {
      console.error("❌ Error al cargar los datos desde Google Sheets:", error);
    });
});
