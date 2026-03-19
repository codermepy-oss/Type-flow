const sentences = [
"Practice makes perfect.",
"Typing fast requires consistency.",
"Discipline beats motivation.",
"Never give up on your goals.",
"Success comes from daily effort.",
"Stay focused and keep typing.",
"Push yourself beyond limits.",
"Consistency builds mastery.",
"Hard work always pays off.",
"Train your mind daily."
];

let current = "";
let startTime = 0;
let completed = 0;

function login() {
    const name = document.getElementById("username").value;
    const goal = document.getElementById("goal").value;

    localStorage.setItem("name", name);
    localStorage.setItem("goal", goal);

    window.location.href = "dashboard.html";
}

function startPractice() {
    completed = 0;
    localStorage.setItem("completedToday", 0);
    window.location.href = "practice.html";
}

function loadDashboard() {
    if (!document.getElementById("welcome")) return;

    const name = localStorage.getItem("name");
    const goal = localStorage.getItem("goal");

    document.getElementById("welcome").innerText = "Hi " + name;
    document.getElementById("goalDisplay").innerText = goal + " questions/day";

    let streak = localStorage.getItem("streak") || 0;
    document.getElementById("streak").innerText = streak + " days";

    const quotes = [
        "Keep going 💪",
        "You are improving 🚀",
        "Don't stop now 🔥",
        "Stay consistent 👊"
    ];

    document.getElementById("quote").innerText =
        quotes[Math.floor(Math.random() * quotes.length)];
}

function loadPractice() {
    if (!document.getElementById("sentence")) return;

    nextSentence();

    document.getElementById("input").addEventListener("input", checkTyping);
}

function nextSentence() {
    current = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("sentence").innerHTML = current.split("").map(c => `<span>${c}</span>`).join("");
    document.getElementById("input").value = "";
    startTime = new Date().getTime();
}

function checkTyping() {
    const input = document.getElementById("input").value;
    const spans = document.querySelectorAll("#sentence span");

    let correct = 0;

    spans.forEach((char, i) => {
        if (input[i] == null) {
            char.classList.remove("correct", "wrong");
        } else if (input[i] === char.innerText) {
            char.classList.add("correct");
            char.classList.remove("wrong");
            correct++;
        } else {
            char.classList.add("wrong");
            char.classList.remove("correct");
        }
    });

    let accuracy = Math.floor((correct / input.length) * 100) || 100;
    document.getElementById("accuracy").innerText = accuracy;

    let time = (new Date().getTime() - startTime) / 1000;
    document.getElementById("time").innerText = Math.floor(time);

    let wpm = Math.floor((input.length / 5) / (time / 60)) || 0;
    document.getElementById("wpm").innerText = wpm;

    if (input === current) {
        completed++;
        let goal = parseInt(localStorage.getItem("goal"));

        if (completed >= goal) {
            updateStreak();
            document.getElementById("popup").classList.remove("hidden");
        } else {
            nextSentence();
        }
    }
}

function updateStreak() {
    let lastDate = localStorage.getItem("lastDate");
    let today = new Date().toDateString();

    if (lastDate !== today) {
        let streak = parseInt(localStorage.getItem("streak") || 0);
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", today);
    }
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

loadDashboard();
loadPractice();
