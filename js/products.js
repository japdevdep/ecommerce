const ORDER_ASC_BY_COST = "$->$$";
const ORDER_DESC_BY_REL = "RR->R";
var productsArray = [];

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_REL){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +` - ` + product.currency + ` ` + product.cost + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;

            //Ordeno por defecto por nombre ascendente
            productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);

            //Muestro los productos ordenados
            showProductsList(productsArray);
        }
    });

    document.getElementById("sortCostAsc").addEventListener("click", function(){
        //Ordeno por nombre ascendente
        productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);

        //Muestro las categorías ordenadas
        showProductsList(productsArray);
    });

    document.getElementById("sortCountSoldDesc").addEventListener("click", function(){
        //Ordeno por nombre ascendente
        productsArray = sortProducts(ORDER_DESC_BY_REL, productsArray);

        //Muestro las categorías ordenadas
        showProductsList(productsArray);
    });
});