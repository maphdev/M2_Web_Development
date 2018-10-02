const requestsURL = {
  "Quartiers": "http://odata.bordeaux.fr/v1/databordeaux/sigquartiers/?format=json&callback=?",
  "Aires de jeux pour enfants": "http://odata.bordeaux.fr/v1/databordeaux/airejeux/?format=json&callback=?",
  "Toilettes publiques": "http://odata.bordeaux.fr/v1/databordeaux/sigsanitaire/?format=json&callback=?",
  "Parkings publics": "http://odata.bordeaux.fr/v1/databordeaux/sigparkpub/?format=json&callback=?"
};

const neighborhoods = {
  1: "Bordeaux Maritime",
  2: "Chartrons - Grand Parc - Jardin Public",
  3: "Centre ville",
  4: "Saint Augustin - Tauzin - Alphonse Dupeux",
  5: "Nansouty - Saint Genès",
  6: "Bordeaux Sud",
  7: "Bastide",
  8: "Caudéran"
};

// map
var mymap;
var marker;
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// entry point
initialize();

function initialize() {
  initializeCategories();

  intializeMap();

  fetchAndDisplayData();
}

// intialize category sections
function initializeCategories() {
  const nbNeighborhoods = Object.keys(neighborhoods).length;
  for (let i = 1; i < 4; i++) {
    addCategory("content-categories-r1", i);
  }
  for (let i = 4; i < 7; i++) {
    addCategory("content-categories-r2", i);
  }
  for (let i = 7; i < nbNeighborhoods+1; i++) {
    addCategory("content-categories-r3", i);
  }
}

function addCategory(parentId, neighborhoodsId){
  // the parent div, where everything will be
  let parent = document.getElementById(parentId);
  // post
  let div = document.createElement("div");
  div.classList.add("post", "col", "card");
  div.id = neighborhoodsId;
  parent.appendChild(div);
  // title in post
  let title = document.createElement("h3");
  title.classList.add("post-title");
  title.textContent = neighborhoods[neighborhoodsId];
  div.appendChild(title);
  // content in post
  let p = document.createElement("p");
  p.classList.add("post-paragraph");
  div.appendChild(p);
}

// initialize the map
function intializeMap() {
  mymap = L.map('mapid').setView([44.84, -0.5789], 13);
  L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
  	maxZoom: 20,
  	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mymap);
}

// fetch data and display it in categories
function fetchAndDisplayData() {
  // get the URL for the request
  const URL = requestsURL[document.querySelector("#title-page").textContent];
  // request data from opendata
  $.getJSON(URL, function(result) {
    let nbElements = result['d'].length;
    for (i = 0; i < nbElements; i++) {
      addElement(result['d'][i]);
    }
  });
}

function addElement(element) {
  // get the neighborhood where to display the element
  let neighborhoodId = element.num_quartier;
  if (neighborhoodId === undefined) {
    return;
  }
  // get the correct div
  let parent = document.getElementById(neighborhoodId);
  // create and add the element
  let p = document.createElement("p");
  p.textContent = element.nom;
  p.setAttribute("x_long", element.x_long);
  p.setAttribute("y_lat", element.y_lat);
  parent.appendChild(p);
  // set EventListener for when we click on a location
  p.addEventListener('click', changeLocationAndMarker);
  // Add the corresponding marker on the map
  L.marker([element.y_lat, element.x_long], {"nom": element.nom, "x_long": element.x_long, "y_lat": element.y_lat}).addTo(mymap).on('click', onClickMarker);
}

function onClickMarker(e) {
  mymap.setView([this.options.y_lat, this.options.x_long], 15);
  if (marker === undefined) {
    marker = L.marker([this.options.y_lat, this.options.x_long], {icon: greenIcon}).addTo(mymap);
  }
  marker.setLatLng([this.options.y_lat, this.options.x_long]);
  this.bindPopup(this.options.nom).openPopup();
}

function changeLocationAndMarker(event){
  let element = event.target;
  // change the location
  mymap.setView([element.getAttribute("y_lat"), element.getAttribute("x_long")], 15);
  // display a special green marker
  if (marker === undefined) {
    marker = L.marker([element.getAttribute("y_lat"), element.getAttribute("x_long")], {icon: greenIcon}).addTo(mymap);
  }
  marker.setLatLng([element.getAttribute("y_lat"), element.getAttribute("x_long")]);
  marker.bindPopup(element.textContent).openPopup();
  // so the user can see the map immediatly after clicking a location
  window.location.hash = 'title-page';
}
