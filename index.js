// A very simple, basic Simon Game. This is my first web dev big project (although is only frontend).
// It is not very polished and it can have a lot of improvements, but for beginning I'm super proud of myself.
// October - November 2022

let level = 0;
let workingGameText;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();
let userClickedPattern = new Array();
let gameStarted = false;

$(document).on("keydown", function (event) {
  // You pressed enter and the game started
  if (event.key === "Enter" && !gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

$("button").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("button").removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = new Array();
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  level++;
  workingGameText = `Level ${level}`;
  $("h1").text(workingGameText);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("h1").text("Game Over, Press Enter to Restart");
  }
}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = new Array();
}
