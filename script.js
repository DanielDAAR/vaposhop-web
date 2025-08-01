document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.forEach((p) => {
    const card = `
      <div style="
        background: #1e1e1e;
        border-radius: 12px;
        margin: 16px;
        padding: 16px;
        width: 240px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        text-align: center;
        transition: transform 0.3s;
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        <img src="${p.imagen}" alt="${p.nombre}" style="width: 100%; border-radius: 8px;">
        <h3 style="margin: 10px 0;">${p.nombre}</h3>
        <p style="color: #25D366; font-weight: bold;">${p.precio}</p>
        <a href="https://wa.me/5213346799345?text=Hola! Estoy interesado en el ${encodeURIComponent(p.nombre)}"
           style="display: inline-block; padding: 8px 16px; background: #25D366; color: white; text-decoration: none; border-radius: 6px; margin-top: 8px;">
          Comprar 💨
        </a>
      </div>
    `;
    contenedor.innerHTML += card;
  });
});
  
