var firstCard = null;
var firstCardVal = null;
var secondCard = null;
var secondCardVal = null;
var totalGamesPlayed = null;
var totalAttempts = null;
var matches = null;
var min = 0;
var sec = 0;
var timeSet;
var damage = 0;

/**********************
 * Music for Game Play
 **********************/
ion.sound({
  sounds: [
    {
      name: "archer-killer-theme-song",
      volume: 0.5,
      loop:true
    },
    {
      name: "gameWin",
      volume: 1.0
    }
  ],
  path: "sounds/",
  preload: true
});

ion.sound.play("archer-killer-theme-song");

function pauseMusicHandler(){
  $('#music').on('click',pauseGameMusic);
}

function pauseGameMusic(){
  ion.sound.pause("archer-killer-theme-song");
}

function winning(){
  ion.sound.play("gameWin");
}

/**********************
 * Music Volume
 **********************/
function musicToggleHandler(){
  $('#music').on('click',musicToogle);
}

function musicToogle(){
  $('.music_on').fadeToggle(700);
}

/**********************
* Sets Game Board
**********************/

//dynamically builds a deck of cards 1-18 and randomizes card values
function buildCards() {
  //Build game board with cards
  for (var i=0; i<=17; i++) {
    var cardContainer = $('<div>', {class: 'card'});
    var cardFront = $('<div>',{class: 'front'});
    var cardImg = $('<img>');
    var cardBack = $('<div>',{class: 'back'});
    
    $("#gameBoard").append(cardContainer);
    $(cardContainer).append(cardFront);
    $(cardFront).append(cardImg);
    $(cardContainer).append(cardBack);
  }
  assignFaceCard();
}

//Shuffles images assigned to card
function assignFaceCard(){
  var cardNumbers = [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
  var newCardOrder = shuffle(cardNumbers);
  var cards = $('.front img');
  for (var i=0, j=0; i<cards.length, j<newCardOrder.length; i++,j++){
    $(cards[i]).attr('src', 'img/card'+newCardOrder[j]+'.jpg');
  }
}

//shuffles array
function shuffle(arr) {
  var i, j, temp;
  for (i=arr.length-1; i>0; i--){
    j = Math.floor(Math.random() * (i+1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**********************
 * Logic for showing cards
 **********************/
//Click handler to hide card back and reveal card face
function cardClickHandler(){
  $('.back').click(showCard);
}

//hides card back and unbinds click from '.card'
function showCard () {
  var thisCard = this;
  $(thisCard).hide();
  $(thisCard).unbind("click",showCard);
  // console.log("back card is hidden to reveal face card");
  markCard(thisCard);
}

//Identifies card flipped and holds value
function markCard(card) {
  if (firstCard === null) {
    firstCard = $(card);
    firstCardVal = $(card).prev('.front').find('img').attr('src');
    // console.log("1st Card Val " + firstCardVal);
  }else if(firstCard !== null && secondCard === null){
    secondCard = $(card);
    secondCardVal = $(card).prev('.front').find('img').attr('src');
    // console.log("2nd Card Val " + secondCardVal);
    $('.back').off('click',showCard);
    checkForMatch();
    incrementAttempt();
    guessAccuracy();
  }
}

function checkForMatch(){
  if (firstCardVal === secondCardVal){
    agentMatched();
    resetCardGuess();
    $('.back').on('click',showCard);
  }else if (firstCardVal !== secondCardVal){
    reveal();
    addDamage();
  }
}

//Cards dont match - show card back,bind click handler to card, and turn click hander for rest of card deck
function reveal(){
  setTimeout(function(){
    $(firstCard).show();
    $(secondCard).show();
    // console.log("face card is now hidden again");
    // console.log("face card is now hidden again");
    resetCardGuess();
    $(firstCard).bind("click",showCard);
    $(secondCard).bind("click",showCard);
    $('.back').on('click',showCard);
  },1000);
}

//reset cards identified for match
function resetCardGuess(){
  firstCard = null;
  secondCard = null;
  firstCardVal = null;
  secondCardVal = null;
}

/**********************
 * Games Played Logic
 **********************/
function gamesPlayed(){
  if (totalGamesPlayed === null){
    totalGamesPlayed = 0;
    $('.gamesPlayed').text(" " + totalGamesPlayed);
  }else{
    totalGamesPlayed = totalGamesPlayed + 1;
    $('.gamesPlayed').text(" " + totalGamesPlayed);
  }
}

/**********************
 * Attempt Made
 **********************/
function incrementAttempt(){
  if (totalAttempts === null){
    totalAttempts = 0;
    $('.attempt').text(" " + totalAttempts)
  }else{
    totalAttempts++;
    $('.attempt').text(" " + totalAttempts);
  }
}

/**********************
 * Match Made
 **********************/
function agentMatched(){
  if (matches === null) {
    matches = 0;
    $('.match').text(" " + matches);
  }else{
    matches = matches +1;
    $('.match').text(" " + matches);
    determineWin();
  }
}

/**********************
 * Determine Win
 **********************/

function determineWin(){
  if (matches >=9){
    winning();
    winMessage();
    clearTimer();
  }
}

/**********************
 * Accuracy
 **********************/
function guessAccuracy(){
  if (totalAttempts === 0){
    $('.acc').text(" " + 0);
  }else{
    $('.acc').text(" " + (matches/totalAttempts).toFixed(2)+"%");
  }
}

/**********************
 * Reset Game Logic
 **********************/

//Master Reset
function gameResetHandler(){
  $('.reset').on('click', gameReset);
}

function gameReset(){
  //clears mission failed screen
  clearMissionFailed();
  //clears win message screen
  clearWinMessage();
  //resets current card guess values
  resetCardGuess();
  //flips all card faces over
  hideAllCards();
  //stop timer
  clearTimer();
  //clear game stat values
  resetTextValues();
  //game shield is set up for next game
  boardSet();
  //shuffles cards for next game
  assignFaceCard();
}

//hide all cards
function hideAllCards(){
  $('.back').show();
}

//resets values and display for timer
function timerValueReset(){
  min = 0;
  sec = 0;
  $('.timer').text(min +":"+("0" + (sec)));
}

//resets values and display for damage
function damageValueReset(){
  damage = 0;
  $('.progress').css('width', damage + "%");
}

//resets values and display for damage
function boardSet(){
  $('#gameShield').fadeIn();
}

//reset game stats
function resetTextValues(){
  totalAttempts = null;
  matches = null;
  incrementAttempt();
  agentMatched();
  guessAccuracy();
  timerValueReset();
  damageValueReset();
}

/**********************
 * Win Message
 **********************/
//show message
function winMessage(){
  $('.gameMessage').css('display', 'block');
  clearHandler();
}

//hide message
function clearWinMessage(){
  $('.gameMessage').css('display', 'none');
}

/**********************
 * Defeat Message
 **********************/
//show message
function missonFailed(){
  $('#missonFailed').css('display','block');
}
//hide message
function clearMissionFailed(){
  $('#missonFailed').css('display','none');
}

/**********************
 * Clear Game Message
 **********************/

function clearHandler(){
  $('.gameMessage').on('click',clearGameMessage);
}

function clearGameMessage(){
  gameReset();
}

/**********************
 * Game Time
 **********************/

//clear timer
function clearTimer(){
  clearInterval(timeSet);
}

//Time Counter
function gameTimer(){
  if (sec < 9){
    $('.timer').text(min +":"+("0" + (sec=sec+1)));
  }else if (sec <= 58){
    $('.timer').text(min +":"+(sec=sec+1));
  }else{
    sec = 0;
    min++;
    $('.timer').text(min +":"+("0" + (sec)));
  }
  
  if (min >= 2){
    clearTimer();
    missonFailed();
  }
}

/**********************
 * DAMAGE - when player misses a match, damage is inflicted
 **********************/
function addDamage(){
  if (damage < 100){
    damage += 5;
    $('.progress').css('width', damage + "%");
  }else{
    missonFailed();
    clearTimer();
  }
}
  
/**********************
 * Module Show / Hide Functionality
 **********************/
function moduleHandler(){
  $('.howToPlay').click(openModule);
}

function openModule() {
  $('.gameModule').fadeIn();
}

function closeHandler(){
  $('.closeBtn').on('click',closeModel);
}

function closeModel(){
  $('.gameModule').fadeOut();
}

/**********************
 * Module Show / Hide Functionality
 **********************/

function startGameHandler(){
  $('.startGame').on('click', startGame)
}

function startGame(){
  $('#gameShield').fadeOut();
  gamesPlayed();
  timeSet = setInterval(gameTimer,1000);
}

$(document).ready(function(){
  buildCards();
  cardClickHandler();
  pauseMusicHandler();
  musicToggleHandler();
  gamesPlayed();
  gameResetHandler();
  moduleHandler();
  closeHandler();
  startGameHandler();
  incrementAttempt();
  guessAccuracy();
  agentMatched();
});
