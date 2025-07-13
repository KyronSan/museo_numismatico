
document.addEventListener("DOMContentLoaded", () => {
  const crearZoom = (imgSrc) => {
    const overlay = document.createElement("div");
    overlay.id = "zoom-overlay";
    overlay.innerHTML = `
      <div id="zoom-container">
        <img id="zoom-img" src="${imgSrc}" alt="Zoom">
        <div id="zoom-lens"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const zoomImg = overlay.querySelector("#zoom-img");
    const lens = overlay.querySelector("#zoom-lens");

    const moveLens = (e) => {
      const bounds = zoomImg.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      lens.style.left = (x - lens.offsetWidth / 2) + "px";
      lens.style.top = (y - lens.offsetHeight / 2) + "px";

      const zoomScale = 2;
      lens.style.backgroundImage = `url('${imgSrc}')`;
      lens.style.backgroundRepeat = "no-repeat";
      lens.style.backgroundSize = `${zoomImg.width * zoomScale}px ${zoomImg.height * zoomScale}px`;
      lens.style.backgroundPosition = `-${x * zoomScale - lens.offsetWidth / 2}px -${y * zoomScale - lens.offsetHeight / 2}px`;
    };

    zoomImg.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    zoomImg.addEventListener("mouseleave", () => lens.style.display = "none");
    zoomImg.addEventListener("mouseenter", () => lens.style.display = "block");

    overlay.addEventListener("click", () => overlay.remove());
  };

  document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG" && e.target.closest(".tarjeta")) {
      crearZoom(e.target.src);
    }
  });
});
