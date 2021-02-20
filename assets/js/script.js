var questions = [
  { q: "Question 1", choices: ["a,b,c"], answer: "a" },
  { q: "Question 2", choices: ["a,b,c"], answer: "b" },
  { q: "Question 3", choices: ["a,b,c"], answer: "c" },
  { q: "Question 4", choices: ["a,b,c"], answer: "a" },
];

var score = 0;
var questionIndex = 0;

var timerEl = document.getElementById("countdown");
// var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start");
var questionsDiv = document.querySelector("#questionsDiv");

var message =
  "Congratulations! Now you are prepared to tackle the Challenge this week! Good luck!";
var words = message.split(" ");

// Timer that counts down from 5
function countdown() {
  var timeLeft = 5;

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
      // // Call the `displayMessage()` function
      // displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
// function displayMessage() {
//   var wordCount = 0;

//   // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
//   var msgInterval = setInterval(function () {
//     if (words[wordCount] === undefined) {
//       clearInterval(msgInterval);
//     } else {
//       mainEl.textContent = words[wordCount];
//       wordCount++;
//     }
//   }, 300);
// }

// Renders questions and choices to page:
function render(questionIndex) {
  // Clears existing data
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  // For loops to loop through all info in array
  for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

startBtn.onclick = countdown;
