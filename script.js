const sentences = [
    "The best way to predict the future is to create it.",
    "Precision is the key to mastering the art of typing fast.",
    "The glowing interface responded instantly to every single stroke.",
    "Modern web interfaces prioritize beauty as much as functionality.",
    "Success is not final, failure is not fatal: it is the courage to continue."
];

let timer, startTime, isRunning = false;

// THEME TOGGLE (Positioned Right)
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
    document.getElementById('text-display').innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    const input = document.getElementById('typing-input');
    input.value = "";
    input.focus();
}

// REAL-TIME ENGINE
document.getElementById('typing-input').addEventListener('input', (e) => {
    if (!isRunning) startTimer();
    
    const snd = document.getElementById('key-sound');
    snd.currentTime = 0; snd.volume = 0.2; snd.play();

    const val = e.target.value;
    const spans = document.getElementById('text-display').querySelectorAll('span');
    let errs = 0;

    spans.forEach((span, i) => {
        const char = val[i];
        if (char == null) {
            span.className = ''; 
        } else if (char === span.innerText) {
            span.className = 'correct'; 
        } else {
            span.className = 'incorrect'; 
            errs++;
        }
    });

    const totalTyped = val.length;
    const accuracy = totalTyped > 0 ? Math.max(0, Math.floor(((totalTyped - errs) / totalTyped) * 100)) : 100;
    document.getElementById('accuracy').innerText = accuracy;

    if (val === document.getElementById('text-display').innerText) finish();
});

// FINISH ON ENTER
document.getElementById('typing-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isRunning) finish();
});

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').innerText = sec;
        const chars = document.getElementById('typing-input').value.length;
        const wpm = sec > 0 ? Math.floor((chars / 5) / (sec / 60)) : 0;
        document.getElementById('wpm').innerText = wpm;
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('success-sound').play();
    
    document.getElementById('final-results').innerHTML = `
        <h3 style="font-size: 2.5rem; color: var(--accent); margin-bottom:10px;">${document.getElementById('wpm').innerText} WPM</h3>
        <p>Accuracy: ${document.getElementById('accuracy').innerText}%</p>
        <p>Time: ${document.getElementById('timer').innerText}s</p>
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

// BUBBLES
const container = document.getElementById('bubbles');
for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const s = Math.random() * 80 + 40 + 'px';
    b.style.width = s; b.style.height = s;
    b.style.left = Math.random() * 100 + 'vw';
    b.style.top = Math.random() * 100 + 'vh';
    container.appendChild(b);
}
