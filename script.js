const typingLibrary = [
    "The futuristic interface glowed with a soft green light against the dark room.",
    "A journey of a thousand miles begins with a single step and a focused mind.",
    "Mastering the keyboard requires both speed and precision in every single stroke.",
    "The golden sun dipped below the horizon, painting the sky in shades of yellow.",
    "Artificial intelligence is helping creators build the future of the web."
];

let startTime, timerInterval, isTestRunning = false;
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

// Theme Toggle using Data Attributes
themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeBtn.innerText = newTheme === 'dark' ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Navigation & Initialization
function navigateTo(pageId) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'practice') startSession();
    else resetStats();
}

function startSession() {
    resetStats();
    const sentence = typingLibrary[Math.floor(Math.random() * typingLibrary.length)];
    document.getElementById('text-display').innerHTML = sentence.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

// Typing Logic & Sound
document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isTestRunning) startTimer();
    
    document.getElementById('key-sound').currentTime = 0;
    document.getElementById('key-sound').volume = 0.2;
    document.getElementById('key-sound').play();

    const inputVal = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    const displayChars = document.getElementById('text-display').innerText;
    let errors = 0;

    spans.forEach((span, i) => {
        if (inputVal[i] == null) span.className = '';
        else if (inputVal[i] === span.innerText) span.className = 'correct';
        else { span.className = 'incorrect'; errors++; }
    });

    const accuracy = inputVal.length > 0 ? Math.max(0, Math.floor(((inputVal.length - errors) / inputVal.length) * 100)) : 100;
    document.getElementById('accuracy').innerText = accuracy;

    if (inputVal === displayChars) finishTest();
});

// Finish on Enter key
document.getElementById('typing-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isTestRunning) finishTest();
});

function startTimer() {
    isTestRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = elapsed;
        const words = document.getElementById('typing-input').value.length / 5;
        document.getElementById('wpm').innerText = elapsed > 0 ? Math.floor(words / (elapsed / 60)) : 0;
    }, 1000);
}

function finishTest() {
    clearInterval(timerInterval);
    isTestRunning = false;
    document.getElementById('success-sound').play();

    const wpm = document.getElementById('wpm').innerText;
    const acc = document.getElementById('accuracy').innerText;
    const time = document.getElementById('timer').innerText;

    document.getElementById('final-results').innerHTML = `
        <p>Speed: <strong>${wpm} WPM</strong></p>
        <p>Accuracy: <strong>${acc}%</strong></p>
        <p>Time: <strong>${time} Seconds</strong></p>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timerInterval);
    isTestRunning = false;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() {
    document.getElementById('modal-overlay').classList.add('hidden');
    startSession();
}

// Create Background Bubbles
(function createBubbles() {
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 60 + 20 + 'px';
        b.style.width = size; b.style.height = size;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (Math.random() * 8 + 7) + 's';
        b.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(b);
    }
})();
