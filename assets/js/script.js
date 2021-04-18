var questions = [
  {
    q: "When a Javascript function reaches a return statement it",
    choices: [
      "stops executing()",
      "begins executing()",
      "skips to the next function()",
    ],
    answer: "stops executing()",
  },
  {
    q: "Parentheses may include parameter names separated by",
    choices: ["values()", "question marks()", "commas()"],
    answer: "commas()",
  },
  {
    q:
      "Variables declared within a JavaScript function, become what to the function",
    choices: ["true()", "false()", "local()"],
    answer: "local()",
  },
  {
    q: "Whats another name for calling a function",
    choices: ["invoke()", "start()", "arrival()"],
    answer: "invoke()",
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
    `
    <h2>Game over!</h2>
    <h3>You got a ` +
    score +
    ` /100!</h3>
    <h3>That means you got ` +
    score / 20 +
    ` questions correct!</h3>
    <input type="text" id="player" placeholder="Name"> 
    <button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

// local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem(
    "highscoreName",
    document.getElementById("player").value
  );
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

//'clear score'
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
        JavaScript Quiz!
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
