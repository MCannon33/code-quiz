var questions = [
  {
    q: "When a Javascript function reaches a return statement it",
    choices: [
      "a(stops executing)",
      "b(begins executing)",
      "c(skips to the next function)",
    ],
    answer: "a()",
  },
  {
    q: "Parentheses may include parameter names separated by",
    choices: ["a(values)", "b(question marks)", "c(commas)"],
    answer: "c()",
  },
  {
    q:
      "Variables declared within a JavaScript function, become what to the function",
    choices: ["a(true)", "b(false)", "c(local)"],
    answer: "c()",
  },
  {
    q: "Whats another name for calling a function",
    choices: ["a(invoke)", "b(start)", "c(arrival)"],
    answer: "a()",
  },
];

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
var player = "";

var timerEl = document.getElementById("countdown");
var startBtn = document.getElementById("start");

// var questionsDiv = document.querySelector("#questionsDiv");

function start() {
  timeLeft = 60;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}
function endGame() {
  clearInterval(timer);

  var quizContent =
    `<h3>Great Job! ` +
    score / 20 +
    ` questions correct!</h3>
  <input type="text" id="player" placeholder="Name">
 <button id = "newScore">New Score!</button>` +
    player;
  document.getElementById("quizBody").innerHTML = quizContent;
}

// document.getElementById("newScore").onclick = newScore();
// player = document.getElementById("player").value;
// console.log(player);

//new highscore
// function newScore() {
//   console.log("here");
//   if (player !== "") {
//     player = document.getElementById("player").value;

//   // {"score":score,"player":player}
//   localStorage.setItem("highscore", { score, player });
// }

//decreases score
function incorrect() {
  timeLeft -= 15;
  next();
}

//increases score
function correct() {
  score += 20;
  next();
}

//loops through the questions
function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].q + "</h2>";

  for (
    var buttonLoop = 0;
    buttonLoop < questions[currentQuestion].choices.length;
    buttonLoop++
  ) {
    var buttonCode = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonCode = buttonCode.replace(
      "[CHOICE]",
      questions[currentQuestion].choices[buttonLoop]
    );
    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode;
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}

// start.onclick = start;
