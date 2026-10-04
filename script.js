const products = [
    {
        id: 1,
        name: "Es Teh Original",
        price: 5000,
        image: "esteh.png"
    },
    {
        id: 2,
        name: "Es Teh Lemon",
        price: 7000,
        image: "esteh.png",
        fruit: "Lemon.webp",
        fruitClass: "lemon"
    },
    {
        id: 3,
        name: "Es Teh Strawberry",
        price: 9000,
        image: "esteh.png",
        fruit: "Strawberry.png",
        fruitClass: "strawberry"
    }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");

function displayProducts() {
    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {

        let fruit = "";

        if (product.fruit) {
            fruit = `
                <img class="fruit ${product.fruitClass}"
                     src="${product.fruit}"
                     alt="${product.name}">
            `;
        }

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">

                <img class="tea-main"
                     src="${product.image}"
                     alt="${product.name}">

                ${fruit}

            </div>

            <h3>${product.name}</h3>

            <p>Rp${product.price.toLocaleString("id-ID")}</p>

            <button class="btn"
                    onclick="addToCart(${product.id})">
                Tambah
            </button>
        `;

        productList.appendChild(card);
    });
}

function addToCart(id) {

    const product = products.find(item => item.id == id);

    const existing = cart.find(item => item.id == id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {

    if (!cartList) return;

    cartList.innerHTML = "";

    if (cart.length == 0) {
        cartList.innerHTML = "<p>Belum ada pesanan.</p>";
        totalPrice.textContent = "Rp0";
        return;
    }

    let total = 0;

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const data = document.createElement("div");

        data.innerHTML = `
            <p>
                ${item.name} x${item.quantity}
                - Rp${subtotal.toLocaleString("id-ID")}
            </p>
        `;

        cartList.appendChild(data);
    });

    totalPrice.textContent =
        "Rp" + total.toLocaleString("id-ID");
}


/* FORM PESANAN */

const orderForm = document.getElementById("order-form");

if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nama = document.getElementById("nama").value;
        const menu = document.getElementById("menu").value;
        const jumlah = document.getElementById("jumlah").value;

        let harga = 0;

        if (menu == "Es Teh Original") harga = 5000;
        if (menu == "Es Teh Lemon") harga = 7000;
        if (menu == "Es Teh Strawberry") harga = 9000;

        const total = harga * jumlah;

        document.getElementById("order-result").innerHTML = `
            <h3>Pesanan Berhasil!</h3>
            <p>Nama: ${nama}</p>
            <p>Menu: ${menu}</p>
            <p>Jumlah: ${jumlah}</p>
            <p>Total: Rp${total.toLocaleString("id-ID")}</p>
        `;
    });
}

displayProducts();
displayCart();