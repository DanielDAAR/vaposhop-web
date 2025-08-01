// Espera a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  if (typeof productos === "undefined" || !Array.isArray(productos)) {
    console.error("No se encontró el arreglo de productos");
    return;
  }

  const contenedor = document.getElementById("productos");

  productos.forEach((p) => {
    const card = `
      <div style="
        border:1px solid #ccc;
        padding:16px;
        margin:8px;
        border-radius:8px;
        width:200px;
        text-align:center;
        background-color: #f9f9f9;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
      ">
        <img src="${p.imagen}" style="width:100%; border-radius:8px;" alt="${p.nombre}">
        <h3 style="margin: 10px 0 5px;">${p.nombre}</h3>
        <p style="color: #555; font-weight: bold;">${p.precio}</p>
        <a href="https://wa.me/5213312345678?text=Hola!%20Estoy%20interesado%20en%20el%20${encodeURIComponent(p.nombre)}" 
           style="display:inline-block; padding:6px 12px; background:#25d366; color:white; text-decoration:none; border-radius:4px; font-weight: bold;">
          Comprar por WhatsApp
        </a>
      </div>
    `;
    contenedor.innerHTML += card;
  });
});
