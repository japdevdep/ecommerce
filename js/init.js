document.addEventListener("DOMContentLoaded", function(e){
    var dzoptions = {
        url:"/",
        autoQueue: false
      };

    var myDropzone = new Dropzone("div#file-upload", dzoptions);
});

var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => response.json())
    .then(function(response) {
        result.status = 'ok';
        result.details = response;
        return result;
    }).catch(function(error) {
        result.status = 'error';
        result.details = error;
        return result;
    });
  }