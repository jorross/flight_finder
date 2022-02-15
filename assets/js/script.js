var geo_url_path = "https://maps.googleapis.com/maps/api/geocode/json"
var geo_url_params1 = "?address=";
var geo_url_params2 = "?address=";
var api_key = "&key=AIzaSyCAhY-AP5wzYt1ngWZ86qHYzoUsYKnoQmE";
var flight_Path = "https://api.aviationstack.com/v1/flights"
var flight_Param = "?"
var flightApi = "access_key=a867cfeb994a9fe529a2a3195bb03be8";
// https://api.aviationstack.com/v1/flights ? access_key = YOUR_ACCESS_KEY
var lat, lng;

let map;

if (location === "./results.html") {
  initMap();
};

var newURL = flightURL()

flightApiCall(newURL).then(function(result) {
  console.log(result);

  for (var i=0; i<result.data.length; i++) {
    $("tbody").append(
      '<tr>',
      '<th scope="row">'+i+'</th>',
      '<td>'+result.data[i].departure.airport+'</td',
      '<td>'+result.data[i].arrival.airport+'</td',
      '<td>'+result.data[i].airline.name+'</td',
      '</tr>',
    )
  }
});

function flightURL() {
  // var DateSplit = localStorage.getItem("Date").split(", ");
  // var Date1 = DateSplit[0];
  // var Date2 = DateSplit[1];
  // var originInput = localStorage.getItem("origin_String")
  // var DestinationInput = localStorage.getItem("Destination_String")

  // DAY OF PRESENTATION: CHANGE DATE!!!!!!!!!!!!!
  flight_Param += "dep_iata=ATL&arr_iata=SEA&flight_date=2022-02-14&flight_status=scheduled&"

  return flight_Path + flight_Param + flightApi;

};

function flightApiCall(requestUrl) {
  return fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      return data;
      // var payload = {
      //   "Lat": lat,
      //   "Lng": lng
      // }
      // return payload;
    });
}



function initMap() {
  const myLatLng = { lat: 34.0848304, lng: -84.3893775 };
  var stringSplit = localStorage.getItem('origin').split(", ");
  const origin = { lat: parseInt(stringSplit[0]), lng: parseInt(stringSplit[1]) };
  var stringSplit = localStorage.getItem('destination').split(", ");
  const destination = { lat: parseInt(stringSplit[0]), lng: parseInt(stringSplit[1]) };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 4,
    mapTypeId: "terrain",
  });

  // new google.maps.Marker({
  //   position: myLatLng,
  //   map,
  //   title: "Hello World!",
  // });

  const flightPlanCoordinates = [
    origin,
    destination,
  ];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);
}

function callGeoApi(requestUrl) {
  return fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      var payload = {
        "Lat": lat,
        "Lng": lng
      }
      return payload;
    });
};

$('.content').on('click', "#searchBtn", function (event) {
  event.preventDefault();
  // Parse origin location input from the html
  var origin_input = $('#from').val();
  var stringSplit2 = origin_input.split(" ");
  for (var i = 0; i < stringSplit2.length; i++) {
    if (i < stringSplit2.length - 1) {
      geo_url_params1 += stringSplit2[i] + "+";
    }
    else {
      geo_url_params1 += stringSplit2[i]
    }
  };
  // Parse destination location input from the html
  var dest_input = $('#destination').val();
  var stringSplit = dest_input.split(" ");
  for (var i = 0; i < stringSplit.length; i++) {
    if (i < stringSplit.length - 1) {
      geo_url_params2 += stringSplit[i] + "+";
    }
    else {
      geo_url_params2 += stringSplit[i]
    }
  };
  // storage the Date, origin and destination in localstorage
  // console.log($("#date-input"))
  // var Date_input = "" + $("#date-input").val() + ", " + $("#return-date-input").val();
  // localStorage.setItem("Date", Date_input);
  localStorage.setItem("origin_String", origin_input);
  localStorage.setItem("Destination_String", dest_input);

  // make call to geocode api for the origin coordinates
  callGeoApi(geo_url_path + geo_url_params1 + api_key).then(function (result1) {
    // make call to geocode api for the destination coordinates
    callGeoApi(geo_url_path + geo_url_params2 + api_key).then(function (result2) {
      // console.log(result1);
      localStorage.setItem('origin', "" + result1.Lat + ", " + result1.Lng);
      localStorage.setItem('destination', "" + result2.Lat + ", " + result2.Lng);
      location = './results.html';
    });

  });
}

)