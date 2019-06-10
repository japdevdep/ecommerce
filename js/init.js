const CATEGORIES_URL = "https://api.myjson.com/bins/tpyd7";
const PUBLISH_PRODUCT_URL = "https://api.myjson.com/bins/18i9vb";
const CATEGORY_INFO_URL = "https://api.myjson.com/bins/19vnq3";
const PRODUCTS_URL = "https://api.myjson.com/bins/eijkr";
const PRODUCT_INFO_URL = "https://api.myjson.com/bins/mad49";
const CART_INFO_URL = "https://api.myjson.com/bins/ryu89";

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
  }

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}