document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const screens = ['entry', 'surprise', 'countdown', 'reveal', 'birthday'];
    let currentScreen = 'entry';

    // --- Element Selectors ---
    const getEl = (id) => document.getElementById(id);
    const entryScreen = getEl('entry-screen');
    const surpriseScreen = getEl('surprise-screen');
    const countdownScreen = getEl('countdown-screen');
    const revealScreen = getEl('reveal-screen');
    const birthdayScreen = getEl('birthday-screen');

    // --- Screen Transition Logic ---
    function showScreen(screenName) {
        screens.forEach(id => {
            const screen = getEl(`${id}-screen`);
            screen.classList.remove('active');
        });
        const activeScreen = getEl(`${screenName}-screen`);
        activeScreen.classList.add('active');
        currentScreen = screenName;
        
        // Initialize screen-specific logic
        switch (screenName) {
            case 'entry': initEntryScreen(); break;
            case 'surprise': initSurpriseScreen(); break;
            case 'countdown': initCountdownScreen(); break;
            case 'reveal': initRevealScreen(); break;
            case 'birthday': initBirthdayScreen(); break;
        }
    }

    // --- Entry Screen Logic ---
    function initEntryScreen() {
        const letterTextEl = getEl('letter-text');
        const startReadingBtn = getEl('start-reading-btn');
        const dayBtn = getEl('day-btn');
        const nightBtn = getEl('night-btn');
        
        const letterText = "We've been talking over chat for around two years now, and every single conversation has been a quiet little part of my day that I've looked forward to. From the very first time we exchanged words, I felt something special — like I was speaking to someone who was not just kind, but genuinely rare. And now, after all this time, finally hearing your voice on a call… it's hard to explain what that felt like. You have one of the nicest voices I've ever heard — soft yet confident, warm yet honest. It's the kind of voice that stays with you even after the call ends. It made me smile in a way I didn't expect. You're so pretty — and I don't just mean in the obvious way, but in the way you carry yourself, the way you laugh, the way you choose your words. There's a brightness about you that feels real, not just something on the surface. I don't know how you feel about hearing this, but you should know: you're one of the best people I've ever met in my life till now. In a world full of people rushing past each other, you've been someone who made me pause, think, and smile. You've been patient when I was scattered, funny when I was serious, and kind when I didn't even know I needed kindness. There's a depth to you that I admire so much — how you care about things, how you listen, how you stay true to yourself. And I want you to know that no matter what happens, I'll always remember these conversations, your laughter, your honesty, and the way you've made me feel less alone. You are rare. You are beautiful. And you're the kind of person who makes life feel a little more like a story worth telling. Thank you for being you. 🌸";
        let i = 0;
        
        letterTextEl.innerHTML = '';
        startReadingBtn.disabled = true;

        function typeWriter() {
            if (i < letterText.length) {
                letterTextEl.innerHTML = letterText.substring(0, i + 1) + '<span class="typing-cursor"></span>';
                i++;
                setTimeout(typeWriter, 30);
            } else {
                letterTextEl.querySelector('.typing-cursor').remove();
                startReadingBtn.disabled = false;
            }
        }
        
        typeWriter();

        dayBtn.onclick = () => {
            entryScreen.className = 'screen active day-theme';
            dayBtn.classList.add('active');
            nightBtn.classList.remove('active');
        };
        nightBtn.onclick = () => {
            entryScreen.className = 'screen active night-theme';
            nightBtn.classList.add('active');
            dayBtn.classList.remove('active');
        };

        startReadingBtn.onclick = () => showScreen('surprise');
    }

    // --- Surprise Screen Logic ---
    function initSurpriseScreen() {
        // Fortune Wheel
        const wheel = getEl('wheel');
        const wheelColors = ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        let currentRotation = 0;
        
        wheel.innerHTML = wheelColors.map((color, index) =>
            `<div class="wheel-segment" style="background-color: ${color}; transform: rotate(${index * 60}deg);"></div>`
        ).join('');
        
        wheel.onclick = () => {
            const spins = 5 + Math.random() * 5;
            currentRotation += spins * 360;
            wheel.style.transform = `rotate(${currentRotation}deg)`;
        };

        // Balloon Game
        const balloonBox = getEl('balloon-box');
        const balloonNotes = ["You're amazing 💕", "Cutest smile 🌸", "Best person ever 🌟", "So beautiful 💖", "You're rare 🦋", "Pure sunshine ☀️"];
        
        balloonBox.innerHTML = '';
        balloonNotes.forEach((note, index) => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.innerHTML = `<div class="balloon-body"></div><div class="balloon-string"></div>`;
            balloon.style.left = `${10 + index * 15}%`;
            balloon.style.animationDelay = `${index * 1}s`;

            balloon.onclick = () => {
                balloon.remove();
                const poppedNote = document.createElement('div');
                poppedNote.className = 'popped-note';
                poppedNote.textContent = note;
                poppedNote.style.left = `${15 + (Math.random() * 70)}%`;
                poppedNote.style.top = `${20 + (Math.random() * 60)}%`;
                balloonBox.appendChild(poppedNote);
            };
            balloonBox.appendChild(balloon);
        });

        // Hidden Lock
        const lockBtn = getEl('hidden-lock-btn');
        const modal = getEl('hidden-note-modal');
        lockBtn.onclick = () => modal.classList.remove('hidden');
        modal.onclick = () => modal.classList.add('hidden');
        
        getEl('surprise-continue-btn').onclick = () => showScreen('countdown');
    }

    // --- Countdown Screen Logic ---
    function initCountdownScreen() {
        const countdownNumberEl = getEl('countdown-number');
        let count = 3;
        countdownNumberEl.textContent = count;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumberEl.textContent = count;
                // Re-trigger animation
                countdownNumberEl.style.animation = 'none';
                countdownNumberEl.offsetHeight; /* trigger reflow */
                countdownNumberEl.style.animation = null; 
            } else {
                clearInterval(interval);
                setTimeout(() => showScreen('reveal'), 1000);
            }
        }, 1000);
    }
    
    // --- Grand Reveal Screen Logic ---
    function initRevealScreen() {
        createDynamicElements(revealScreen.querySelector('.background-elements'), 100, 'confetti');
        getEl('reveal-continue-btn').onclick = () => showScreen('birthday');
    }
    
    // --- Birthday Screen Logic ---
    function initBirthdayScreen() {
        createDynamicElements(birthdayScreen.querySelector('.background-elements'), 150, 'confetti');
        const heartContainer = birthdayScreen.querySelector('.heart-container');
        heartContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-icon';
            heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            heart.style.animationDelay = `${i * 0.2}s`;
            heartContainer.appendChild(heart);
        }
    }

    // --- Helper for Dynamic Background Elements ---
    function createDynamicElements(container, count, type) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = type;
            el.style.left = `${Math.random() * 100}%`;
            el.style.animationDelay = `${Math.random() * 5}s`;
            el.style.animationDuration = `${3 + Math.random() * 3}s`;
            if(type === 'confetti'){
                 el.style.backgroundColor = ['#ec4899', '#a855f7', '#3b82f6', '#fbbf24', '#ef4444'][i % 5];
            }
            container.appendChild(el);
        }
    }

    // --- Initial Load ---
    showScreen('entry');
});
