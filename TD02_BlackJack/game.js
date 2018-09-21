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

// unknown card path and value
let secretBankCardPath;
let secretBankCardValue;

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
function drawCards() {
  // update display
  updateGameSectionDisplay();
  // display first 2 cards
  let bankCard1ID = getRandomIdCard();
  let bankCard2ID = getRandomIdCard();
  let userCard1ID = getRandomIdCard();
  let userCard2ID = getRandomIdCard();
  addSimpleCard('bank-cards', dic[bankCard1ID.toString()]["path"]);
  addSimpleCard('bank-cards', 'img/cardBack.png');
  secretBankCardPath = dic[bankCard2ID.toString()]["path"];
  addSimpleCard('user-cards', dic[userCard1ID.toString()]["path"]);
  addSimpleCard('user-cards', dic[userCard2ID.toString()]["path"]);
  // update level
  secretBankCardValue = Number(document.querySelector("#bank-level").textContent) + dic[bankCard1ID.toString()]["value"] + dic[bankCard2ID.toString()]["value"];
  document.querySelector("#bank-level").textContent = "?";
  let userLevel = Number(document.querySelector("#user-level").textContent) + dic[userCard1ID.toString()]["value"] + dic[userCard2ID.toString()]["value"];
  document.querySelector("#user-level").textContent = userLevel;
  // remove these cards of the deck
  dic.splice(bankCard1ID.toString(), 1);
  dic.splice(bankCard2ID.toString(), 1);
  dic.splice(userCard1ID.toString(), 1);
  dic.splice(userCard1ID.toString(), 1);
  cardsInDeck -= 4;
}

// update display in game section
function updateGameSectionDisplay() {
  let noCardsText = document.querySelectorAll(".no-cards");
  for (let i = 0; i < noCardsText.length; i++) {
    noCardsText[i].style.display = "none";
  }
  document.querySelector("#button-draw-cards").hidden = true;
  document.querySelector("#button-hit").hidden = false;
  document.querySelector("#button-stand").hidden = false;
  document.querySelector("#button-double").hidden = false;
}

// add an image of path cardImagePath within the tag identified by parentId
function addSimpleCard(parentId, cardImagePath) {
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

const btnDrawCards = document.querySelector("#button-draw-cards");
btnDrawCards.addEventListener('click', drawCards);

function hit() {
  console.log("hit");
  // display a card
  let userCardID = getRandomIdCard();
  addSimpleCard('user-cards', dic[userCardID.toString()]["path"]);
  // update level
  let userLevel = Number(document.querySelector("#user-level").textContent) + dic[userCardID.toString()]["value"];
  document.querySelector("#user-level").textContent = userLevel;
  // remove these cards of the deck
  dic.splice(userCardID.toString(), 1);
  cardsInDeck -= 1;

  if (userLevel === 21){
    playBank();
  } else if (userLevel > 21) {
    throwResult();
  }
}

const btnHit = document.querySelector("#button-hit");
btnHit.addEventListener('click', hit);

function stand() {
  console.log("stand");
  playBank();
}

const btnStand = document.querySelector("#button-stand");
btnStand.addEventListener('click', stand);

function double() {
  console.log("double");
  // we increase the value of the bet then hit
  let input = document.querySelector("#amountBet");
  let currentBet = Number(input.value);
  let newBet = currentBet * 2;

  let currentMoney = Number(document.querySelector("#user-money").textContent);
  if (newBet > currentMoney) {
    alert("You can't double, you don't have enough money!");
  } else {
    input.value = String(newBet);
    hit();
  }
}

const btnDouble = document.querySelector("#button-double");
btnDouble.addEventListener('click', double);

function playBank() {
  console.log("The bank will play now.");

  // show the faced-down card and the bank's real score
  let lastCard = document.querySelector("#bank-cards").lastElementChild;
  lastCard.src = secretBankCardPath;
  document.querySelector("#bank-level").textContent = secretBankCardValue;

  // add card until bankLevel >= 17
  while (secretBankCardValue < 17) {
    // display a card
    let bankCardID = getRandomIdCard();
    addSimpleCard('bank-cards', dic[bankCardID.toString()]["path"]);
    // update level
    secretBankCardValue += dic[bankCardID.toString()]["value"];
    document.querySelector("#bank-level").textContent = secretBankCardValue;
    // remove these cards of the deck
    dic.splice(bankCardID.toString(), 1);
    cardsInDeck -= 1;
  }

  throwResult();
}

function throwResult() {
  let bankLevel = Number(document.querySelector("#bank-level").textContent);
  let userLevel = Number(document.querySelector("#user-level").textContent);

  let message = document.querySelector("#result");
  message.hidden = false;

  if (userLevel > 21) {
    message.textContent = "You're over 21, you lost!";
    bankGetTheMoney();
  } else if (bankLevel > 21) {
    message.textContent = "The bank is over 21, you won!";
    userGetTheMoney();
  } else if (bankLevel === userLevel) {
    message.textContent = "It's a tie!";
    document.querySelector("#result").style.color = 'black';
  } else if (bankLevel > userLevel) {
    message.textContent = "The bank has a better score, you lost!";
    bankGetTheMoney();
  } else if (bankLevel < userLevel) {
    message.textContent = "You have the best score, you won!";
    userGetTheMoney();
  }

  // disable game buttons and enable new game button
  document.querySelector("#button-hit").hidden = true;
  document.querySelector("#button-stand").hidden = true;
  document.querySelector("#button-double").hidden = true;
  document.querySelector("#button-start-new-game").hidden = false;

  let userMoney = Number(document.querySelector("#user-money").textContent);
  let bankMoney = Number(document.querySelector("#bank-money").textContent);
  if (userMoney <= 0) {
    alert("You lost the game, you're broke now!");
    window.location.reload();
  } else if (bankMoney <= 0) {
    alert("You defeated the bank, you're rich now!");
    window.location.reload();
  }
}

function bankGetTheMoney() {
  let moneyBank = Number(document.querySelector("#bank-money").textContent);
  let userBank = Number(document.querySelector("#user-money").textContent);
  let currentBet = Number(document.querySelector("#amountBet").value);
  document.querySelector("#bank-money").textContent = moneyBank + currentBet;
  document.querySelector("#user-money").textContent = userBank - currentBet;
  document.querySelector("#result").style.color = 'red';
}

function userGetTheMoney() {
  let moneyBank = Number(document.querySelector("#bank-money").textContent);
  let userBank = Number(document.querySelector("#user-money").textContent);
  let currentBet = Number(document.querySelector("#amountBet").value);
  document.querySelector("#bank-money").textContent = moneyBank - 1.5 * currentBet;
  document.querySelector("#user-money").textContent = userBank + 1.5 * currentBet;
  document.querySelector("#result").style.color = 'green';
}

function startNewGame() {
  console.log("start new game");
  // result
  document.querySelector("#result").hidden = true;
  // start new game button
  document.querySelector("#button-start-new-game").hidden = true;
  // game buttons
  document.querySelector("#button-hit").hidden = true;
  document.querySelector("#button-stand").hidden = true;
  document.querySelector("#button-double").hidden = true;
  // draw cards button
  document.querySelector("#button-draw-cards").hidden = false;
  // display game section correctly
  document.querySelector("#game").hidden = true;
  let noCardsText = document.querySelectorAll(".no-cards");
  for (let i = 0; i < noCardsText.length; i++) {
    noCardsText[i].style.display = "inline";
  }
  // delete all cards
  var bankCards = document.querySelector("#bank-cards");
  while (bankCards.firstChild) {
      bankCards.removeChild(bankCards.firstChild);
  }
  var userCards = document.querySelector("#user-cards");
  while (userCards.firstChild) {
      userCards.removeChild(userCards.firstChild);
  }
  // delete previous score
  document.querySelector("#bank-level").textContent = 0;
  document.querySelector("#user-level").textContent = 0;
  // enable bet
  document.querySelector("#amountBet").disabled = false;
  document.querySelector("#amountBet").value = "Enter bet";
  document.querySelector("#button-play").disabled = false;
}

const btnStartNewGame = document.querySelector("#button-start-new-game");
btnStartNewGame.addEventListener('click', startNewGame);
