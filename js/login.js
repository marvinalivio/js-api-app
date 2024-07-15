// script.js
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (username === 'user' && password === 'password') {
        document.getElementById('user').textContent = username;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('logout-form').style.display = 'block';
    

let logpage = document.getElementById('logInPage');
logpage.innerHTML = `
<section id="hero"> </section>
<section id="searchItem">
    <div class="searchInput">
    <div class="searchFiled">
    <input type="text" id="searchInput" placeholder="Enter search term">
    <button onclick="performSearch()" class="searchBtn">Search</button>
    </div>
    <p id="iconCartAppend"></p>
    </div>
    <div id="results"></div>
</section>

<section id="bestSellerId">
    <h2>Best Seller</h2>
    <div id="featuredItem" class="gridClass"></div>
</div>
</section>
<section class="womenItem">
    <h2>Women's clothing</h2>
    <div id="femaleProduct" class="gridClass"></div>
</section>

<section id="allProduct">
    <h2>All Product</h2>
    <div id="productName" class="product">
    </div>
    <div id="paginationControls">
        <button id="prevPage" >Previous</button>
        <button id="nextPage" >Next</button>
    </div>
</section>

<section id="shoppingCart">
     <div id="iconCart"></div>
     <p id="cartTotal"></p>
    <h2>Shopping Cart</h2>
    <div id="cart">
       
        <p>Your cart is empty.</p>
    </div>
</section>

`



} else {
    alert('Invalid username or password');
}
}

function logout() {
document.getElementById('login-form').style.display = 'block';
document.getElementById('logout-form').style.display = 'none';
document.getElementById('username').value = '';
document.getElementById('password').value = '';
}
