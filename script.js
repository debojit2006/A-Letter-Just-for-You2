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

// Edit the messages for the floating bubbles
const SURPRISE_MESSAGES = [
    "My smile = You 😍",
    "Thank you for being you 💕",
    "Best thing in my life ✨",
    "You're my safe place 🫶",
];

const YOUR_FINAL_MESSAGE = "You’re the most special person in my life 💖";

// ===================================================================================
// ✨ E N D   O F   C U S T O M I Z A T I O N ✨
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const screens = {
        entry: document.getElementById('entry-screen'),
        letter: document.getElementById('letter-section'),
        surprise: document.getElementById('surprise-section'),
        countdown: document.getElementById('countdown-section'),
        final: document.getElementById('final-reveal'),
    };
    const buttons = {
        start: document.getElementById('start-btn'),
        surprise: document.getElementById('surprise-btn'),
    };
    const elements = {
        letterText: document.getElementById('letter-text'),
        bubbleContainer: document.getElementById('bubble-container'),
        countdownTimer: document.getElementById('countdown-timer'),
        finalMessage: document.getElementById('final-message'),
        backgroundEffects: document.getElementById('background-effects'),
        confettiContainer: document.getElementById('confetti-container'),
    };

    let currentScreen = 'entry';

    // --- Functions ---
    const switchScreen = (screenName) => {
        screens[currentScreen].classList.remove('active');
        screens[currentScreen].classList.add('hidden');
        
        setTimeout(() => {
            screens[screenName].classList.remove('hidden');
            screens[screenName].classList.add('active');
            currentScreen = screenName;
        }, 500); // Wait for fade out transition
    };

    const typeLetter = () => {
        let i = 0;
        const speed = 25; // Speed of typing in milliseconds
        elements.letterText.innerHTML = '';
        buttons.surprise.classList.add('hidden');
        
        const typingInterval = setInterval(() => {
            if (i < YOUR_LETTER_CONTENT.length) {
                elements.letterText.innerHTML += YOUR_LETTER_CONTENT.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                buttons.surprise.classList.remove('hidden');
            }
        }, speed);
    };

    const showSurpriseBubbles = () => {
        elements.bubbleContainer.innerHTML = ''; // Clear previous bubbles
        SURPRISE_MESSAGES.forEach((msg, index) => {
            const bubble = document.createElement('div');
            bubble.classList.add('message-bubble');
            bubble.innerHTML = msg;

            // Position bubbles randomly
            bubble.style.top = `${10 + index * 20 + Math.random() * 10}%`;
            bubble.style.left = `${10 + Math.random() * 60}%`;
            
            // Randomize animation delays for a natural feel
            bubble.style.animationDelay = `${index * 0.2}s, ${index * 0.5}s`;
            
            elements.bubbleContainer.appendChild(bubble);
        });
    };
    
    const createStars = (count) => {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDuration = `${(Math.random() * 15) + 5}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            elements.backgroundEffects.appendChild(star);
        }
    };

    const createConfetti = () => {
        const colors = ['#f94144', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#f984e5', '#d98de2'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${-20 + Math.random() * 20}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${(Math.random() * 3) + 4}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            elements.confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 7000);
        }
    };

    const startCountdown = () => {
        switchScreen('countdown');
        let count = 3;
        elements.countdownTimer.innerText = count;

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                elements.countdownTimer.innerText = count;
            } else {
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

    // --- Event Listeners & Initialization ---
    buttons.start.addEventListener('click', () => {
        switchScreen('letter');
        setTimeout(typeLetter, 800);
    });

    buttons.surprise.addEventListener('click', () => {
        switchScreen('surprise');
        showSurpriseBubbles();
        // Auto-trigger countdown after 10 seconds
        setTimeout(startCountdown, 10000);
    });

    // --- Initial Setup ---
    createStars(50);
});
