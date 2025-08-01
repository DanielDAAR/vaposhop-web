document.addEventListener("DOMContentLoaded", function() {
  const contenedor = document.getElementById("productos");
  productos.forEach(p => {
    const card = `
      <div style="border:1px solid #ccc; padding:16px; margin:8px; border-radius:8px; width:200px; text-align:center;">
        <img src="${p.imagen}" style="width:100%; border-radius:8px;">
        <h3>${p.nombre}</h3>
        <p>${p.precio}</p>
        <a href="https://wa.me/5213312345678?text=Hola!%20Estoy%20interesado%20en%20el%20${encodeURIComponent(p.nombre)}" 
           style="display:inline-block; padding:6px 12px; background:#25d366; color:white; text-decoration:none; border-radius:4px;">
          Comprar por WhatsApp
        </a>
      </div>
    `;
    contenedor.innerHTML += card;
  });
});
