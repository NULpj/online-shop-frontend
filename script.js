let cart = [];

async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();

  const container = document.getElementById("product-container");
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>Rp${prod.price.toLocaleString()}</p>
      <button onclick="addToCart(${prod.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(productId) {
  cart.push(productId);
  document.getElementById("cart-count").textContent = cart.length;
}

async function checkout() {
  const name = prompt("Masukkan nama Anda:");
  if (!name || cart.length === 0) return alert("Nama dan keranjang tidak boleh kosong.");

  const res = await fetch('/api/checkout', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, cart, date: new Date().toISOString() })
  });

  const msg = await res.json();
  alert(msg.message);
  cart = [];
  document.getElementById("cart-count").textContent = 0;
}

loadProducts();
