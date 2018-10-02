const btn = document.getElementById("btn");
btn.addEventListener("click", requestAlbums);

function requestAlbums() {
  var req = new XMLHttpRequest();

  req.open('GET', 'http://www.reveillere.fr/M2WEB/tds/td3/albums.json', true);
  req.onreadystatechange = function() {
      if (req.readyState === 4) {
        let response = JSON.parse(this.responseText);
        console.log(response);

        let nbElements = response['albums'].length;

        console.log(nbElements);
        for (i = 0; i < nbElements; i++) {
          addAlbum('data-list', response['albums'][i]);
        }
      }
  };
  req.setRequestHeader('Accept', 'application/json');
  req.send();
}

function addAlbum(parentId, album){
  let parent = document.getElementById(parentId);

  let card = document.createElement("div");
  card.classList.add("card", "col", "shadow", "p-3", "mb-5", "bg-white", "rounded");
  parent.appendChild(card);

  let name = document.createElement("p");
  name.textContent = "Album title : " + album.name;

  let year = document.createElement("p");
  year.textContent = "Year : " + album.year;

  let picture = document.createElement("img");
  picture.classList.add("center-block");
  picture.src = album.url;

  card.appendChild(name);
  card.appendChild(year);
  card.appendChild(picture);
}

/* readystate
** 0 : UNSENT
** 1 : OPENED
** 2 : HEADERS_RECEIVED
** 3 : LOADING
** 4 : DONE
*/
