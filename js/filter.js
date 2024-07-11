const mensButton = document.querySelector('#mensItem');
mensButton.addEventListener('click', function(event){
    getCategory();
})
const womensButton = document.querySelector('#womensItem');
womensButton.addEventListener('click', function(event){
    getCategory();
})



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
}


