import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Tu configuración de Firebase - reemplaza con la tuya:

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

const productosContainer = document.getElementById("productos");

// Función para mostrar productos en la página

async function cargarProductos() {

productosContainer.innerHTML = "Cargando productos...";

try {

const querySnapshot = await getDocs(collection(db, "productos"));

productosContainer.innerHTML = "";

querySnapshot.forEach((doc) => {

const p = doc.data();

const card = document.createElement("div");

card.className = "producto-card";

card.innerHTML = `

<img src="${p.imagen}" alt="${p.nombre}" class="producto-img" />  

<h3 class="producto-nombre">${p.nombre}</h3>  

<p class="producto-precio">${p.precio}</p>  

<p class="producto-descripcion">${p.descripcion || ""}</p>  

<a href="https://wa.me/5213346799345?text=Hola! Estoy interesado en el producto ${encodeURIComponent(p.nombre)}" target="_blank" style="display:inline-block; margin-top:8px; background:#25D366; color:#fff; padding:6px 12px; border-radius:6px; text-decoration:none;">Comprar 💨</a>

`;

productosContainer.appendChild(card);

});

} catch (error) {

productosContainer.innerHTML = "Error cargando productos";

console.error("Error cargando productos:", error);

}

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

cargarProductos();
