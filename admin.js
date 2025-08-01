import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJZPTFlDus1LOHkWfavrgy8S-x7xpmzdI",
  authDomain: "vapedealerstore.firebaseapp.com",
  projectId: "vapedealerstore",
  storageBucket: "vapedealerstore.appspot.com",
  messagingSenderId: "669843415263",
  appId: "1:669843415263:web:27c57bdfa10606e180096a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const form = document.getElementById("formProducto");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const archivo = document.getElementById("imagen").files[0];

  if (!archivo) return;

  const storageRef = ref(storage, archivo.name);
  await uploadBytes(storageRef, archivo);

  await addDoc(collection(db, "productos"), {
    nombre,
    precio,
    descripcion,
    imagen: archivo.name
  });

  mensaje.textContent = "Producto guardado correctamente.";
  form.reset();
});
