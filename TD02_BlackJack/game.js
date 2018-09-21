// deck of 52 cards
let cardsInDeck = 52;

let dic =        [{path: "img/cardClubsA.png", value: 1},
                  {path: "img/cardClubs2.png", value: 2},
                  {path: "img/cardClubs3.png", value: 3},
                  {path: "img/cardClubs4.png", value: 4},
                  {path: "img/cardClubs5.png", value: 5},
                  {path: "img/cardClubs6.png", value: 6},
                  {path: "img/cardClubs7.png", value: 7},
                  {path: "img/cardClubs8.png", value: 8},
                  {path: "img/cardClubs9.png", value: 9},
                  {path: "img/cardClubs10.png", value: 10},
                  {path: "img/cardClubsJ.png", value: 10},
                  {path: "img/cardClubsQ.png", value: 10},
                  {path: "img/cardClubsK.png", value: 10},
                  {path: "img/cardDiamondsA.png", value: 1},
                  {path: "img/cardDiamonds2.png", value: 2},
                  {path: "img/cardDiamonds3.png", value: 3},
                  {path: "img/cardDiamonds4.png", value: 4},
                  {path: "img/cardDiamonds5.png", value: 5},
                  {path: "img/cardDiamonds6.png", value: 6},
                  {path: "img/cardDiamonds7.png", value: 7},
                  {path: "img/cardDiamonds8.png", value: 8},
                  {path: "img/cardDiamonds9.png", value: 9},
                  {path: "img/cardDiamonds10.png", value: 10},
                  {path: "img/cardDiamondsJ.png", value: 10},
                  {path: "img/cardDiamondsQ.png", value: 10},
                  {path: "img/cardDiamondsK.png", value: 10},
                  {path: "img/cardHeartsA.png", value: 1},
                  {path: "img/cardHearts2.png", value: 2},
                  {path: "img/cardHearts3.png", value: 3},
                  {path: "img/cardHearts4.png", value: 4},
                  {path: "img/cardHearts5.png", value: 5},
                  {path: "img/cardHearts6.png", value: 6},
                  {path: "img/cardHearts7.png", value: 7},
                  {path: "img/cardHearts8.png", value: 8},
                  {path: "img/cardHearts9.png", value: 9},
                  {path: "img/cardHearts10.png", value: 10},
                  {path: "img/cardHeartsJ.png", value: 10},
                  {path: "img/cardHeartsQ.png", value: 10},
                  {path: "img/cardHeartsK.png", value: 10},
                  {path: "img/cardSpadesA.png", value: 1},
                  {path: "img/cardSpades2.png", value: 2},
                  {path: "img/cardSpades3.png", value: 3},
                  {path: "img/cardSpades4.png", value: 4},
                  {path: "img/cardSpades5.png", value: 5},
                  {path: "img/cardSpades6.png", value: 6},
                  {path: "img/cardSpades7.png", value: 7},
                  {path: "img/cardSpades8.png", value: 8},
                  {path: "img/cardSpades9.png", value: 9},
                  {path: "img/cardSpades10.png", value: 10},
                  {path: "img/cardSpadesJ.png", value: 10},
                  {path: "img/cardSpadesQ.png", value: 10},
                  {path: "img/cardSpadesK.png", value: 10}
                ];

// when the user clicks on the Play button
function startGame() {
  // check value of bet
  if (!checkBet()) {
    alert("Please enter a valid bet : value between 1 and the total amount of money.");
    return;
  }
  // display game (and disable play button)
  displayGame();
}

// check if the amount of the bet is valid
function checkBet() {
  let currentMoney = Number(document.querySelector("#user-money").textContent);
  let currentBet = Number(document.querySelector("#amountBet").value);
  let remainingMoney = Number(currentMoney - currentBet);
  if (currentBet <= 0 || currentBet > currentMoney) {
    return false;
  } else {
    return true;
  }
}

// display the game
function displayGame() {
  // display game section
  document.querySelector("#game").hidden = false;
  // disable bet
  document.querySelector("#amountBet").disabled = true;
  document.querySelector("#button-play").disabled = true;
}

const btnPlay = document.querySelector("#button-play");
btnPlay.addEventListener('click', startGame);

// when the user clicks on the New Card button
function newCard() {
  console.log("new card");
  if (cardsInDeck === 52){
    console.log("première");
    // update display
    updateGameSectionDisplay();
    // display first 2 cards
    let bankCard1ID = getRandomIdCard();
    let bankCard2ID = getRandomIdCard();
    let userCard1ID = getRandomIdCard();
    let userCard2ID = getRandomIdCard();
    addCard('bank-cards', dic[bankCard1ID.toString()]["path"]);
    addCard('bank-cards', dic[bankCard2ID.toString()]["path"]);
    addCard('user-cards', dic[userCard1ID.toString()]["path"]);
    addCard('user-cards', dic[userCard2ID.toString()]["path"]);
    // update level
    let bankLevel = Number(document.querySelector("#bank-level").textContent) + dic[bankCard1ID.toString()]["value"] + dic[bankCard2ID.toString()]["value"];
    document.querySelector("#bank-level").textContent = bankLevel;
    let userLevel = Number(document.querySelector("#user-level").textContent) + dic[userCard1ID.toString()]["value"] + dic[userCard2ID.toString()]["value"];
    document.querySelector("#user-level").textContent = userLevel;
    // remove these cards of the deck
    dic.splice(bankCard1ID.toString(), 1);
    dic.splice(bankCard2ID.toString(), 1);
    dic.splice(userCard1ID.toString(), 1);
    dic.splice(userCard1ID.toString(), 1);
    cardsInDeck -= 4;
    // check rules
    checkRules(bankLevel, userLevel);
  } else if (cardsInDeck === 51) {
    console.log("deuxième");
  } else if (cardsInDeck === 0) {
    console.log("Mate, the deck is empty now.");
  } else {
    console.log("next");
  }
  cardsInDeck -= 1;
}

// update display in game section
function updateGameSectionDisplay() {
  let noCardsText = document.querySelectorAll(".no-cards");
  for (let i = 0; i < noCardsText.length; i++) {
    noCardsText[i].style.display = "none";
  }
}

// add an image of path cardImagePath within the tag identified by parentId
function addCard(parentId, cardImagePath) {
  let parent = document.getElementById(parentId);
  let card = document.createElement('img');
  card.src = cardImagePath;
  card.alt = "card";
  parent.appendChild(card);
}

// get random card in deck
function getRandomIdCard() {
  return Math.floor((Math.random() * cardsInDeck));
}

// check if there is a winning/losing situation
function checkRules(bankLevel, userLevel) {
  console.log(bankLevel);
  console.log(userLevel);
}

const btnNewCard = document.querySelector("#button-new-card");
btnNewCard.addEventListener('click', newCard);
