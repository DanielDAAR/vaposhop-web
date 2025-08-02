import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "vapedealerstore",
  storageBucket: "vapedealerstore.appspot.com",
  messagingSenderId: "669843415263",
  appId: "1:669843415263:web:27c57bdfa10606e180096a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productosRef = collection(db, "productos");

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");
const agregar = document.getElementById("agregar");
const lista = document.getElementById("lista-productos");

async function cargarProductos() {
  lista.innerHTML = "";
  const snapshot = await getDocs(productosRef);
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="margin-bottom: 16px; background:#222; padding:12px; border-radius:8px;">
        <img src="${data.imagen}" width="100%" style="border-radius:8px;" />
        <h4>${data.nombre}</h4>
        <p>${data.precio}</p>
        <p>${data.descripcion}</p>
        <button onclick="eliminarProducto('${docSnap.id}')">Eliminar</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

agregar.addEventListener("click", async () => {
  if (!nombre.value || !precio.value || !descripcion.value || !imagen.value) {
    alert("Llena todos los campos");
    return;
  }

  await addDoc(productosRef, {
    nombre: nombre.value,
    precio: precio.value,
    descripcion: descripcion.value,
    imagen: imagen.value
  });

  nombre.value = "";
  precio.value = "";
  descripcion.value = "";
  imagen.value = "";

  cargarProductos();
});

window.eliminarProducto = async (id) => {
  await deleteDoc(doc(db, "productos", id));
  cargarProductos();
};

cargarProductos();
