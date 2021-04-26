//Array for the icons
const icons = [
  {
    name: "cat",
    id: 1,
  },
  {
    name: "dog",
    id: 2,
  },
  {
    name: "dove",
    id: 3,
  },
  {
    name: "dragon",
    id: 4,
  },
  {
    name: "fish",
    id: 5,
  },
  {
    name: "frog",
    id: 6,
  },
  {
    name: "spider",
    id: 7,
  },
  {
    name: "horse",
    id: 8,
  },
  {
    name: "cat",
    id: 9,
  },
  {
    name: "dog",
    id: 10,
  },
  {
    name: "dove",
    id: 11,
  },
  {
    name: "dragon",
    id: 12,
  },
  {
    name: "fish",
    id: 13,
  },
  {
    name: "frog",
    id: 14,
  },
  {
    name: "spider",
    id: 15,
  },
  {
    name: "horse",
    id: 16,
  },
];
// when the icons are loaded

//shuffle cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// global variables
let moves = 0;
let cardOpened = [];
let matchedcards = [];
let win = 0;
let winningMoves = 0;
const restart = document.querySelector(".restart");
const counter = document.querySelector(".moves");
const deck = document.querySelector(".deck");
const timer = document.querySelector(".timer");
let matchedCard = document.getElementsByClassName("match");
const medal = document.querySelector("#popup1");
let second = 0,
  minute = 0,
  hour = 0;
let interval;
function startTimer() {
  interval = setInterval(() => {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
function winTime() {
  const seconds = second;
  const minutes = minute;
  const hours = hour;
  console.log(`seconds : ${seconds}, minutes: ${minutes} , hours: ${hours}`);
  document.querySelector(
    "#totalTime"
  ).textContent = `${minutes} mins & ${seconds} secs`;
  stopTimer();
}
function stopTimer() {
  second = 0;
  minute = 0;
  hour = 0;
  clearInterval(interval);
}
//@description move vounter
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  winningMoves = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  console.log("inside moveCounter: ", winningMoves);
  // if (moves > 8 && moves < 12) {
  //   for (let i = 0; i < 3; i++) {
  //     if (i > 1) {
  //       stars[i].style.visibility = "collapse";
  //     }
  //   }
  // } else if (moves > 13) {
  //   for (let i = 0; i < 3; i++) {
  //     if (i > 0) {
  //       stars[i].style.visibility = "collapse";
  //     }
  //   }
  // }
}
//deck shuffle fnx // new game
function startGame() {
  openedCards = [];
  const shuffledIcons = shuffle(icons);
  for (let i = 0; i < shuffledIcons.length; i++) {
    const newli = document.createElement("li");
    newli.classList.add("cards");
    newli.setAttribute("id", `C${i + 1}`);
    newli.setAttribute("type", `${shuffledIcons[i].name}`);
    newli.setAttribute("data-id", `${shuffledIcons[i].id}`);
    newli.innerHTML = `<i class="fas fa-${shuffledIcons[i].name}"></i>`;
    deck.appendChild(newli);
  }
  let card = document.getElementsByClassName("cards");
  let cards = [...card];
  console.log("cards: ", card);
  for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
  }
}
//@description display the cards
const displayCard = function () {
  if (cardOpened.length < 2) {
    this.classList.add("open");
    this.classList.add("show");
    this.classList.add("disabled");
  }
};
function cardOpen() {
  if (cardOpened.length < 2) {
    cardOpened.push(this);
    let len = cardOpened.length;
    if (len === 2) {
      moveCounter();
      if (cardOpened[0].type == cardOpened[1].type) {
        matched();
      } else unmatched();
    }
  }
}
//@description on matched cards
function matched() {
  console.log("its a match");
  cardOpened[0].classList.remove("open", "show");
  cardOpened[1].classList.remove("open", "show");
  cardOpened[0].classList.add("match", "disabled");
  cardOpened[1].classList.add("match", "disabled");
  congratulations();
  cardOpened = [];
}
//#description on unmatched cards
function unmatched() {
  console.log("u loose");
  setTimeout(() => {
    cardOpened[0].classList.remove("open", "show", "disabled");
    cardOpened[1].classList.remove("open", "show", "disabled");
    cardOpened = [];
  }, 500);
}
// winner status
function congratulations() {
  if (matchedCard.length == icons.length) {
    winTime();
    console.log(
      "inside congratulations: u won. wiwinningMoves: ",
      winningMoves
    );
    document.querySelector("#finalMove").textContent = winningMoves;
    stopTimer();
    medal.classList.add("show");
  }
}
restart.addEventListener("click", () => {
  newGame();
  stopTimer();
});
function newGame() {
  stopTimer();
  timer.innerHTML = "0 mins 0 secs";
  deck.innerHTML = "";
  cardOpened = [];
  matchedcards = [];
  counter.innerHTML = 0;
  win = 0;
  moves = 0;
  medal.classList.remove("show");
  startGame();
}
window.onload = () => {
  newGame();
};
