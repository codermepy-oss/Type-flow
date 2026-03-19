// MOTIVATION QUOTES
const quotes = [
"Push yourself every day.",
"Stay consistent.",
"Small steps matter.",
"Discipline builds success.",
"Consistency beats talent.",
"Focus on progress, not perfection."
];

// HUGE SENTENCE DATABASE
const sentences = {
  easy: [
    "the sun rises in the east",
    "practice makes a person better",
    "typing is a useful skill",
    "coding is fun and creative",
    "we learn something new every day",
    "focus helps you improve faster",
    "simple steps lead to success",
    "hard work always pays off"
  ],

  medium: [
    "learning to type faster improves productivity and efficiency",
    "consistent practice is the key to mastering any new skill",
    "technology has transformed the way we communicate daily",
    "building projects is the best way to improve coding skills",
    "discipline and focus are essential for long term success",
    "a good programmer always keeps learning new concepts",
    "mistakes are part of the learning process in programming",
    "time management plays a crucial role in achieving goals"
  ],

  hard: [
    "developing strong problem solving skills requires patience consistency and deep understanding",
    "modern software development involves collaboration version control and continuous learning",
    "efficient typing combined with logical thinking can significantly boost productivity",
    "success in competitive environments demands focus discipline and continuous improvement",
    "writing clean and optimized code is an essential skill for every software developer",
    "understanding algorithms and data structures is fundamental for technical interviews"
  ]
};

// VARIABLES
let goal = 0;
let done = 0;
let sentence = "";
let startTime;
let difficulty = "easy";

// LOGIN
function login() {
  let name = document.getElementById("username").value;
  if (!name) return alert("Enter name");

  localStorage.setItem("user", name);
  window.location.href = "dashboard.html";
}

// INIT DASHBOARD
if (document.getElementById("welcome")) {
  document.getElementById("welcome").innerText =
    "Hi, " + localStorage.getItem("user");

  document.getElementById("streak").innerText =
    localStorage.getItem("streak") || 0;

  document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];
}

// THEME
function toggleTheme() {
  document.body.classList.toggle("light");
}

// SET GOAL
function setGoal() {
  goal = document.getElementById("goal").value;
  localStorage.setItem("goal", goal);
  alert("Goal saved!");
}

// START PRACTICE
function startPractice() {
  goal = localStorage.getItem("goal");
  if (!goal) return alert("Set goal first!");

  done = 0;

  document.getElementById("practiceBox").classList.remove("hidden");

  newSentence();
}

// CHANGE DIFFICULTY
function setDifficulty(level) {
  difficulty = level;
}

// GENERATE SENTENCE (NO REPEAT)
function newSentence() {
  let pool = sentences[difficulty];

  let randomIndex = Math.floor(Math.random() * pool.length);
  sentence = pool[randomIndex];

  document.getElementById("sentence").innerText = sentence;
  document.getElementById("input").value = "";
  startTime = new Date();
}

// CHECK TYPING
function checkTyping() {
  let input = document.getElementById("input").value;

  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === sentence[i]) correct++;
  }

  let accuracy = Math.round((correct / input.length) * 100) || 100;
  document.getElementById("accuracy").innerText = accuracy;

  let time = (new Date() - startTime) / 1000;
  let wpm = Math.round((input.length / 5) / (time / 60));
  document.getElementById("wpm").innerText = wpm || 0;

  let progress = (input.length / sentence.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  if (input === sentence) {
    done++;

    if (done >= goal) {
      let streak = Number(localStorage.getItem("streak") || 0) + 1;
      localStorage.setItem("streak", streak);

      alert("🔥 Goal completed!");
      backToDashboard();
    } else {
      newSentence();
    }
  }
}

// BACK
function backToDashboard() {
  document.getElementById("practiceBox").classList.add("hidden");

  document.getElementById("streak").innerText =
    localStorage.getItem("streak");
}
