document.getElementById("ingresar").addEventListener("click", () => {
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("contraseña").value.trim();

  const adminUser = "admin";
  const adminPass = "1234";

  if (user === adminUser && pass === adminPass) {
    window.location.href = "admin.html";
  } else {
    document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos";
  }
});

