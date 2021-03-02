var questions = [
  { q: "Question 1", choices: ["a()", "b()", "c()"], answer: "a()" },
  { q: "Question 2", choices: ["a,b,c"], answer: "b" },
  { q: "Question 3", choices: ["a,b,c"], answer: "c" },
  { q: "Question 4", choices: ["a,b,c"], answer: "a" },
];

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

var timerEl = document.getElementById("countdown");
var startBtn = document.getElementById("start");
var questionsDiv = document.querySelector("#questionsDiv");

function start() {
  timeLeft = 75;
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
