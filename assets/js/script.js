var url_path = "https://maps.googleapis.com/maps/api/geocode/json"
var url_params = "?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
var api_key = "&key=AIzaSyCAhY-AP5wzYt1ngWZ86qHYzoUsYKnoQmE";

var requestUrl = url_path.concat(url_params, api_key);

var lat, lng;

function callApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        // console.log(response);
        // if (response.status === 200) {
        //   responseText.textContent = response.status;
        // }
        return response.json();
    })
    .then(function (data) {
        console.log(data.results[0].geometry.location);
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
        console.log("Coordinates: (" + lat + ", " + lng + ")")
    });
  }
  
callApi(requestUrl);