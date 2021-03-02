var questions = [
  { q: "Question 1", choices: ["a,b,c"], answer: "a" },
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

// Timer that counts down from 60
function start() {
  var timeLeft = 60;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    }
  }, 1000);
  next();
}

//loops through the questions
function next() {
  currentQuestion++;

  if (currentQuestion > questions.length) {
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

startBtn.onclick = start;
