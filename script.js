const gameContainer = document.getElementById("game");
let firstCard, secondCard;
let locked = false;
const COLORS = [
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
    const frontFace = document.createElement("img");
    const backFace = document.createElement("img");

    frontFace.style.backgroundSize = "cover";
    newDiv.classList.add("card", color);
    console.log(newDiv);
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (locked) {
    return;
  }
  const clickedCard = event.target;
  clickedCard.style.backgroundColor = event.target.className

  if (!firstCard) {
    firstCard = clickedCard;
    firstCard.style.backgroundColor = firstCard.classList[1];
    return;
  }

  if (!secondCard) {
    secondCard = clickedCard;
    secondCard.style.backgroundColor = secondCard.classList[1];
    locked = true;
    checkMatch();
  }

  // setTimeout(() => {
  //   clicked.style.backgroundColor = 'white'
  // }, 2000)
  // console.log("you clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);


// Check if the two clicked cards match

function checkMatch() {
  if (firstCard.classList[1] === secondCard.classList[1]) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.style.backgroundColor = "gray";
      secondCard.style.backgroundColor = "gray";
      resetCards();
    }, 1000);
  }
}


function resetCards() {
  firstCard = null;
  secondCard = null;
  locked = false;
}