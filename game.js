var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//passed
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//passed
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColour);
  playSound(userChosenColour);
});

//passed
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    if (!started){ 
      $("#level-title").text("Tekan A dulu mamank.");
    } else {
      $("#level-title").text("Game Over. Tekan keyboard untuk restart.");
    }

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },150);

    console.log("wrong");
    playSound("wrong");
    
    startOver();
  }
}

//passed
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//passed
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//passed
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}