document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const appContainer = document.getElementById('app-container');
    const sections = document.querySelectorAll('.section');

    // Entry Screen
    const letterTextEl = document.getElementById('letter-text');
    const entryOptionsEl = document.getElementById('entry-options');
    const moodDayBtn = document.getElementById('mood-day-btn');
    const moodNightBtn = document.getElementById('mood-night-btn');
    const moodFavoriteBtn = document.getElementById('mood-favorite-btn');
    const startReadingBtn = document.getElementById('start-reading-btn');

    // Surprise Section
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const spinResultEl = document.getElementById('spin-result');
    const showBubblesBtn = document.getElementById('show-bubbles-btn');
    const bubblesContainer = document.getElementById('bubbles-container');
    const surpriseNextBtn = document.getElementById('surprise-next-btn');

    // Countdown Section
    const countdownNumberEl = document.getElementById('countdown-number');
    
    // Birthday Ending
    const replayBtn = document.getElementById('replay-btn');


    // --- State ---
    let currentSection = 'entry';
    let currentMood = 'day';
    let typingInterval;

    // --- Data & Constants ---
    const letterFullText = `Dear You,\n\nWe’ve been talking over chat for around two years now, and every single conversation has been a quiet little part of my day that I’ve looked forward to. From the very first time we exchanged words, I felt something special — like I was speaking to someone who was not just kind, but genuinely rare.\n\nAnd now, after all this time, finally hearing your voice on a call… it’s hard to explain what that felt like. You have one of the nicest voices I’ve ever heard — soft yet confident, warm yet honest. It’s the kind of voice that stays with you even after the call ends. It made me smile in a way I didn’t expect.\n\nYou’re so pretty — and I don’t just mean in the obvious way, but in the way you carry yourself, the way you laugh, the way you choose your words. There’s a brightness about you that feels real, not just something on the surface.\n\nYou should know: you’re one of the best people I’ve ever met in my life till now. In a world full of people rushing past each other, you’ve been someone who made me pause, think, and smile.\n\nThank you for being you. 🌸`;
    
    const wheelPhrases = [
        { text: 'You make me happy 💖', color: '#FFB6C1' },
        { text: "You're my favorite 🫶", color: '#DDA0DD' },
        { text: "You're the best 🌟", color: '#87CEEB' },
        { text: 'You light up my world ✨', color: '#FFE4B5' },
        { text: 'You are amazing 💕', color: '#F0E68C' },
        { text: 'You inspire me 🌈', color: '#98FB98' },
    ];

    const bubbleMessages = [
        'You are so nice 💕', 'You are so beautiful 🌸', 'You brighten my day ☀️', 
        'You are wonderful 🌟', 'You are precious 💎', 'You are lovely 🌺'
    ];

    // --- Functions ---

    const showSection = (sectionId) => {
        currentSection = sectionId;
        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
        
        // Trigger section-specific logic
        switch (sectionId) {
            case 'countdown':
                startCountdown();
                break;
            case 'grand-reveal-section':
                triggerConfetti(4000);
                createFloatingPetals();
                setTimeout(() => showSection('birthday-ending-section'), 5000);
                break;
            case 'birthday-ending-section':
                triggerConfetti(4000);
                createFloatingPetals();
                break;
        }
    };
    
    const startTypingEffect = () => {
        let index = 0;
        letterTextEl.innerHTML = '<span class="typing-cursor"></span>';
        if (typingInterval) clearInterval(typingInterval);

        typingInterval = setInterval(() => {
            if (index < letterFullText.length) {
                const textToShow = letterFullText.slice(0, index + 1);
                letterTextEl.innerHTML = `${textToShow}<span class="typing-cursor"></span>`;
                index++;
            } else {
                clearInterval(typingInterval);
                letterTextEl.innerHTML = letterFullText; // Remove cursor
                entryOptionsEl.classList.add('visible');
            }
        }, 30);
    };

    const setMood = (mood) => {
        currentMood = mood;
        appContainer.className = `mood-${mood}`;
        [moodDayBtn, moodNightBtn, moodFavoriteBtn].forEach(btn => btn.classList.remove('active'));
        document.getElementById(`mood-${mood}-btn`).classList.add('active');
    };

    const buildWheel = () => {
        const sliceCount = wheelPhrases.length;
        const sliceAngle = 360 / sliceCount;
        wheel.innerHTML = '';
        wheelPhrases.forEach((phrase, i) => {
            const slice = document.createElement('div');
            slice.className = 'wheel-slice';
            const innerSlice = document.createElement('div');
            innerSlice.className = 'wheel-slice-inner';
            
            slice.style.transform = `rotate(${sliceAngle * i}deg)`;
            innerSlice.style.backgroundColor = phrase.color;
            innerSlice.style.transform = `rotate(${sliceAngle / 2}deg)`;
            
            slice.appendChild(innerSlice);
            wheel.appendChild(slice);
        });
    };

    const spinWheel = () => {
        if (spinBtn.disabled) return;
        spinBtn.disabled = true;
        spinBtn.textContent = 'Spinning...';
        spinResultEl.style.display = 'none';

        const randomIndex = Math.floor(Math.random() * wheelPhrases.length);
        const extraSpins = 5;
        const targetRotation = (360 * extraSpins) + (randomIndex * (360 / wheelPhrases.length) * -1);

        wheel.style.transform = `rotate(${targetRotation}deg)`;

        setTimeout(() => {
            spinResultEl.textContent = wheelPhrases[randomIndex].text;
            spinResultEl.style.display = 'block';
            spinBtn.disabled = false;
            spinBtn.textContent = 'Spin Wheel';
            surpriseNextBtn.style.display = 'flex';
        }, 3000);
    };

    const startCountdown = () => {
        let count = 3;
        const updateCount = () => {
            if (count > 0) {
                countdownNumberEl.textContent = count;
                countdownNumberEl.style.animation = 'none';
                void countdownNumberEl.offsetWidth; // Trigger reflow
                countdownNumberEl.style.animation = 'countdown-zoom 1s ease-in-out forwards';
                count--;
                setTimeout(updateCount, 1000);
            } else {
                setTimeout(() => showSection('grand-reveal-section'), 500);
            }
        };
        updateCount();
    };

    const createFloatingBubbles = () => {
        bubblesContainer.style.display = 'block';
        bubblesContainer.innerHTML = '';
        bubbleMessages.forEach((msg, i) => {
            const bubble = document.createElement('div');
            bubble.className = 'floating-bubble';
            bubble.textContent = msg;
            bubble.style.left = `${10 + (i * 15)}%`;
            bubble.style.animationDuration = '8s';
            bubble.style.animationDelay = `${i * 0.5}s`;
            bubblesContainer.appendChild(bubble);
        });
    };

    const triggerConfetti = (duration) => {
        const container = appContainer;
        const colors = ['#FFB6C1', '#DDA0DD', '#87CEEB', '#FFE4B5', '#98FB98', '#FF69B4'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const animDuration = 2 + Math.random() * 2;
            confetti.style.animationDuration = `${animDuration}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.animationIterationCount = '1';
            confetti.style.animationFillMode = 'forwards';
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), animDuration * 1000 + 500);
        }
    };

    const createFloatingPetals = () => {
        const container = appContainer;
        const emojis = ['🌸', '💖', '🌺', '💕', '🌷'];
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            petal.style.left = `${Math.random() * 100}%`;
            const animDuration = 4 + Math.random() * 3;
            petal.style.animationDuration = `${animDuration}s`;
            petal.style.animationDelay = `${Math.random() * 2}s`;
            
            petal.style.animationName = 'fall';
            petal.style.animationTimingFunction = 'linear';
            petal.style.animationIterationCount = 'infinite';
            
            // Stagger opacity animation via JS
            petal.style.transition = `opacity ${animDuration / 4}s linear`;
            setTimeout(() => {
                petal.style.opacity = '1';
            }, (Math.random() * 2) * 1000);

            container.appendChild(petal);
        }
    };
    
    const resetApp = () => {
        document.querySelectorAll('.petal, .confetti-piece').forEach(el => el.remove());
        setMood('day');
        spinResultEl.style.display = 'none';
        surpriseNextBtn.style.display = 'none';
        bubblesContainer.style.display = 'none';
        bubblesContainer.innerHTML = '';
        showBubblesBtn.style.display = 'block';
        wheel.style.transform = 'rotate(0deg)';
        entryOptionsEl.classList.remove('visible');
        
        showSection('entry-screen');
        startTypingEffect();
    };

    // --- Event Listeners ---
    moodDayBtn.addEventListener('click', () => setMood('day'));
    moodNightBtn.addEventListener('click', () => setMood('night'));
    moodFavoriteBtn.addEventListener('click', () => setMood('favorite'));
    startReadingBtn.addEventListener('click', () => showSection('surprise-section'));

    spinBtn.addEventListener('click', spinWheel);
    showBubblesBtn.addEventListener('click', () => {
        createFloatingBubbles();
        showBubblesBtn.style.display = 'none';
    });
    surpriseNextBtn.addEventListener('click', () => showSection('countdown-section'));
    
    replayBtn.addEventListener('click', resetApp);


    // --- Initialization ---
    buildWheel();
    startTypingEffect();
});
