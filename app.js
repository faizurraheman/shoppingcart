const clearCart = document.getElementById("clear-cart");
const productTable = document.getElementById("product-table");
const total_price = document.getElementById("total-price");
const tax = document.getElementById("tax");
const totalPayableAmount = document.getElementById("total-payable-ammount");
const addToCartProduct = document.getElementsByClassName('add-to-cart');

let products = [
    ["Green Zara Shirt", 60],
    ["Blue Zara Shirt", 80],
    ["Red Zara Shirt", 90],
    [" Zara Shirt", 90]
]

let cart = [];
for (let i = 0; i < addToCartProduct.length; i++) {
    addToCartProduct[i].addEventListener("click", function () {
        console.log("hii");
        addToCart(products[i][0], products[i][1]);
    });
}

clearCart.addEventListener("click", function () {
    alertify.confirm('Clear Cart', 'Do you want to really clear this cart???',
        function () {
            alertify.success('Clear Cart');
            cart = [];
            updateCart();
        },
        function () { alertify.error('Cancel') });
});

// Add to cart
function addToCart(productName, price) {
    // Check already in cart
    const index = cart.findIndex((item) => item.productName === productName);
    if (index > -1) {
        cart[index].quantity++;
    } else {
        cart.push({ productName, price, quantity: 1 });
    }

    updateCart();
}

// Update cart
function updateCart() {
    // Clear table
    productTable.innerHTML = "";

    // Table Create
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        const productName = document.createElement("td");
        const productPrice = document.createElement("td");
        const productQuantity = document.createElement("td");
        const productTotalPrice = document.createElement("td");
        const productRemove = document.createElement("td");

        productName.textContent = item.productName;
        productPrice.textContent = "₹ " + item.price;
        productQuantity.innerHTML = `
    <button class="btn btn-sm btn-outline-secondary" onclick="decrementQuantity(${index})" onkeypress="isInputNumber(event)">-</button>
    <input type="text" value="${item.quantity}" onkeyup="keyup(${index}, this)">
    <button class="btn btn-sm btn-outline-secondary" onclick="incrementQuantity(${index})">+</button>
`;

        const totalItemPrice = item.price * item.quantity;
        productTotalPrice.textContent = "₹ " + totalItemPrice;

        row.appendChild(productName);
        row.appendChild(productPrice);
        row.appendChild(productQuantity);
        row.appendChild(productTotalPrice);
        row.appendChild(productRemove).innerHTML = `<button onclick="removeProduct(${index})" ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABOklEQVR4nO2VQUoDQRREcwEVFHTnSpdeQXFlQCbpqtheRdwFoh7FKwiCuskl1KVZKO4U4/yeRUtJAoEkk4wzoEgaCv7UwH/z6zdMrfZXjgEXBlgg41B6NuCsSohF71dHvejcmpFp8WbN5k4ATsakr8f8vvrkQgzojsZSVAZ0cyGDaNolIe3Zkf0WJCW3Z9WlIfJn1QtIXMRV+y+3q2/AXUomVUOeUuAoNhpLUuocA/Bg5HlpSEYeCBCB9b73m8MequUFoJcBh6UgRl5rAjU18iU4tyep/vZarWMDbstCPhTPwNs18llSLS96v2Lk21yQAFxOrMkY6/XlaiA5Sp3jtLgUpZE3Y5BAnhb8h9zHJNmYsvjHiYv/9H5LLwuBgJ6WrOgkTaAeBnQmXuGfnIzcN/LKyFcD3hXR6ARffs98VnLwrToAAAAASUVORK5CYII="></button>`;

        productTable.appendChild(row);

        totalPrice += totalItemPrice;
    });

    // Update totals
    const taxAmount = totalPrice * 0.1;
    const totalPayable = totalPrice + taxAmount;
    total_price.textContent = "₹ " + totalPrice;
    tax.textContent = "₹ " + taxAmount;
    totalPayableAmount.textContent = "₹ " + totalPayable;
}

// Increment quantity
function incrementQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrement quantity
function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    }
}

// Delete One by One Product
function removeProduct(index) {
    alertify.confirm('Remove', 'Do you want to really Remove this product???',
        function () {
            alertify.success('Trash');
            cart.splice(index, 1);
            updateCart();
        },
        function () { alertify.error('Cancel') });
}

// Manule update quntity
function keyup(index, quantityInput) {
    cart[index].quantity = parseInt(quantityInput.value) || 1;
    updateCart();
}

// Allow only Number
function isInputNumber(event) {
    var char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
        event.preventDefault();
    }
}

function checkOut() {
    alertify.alert("Thanks For Purchase.....");
}