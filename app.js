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
  // global variables
  let moves = 0;
  let cardOpened = [];
  let matchedcards = [];
  let win = 0;
  let winningMoves = 0;
  const restart = document.querySelector(".restart");
  const counter = document.querySelector(".moves");
  const container = document.querySelector("#container");
  const medal = document.querySelector(".medal");
  const winBoard = document.querySelector(".win-board");
  const winnerBtn = document.querySelector(".win-button");
  const winMoves = document.querySelector(".win-moves");
  const deck = document.querySelector(".deck");
  
  //deck shuffle fnx // new game
  function startGame() {
    for (let i = 0; i < icons.length; i++) {
      const newli = document.createElement("li");
      newli.classList.add("cards");
      newli.setAttribute("id", `C${i + 1}`);
      newli.setAttribute("data-id", `${icons[i].id}`);
      newli.innerHTML = `<i class="fas fa-${icons[i].name}"></i>`;
      newli.onclick = () => {
        newli.classList.add("faceup", "open");
        cardOpened.length > 0 && console.log(cardOpened[0].name, icons[i].name);
        function moveCounter() {
          moves++;
          counter.innerHTML = moves;
          winningMoves = moves;
          console.log("inside moveCounter: ", winningMoves);
        }
        function matched() {
          console.log("its a match");
          const elem = document.querySelector(`[data-id="${cardOpened[0].id}"]`);
          elem.classList.toggle("faceup");
          elem.classList.toggle("open");
          elem.classList.toggle("match");
          newli.classList.toggle("faceup");
          newli.classList.toggle("open");
          newli.classList.toggle("match");
          winning();
          cardOpened = [];
        }
        function unmatched() {
          console.log("u loose");
          setTimeout(() => {
            const elem = document.querySelector(
              `[data-id="${cardOpened[0].id}"]`
            );
            elem.classList.toggle("faceup");
            elem.classList.toggle("open");
            newli.classList.toggle("faceup");
            newli.classList.toggle("open");
            cardOpened = [];
          }, 500);
        }
        if (cardOpened.length === 0) {
          cardOpened.push(icons[i]);
        } else if (cardOpened.length > 0) {
          cardOpened.push(icons[i]);
          if (cardOpened[0].name == cardOpened[1].name) {
            matchedcards.push(cardOpened[0]);
            matchedcards.push(cardOpened[1]);
            moveCounter();
            matched();
          } else {
            moveCounter();
            unmatched();
          }
        }
      };
  
      deck.appendChild(newli);
    }
  }
  // winner status
  function winning() {
    win++;
    console.log("inside winning fnx, win is:", win);
    console.log(matchedcards);
    if (win == 1) {
      console.log(winningMoves);
      winSummary();
      console.log("inside if winning: won");
      medal.classList.remove("hide");
      winBoard.classList.remove("hide");
    }
  }
  function winSummary() {
    winMoves.textContent = winningMoves;
  }
  //medal
  //todo play anothe game
  winnerBtn.addEventListener("click", () => newGame());
  //restarting the game
  restart.addEventListener("click", () => newGame());
  function newGame() {
    deck.innerHTML = "";
    startGame();
    cardOpened = [];
    matchedcards = [];
    counter.innerHTML = 0;
    win = 0;
    moves = 0;
    medal.classList.add("hide");
    winBoard.classList.add("hide");
  }
  //remove class try
  window.onload = () => {
    startGame();
    newGame();
  };