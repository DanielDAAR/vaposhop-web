import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

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

const contenedor = document.getElementById("productos");
contenedor.innerHTML = "";

const querySnapshot = await getDocs(collection(db, "productos"));
for (const doc of querySnapshot.docs) {
  const p = doc.data();
  const url = await getDownloadURL(ref(storage, p.imagen));
  const card = `
    <div style="background: #1e1e1e; border-radius: 12px; margin: 16px; padding: 16px; width: 240px; box-shadow: 0 0 10px rgba(0,0,0,0.5); text-align: center;">
      <img src="${url}" alt="${p.nombre}" style="width: 100%; border-radius: 8px;">
      <h3>${p.nombre}</h3>
      <p style="color: #25D366;">${p.precio}</p>
      <p style="font-size: 0.9em;">${p.descripcion}</p>
      <a href="https://wa.me/5213346799345?text=Hola! Estoy interesado en el ${encodeURIComponent(p.nombre)}"
         style="display: inline-block; margin-top: 8px; padding: 8px 16px; background: #25D366; color: white; text-decoration: none; border-radius: 6px;">
        Comprar 💨
      </a>
    </div>
  `;
  contenedor.innerHTML += card;
}

// 🥚 Activar login oculto
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
