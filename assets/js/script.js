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
  timeLeft = 120;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //end the game when timer is below 0
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
 <button onclick="newScore()">New Score!</button>`;
  document.getElementById("quizBody").innerHTML = quizContent;
}

//local storage
function newScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  var quizContent =
    `
  <h2>` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h2>
  <h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 
  
  <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
  
  `;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
  <h1>
      Code Quiz!
  </h1>
  <h3>
      Click to play!   
  </h3>
  <button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}
//decreases score
function incorrect() {
  timeLeft -= 5;
  next();
}

//increases score
function correct() {
  score += 25;
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
