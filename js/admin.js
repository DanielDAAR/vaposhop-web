// Importa Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configura tu conexión real a Supabase
const supabaseUrl = 'https://sjvgfhloimgzdheiqnuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdmdmaGxvaW1nemRoZWlxbnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDg0OTIsImV4cCI6MjA3NjU4NDQ5Mn0.ieXM9A9sw4a0uOnzvHQ887xyb8gY_G_OvAsGM8I2tIs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Referencias a elementos del DOM
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");
const agregar = document.getElementById("agregar");
const lista = document.getElementById("lista-productos");

// Función para cargar productos desde Supabase
async function cargarProductos() {
  lista.innerHTML = "<p style='color:#aaa;'>Cargando productos...</p>";

  const { data: productos, error } = await supabase
    .from('productos')
    .select('*')
    .order('id_producto', { ascending: true });

  if (error) {
    console.error("Error cargando productos:", error);
    lista.innerHTML = "<p style='color:red;'>Error cargando productos.</p>";
    return;
  }

  lista.innerHTML = "";

  if (!productos || productos.length === 0) {
    lista.innerHTML = "<p style='color:#aaa;'>No hay productos aún.</p>";
    return;
  }

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="margin-bottom: 16px; background:#222; padding:12px; border-radius:8px;">
        <img src="${producto.imagen}" width="100%" style="border-radius:8px;" />
        <h4 style="margin:8px 0 4px 0;">${producto.nombre}</h4>
        <p><strong>$${producto.precio}</strong></p>
        <p>${producto.descripcion}</p>
        <button 
          style="background:#d33; color:white; padding:6px 10px; border:none; border-radius:6px; cursor:pointer;"
          onclick="eliminarProducto('${producto.id_producto}')">
          🗑 Eliminar
        </button>
      </div>
    `;
    lista.appendChild(div);
  });
}

// Función para agregar un producto
agregar.addEventListener("click", async () => {
  if (!nombre.value || !precio.value || !descripcion.value || !imagen.value) {
    alert("Llena todos los campos antes de agregar.");
    return;
  }

  const { error } = await supabase
    .from('productos')
    .insert([
      {
        nombre: nombre.value,
        precio: precio.value,
        descripcion: descripcion.value,
        imagen: imagen.value
      }
    ]);

  if (error) {
    console.error("Error agregando producto:", error);
    alert("Error al agregar producto.");
    return;
  }

  // Limpia los campos
  nombre.value = "";
  precio.value = "";
  descripcion.value = "";
  imagen.value = "";

  // Recarga lista
  await cargarProductos();
  alert("Producto agregado con éxito ✅");
});

// Función para eliminar un producto
window.eliminarProducto = async (id) => {
  const confirmar = confirm("¿Seguro que quieres eliminar este producto?");
  if (!confirmar) return;

  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id_producto', id);

  if (error) {
    console.error("Error eliminando producto:", error);
    alert("Error al eliminar producto.");
    return;
  }

  await cargarProductos();
  alert("Producto eliminado 🗑");
};

// Cargar productos al inicio
cargarProductos();
