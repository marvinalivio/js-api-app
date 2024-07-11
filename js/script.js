let cart = [];

function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.title === productName);

    if (existingProductIndex > -1) {
        // If product exists, update the quantity and total price
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice += productPrice;
    } else {
        // If product doesn't exist, add a new item to the cart
        cart.push({
            id: productName,
            price: productPrice,
            quantity: 1,
            totalPrice: productPrice
        });
    }

    // Update the cart display
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear the current cart display

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const cartList = document.createElement('ul');

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.id} - Php${item.price} x ${item.quantity} = ${item.totalPrice.toFixed(2)}`;
            cartList.appendChild(cartItem);
        });

        cartContainer.appendChild(cartList);
    }
}

