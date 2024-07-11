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
                    <p>${product.title}</p>
                    <p class="description">${product.rating.rate}</p>
                    <p>Php ${product.price}</p>
                    <button onclick="addToCart('${product.id}', ${product.price})">Add to Cart</button>
                </div>
            `;
            resultsDiv.innerHTML += searchData;
        });
    } else {
        resultsDiv.innerHTML = 'No results found';
    }
}




/*
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

async function fetchSearchResults(query) {
    let searhApiUrl = 'https://fakestoreapi.com/products';
    try {
        const response = await fetch(`${searhApiUrl}?q=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const dataSearch = await response.json();
        console.log(dataSearch);  
        displayResults(dataSearch);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayResults(dataSearch) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (dataSearch.results && dataSearch.results.length > 0) {
        dataSearch.results.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = item.title;
            resultsDiv.appendChild(itemDiv);
        });
    } else {
        resultsDiv.textContent = 'No results found';
    }
}
    */