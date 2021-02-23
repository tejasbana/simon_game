
var buttonColours = ["red" , "blue","yellow","green"];

var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;
var i =0;

$(document).keypress(function () {
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }

})

$(".btn").on("click" , function () {

  var userChosenColour = $(this).attr("id");
  userChosenPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userChosenPattern.length - 1);

})

function checkAnswer(currentLevel){

  if(userChosenPattern[currentLevel] == gamePattern[currentLevel])
  {
    if(userChosenPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence , 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")

    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function nextSequence(){
  userChosenPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  jQuery("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed")

  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
