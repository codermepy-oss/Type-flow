let startBtn = document.getElementById("startBtn");
let endBtn = document.getElementById("endBtn");
let textDisplay = document.getElementById("textDisplay");
let textInput = document.getElementById("textInput");
let timerDisplay = document.getElementById("timer");
let message = document.getElementById("message");

let timer = 0;
let interval = null;
let isTyping = false;

const sentences = [
"Typing regularly improves speed and accuracy.",
"Practice typing daily to become faster.",
"Consistency is the key to mastering typing.",
"Focus on accuracy before increasing speed.",
"Typing games help develop muscle memory."
];

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function startTest() {
    textDisplay.textContent = getRandomSentence();
    textInput.value = "";
    textInput.disabled = false;
    textInput.focus();

    timer = 0;
    timerDisplay.textContent = timer;

    message.textContent = "";

    isTyping = true;

    interval = setInterval(function () {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function endTest() {
    if (!isTyping) return;

    clearInterval(interval);
    isTyping = false;
    textInput.disabled = true;

    message.textContent = "Test Completed!";
}

startBtn.addEventListener("click", startTest);
endBtn.addEventListener("click", endTest);
