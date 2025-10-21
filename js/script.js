// Importa Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configura tu conexión a Supabase
const supabaseUrl = 'https://sjvgfhloimgzdheiqnuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdmdmaGxvaW1nemRoZWlxbnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDg0OTIsImV4cCI6MjA3NjU4NDQ5Mn0.ieXM9A9sw4a0uOnzvHQ887xyb8gY_G_OvAsGM8I2tIs'; // Usa la anon key para front-end
const supabase = createClient(supabaseUrl, supabaseKey);

const productosContainer = document.getElementById("productos");

// Función para mostrar productos en la página
async function cargarProductos() {
  productosContainer.innerHTML = "Cargando productos...";

  const { data: productos, error } = await supabase
    .from('productos')
    .select('*');

  if (error) {
    productosContainer.innerHTML = "Error cargando productos";
    console.error("Error cargando productos:", error);
    return;
  }

  productosContainer.innerHTML = "";

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />  
      <h3 class="producto-nombre">${p.nombre}</h3>  
      <p class="producto-precio">${p.precio}</p>  
      <p class="producto-descripcion">${p.descripcion || ""}</p>  
      <a href="https://wa.me/5213346799345?text=Hola! Estoy interesado en el producto ${encodeURIComponent(p.nombre)}" 
         target="_blank" 
         style="display:inline-block; margin-top:8px; background:#25D366; color:#fff; padding:6px 12px; border-radius:6px; text-decoration:none;">
         Comprar 💨
      </a>
    `;
    productosContainer.appendChild(card);
  });
}

// Botón secreto para entrar a login.html
document.getElementById("admin-access").addEventListener("click", () => {
  let count = parseInt(localStorage.getItem("eggClicks")) || 0;
  count++;
  if (count >= 5) {
    localStorage.removeItem("eggClicks");
    window.location.href = "login.html";
  } else {
    localStorage.setItem("eggClicks", count);
  }
});

// Cargar productos al inicio
cargarProductos();
