// ===================================================================================
// ✨ C U S T O M I Z E   H E R E ✨
// ===================================================================================

const YOUR_LETTER_CONTENT = `My Letter to You 💌

We’ve been talking over chat for around two years now, and every single conversation has been a quiet little part of my day that I’ve looked forward to. From the very first time we exchanged words, I felt something special — like I was speaking to someone who was not just kind, but genuinely rare.

And now, after all this time, finally hearing your voice on a call… it’s hard to explain what that felt like. You have one of the nicest voices I’ve ever heard — soft yet confident, warm yet honest. It’s the kind of voice that stays with you even after the call ends. It made me smile in a way I didn’t expect.

You’re so pretty — and I don’t just mean in the obvious way, but in the way you carry yourself, the way you laugh, the way you choose your words. There’s a brightness about you that feels real, not just something on the surface.

I don’t know how you feel about hearing this, but you should know: you’re one of the best people I’ve ever met in my life till now. In a world full of people rushing past each other, you’ve been someone who made me pause, think, and smile. You’ve been patient when I was scattered, funny when I was serious, and kind when I didn’t even know I needed kindness.

There’s a depth to you that I admire so much — how you care about things, how you listen, how you stay true to yourself. And I want you to know that no matter what happens, I’ll always remember these conversations, your laughter, your honesty, and the way you’ve made me feel less alone.

You are rare. You are beautiful. And you’re the kind of person who makes life feel a little more like a story worth telling.

Thank you for being you. 🌸`;

const WHEEL_OPTIONS = [
    { text: "You’re amazing 🌟", color: "#f94144" },
    { text: "You’re my favorite 🫶", color: "#f3722c" },
    { text: "You make me happy 💖", color: "#f8961e" },
    { text: "My happiness = You ✨", color: "#f9c74f" },
    { text: "Cutest person ever 🥰", color: "#90be6d" },
    { text: "My safe place ❤️‍🩹", color: "#43aa8b" },
    { text: "You're a gem 💎", color: "#577590" },
    { text: "Incredible soul ✨", color: "#f984e5" },
];

const YOUR_FINAL_MESSAGE = "You’re the most special person in my life 💖";

// ===================================================================================
// ✨ E N D   O F   C U S T O M I Z A T I O N ✨
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const { body } = document;
    const screens = {
        entry: document.getElementById('entry-screen'), letter: document.getElementById('letter-section'),
        surprise: document.getElementById('surprise-section'), countdown: document.getElementById('countdown-section'),
        final: document.getElementById('final-reveal'),
    };
    const elements = {
        letterText: document.getElementById('letter-text'), countdownTimer: document.getElementById('countdown-timer'),
        finalMessage: document.getElementById('final-message'), backgroundEffects: document.getElementById('background-effects'),
        confettiContainer: document.getElementById('confetti-container'), wheel: document.getElementById('wheel'),
        resultModal: document.getElementById('result-modal'), resultText: document.getElementById('result-text'),
    };
    const buttons = {
        start: document.getElementById('start-btn'), surprise: document.getElementById('surprise-btn'),
        spin: document.getElementById('spin-btn'), closeModal: document.getElementById('close-modal-btn'),
    };
    
    let currentScreen = 'entry';
    let isSpinning = false;
    const sliceAngle = 360 / WHEEL_OPTIONS.length;

    // --- Core Functions ---
    const switchScreen = (screenName) => {
        screens[currentScreen].classList.remove('active');
        screens[currentScreen].classList.add('hidden');
        setTimeout(() => {
            screens[screenName].classList.remove('hidden');
            screens[screenName].classList.add('active');
            currentScreen = screenName;
        }, 500);
    };

    const setTheme = () => {
        const hour = new Date().getHours();
        const theme = (hour >= 6 && hour < 19) ? 'day' : 'night';
        body.dataset.theme = theme;
        createBackgroundParticles(50);
    };

    const createBackgroundParticles = (count) => {
        elements.backgroundEffects.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            particle.style.animationDuration = `${(Math.random() * 15) + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            elements.backgroundEffects.appendChild(particle);
        }
    };

    const typeLetter = () => {
        let i = 0;
        const speed = 20;
        elements.letterText.innerHTML = '';
        buttons.surprise.classList.add('hidden');
        const typingInterval = setInterval(() => {
            if (i < YOUR_LETTER_CONTENT.length) {
                elements.letterText.innerHTML += YOUR_LETTER_CONTENT.charAt(i++);
            } else {
                clearInterval(typingInterval);
                buttons.surprise.classList.remove('hidden');
            }
        }, speed);
    };

    const setupWheel = () => {
        elements.wheel.innerHTML = '';
        WHEEL_OPTIONS.forEach((option, i) => {
            const slice = document.createElement('div');
            slice.classList.add('wheel-slice');
            const rotation = sliceAngle * i;
            slice.style.transform = `rotate(${rotation}deg)`;
            slice.style.backgroundColor = option.color;
            slice.innerHTML = `<span>${option.text}</span>`;
            elements.wheel.appendChild(slice);
        });
    };
    
    const spinWheel = () => {
        if (isSpinning) return;
        isSpinning = true;

        const totalSpins = 5;
        const randomIndex = Math.floor(Math.random() * WHEEL_OPTIONS.length);
        const targetRotation = (360 * totalSpins) + (360 - (sliceAngle * randomIndex)) - (sliceAngle / 2);
        
        elements.wheel.style.transform = `rotate(${targetRotation}deg)`;

        setTimeout(() => {
            elements.resultText.textContent = WHEEL_OPTIONS[randomIndex].text;
            elements.resultModal.classList.remove('hidden');
            isSpinning = false;
        }, 5500); // Wait for spin animation to complete
    };

    const startCountdown = () => {
        switchScreen('countdown');
        let count = 3;
        elements.countdownTimer.innerText = count;
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) elements.countdownTimer.innerText = count;
            else {
                clearInterval(countdownInterval);
                showFinalReveal();
            }
        }, 1200);
    };

    const showFinalReveal = () => {
        elements.finalMessage.innerText = YOUR_FINAL_MESSAGE;
        switchScreen('final');
        createConfetti();
    };

    const createConfetti = () => { /* ... (code from previous version, unchanged) ... */ };

    // --- Event Listeners & Initialization ---
    buttons.start.addEventListener('click', () => { switchScreen('letter'); setTimeout(typeLetter, 800); });
    buttons.surprise.addEventListener('click', () => {
        switchScreen('surprise');
        setTimeout(startCountdown, 15000); // Auto-proceed after 15s
    });
    buttons.spin.addEventListener('click', spinWheel);
    buttons.closeModal.addEventListener('click', () => elements.resultModal.classList.add('hidden'));

    // --- Initial Setup ---
    setTheme();
    setupWheel();
});
