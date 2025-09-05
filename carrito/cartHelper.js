export function actualizarCarrito() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || []
  const count = cart.reduce((acc, p) => acc + p.cantidad, 0)
  const span = document.getElementById("cart-count")

  if (span) span.textContent = count
}

export function agregarAlCarrito(producto) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || []
  const existente = cart.find(p => p.id === producto.id)

  if (existente) {
    existente.cantidad++
  } else {
    cart.push({ ...producto, cantidad: 1 })
  }

  sessionStorage.setItem("cart", JSON.stringify(cart))
  actualizarCarrito()
}
