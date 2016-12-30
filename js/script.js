$(document).ready(function(){
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
