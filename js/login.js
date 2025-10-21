// Importa Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configura la conexión a tu proyecto
const supabaseUrl = 'https://sjvgfhloimgzdheiqnuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdmdmaGxvaW1nemRoZWlxbnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDg0OTIsImV4cCI6MjA3NjU4NDQ5Mn0.ieXM9A9sw4a0uOnzvHQ887xyb8gY_G_OvAsGM8I2tIs';
const supabase = createClient(supabaseUrl, supabaseKey);

// Referencias a elementos del DOM
const btnIngresar = document.getElementById("ingresar");
const inputUsuario = document.getElementById("usuario");
const inputContraseña = document.getElementById("contraseña");
const mensaje = document.getElementById("mensaje");

btnIngresar.addEventListener("click", async () => {
  const usuario = inputUsuario.value.trim();
  const contraseña = inputContraseña.value.trim();

  if (!usuario || !contraseña) {
    mensaje.textContent = "Por favor, llena todos los campos.";
    return;
  }

  // Buscar usuario en Supabase
  const { data, error } = await supabase
    .from('usuarios')
    .select('id_usuario, nombre, contraseña, rol')
    .eq('nombre', usuario)
    .maybeSingle();

  if (error) {
    console.error("Error al verificar usuario:", error);
    mensaje.textContent = "Error en la conexión con el servidor.";
    return;
  }

  // Si no se encontró usuario
  if (!data) {
    mensaje.textContent = "Usuario no encontrado.";
    return;
  }

  // Verificar contraseña
  if (data.contraseña !== contraseña) {
    mensaje.textContent = "Contraseña incorrecta.";
    return;
  }

  // Redirigir según el rol
  if (data.rol === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
});
