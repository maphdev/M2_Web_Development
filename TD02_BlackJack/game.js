var dictionary = {1: {path: "Cards/cardClubsA.png", value: 1},
                  2: {path: "Cards/cardClubs2.png", value: 2},
                  3: {path: "Cards/cardClubs3.png", value: 3},
                  4: {path: "Cards/cardClubs4.png", value: 4},
                  5: {path: "Cards/cardClubs5.png", value: 5},
                  6: {path: "Cards/cardClubs6.png", value: 6},
                  7: {path: "Cards/cardClubs7.png", value: 7},
                  8: {path: "Cards/cardClubs8.png", value: 8},
                  9: {path: "Cards/cardClubs9.png", value: 9},
                  10: {path: "Cards/cardClubs10.png", value: 10},
                  11: {path: "Cards/cardClubsJ.png", value: 10},
                  12: {path: "Cards/cardClubsQ.png", value: 10},
                  13: {path: "Cards/cardClubsK.png", value: 10},
                  14: {path: "Cards/cardDiamondsA.png", value: 1},
                  15: {path: "Cards/cardDiamonds2.png", value: 2},
                  16: {path: "Cards/cardDiamonds3.png", value: 3},
                  17: {path: "Cards/cardDiamonds4.png", value: 4},
                  18: {path: "Cards/cardDiamonds5.png", value: 5},
                  19: {path: "Cards/cardDiamonds6.png", value: 6},
                  20: {path: "Cards/cardDiamonds7.png", value: 7},
                  21: {path: "Cards/cardDiamonds8.png", value: 8},
                  22: {path: "Cards/cardDiamonds9.png", value: 9},
                  23: {path: "Cards/cardDiamonds10.png", value: 10},
                  24: {path: "Cards/cardDiamondsJ.png", value: 10},
                  25: {path: "Cards/cardDiamondsQ.png", value: 10},
                  26: {path: "Cards/cardDiamondsK.png", value: 10},
                  27: {path: "Cards/cardHeartsA.png", value: 1},
                  28: {path: "Cards/cardHearts2.png", value: 2},
                  29: {path: "Cards/cardHearts3.png", value: 3},
                  30: {path: "Cards/cardHearts4.png", value: 4},
                  31: {path: "Cards/cardHearts5.png", value: 5},
                  32: {path: "Cards/cardHearts6.png", value: 6},
                  33: {path: "Cards/cardHearts7.png", value: 7},
                  34: {path: "Cards/cardHearts8.png", value: 8},
                  35: {path: "Cards/cardHearts9.png", value: 9},
                  36: {path: "Cards/cardHearts10.png", value: 10},
                  37: {path: "Cards/cardHeartsJ.png", value: 10},
                  38: {path: "Cards/cardHeartsQ.png", value: 10},
                  39: {path: "Cards/cardHeartsK.png", value: 10},
                  40: {path: "Cards/cardSpadesA.png", value: 1},
                  41: {path: "Cards/cardSpades2.png", value: 2},
                  42: {path: "Cards/cardSpades3.png", value: 3},
                  43: {path: "Cards/cardSpades4.png", value: 4},
                  44: {path: "Cards/cardSpades5.png", value: 5},
                  45: {path: "Cards/cardSpades6.png", value: 6},
                  46: {path: "Cards/cardSpades7.png", value: 7},
                  47: {path: "Cards/cardSpades8.png", value: 8},
                  48: {path: "Cards/cardSpades9.png", value: 9},
                  49: {path: "Cards/cardSpades10.png", value: 10},
                  50: {path: "Cards/cardSpadesJ.png", value: 10},
                  51: {path: "Cards/cardSpadesQ.png", value: 10},
                  52: {path: "Cards/cardSpadesK.png", value: 10}
                };

// add an image of path cardImagePath within the tag identified by parentId
function addCard(parentId, cardImagePath) {
  let parent = document.getElementById(parentId);
  let card = document.createElement('img');
  card.src = cardImagePath;
  card.alt = "card";
  parent.appendChild(card);
}

// add a random card
function addNewCard() {
  // select a random card
  let randomCard = Math.floor((Math.random() * 52) + 1);
  // add a card in "Your Cards"
  addCard('user-cards', dictionary[randomCard.toString()]["path"]);
  // update level
  let level = Number(document.querySelector("#user-level").textContent) + dictionary[randomCard.toString()]["value"];
  document.querySelector("#user-level").textContent = level;
  // remove this card of the deck
  delete dictionary[randomCard.toString()];
  console.log(Object.keys(dictionary).length);
  // win or lose ?
  if (level > 21) {
    //window.location.reload();
  }
}

const btn = document.querySelector("#button-new-card");
btn.addEventListener('click', addNewCard);
