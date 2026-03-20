const typingLibrary = [
    "Innovation distinguishes between a leader and a follower.",
    "The best way to predict the future is to create it.",
    "Speed is irrelevant if you are going in the wrong direction.",
    "A journey of a thousand miles begins with a single keystroke.",
    "Design is not just what it looks like, design is how it works.",
    "Learning to type quickly requires focus and regular practice.",
    "She opened the window to let the fresh morning air in.",
    "The curious cat jumped onto the bookshelf silently.",
    "Reading books every day can expand your knowledge greatly.",
    "During the storm, the old tree swayed dangerously in the wind.",
    "Technology has changed the way we communicate with others.",
    "He carefully painted the landscape with bright, vivid colors.",
    "Travelling to new places helps you understand different cultures.",
    "The children laughed and played in the sunlit garden.",
    "Writing neatly and clearly makes your work easier to read."
];

let startTime, timerInterval, isTestRunning = false;

// --- THEME TOGGLE ENGINE ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        themeBtn.innerHTML = "🌙 Dark Mode";
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        themeBtn.innerHTML = "☀️ Light Mode";
    }
});

// --- NAVIGATION ---
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
    // Wrap each character in a span for the green/red highlight effect
    document.getElementById('text-display').innerHTML = sentence.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    setTimeout(() => input.focus(), 100); 
}

// --- TYPING ENGINE ---
document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isTestRunning) startTimer();
    
    // Play Mechanical Key Sound
    const keySound = document.getElementById('key-sound');
    keySound.currentTime = 0;
    keySound.volume = 0.3;
    keySound.play();

    const inputVal = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    let errors = 0;

    spans.forEach((span, i) => {
        const char = inputVal[i];
        if (char == null) {
            span.className = '';
        } else if (char === span.innerText) {
            span.className = 'correct'; // Turns Green
        } else {
            span.className = 'incorrect'; // Turns Red
            errors++;
        }
    });

    // Real-time Stats
    const accuracy = inputVal.length > 0 ? Math.max(0, Math.floor(((inputVal.length - errors) / inputVal.length) * 100)) : 100;
    document.getElementById('accuracy').innerText = accuracy;

    // Auto-finish if perfect
    if (inputVal === document.getElementById('text-display').innerText) {
        finishTest();
    }
});

// Finish on Enter
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
        <div style="margin-bottom:15px; font-size:1.4rem;">
            Speed: <strong style="color:var(--accent)">${wpm} WPM</strong><br>
            Accuracy: <strong>${acc}%</strong><br>
            Time: <strong>${time}s</strong>
        </div>
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

// --- BUBBLE GENERATOR (RANDOM MOTION) ---
function initBubbles() {
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 20; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 60 + 20 + 'px';
        b.style.width = size;
        b.style.height = size;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.top = Math.random() * 100 + 'vh';
        b.style.animationDuration = (Math.random() * 10 + 10) + 's';
        b.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(b);
    }
}

initBubbles();
