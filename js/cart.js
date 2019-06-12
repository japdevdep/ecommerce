let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let SUCCESS_MSG = "¡Ha comprado el producto con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    
    let subTotalCostHTML = document.getElementById("subtotalText");
    let shippingCostHTML = document.getElementById("shippingText");
    let totalCostHTML = document.getElementById("totalCostText");

    let shippingCost = Math.round(shippingPercentage * subtotal);

    subTotalCostHTML.innerHTML = productCurrency + " " + subtotal;
    shippingCostHTML.innerHTML = productCurrency + " " + shippingCost;
    totalCostHTML.innerHTML = productCurrency + " " + (subtotal + shippingCost);
}

function updateSubtotal(){
    let count = parseInt(document.getElementById("productCount").value);
    subtotal = count * productUnitCost;
    document.getElementById("productSubtotal").innerHTML = productCurrency + " " + subtotal;
    document.getElementById("cartBadge").innerHTML = count;
    updateTotalCosts();
}

function showPaymentTypeNotSelected(){
    document.getElementById("paymentTypeFeedback").style.display = "block";
}

function hidePaymentTypeNotSelected(){
    document.getElementById("paymentTypeFeedback").style.display = "none";
}

function showArticles(articles){
    let htmlContentToAppend = "";

    for(let i = 0; i < articles.length; i++){
        productUnitCost = articles[i].unitCost;
        productCurrency = articles[i].currency;

        htmlContentToAppend += `
        <tr>
            <td><img src='`+ articles[i].src + `' width="50px"></td>
            <td>`+ articles[i].name + `</td>
            <td>`+ articles[i].currency + " " + articles[i].unitCost +`</td>
            <td><input class="form-control" style="width:60px;" type="number" id="productCount" value="`+ articles[i].count + `" min="1"></td>
            <td><span id="productSubtotal" style="font-weight:bold;"></span></td>
        </tr>
        `

        document.getElementById("articlesWrapper").innerHTML = htmlContentToAppend;

        updateSubtotal();

        document.getElementById("productCount").addEventListener("change", function(){
            updateSubtotal();
        });
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("premiumradio").addEventListener("change", function(){
        shippingPercentage = 0.15;
        updateTotalCosts();
    });
    
    document.getElementById("expressradio").addEventListener("change", function(){
        shippingPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        shippingPercentage = 0.03;5
        updateTotalCosts();
    });

    document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
        document.getElementById("creditCardNumber").disabled = false;
        document.getElementById("creditCardSecurityCode").disabled = false;
        document.getElementById("dueDate").disabled = false;

        document.getElementById("bankAccountNumber").disabled = true;

        document.getElementById("paymentType").innerHTML = CREDIT_CARD_PAYMENT;

        paymentTypeSelected = true;
        hidePaymentTypeNotSelected();
    });

    document.getElementById("bankingRadio").addEventListener("change", function(){
        document.getElementById("bankAccountNumber").disabled = false;

        document.getElementById("creditCardNumber").disabled = true;
        document.getElementById("creditCardSecurityCode").disabled = true;
        document.getElementById("dueDate").disabled = true;

        document.getElementById("paymentType").innerHTML = BANKING_PAYMENT;

        paymentTypeSelected = true;
        hidePaymentTypeNotSelected();
    });
        
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === 'ok')
        {
            showArticles(resultObj.data.articles);
        }
    });

    //Se obtiene el formulario de publicación de producto
    var buyForm = document.getElementById("buyForm");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Vender'.
    buyForm.addEventListener("submit", function(e){

        let shippingStreetInput = document.getElementById("shippingStreet");
        let shippingStreetNumberInput = document.getElementById("shippingStreetNumber");
        let shippingCornerStreetInput = document.getElementById("shippingCornerStreet");
        let infoMissing = false;

        //Se realizan los controles necesarios,
        //En este caso  se controla que haya ingresado forma de pago, y los datos de envío,
        //el método de envío ya se encuentra de forma obligatoria,
        hidePaymentTypeNotSelected();

        //Quito las clases que marcan como inválidos
        shippingStreetInput.classList.remove('is-invalid');
        shippingStreetNumberInput.classList.remove('is-invalid');
        shippingCornerStreetInput.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado el nombre y categoría.

        //Consulto por el nombre de la calle
        if (shippingStreetInput.value === "")
        {
            shippingStreetInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por el número de puerta
        if (shippingStreetNumberInput.value === "")
        {
            shippingStreetNumberInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el nombre de la esquina
        if (shippingCornerStreetInput.value === "")
        {
            shippingCornerStreetInput.classList.add('is-invalid');
            infoMissing = true;
        }

        
        if (!paymentTypeSelected)
        {
            showPaymentTypeNotSelected();
            infoMissing = true;
        }    
        
        if (!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.

            getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                }

                bootbox.alert(msgToShow, null);
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;
    });
});