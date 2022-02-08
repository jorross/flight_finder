var geo_url_path = "https://maps.googleapis.com/maps/api/geocode/json"
var geo_url_params = "?address="
var geo_url_params2 = "?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
var api_key = "&key=AIzaSyCAhY-AP5wzYt1ngWZ86qHYzoUsYKnoQmE";

var geoRequestUrl = geo_url_path.concat(geo_url_params2, api_key);

var lat, lng;

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.0848304, lng: -84.3893775 },
    zoom: 8,
  });
}

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
      // console.log(data.results[0].geometry.location);
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      console.log("Coordinates: (" + lat + ", " + lng + ")/n")
    });
};

$('#form').on('click', "#searchBtn", function (event) {
  event.preventDefault();
  var origin_input = $('#from').val();
  var stringSplit2 = origin_input.split(" ");
  for (var i = 0; i < stringSplit2.length; i++) {
    if (i < stringSplit2.length - 1) {
      geo_url_params += stringSplit2[i] + "+";
    }
    else {
      geo_url_params += stringSplit2[i]
    }
  };
  callApi(geo_url_path+geo_url_params+api_key);

  var dest_input = $('#destination').val();
  var stringSplit = dest_input.split(" ");
  for (var i = 0; i < stringSplit.length; i++) {
    if (i < stringSplit.length - 1) {
      geo_url_params += stringSplit[i] + "+";
    }
    else {
      geo_url_params += stringSplit[i]
    }
  };
  console.log(geo_url_params);
  // console.log(geoRequestUrl);
  // console.log(geo_url_path+geo_url_params+api_key)
  callApi(geo_url_path+geo_url_params+api_key);
}
)
