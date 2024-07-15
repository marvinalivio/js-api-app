const getProduct = document.querySelector('#productName');
        let currentPage = 1;
        const itemsPerPage = 10; // Number of products per page
        const displayProduct = (data) => {
            // let prodName = data.title;
            // let annoyingThis = prodName.replace(/'/g, " ");
            // console.log(annoyingThis);
            const html = `
               <div class="product">
               <img src="${data.image}" class="prodImage" alt="${data.title}"/>
                <h2>${data.title}</h2>
                <p class="description">${data.description}</p>
                <p>Php ${data.price}</p>
                <button onclick="addToCart(${data.id}, ${data.price}, '${data.title.replace(/'/g, " ")}')" class="addToCart">Add to Cart</button>
                </div>
            `;  
            getProduct.insertAdjacentHTML("beforeend", html);
            console.log(`${data.title}`);
        };

        const getProductApi = async function(page) {
            let apiUrl = `https://fakestoreapi.com/products`;
            let limit5 = `${apiUrl}?limit=3`
            let limit3 = `${apiUrl}?limit=3`
            try {
                const prodApi = await fetch(apiUrl);
                const apilimit5 = await fetch(limit5);
                const searching = await fetch (apiUrl);
                const apilimit3 = await fetch (limit3);
                console.log(prodApi);
                console.log(apilimit5);
                if (prodApi.status === 404 && apilimit5 === 404) {
                    throw new Error('Error 404: Resource not found');
                }
                if (!prodApi.ok && !apilimit5.ok) {
                    throw new Error(`Error: ${prodApi.status}`);
                }
                const data = await prodApi.json();
                const limitedProducts  = await apilimit5.json()
                const limitedBestSeller  = await apilimit3.json()
                const dataSearch = await searching.json();
                console.log(data)
                console.log(limitedProducts )
                displayProductsForPage(data, page);
                displayHero(limitedProducts);
                bestSeller(limitedBestSeller);
                woman(data);
                console.log(dataSearch )

            } catch (error) {
                alert(error.message);
            }
        };

// HERO 

        const displayHero = (limitedProducts) => {
            limitedProducts.map((data) =>{
                if(data.price < 100) {
                const hero = document.querySelector('#hero');
                hero.innerHTML += `
                <div class="slide">
                <div class="flexthis">
                <div>
                <h1>${data.title}</h1>
                <p>${data.description}</p>
                <button onclick="addToCart(${data.id}, ${data.price}, '${data.title.replace(/'/g, " ")}')" class="addToCart">Add to Cart</button>
                </div>
                <img src="${data.image}" class="imgClass"/>
                </div>
                </div>`
            }
        });
            // // slide show 

let slideItem = 0;

function showslides() {
    let slides = document.getElementsByClassName('slide');
    console.log(slides);
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';  // Fixed accessing the style property for each slide
    }
    
    slideItem++;
    if (slideItem > slides.length) {
        slideItem = 1;
    }
    
    slides[slideItem - 1].style.display = 'block';  // Corrected the indexing
    
    setTimeout(showslides, 8000);
}

showslides();
        };


// BestSeller 

const bestSeller = (limitedBestSeller) => {
    limitedBestSeller.map((data) =>{
        if(data.price = 50) {
        const mainItem = document.querySelector('#featuredItem');
        mainItem.innerHTML += `
        <div class="itemDiv">
        <img src="${data.image}" class="imgClass"/>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <p class="price">Php ${data.price}</p>
        <button onclick="addToCart(${data.id}, ${data.price}, '${data.title.replace(/'/g, " ")}')" class="addToCart">Add to Cart</button>
        </div>`
    }
})
};


// Female Item

const woman = (data) => {
    data.map((data) =>{
        if(data.category === `women's clothing`) {
        const girlItem = document.querySelector('#femaleProduct');
        girlItem.innerHTML += `
        <div class="itemDiv">
        <img src="${data.image}" class="imgClass"/>
        <h3>${data.title}</h3>
        <p>Rating: ${data.rating.rate}</p>
        <p class="price">Php ${data.price}</p>
        <button onclick="addToCart(${data.id}, ${data.price}, '${data.title.replace(/'/g, " ")}')" class="addToCart">Add to Cart</button>
        </div>`
    }
})
};

// search script 




// all product with pagination 


        const displayProductsForPage = (products, page) => {
            const start = (page - 1) * itemsPerPage;
           
            const end = start + itemsPerPage;
            console.log(end)
            const paginatedProducts = products.slice(start, end);
            getProduct.innerHTML = ''; // Clear previous products
            paginatedProducts.map((data) => {
                displayProduct(data);
            });
        };
        const nxt = document.querySelector('#nextPage');
        nxt.addEventListener('click', function(){
            currentPage++;
            getProductApi(currentPage);
        })

        const prev = document.querySelector('#prevPage');
        prev.addEventListener('click', function(){
            if (currentPage > 1) {
                currentPage--;
                getProductApi(currentPage);
            }
        })
        getProductApi(currentPage);



document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchSearchResults(query);
    } else {
        alert('Please enter a search term');
    }
}

const fetchSearchResults = async function(query) {
    let searchApiUrl = 'https://fakestoreapi.com/products';
    try {
        const searchDataResponse = await fetch(`${searchApiUrl}`);
        if (!searchDataResponse.ok) {
            throw new Error('Network response was not ok ' + searchDataResponse.statusText);
        }
        const dataSearch = await searchDataResponse.json();
        const filteredData = dataSearch.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
        displaySearch(filteredData);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

const displaySearch = (dataSearch) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (dataSearch.length > 0) {
        dataSearch.forEach(product => {
            const searchData = `
                <div class="product">
                    <img src="${product.image}"/>
                    <div>
                    <p>${product.title}</p>
                    <p>Php ${product.price}</p>
                    <button onclick="addToCart('${product.id}', ${product.price})" class="addToCart">Add to Cart</button>
                    </div>
                </div>
            `;
            resultsDiv.innerHTML += searchData;
        });
    } else {
        resultsDiv.innerHTML = 'No results found';
    }
};

const category = document.getElementById('categoryPage');
console.log(category)

const categoryDisplay = (categoryParams) => {
    const categHtml = `
        <div>${categoryParams.category}</div>
    `;
    category.insertAdjacentHTML('beforeend', categHtml);
}

const getCategory = async function(){
    const categApi = `https://fakestoreapi.com/products`;
    try {
        const categJson = await fetch(categApi);
        const categoryParams = await categJson.json();
        console.log(categoryParams);
        const mensItem = categoryParams.filter(str => str.category === `men's clothing`)
        console.log(mensItem)
        if (mensItem){
            mensItem.map(e =>{
            categoryDisplay(e)
        })
    }
        const womensItem = categoryParams.filter(str => str.category === `women's clothing`)
        console.log(womensItem)
        if (womensItem){
            womensItem.map(e =>{
            categoryDisplay(e)
        })
    
        
    } 
}
    catch(error) {
        alert(error.message);
    }
};


let cart = [];

function addToCart(productName, productPrice, titleData) {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productName);
    if (existingProductIndex > -1) {
        // If product exists, update the quantity and total price
        cart[existingProductIndex].quantity += 1;
        cart[existingProductIndex].totalPrice += productPrice;
        
    } else {
        // If product doesn't exist, add a new item to the cart
        cart.push({
            title: titleData,
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
        const iconCart = document.querySelector('#iconCart');
        let cartIcon = [];
       

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            const thisCart = [];
            cartItem.textContent = `${item.title} - Php${item.price} x ${item.quantity} = ${item.totalPrice.toFixed(2)}`;
            thisCart.textContent = `${item.quantity}`;
            let totalCart = thisCart;
            cartList.appendChild(cartItem);
            cartIcon = totalCart;
        });
        const iconsnum = cartIcon.textContent
        iconCart.innerHTML = `<img src='images/shopping_cart.svg'/> <p>${iconsnum}</p> <a href='#shoppingCart' class='shopLink'>Shopping Cart</a>`;
        console.log(cartIcon.textContent)
        

        cartContainer.appendChild(cartList);
    }
};


const iconCartAppend = document.querySelector('#iconCartAppend');
iconCartAppend.appendChild(iconCart);