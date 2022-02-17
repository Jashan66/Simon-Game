
var buttonColors = ["red" , "blue" , "green" , "yellow"]; //array for colors//

var gamePattern = []; // array where the random chosen color goes//

var userClickedPattern = [];  // array where the user chosen color goes//

var level = 0;  // start level from 0//


var started = false; // keeps track if game has started or not//


$(document).keydown(function(event){  // starts game when key is pressed//

if (!started) {

$("h1").text("Level" + level);   // changes title to level number when game starts //
nextSequence();
started = true;
}

});

//function does something when clicked ------ link all your functions to here instead of wriitng all code in here//
$(".btn").click(function(event){

//gets random chosen color id //
var userChosenColor = $(this).attr("id");

//pushed randomChosenColor into array//
userClickedPattern.push(userChosenColor);

playSound(userChosenColor);

animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);
});


function checkAnswer (currentLevel) {

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {  // checks to see if the what the user clicked equals what the color was//


if (userClickedPattern.length === gamePattern.length) {

setTimeout (function(){  // creates a 1000 mili second delay before the nect sequence//
nextSequence();

}, 1000);
}
}else {

  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("body").addClass("game-over");
  setTimeout(function(){

    $("body").removeClass("game-over")
  },200);

  $("h1").text("Game Over, Press Any Key To Restart");

  startOver();

}
}

function nextSequence() {

userClickedPattern = [];  //resets the userclicked pattern to an empty array for the next level//
  level++;
//changes title to level when next sequence is called and adds one level to the name//
$("h1").text("Level " + level);
  //created random number//

  var randomNumber = Math.floor(Math.random() * 4);

  //used array and random number to get a random chosen color//
  var randomChosenColor = buttonColors[randomNumber];

//pushed the color into the array creating a sequence//
  gamePattern.push(randomChosenColor);

//created flash animation when random chosen color was clicked//
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

// refactor code so it workds for both play sound and next sequence functions//
playSound(randomChosenColor);

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}



function animatePress(currentColor) {

$("#" + currentColor).addClass("pressed");

// remove class after 100 miliseconds delay
setTimeout(function(){

$("#" + currentColor).removeClass("pressed");

}, 100);

}


function startOver() {

level = 0;
started = false;
gamePattern = [];

}
