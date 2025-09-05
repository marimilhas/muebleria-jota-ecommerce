import { actualizarCarrito } from "./cartHelper.js";

actualizarCarrito();

const cont = document.getElementById("carrito-container");

function renderCarrito() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }

  if (!cart.length) {
    cont.textContent = "El carrito está vacío";
    const totalDiv = document.getElementById("total-carrito");
    if (totalDiv) totalDiv.textContent = "";
    return;
  }

  cart.forEach((p) => {
    const li = document.createElement("li"); // crear elemento de lista
    li.className = "carrito-item"; // clase para estilos

    // Imagen
    
    const img = document.createElement("img");
    img.src = p.imagen; // URL de la imagen del producto
    img.alt = p.nombre; // texto alternativo

    // Información
    
    const infoDiv = document.createElement("div");
    infoDiv.className = "info"; // contenedor de nombre y descripción

    const nombreSpan = document.createElement("span");
    nombreSpan.className = "nombre";
    nombreSpan.textContent = p.nombre; // nombre del producto

    const descSpan = document.createElement("span");
    descSpan.className = "descripcion";
    descSpan.textContent = p.descripcion || ""; // descripción, si existe

    infoDiv.appendChild(nombreSpan); // agregamos nombre al infoDiv
    infoDiv.appendChild(descSpan); // agregamos descripción
    
    // Cantidad y Precio
    
    const cpDiv = document.createElement("div");
    cpDiv.className = "cantidad-precio"; // contenedor de cantidad y precio

    const cantidadDiv = document.createElement("div");
    cantidadDiv.className = "cantidad"; // sub-contenedor para botones y número

    const btnMenos = document.createElement("button");
    btnMenos.className = "menos";
    btnMenos.textContent = "-"; // botón para disminuir cantidad

    const spanCantidad = document.createElement("span");
    spanCantidad.className = "cantidad-num";
    spanCantidad.textContent = p.cantidad; // cantidad actual

    const btnMas = document.createElement("button");
    btnMas.className = "mas";
    btnMas.textContent = "+"; // botón para aumentar cantidad

    cantidadDiv.appendChild(btnMenos);
    cantidadDiv.appendChild(spanCantidad);
    cantidadDiv.appendChild(btnMas);

    const spanPrecio = document.createElement("span");
    spanPrecio.className = "precio";
    spanPrecio.textContent = `$${p.precio * p.cantidad}`; // precio total

    const btnBorrar = document.createElement("button");
    btnBorrar.className = "borrar";
    btnBorrar.textContent = "Eliminar"; // botón de eliminar producto

    cpDiv.appendChild(cantidadDiv);
    cpDiv.appendChild(spanPrecio);
    cpDiv.appendChild(btnBorrar);

    // Eventos
    
    btnMas.addEventListener("click", () => {
      p.cantidad++; // sumamos 1
      spanCantidad.textContent = p.cantidad; // actualizamos número
      spanPrecio.textContent = `$${p.precio * p.cantidad}`; // actualizamos precio
      sessionStorage.setItem("cart", JSON.stringify(cart)); // guardamos cambios
      actualizarTotal(cart); // actualizar total
      actualizarCarrito(); // actualizar contador del nav
    });

    btnMenos.addEventListener("click", () => {
      if (p.cantidad > 1) {
        p.cantidad--; // restamos 1
      } else {
        const index = cart.findIndex((item) => item.id === p.id); // busca índice
        if (index > -1) cart.splice(index, 1); // elimina del arreglo
        li.remove(); // elimina del DOM
      }
      spanCantidad.textContent = p.cantidad; // actualiza cantidad
      spanPrecio.textContent = `$${p.precio * p.cantidad}`; // actualiza precio
      sessionStorage.setItem("cart", JSON.stringify(cart)); // guarda cambios
      actualizarTotal(cart); // actualizar total
      actualizarCarrito(); // actualizar contador
    });

    // "Eliminar" borra el producto
    
    btnBorrar.addEventListener("click", () => {
      const index = cart.findIndex((item) => item.id === p.id);
      if (index > -1) cart.splice(index, 1); // eliminamos del arreglo
      li.remove(); // eliminamos del DOM
      sessionStorage.setItem("cart", JSON.stringify(cart)); // guardamos cambios
      actualizarTotal(cart); // actualizar total
      actualizarCarrito(); // actualizar contador
    });

    // Construcción final del li
    
    li.appendChild(img);
    li.appendChild(infoDiv);
    li.appendChild(cpDiv); // agrega cantidad/precio

    cont.appendChild(li); // agrega el item al contenedor
  });

  actualizarTotal(cart);
}

// Función para actualizar total

function actualizarTotal(cart) {
  const totalDiv = document.getElementById("total-carrito");
  const total = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0); // suma total
  if (totalDiv) totalDiv.textContent = `Total: $${total}`;
}

// Renderizar el carrito al cargar

renderCarrito();
  
