const getProduct = document.querySelector('#productName');
        let currentPage = 1;
        const itemsPerPage = 5; // Number of products per page
        const displayProduct = (data) => {
            const html = `
               <div class="product">
               <img src="${data.image}" class="prodImage" alt="${data.title}"/>
                <h2>${data.title}</h2>
                <p class="description">${data.description}</p>
                <p>Php ${data.price}</p>
                <button onclick="addToCart('${data.id}', ${data.price})">Add to Cart</button>
                </div>
            `;
            getProduct.insertAdjacentHTML("beforeend", html);
            console.log(`${data.title}`);
        };

        const getProductApi = async function(page) {
            let apiUrl = `https://fakestoreapi.com/products`;
            let limit5 = `${apiUrl}?limit=5`
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
                <button onclick="addToCart('1', 109.95)" class="addToCart">Add to Cart</button>
                </div>
                <img src="${data.image}" class="imgClass"/>
                </div>
                </div>`
            }
        })
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
        <button onclick="addToCart('1', 109.95)" class="addToCart">Add to Cart</button>
        </div>`
    }
})
}


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
        <button onclick="addToCart('1', 109.95)" class="addToCart">Add to Cart</button>
        </div>`
    }
})
}

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


/*const getProduct = document.querySelector('#productName');
const displayProduct = (data) => {
    const html = `
       <div class="product">
       <img src="${data.image}" class="prodImage" alt="${data.title}"/>
        <h2>${data.title}</h2>
        <p class="dispcription">${data.description}</p>
        <p>Php ${data.price}</p>
        <button onclick="addToCart('${data.title}', ${data.price})">Add to Cart</button>
        </div>
    `;
    getProduct.insertAdjacentHTML("beforeend", html);
    let r = `${data.title}`;
    console.log(r)
} 

const getProductApi = async function() {
    let apiUrl = 'https://fakestoreapi.com/products';
    try {
        const prodApi = await fetch(apiUrl);
        if (prodApi.status === 404) {
            throw new Error('Error 404: Resource not found');
        }
        if(!prodApi.ok){
            throw new Error(`Error: ${prodApi.status}`)
        }
        console.log(prodApi)
        const data = await prodApi.json();
        console.log(data);
        data.map((data) => {
            displayProduct(data);
        });
    }
    catch(error){
        alert(error.message)
    }
}
getProductApi()
*/