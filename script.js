document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let state = {
        currentScreen: 'entry',
    };

    // --- SVG ICONS ---
    const ICONS = {
        cake: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`,
        partyPopper: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v2"/><path d="M5 10v2"/><path d="M2 18v2"/><path d="m13.4 4.6 4 4"/><path d="m14.8 12.8 3.2-3.2"/><path d="M18 7.2 13 12.1"/><path d="m19.5 13.5 1 1"/><path d="m20.9 9.1 1 1"/><path d="M14.8 6.2 18 3s1 1 2 2-2 2-2 2"/><path d="m12.7 11.7-2.1-2.1"/><path d="m11.3 10.3-2.1-2.1"/><path d="m9.9 8.9-2.1-2.1"/><path d="m8.5 7.5-2.1-2.1"/><path d="M7.1 6.1 5 4s-1 1-2 2 2 2 2 2"/></svg>`,
        heart: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
        lock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        unlock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
        sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    };
    
    // --- STATE MANAGEMENT ---
    function navigateTo(screen) {
        state.currentScreen = screen;
        render();
    }

    // --- RENDER FUNCTIONS ---
    function render() {
        root.innerHTML = '';
        switch (state.currentScreen) {
            case 'entry':
                root.appendChild(createEntryScreen());
                break;
            case 'surprise':
                root.appendChild(createSurpriseSection());
                break;
            case 'countdown':
                root.appendChild(createCountdownScreen());
                break;
            case 'reveal':
                root.appendChild(createGrandReveal());
                break;
            case 'birthday':
                root.appendChild(createBirthdayEnding());
                break;
        }
    }

    function createEntryScreen() {
        const screen = document.createElement('div');
        screen.className = 'screen entry-screen theme-day';

        const letterText = "We've been talking over chat for around two years now, and every single conversation has been a quiet little part of my day that I've looked forward to. From the very first time we exchanged words, I felt something special — like I was speaking to someone who was not just kind, but genuinely rare. And now, after all this time, finally hearing your voice on a call… it's hard to explain what that felt like. You have one of the nicest voices I've ever heard — soft yet confident, warm yet honest. It's the kind of voice that stays with you even after the call ends. It made me smile in a way I didn't expect. You're so pretty — and I don't just mean in the obvious way, but in the way you carry yourself, the way you laugh, the way you choose your words. There's a brightness about you that feels real, not just something on the surface. I don't know how you feel about hearing this, but you should know: you're one of the best people I've ever met in my life till now. In a world full of people rushing past each other, you've been someone who made me pause, think, and smile. You've been patient when I was scattered, funny when I was serious, and kind when I didn't even know I needed kindness. There's a depth to you that I admire so much — how you care about things, how you listen, how you stay true to yourself. And I want you to know that no matter what happens, I'll always remember these conversations, your laughter, your honesty, and the way you've made me feel less alone. You are rare. You are beautiful. And you're the kind of person who makes life feel a little more like a story worth telling. Thank you for being you. 🌸";
        let displayedText = '';
        
        screen.innerHTML = `
            <div style="z-index: 10;">
                <h1 style="font-family: var(--font-georgia);">My Letter to You,</h1>
                <h2 style="font-family: var(--font-georgia);">Sudeshna 💌</h2>
            </div>
            <div class="letter-container">
                <div class="letter-content">
                    <p class="letter-text"></p>
                </div>
            </div>
            <div class="theme-buttons">
                <button class="day-btn">☀️ DAY</button>
                <button class="night-btn">🌙 NIGHT</button>
            </div>
            <button class="start-button" disabled>Start Reading</button>
        `;

        const p = screen.querySelector('.letter-text');
        const startButton = screen.querySelector('.start-button');

        function typeLetter() {
            if (displayedText.length < letterText.length) {
                displayedText = letterText.slice(0, displayedText.length + 1);
                p.innerHTML = `${displayedText}<span class="typing-cursor"></span>`;
                setTimeout(typeLetter, 25);
            } else {
                p.innerHTML = displayedText; // Remove cursor
                startButton.disabled = false;
            }
        }
        
        typeLetter();

        screen.querySelector('.day-btn').addEventListener('click', () => screen.classList.replace('theme-night', 'theme-day'));
        screen.querySelector('.night-btn').addEventListener('click', () => screen.classList.replace('theme-day', 'theme-night'));
        startButton.addEventListener('click', () => navigateTo('surprise'));

        return screen;
    }

    function createSurpriseSection() {
        const screen = document.createElement('div');
        screen.className = 'screen surprise-screen';
        
        const balloonNotes = ["You're amazing 💕", "Cutest smile 🌸", "Best person ever 🌟", "So beautiful 💖", "You're rare 🦋", "Pure sunshine ☀️"];
        let poppedBalloons = [];

        screen.innerHTML = `
            <div class="text-center z-10">
                <h2 style="font-family: var(--font-cursive); font-size: 2.5rem;">Spin the Wheel 🎡</h2>
                <div class="fortune-wheel">
                     <svg viewBox="0 0 200 200" class="w-full h-full">
                         ${[0, 1, 2, 3, 4, 5].map(i => {
                            const colors = ['#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                            return `<path d="M 100 100 L ${100 + 90 * Math.cos((i * 60 - 90) * Math.PI / 180)} ${100 + 90 * Math.sin((i * 60 - 90) * Math.PI / 180)} A 90 90 0 0 1 ${100 + 90 * Math.cos(((i + 1) * 60 - 90) * Math.PI / 180)} ${100 + 90 * Math.sin(((i + 1) * 60 - 90) * Math.PI / 180)} Z" fill="${colors[i]}" stroke="white" stroke-width="2"/>`;
                        }).join('')}
                     </svg>
                     <div class="wheel-center">${ICONS.heart}</div>
                </div>
                 <p style="margin-top: 1rem; opacity: 0.7;">Tap to spin!</p>
            </div>
            <div class="z-10 w-full max-w-md my-8">
                <h3 style="font-family: var(--font-cursive); font-size: 2rem; text-align: center; margin-bottom: 1rem;">Pop the Balloons! 🎈</h3>
                <div class="balloon-game"></div>
            </div>
            <button class="start-button" style="z-index: 10;">Continue →</button>
            <button class="hidden-lock-button">
                <div class="lock-icon-container">${ICONS.lock}</div>
            </button>
        `;

        const wheel = screen.querySelector('.fortune-wheel');
        let currentRotation = 0;
        wheel.addEventListener('click', () => {
            const spins = 5 + Math.random() * 3;
            currentRotation += spins * 360;
            wheel.style.transform = `rotate(${currentRotation}deg)`;
        });

        const balloonGame = screen.querySelector('.balloon-game');
        function renderBalloons() {
            balloonNotes.forEach((note, i) => {
                if (poppedBalloons.includes(i)) return;
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.left = `${10 + i * 15}%`;
                balloon.style.animationDuration = `${6 + Math.random() * 2}s`;
                balloon.style.animationDelay = `${i * 0.5}s`;
                balloon.innerHTML = `<div class="balloon-body"></div><div class="balloon-string"></div>`;
                balloon.addEventListener('click', () => {
                    poppedBalloons.push(i);
                    balloon.remove();
                    const poppedNote = document.createElement('div');
                    poppedNote.className = 'popped-note';
                    poppedNote.textContent = note;
                    poppedNote.style.top = `${20 + (poppedBalloons.length-1) * 15}%`;
                    poppedNote.style.left = `${15 + ((poppedBalloons.length-1) % 3) * 30}%`;
                    balloonGame.appendChild(poppedNote);
                });
                balloonGame.appendChild(balloon);
            });
        }
        renderBalloons();

        const lockButton = screen.querySelector('.hidden-lock-button');
        lockButton.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'hidden-note-modal';
            modal.innerHTML = `
                <div class="hidden-note-content">
                    <p style="font-family: var(--font-cursive); font-size: 1.25rem; text-align: center;">
                        This one's just for you: You're the reason I smile more than I admit 💖
                    </p>
                </div>
            `;
            modal.addEventListener('click', () => modal.remove());
            screen.appendChild(modal);
        });
        
        screen.querySelector('.start-button').addEventListener('click', () => navigateTo('countdown'));
        return screen;
    }

    function createCountdownScreen() {
        const screen = document.createElement('div');
        screen.className = 'screen countdown-screen';
        let count = 3;

        function updateCount() {
            if (count > 0) {
                screen.innerHTML = `
                    <div class="countdown-number" style="animation: number-enter 0.5s ease, number-exit 0.5s ease 0.5s forwards;">${count}</div>
                    <div class="pulsing-ring pink"></div>
                    <div class="pulsing-ring purple"></div>
                `;
                count--;
                setTimeout(updateCount, 1000);
            } else {
                navigateTo('reveal');
            }
        }
        updateCount();
        return screen;
    }

    function createGrandReveal() {
        const screen = document.createElement('div');
        screen.className = 'screen grand-reveal-screen';

        screen.innerHTML = `
            <div class="main-content-box" style="z-index: 10;">
                ${ICONS.sparkles}
                <h1 style="font-family: var(--font-georgia); font-size: 2.5rem; background: linear-gradient(to right, #ec4899, #8b5cf6); -webkit-background-clip: text; color: transparent;">
                    You're the most special person in my life 💖
                </h1>
                <p style="font-family: var(--font-georgia); font-size: 1.25rem; color: #4b5563; margin-top: 1.5rem;">
                    Every moment with you is a treasure ✨
                </p>
            </div>
            <button class="start-button" style="margin-top: 3rem; z-index: 10;">Continue to Surprise →</button>
        `;
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'particle confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = ['#ec4899', '#a855f7', '#3b82f6', '#fbbf24'][i % 4];
            confetti.style.setProperty('--x-end', `${(Math.random() - 0.5) * 200}px`);
            confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            screen.appendChild(confetti);
        }

        screen.querySelector('.start-button').addEventListener('click', () => navigateTo('birthday'));
        return screen;
    }

    function createBirthdayEnding() {
        const screen = document.createElement('div');
        screen.className = 'screen birthday-ending-screen';
        
        screen.innerHTML = `
            <div class="relative z-10 text-center w-full max-w-3xl">
                <div style="margin-bottom: 2rem;">${ICONS.cake}</div>
                <h1 class="birthday-title">🌸✨ HAPPY BIRTHDAY ✨🌸</h1>
                <div class="main-content-box" style="margin-top: 2rem;">
                    <p style="font-size: 1.75rem; color: #374151; font-family: var(--font-georgia);">
                        I hope this little letter makes your day brighter, just like you make mine every day.
                    </p>
                    <div class="flex items-center justify-center gap-4 mt-8">
                        ${[...Array(5)].map(() => `<div class="heart-icon">${ICONS.heart}</div>`).join('')}
                    </div>
                </div>
                 <p style="font-family: var(--font-cursive); font-size: 1.5rem; color: white; margin-top: 3rem; animation: scale-pulse 2s infinite;">
                    Wishing you all the happiness in the world 🎂✨
                 </p>
            </div>
        `;

        // Confetti, Petals, and Icons
        const effects = [
            { type: 'confetti', count: 150 },
            { type: 'petal', count: 40 },
            { type: 'icon', count: 15 }
        ];

        effects.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = `particle ${type}`;
                p.style.left = `${Math.random() * 100}%`;
                p.style.setProperty('--x-end', `${(Math.random() - 0.5) * 300}px`);
                
                if (type === 'confetti') {
                    p.style.backgroundColor = ['#ec4899', '#a855f7', '#3b82f6', '#fbbf24', '#ef4444', '#10b981'][i % 6];
                    p.style.animationDuration = `${4 + Math.random() * 3}s`;
                    p.style.animationDelay = `${(i % 30) * 0.1}s`;
                } else if (type === 'petal') {
                    p.style.animationDuration = `${10 + Math.random() * 5}s`;
                    p.style.animationDelay = `${Math.random() * 5}s`;
                } else if (type === 'icon') {
                    p.className = 'particle floating-icon';
                    p.style.top = `${Math.random() * 100}%`;
                    p.innerHTML = [ICONS.heart, ICONS.star, ICONS.partyPopper][i % 3];
                    p.style.animationDelay = `${Math.random() * 2}s`;
                }
                screen.appendChild(p);
            }
        });

        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.className = 'particle star';
            star.innerHTML = ICONS.star;
            star.style.top = `${20 + (i * 10)}%`;
            star.style.left = `${10 + (i % 2) * 80}%`;
            star.style.animationDelay = `${i * 0.3}s`;
            screen.appendChild(star);
        }
        
        return screen;
    }

    // --- INITIALIZE APP ---
    render();
});
