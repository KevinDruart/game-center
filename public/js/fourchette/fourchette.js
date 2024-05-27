// Récupération des éléments du DOM
const instruct = document.getElementById("instructions");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const scoresList = document.getElementById("scoresList");

// Variables pour le jeu
let numberToGuess;
let attempts;
let minimum;
let maximum;
// Tableau pour stocker les scores
const scores = [];

// Fonction pour générer un nombre aléatoire entre min et max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Fonction pour jouer
function play(lvl) {
console.log(lvl);
  if (lvl == 2) {
    minimum = 10;
    maximum = 30; 
    instruct.innerText = `Deviner le bon chiffre entre ${minimum} et ${maximum} inclus !`;
  } else if (lvl == 3) {
    minimum = 10;
    maximum = 40;
    instruct.innerText = `Deviner le bon chiffre entre ${minimum} et ${maximum} inclus !`;
  } else {
    minimum = 10;
    maximum = 20;
    // affichage des instructions
    instruct.innerText = `Deviner le bon chiffre entre ${minimum} et ${maximum} inclus !`;
  }

  // Générer un nouveau nombre aléatoire à deviner
  numberToGuess = generateRandomNumber(minimum, maximum);
  attempts = 0;

  // Réinitialiser l'input
  guessInput.value = "";

  // Afficher un message vide
  message.textContent = "";

  // Désactiver le bouton de devinette pendant le jeu
  guessButton.disabled = false;

  // Ajouter un événement au bouton de devinette
  guessButton.addEventListener("click", handleGuess);
}

// Gestion de la devinette
function handleGuess() {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess)) {
    message.textContent = "Veuillez entrer un nombre valide.";
    return;
  }
  attempts++;

  if (userGuess === numberToGuess) {
    message.textContent = `Bravo ! Vous avez deviné le bon nombre en ${attempts} essais.`;
    guessInput.style.outline = '2px solid #65be25'
    scores.push(attempts);
    displayScores();
    // Désactiver le bouton de devinette après avoir gagné
    guessButton.disabled = true;
    askReplay();
  } else if (userGuess < numberToGuess) {
    guessInput.style.outline = '2px solid #E86709'
    message.textContent = "Le nombre à deviner est plus grand.";
  } else if (scores[2]) {
    const level2 = confirm("Et si on changer de niveau?");
    if (level2) {
      play(2);
      [scores].shift();
    }
  } else {
    guessInput.style.outline = '2px solid #Be2525'
    message.textContent = "Le nombre à deviner est plus petit.";
  }

  // Réinitialiser le texte après chaque tentative
  guessInput.value = "";
}

// Afficher les scores
function displayScores() {
  scoresList.innerHTML = "";
  scores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Partie ${index + 1}: ${score} essais`;
    scoresList.appendChild(listItem);
  });
}

// Demander au joueur s'il veut rejouer
function askReplay() {
  const replay = confirm("Voulez-vous rejouer ?");
  if (replay) {
    play(1);
  }
}

// Exécution de la fonction play une première fois
play(1);