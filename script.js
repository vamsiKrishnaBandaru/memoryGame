const gameContainer = document.getElementById("game");
const gameSection = document.querySelector(".wrapper");
const title = document.querySelector(".title");
const homebtn = document.querySelector('.homebtn');

const startButton = document.querySelector('.homePage')
const count = document.querySelector('.count');
const flipCount = document.querySelector('.flipCount');


const successMsg = document.querySelector('.successMsg');
const lostMsg = document.querySelector('.lostMsg');
const bestscore = document.querySelector('.bestScrore');
let firstCard, secondCard;
let pairSelected = false;
let flipCounter = 40;
let Wincount = 0;


flipCount.textContent = "Flips remaining : " + flipCounter;
count.textContent = "Score: " + Wincount


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
  homebtn.style.display = 'block';
  if (localStorage.getItem('bestscore')) {
    bestscore.textContent = `Best Score: ${localStorage.getItem('bestscore')}`;
  } else {
    bestscore.textContent = `Best Score: 0`;
  }
});


// filling the array with gif names

let array = Array(8).fill(0)
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

// result messages after finishing game

function resultMessage(msg) {
  gameSection.style.display = 'none';
  title.style.display = 'none';
  homebtn.style.display = 'none';
  msg.style.display = 'block';
}


// comparing both cards if success the card will be removed from the main array

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
      console.log(gifs)
      Wincount = 8 - (gifs.length / 2)

      correctPick(firstCard, secondCard)
      count.textContent = "Score: " + Wincount
      resetCards();

      if (Wincount === 8) {
        setTimeout(() => {
          resultMessage(successMsg)
        }, 1400)
        showBestScore(flipCounter)
      }
    }
  } else {
    wrongPick(firstCard, secondCard)
  }

  if (flipCounter === 0 && Wincount != 8) {
    setTimeout(() => {
      resultMessage(lostMsg)
    }, 1200)
  }
}

// when the pairs are matched adding Animation and remove using setTimeout

function correctPick(card1, card2) {

  card1.classList.add('correct-pick');
  card2.classList.add('correct-pick');
  setTimeout(() => {

    card1.classList.remove('correct-pick');
    card2.classList.remove('correct-pick');
  }, 1400);
  resetCards();
}


// when the pairs are mismatched adding Animation and remove using setTimeout

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
  }, 1400);
  resetCards();
}


// storing the best score using local Storage 

function showBestScore(score) {

  if (localStorage.getItem('bestscore')) {

    let presentScore = localStorage.getItem('bestscore');
    if (presentScore !== "undefined") {
      bestscore.textContent = `Best Score: ${40 - score}`
      bestscore.style.visibility = "visible";
    }

    if (presentScore === "undefined" || Number(presentScore) > (40 - score)) {
      localStorage.setItem('bestscore', 40 - score);
      bestscore.textContent = `Best Score: ${40 - score}`
    }

  } else {
    localStorage.setItem('bestscore', 40 - score);
  }
}

// resetCards when user selects two cards

function resetCards() {
  firstCard = null;
  secondCard = null;
  pairSelected = false;
}