const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var categoriesArray = [];

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.productCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + category.description + `</p>
                </div>
            </div>
        </a>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;

            //Ordeno por defecto por nombre ascendente
            categoriesArray = sortCategories(ORDER_ASC_BY_NAME, categoriesArray);

            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        //Ordeno por nombre ascendente
        categoriesArray = sortCategories(ORDER_ASC_BY_NAME, categoriesArray);

        //Muestro las categorías ordenadas
        showCategoriesList(categoriesArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        //Ordeno por nombre ascendente
        categoriesArray = sortCategories(ORDER_DESC_BY_NAME, categoriesArray);

        //Muestro las categorías ordenadas
        showCategoriesList(categoriesArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        //Ordeno por nombre ascendente
        categoriesArray = sortCategories(ORDER_BY_PROD_COUNT, categoriesArray);

        //Muestro las categorías ordenadas
        showCategoriesList(categoriesArray);
    });
});