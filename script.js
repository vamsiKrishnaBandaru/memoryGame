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
  if (locked) {
    return;
  }
  const clickedCard = event.target;
  clickedCard.style.backgroundColor = event.target.className
  clickedCard.classList.remove('backgroundImg')
  console.log(clickedCard)

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
}

// when the DOM loads
createDivsForColors(shuffledColors);


// Check if the two clicked cards match

function checkMatch() {
  if (firstCard.classList[1] === secondCard.classList[1]) {
    correctPick(firstCard, secondCard)
    resetCards();
  } else {
    wrongPick(firstCard, secondCard)
  }
}


function correctPick(card1, card2) {
  card1.classList.add('correct-pick');
  card2.classList.add('correct-pick');
  setTimeout(() => {
    card1.classList.remove('correct-pick');
    card2.classList.remove('correct-pick');
    resetCards();
  }, 1000);
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
  locked = false;
}