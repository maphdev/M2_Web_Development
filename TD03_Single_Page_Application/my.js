$(document).ready(function () {
  const toiletsURL = 'http://odata.bordeaux.fr/v1/databordeaux/sigsanitaire/?format=json&callback=?';
  const kidareasURL = 'http://odata.bordeaux.fr/v1/databordeaux/airejeux/?format=json&callback=?';

  function getData(URL){
    $.getJSON(URL, function(result){
       console.log(result);
    });
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
