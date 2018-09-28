$(document).ready(function () {
  const toiletsURL = 'http://odata.bordeaux.fr/v1/databordeaux/sigsanitaire/?format=json&callback=?';
  const kidareasURL = 'http://odata.bordeaux.fr/v1/databordeaux/airejeux/?format=json&callback=?';

  function getData(URL){
    deleteAllInnerElements('data-list');
    $.getJSON(URL, function(result) {
      console.log(result);

       let nbElements = result['d'].length;

       for (i = 0; i < nbElements; i++) {
         console.log(result['d'][i].nom);
         addListElement('data-list', result['d'][i].nom);
       }
    });
  }

  function addListElement(parentId, string){
    let parent = document.getElementById(parentId);
    let li = document.createElement('li');
    li.textContent = string;
    parent.appendChild(li);
  }

  function deleteAllInnerElements(parentId){
    let parent = document.getElementById(parentId);
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  $('#btn-toilets').click(function () {
    getData(toiletsURL);
  });

  $('#btn-kidareas').click(function () {
    getData(kidareasURL);
  });
});

/* Another way

function logResults(json){
  console.log(json);
}

$.ajax({
  url: "http://odata.bordeaux.fr/v1/databordeaux/sigsanitaire/?format=json&callback=?",
  dataType: "jsonp",
  jsonpCallback: "logResults"
});

*/
