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

var mymap;
var marker;

initialize();

function initialize() {
  initializeCategories();

  intializeMap();

  fetchAndDisplayData();
}

// intialize category sections
function initializeCategories() {
  const nbNeighborhoods = Object.keys(neighborhoods).length;
  for (let i = 1; i < nbNeighborhoods+1; i++) {
    addCategory("content-categories", i);
  }
}

function addCategory(parentId, neighborhoodsId){
  // the parent div, where everything will be
  let parent = document.getElementById(parentId);
  // post
  let div = document.createElement("div");
  div.classList.add("post", "col", neighborhoodsId.toString());
  parent.appendChild(div);
  // title in post
  let title = document.createElement("h3");
  title.classList.add("post-title");
  title.textContent = neighborhoods[neighborhoodsId];
  div.appendChild(title);
  // content in post
  let p = document.createElement("p");
  p.classList.add("post-paragraph");
  p.textContent = "no text content yet";
  div.appendChild(p);
}

// initialize the map
function intializeMap() {
  mymap = L.map('mapid').setView([44.84, -0.5789], 13);
  marker = L.marker([44.84, -0.5789]).addTo(mymap);
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
    console.log(result);
     /*let nbElements = result['d'].length;

     for (i = 0; i < nbElements; i++) {
       addListElement('data-list', result['d'][i].nom);
     }*/
  });
}
