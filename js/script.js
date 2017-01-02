$(document).ready(function(){
  buildCards();
  cardClickHandler();
});

var firstCard = null;
var secondCard = null;

//Click handler to hide card back and reveal card face
function cardClickHandler(){
  $('.back').click(showCard);
  console.log("initially called on DOM load");
}

//hides card back and unbinds click from '.card'
function showCard () {
  $(this).hide();
  console.log("back card is hidden to reveal face card");
  $(this).unbind("click",showCard);
  reveal(this);
}

function reveal(card_instance){
  setTimeout(function(){
    $(card_instance).show();
    $(card_instance).bind("click",showCard);
    console.log("face card is now hidden again");
  },3000);
}

function buildCards() {
    
  var cardNumbers = [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
  
  var newCardOrder = shuffle(cardNumbers);
  
    for (var i=0; i<=newCardOrder.length-1; i++) {
      var cardContainer = $('<div>', {class: 'card'});
      var cardFront = $('<div>',{class: 'front', text: newCardOrder[i]});
      var cardBack = $('<div>',{class: 'back'});
      $("body").append(cardContainer);
      $(cardContainer).append(cardFront);
      $(cardContainer).append(cardBack);
    }
}

function shuffle(array) {
  var m = array.length, t, i;
  
  // While there remain elements to shuffle…
  while (m) {
    
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

/*
***** Game Logic *****
*/

