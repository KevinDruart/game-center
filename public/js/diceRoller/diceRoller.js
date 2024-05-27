function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

// On ajoute un parmètre avec valeur par défaut (afin d'éviter une erreur JS)
function createDie(boardId = 'player'){
  // on utilise l'objet document afin d'avoir accès a un ensemble de propriété et de méthodes
  // Afin de créer un élément DOM
  // On stocke celui-ci dans une variable afin de le sauvergarder et de pourvoir le manipuler/utiliser ultèrieurement
  const die = document.createElement('div');
  // Ici on lui ajoute une class CSS en passant pas la propriété classList qui permet d'ajouter ou de supprimer des classes CSS sur cette élément de façon plus simple qu'avec className
  die.classList.add('dice');

  // Cette div, on veut l'ajouter à notre page, pour cela on va tout d'abord séléectionner un des éléments présent afin de rattacher l'élément fraichement créé a celui-ci.
  // on utilise le parmètre de la function afin de dynamiser l'endroit ou est créer le dé
  const board = document.querySelector(`#${boardId}`);

  // Maintenant qu l'on a sélectionner l'élément qui va accueillir nnotre nouvel élément on va pouvoir lui dire de l'y ajouter.
  board.append(die);

  const randomNumber = getRandomIntInclusive(1, 6);

  console.log('randomNumber', randomNumber);

  /*
  position x des différents nombres pour le dé
  1 : 0px
  2 : -100px;
  3 : -200px
  4 : -300px
  5 : -400px
  6 : -500px
  */
  const gap = ((randomNumber - 1) * 100) * -1;
  die.style.backgroundPositionX = `${gap}px`;
}

/*
// Afin de récupérer la réponse de l'utilisateur, on lui affiche une fenêtre avec un champ texte
const userResponse = prompt('Pourrais-tu me dire combien de dés veux-tu lancer ?');
/// la réponse de l'utilisateur est sous forme de texte, donc on doit interprété sa réponse en tant qu'entier.
const diceCount = parseInt(userResponse, 10);
console.log('diceCount', diceCount);
*/

function play(diceCount = 1){
  //Afin de ne pas accumuler un nombre dés supérieur à la demande, on doit d'abord nettoyer les plateaux de jeu
  document.querySelector('#player').textContent = '';
  document.querySelector('#dealer').textContent = '';

  // A partir de là on pourra faire un traitement pour générer autant de dés que demandé.
  // Pour cela on va régorganiser un petit peu notre code pour séparer les instructions de création de dés. Ainsi nous pourront appeler cette fonction plusieurs fois en fonction du nombre demandé.
  for(let currentDie = 0; currentDie < diceCount; currentDie+=1){
    // m$eme si le paramèter a une valeur par défaut à 'player', il est plus lisible de quand même le préciser lors de l'exécution
    createDie('player');
    // Pour une question d'efficacité, on  créer les 2 séries de dés dans la même boucle.
    createDie('dealer');
  }
}

// Je commence par récupérer l'ensemble des éléments qui vont ma servir à lancer une partie
const diceSlider = document.querySelector('#dice-count-selector');
const diceOutput = document.querySelector('output[name="dice-count"]');
const gameConfig = document.querySelector('#game-config');

// Ensuite je place des écouteurs d'événement sur les éléments qui seront utilisable par l'utilisateur
function sliderChangeHandler(event){
  // à travers l'event je peux récupérer l'objet DOM (input type range) et duc oup lire le contenu de sa valeur (la value du champ)
  diceOutput.textContent = event.target.value;
}
// élément DOM / écouteur / action (function)
diceSlider.addEventListener('input', sliderChangeHandler);


function gameConfigSubmitHandler(event){
  // Quand on écoute un évenement qui est déjà gérer par le navigateur et que l'on ne veut pas que cet action soit éxecuté on annulé celle-ci
  // preventDefault : Je préviens(j'empêche) l'action par défaut
  event.preventDefault();
  play(diceOutput.textContent);
}
gameConfig.addEventListener('submit', gameConfigSubmitHandler);

// Si on veut écouter un évnement qui provient du clavier on va plutot se placer sur le document entier, et dans la plupart des cas on fera en sorte d'écouter l'évenement keyup (le lâcher de touche)
function keyupHandler(event){
  if(event.code === 'Space'){
    // event.preventDefault();
    play(diceOutput.textContent);
  }
}
document.addEventListener('keyup', keyupHandler);


function playerClickHandler(event){
  console.log('click', event);
}

// Grâce au bubbling on peut récupérer l'élément qui a déclanché l'évenement, même si l'écouteur à été placé sur un élément parent. Cela permet d'économiser de la ressource et rend notre application plus fluide.

// Attention cela ne fonctionne pas avec des éléments parallèle, mais si visuellement un est au dessus de l'autre (avec un position absolu par exemple)
document.querySelector('#player').addEventListener('click', playerClickHandler);

// Par défaut le navigateur envoi TOUJOURS un objet en tant qu'argument à l'exécution de la function de "handling"
/*
function dieClickHandler(event){
  console.log(event);
  const die = event.target;
  console.log(`click sur un dé dont le background est en position ${die.style.backgroundPositionX}`);
}

const dice = document.querySelectorAll('.dice');
for(const die of dice){
  die.addEventListener('click', dieClickHandler)
}
*/