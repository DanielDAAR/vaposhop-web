document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="info">
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}</p>
      </div>
    `;
    card.onclick = () => mostrarDetalle(p);
    contenedor.appendChild(card);
  });
});
