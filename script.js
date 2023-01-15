const gameContainer = document.getElementById("game");
const gameSection = document.querySelector(".wrapper");
const title = document.querySelector(".title");
const startButton = document.querySelector('.homePage')
const levelSec = document.querySelector(".levelSec")
const count = document.querySelector('.count');
const flipCount = document.querySelector('.flipCount');
const loader = document.querySelector('.loader');
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');

const successMsg = document.querySelector('.successMsg');
const lostMsg = document.querySelector('.lostMsg');

let firstCard, secondCard;
let pairSelected = false;
let flipCounter = 40;
let Wincount;
let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];







startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  gameSection.style.display = 'block';
  title.style.display = 'block';
});


let array = Array(12).fill(0)
let gifs = array.map((element, index) => {
  return `${element + index + 1}.gif`;
})

gifs.push(...gifs);


function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledGifs = shuffle(gifs);

function createDivsForGifs(allGifs) {
  for (let gif of allGifs) {

    const newDiv = document.createElement("div");
    const frontFace = document.createElement("div");
    const backFace = document.createElement("div");

    newDiv.classList.add("card", gif);

    frontFace.classList.add("frontface");
    backFace.classList.add("backface");

    frontFace.style.background = `url(./images/frontface.png) no-repeat`
    frontFace.style.backgroundSize = 'cover'

    backFace.style.background = `url(./gifs/${gif}) no-repeat`
    backFace.style.backgroundSize = 'cover'

    newDiv.append(frontFace, backFace);
    console.log(newDiv)

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (pairSelected) {
    // resetCards()
    return;
  }

  const clickedCard = event.target.parentElement;
  if (event.target.className == "frontface") {
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = "block";
  }

  if (!firstCard) {
    firstCard = clickedCard;
    if (gifs.includes(firstCard.classList[1])) {

      flipCounter -= 1
      flipCount.textContent = "Flips remaining : " + flipCounter;
      return;
    } else {
      firstCard = null
      return
    }
  } else if (firstCard != clickedCard) {

    secondCard = clickedCard;
    if (gifs.includes(secondCard.classList[1])) {

      flipCounter -= 1
      flipCount.textContent = "Flips remaining : " + flipCounter
      pairSelected = true;
      compareBothCards();
    } else {
      secondCard = null
      return
    }
  }
}

// when the DOM loads
createDivsForGifs(shuffledGifs);

// Check if the two clicked cards match

function compareBothCards() {

  if (firstCard.classList[1] === secondCard.classList[1]) {

    if (gifs.includes(firstCard.classList[1])) {

      let array = gifs.filter((element) => {

        if (element === firstCard.classList[1]) {
          return false
        }
        return true
      })
      gifs = array
      Wincount = 12 - (gifs.length / 2)

      correctPick(firstCard, secondCard)
      count.textContent = "Score: " + Wincount
      resetCards();
      if (Wincount === 12) {
        setTimeout(() => {
          gameSection.style.display = 'none';
          title.style.display = 'none';
          successMsg.style.display = 'block';
        }, 1000)
      }
    }
  } else {
    wrongPick(firstCard, secondCard)
  }

  if (flipCounter === 0 && Wincount != 12) {
    setTimeout(() => {
      gameSection.style.display = 'none';
      title.style.display = 'none';
      lostMsg.style.display = 'block';
    }, 1000)
  }
}


function correctPick(card1, card2) {

  card1.classList.add('correct-pick');
  card2.classList.add('correct-pick');
  setTimeout(() => {

    card1.classList.remove('correct-pick');
    card2.classList.remove('correct-pick');
    resetCards();
  }, 500);
}

function wrongPick(card1, card2) {

  card1.classList.add('wrong-pick');
  card2.classList.add('wrong-pick');
  setTimeout(() => {

    card1.children[0].style.display = 'block';
    card1.children[1].style.display = 'none';

    card2.children[0].style.display = 'block';
    card2.children[1].style.display = 'none';

    card1.classList.remove('wrong-pick');
    card2.classList.remove('wrong-pick');
    resetCards();
  }, 1200);
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  pairSelected = false;
}