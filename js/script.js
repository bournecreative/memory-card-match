$(document).ready(function(){
  buildCards();
  cardClickHandler();
});

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
  
    for (var i=0; i<=9; i++) {
      var cardContainer = $('<div>', {class: 'card'});
      var cardFront = $('<div>',{class: 'front', text: i});
      var cardBack = $('<div>',{class: 'back'});
      $("body").append(cardContainer);
      $(cardContainer).append(cardFront);
      $(cardContainer).append(cardBack);
    }
  
    for (var i=9; i>=0; i--) {
      var cardContainer = $('<div>', {class: 'card'});
      var cardFront = $('<div>', {class: 'front', text: i});
      var cardBack = $('<div>', {class: 'back'});
      $("body").append(cardContainer);
      $(cardContainer).append(cardFront);
      $(cardContainer).append(cardBack);
    }
}