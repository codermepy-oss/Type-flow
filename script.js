const sentences = [
    "The best way to predict the future is to create it.",
    "Precision is the key to mastering the art of typing fast.",
    "The glowing interface responded instantly to every keystroke.",
    "Success is the courage to continue when things get difficult.",
    "Mastering your flow is the secret to peak productivity.",
    "A journey of a thousand miles begins with a single step.",
    "Learning to type quickly requires focus and regular practice.",
    "She opened the window to let the fresh morning air in.",
    "The curious cat jumped onto the bookshelf silently.",
    "Reading books every day can expand your knowledge greatly.",
    "During the storm, the old tree swayed dangerously in the wind.",
    "Technology has changed the way we communicate with others.",
    "He carefully painted the landscape with bright, vivid colors.",
    "Travelling to new places helps you understand different culture.",
    "The children laughed and played in the sunlit garden.",
    "Writing neatly and clearly makes your work easier to read."
];

let timer, startTime, isRunning = false;

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode', !isDark);
    document.getElementById('theme-toggle').innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

function navigateTo(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('modal-overlay').classList.add('hidden');
    if (id === 'practice') startTest();
}

function startTest() {
    resetStats();
    const text = sentences[Math.floor(Math.random() * sentences.length)];
    const display = document.getElementById('text-display');
    display.innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isRunning) startTimer();
    
    // Play keystroke sound
    const snd = document.getElementById('key-sound');
    snd.currentTime = 0; snd.volume = 0.2; snd.play();

    const val = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    let errs = 0;

    spans.forEach((span, i) => {
        const char = val[i];
        if (char == null) span.className = '';
        else if (char === span.innerText) span.className = 'correct';
        else { span.className = 'incorrect'; errs++; }
    });

    const accuracy = val.length > 0 ? Math.max(0, Math.floor(((val.length - errs) / val.length) * 100)) : 100;
    document.getElementById('accuracy').innerText = accuracy;
    
    if (val === document.getElementById('text-display').innerText) finish();
});

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        const wpm = sec > 0 ? Math.floor((document.getElementById('typing-input').value.length / 5) / (sec / 60)) : 0;
        document.getElementById('wpm').innerText = wpm;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;

    // Play success sound
    const successSnd = document.getElementById('success-sound');
    if (successSnd) { successSnd.currentTime = 0; successSnd.play(); }
    
    const wpm = document.getElementById('wpm').innerText;
    const acc = document.getElementById('accuracy').innerText;
    
    document.getElementById('final-results').innerHTML = `
        <h3 class="result-wpm">${wpm} WPM</h3>
        <p>Accuracy: ${acc}%</p>
    `;
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function resetStats() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('timer').innerText = "0";
    document.getElementById('wpm').innerText = "0";
    document.getElementById('accuracy').innerText = "100";
}

function resetTest() { navigateTo('practice'); }

// BUBBLES ANIMATION
const container = document.getElementById('bubbles');
for (let i = 0; i < 15; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = Math.random() * 60 + 20 + 'px';
    b.style.width = s; b.style.height = s;
    b.style.left = Math.random() * 100 + 'vw';
    b.style.top = Math.random() * 100 + 'vh';
    container.appendChild(b);
}
