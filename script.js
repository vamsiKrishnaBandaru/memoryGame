const gameContainer = document.getElementById("game");
const gameSection = document.querySelector(".wrapper");
const title = document.querySelector(".title");
const startButton = document.querySelector('.homePage')

const count = document.querySelector('.count');
const flipCount = document.querySelector('.flipCount');

const successMsg = document.querySelector('.successMsg');
const lostMsg = document.querySelector('.lostMsg');

let firstCard, secondCard;
let pairSelected = false;
let flipCounter = 22;
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


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

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

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add("card", color);
    newDiv.classList.add("backgroundImg")
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

  const clickedCard = event.target;
  clickedCard.style.backgroundColor = event.target.className
  clickedCard.classList.remove('backgroundImg')

  if (!firstCard) {
    firstCard = clickedCard;
    if (COLORS.includes(firstCard.classList[1])) {

      flipCounter -= 1
      flipCount.textContent = "Flips remaining : " + flipCounter
      firstCard.style.backgroundColor = firstCard.classList[1];
      return;
    } else {
      firstCard = null
      return
    }
  } else if (firstCard != clickedCard) {

    secondCard = clickedCard;
    if (COLORS.includes(secondCard.classList[1])) {

      flipCounter -= 1
      flipCount.textContent = "Flips remaining : " + flipCounter
      secondCard.style.backgroundColor = secondCard.classList[1];
      pairSelected = true;
      compareBothCards();
    } else {
      secondCard = null
      return
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


// Check if the two clicked cards match

function compareBothCards() {

  if (firstCard.classList[1] === secondCard.classList[1]) {

    if (COLORS.includes(firstCard.classList[1])) {

      let array = COLORS.filter((element) => {

        if (element === firstCard.classList[1]) {
          return false
        }
        return true
      })
      COLORS = array
      Wincount = 5 - (COLORS.length / 2)

      correctPick(firstCard, secondCard)
      count.textContent = "Score: " + Wincount
      resetCards();
      if (Wincount === 5) {
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

  if (flipCounter === 0 && Wincount != 5) {
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

    card1.classList.add('backgroundImg', 'wrong-pick');
    card2.classList.add('backgroundImg', 'wrong-pick');

    card1.classList.remove('wrong-pick');
    card2.classList.remove('wrong-pick');
    resetCards();
  }, 1000);
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  pairSelected = false;
}