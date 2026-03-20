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
    "Travelling to new places helps you understand different cultures.",
    "The children laughed and played in the sunlit garden.",
    "Writing neatly and clearly makes your work easier to read."
];

let timer, startTime, isRunning = false;

// Theme Toggle logic
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode', !isDark);
        themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
}

function navigateTo(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(id);
    if (targetPage) targetPage.classList.add('active');
    
    const modal = document.getElementById('modal-overlay');
    if (modal) modal.classList.add('hidden');
    
    if (id === 'practice') startTest();
}

function startTest() {
    resetStats();
    const text = sentences[Math.floor(Math.random() * sentences.length)];
    const display = document.getElementById('text-display');
    if (display) {
        display.innerHTML = text.split('').map(c => `<span>${c}</span>`).join('');
    }
    const input = document.getElementById('typing-input');
    if (input) {
        input.value = "";
        input.focus();
    }
}

const typingInput = document.getElementById('typing-input');
if (typingInput) {
    typingInput.addEventListener('input', (e) => {
        if (!isRunning) startTimer();
        
        const snd = document.getElementById('key-sound');
        if (snd) {
            snd.currentTime = 0;
            snd.volume = 0.2;
            snd.play().catch(() => {}); // Catch block prevents console errors if sound fails
        }

        const val = e.target.value;
        const display = document.getElementById('text-display');
        if (!display) return;
        
        const spans = display.querySelectorAll('span');
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

        const accuracy = val.length > 0 ? Math.max(0, Math.floor(((val.length - errs) / val.length) * 100)) : 100;
        const accDisplay = document.getElementById('accuracy');
        if (accDisplay) accDisplay.innerText = accuracy;
        
        if (val === display.innerText) finish();
    });

    typingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isRunning) finish();
    });
}

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(() => {
        const sec = Math.floor((Date.now() - startTime) / 1000);
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) timerDisplay.innerText = sec;
        
        const input = document.getElementById('typing-input');
        const wpmDisplay = document.getElementById('wpm');
        if (input && wpmDisplay) {
            const wpm = sec > 0 ? Math.floor((input.value.length / 5) / (sec / 60)) : 0;
            wpmDisplay.innerText = wpm;
        }
    }, 1000);
}

function finish() {
    clearInterval(timer);
    isRunning = false;

    const successSnd = document.getElementById('success-sound');
    if (successSnd) {
        successSnd.currentTime = 0;
        successSnd.play().catch(() => {});
    }
    
    const wpm = document.getElementById('wpm')?.innerText || "0";
    const acc = document.getElementById('accuracy')?.innerText || "100";
    
    const resultsArea = document.getElementById('final-results');
    if (resultsArea) {
        resultsArea.innerHTML = `<h3 class="result-wpm">${wpm} WPM</h3><p>Accuracy: ${acc}%</p>`;
    }
    
    const modal = document.getElementById('modal-overlay');
    if (modal) modal.classList.remove('hidden');
}

function resetStats() {
    clearInterval(timer);
    isRunning = false;
    if (document.getElementById('timer')) document.getElementById('timer').innerText = "0";
    if (document.getElementById('wpm')) document.getElementById('wpm').innerText = "0";
    if (document.getElementById('accuracy')) document.getElementById('accuracy').innerText = "100";
}

function resetTest() {
    navigateTo('practice');
}

// Generate background bubbles
const container = document.getElementById('bubbles');
if (container) {
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const s = Math.random() * 60 + 20 + 'px';
        b.style.width = s;
        b.style.height = s;
        b.style.left = Math.random() * 100 + 'vw';
        b.style.top = Math.random() * 100 + 'vh';
        container.appendChild(b);
    }
}
