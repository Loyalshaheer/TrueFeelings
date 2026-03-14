const message = `My dearest Maryam and Sana... I come to you with a heart full of guilt and sorrow. 😔 I am deeply sorry for all my mistakes. I want you to know that my love for both of you is completely true and pure. My intentions have always been right and sincere. 🥺 I truly wish to do Nikah and spend the rest of my life cherishing and loving you unconditionally. Please forgive me, I cannot imagine a world without your love. You are my everything. ❤️💖💞`;

const textElement = document.getElementById("typed-text");
const actionButtons = document.getElementById("action-buttons");
const heartContainer = document.getElementById("heart-container");

// Elements for Buttons
const btnApology = document.getElementById("btn-apology");
const btnLove = document.getElementById("btn-love");
const btnReject = document.getElementById("btn-reject");

// Elements for Modals
const modalApology = document.getElementById("modal-apology");
const modalLove = document.getElementById("modal-love");
const modalReject = document.getElementById("modal-reject");

let index = 0;
const typingSpeed = 45;

function typeText() {
    if (index < message.length) {
        textElement.innerHTML = message.substring(0, index + 1) + '<span class="cursor">|</span>';
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        textElement.innerHTML = message;
        setTimeout(() => {
            actionButtons.classList.remove("hide");
            actionButtons.style.opacity = 0;
            requestAnimationFrame(() => {
                actionButtons.style.opacity = 1;
            });
        }, 1000);
    }
}

// Background Hearts
const heartSymbols = ["❤️", "💖", "💞", "✨", "🌸", "💕"];
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 10 + 8;
    heart.style.animationDuration = duration + "s";
    const size = Math.random() * 1.5 + 0.8;
    heart.style.transform = `scale(${size})`;
    heartContainer.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
setInterval(createFloatingHeart, 600);

// Set up Confetti Function
function fireConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff2a5f', '#ffebf0', '#ffffff'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff2a5f', '#ffebf0', '#ffffff'] }));
    }, 250);
}

// Button Events
btnApology.addEventListener("click", () => {
    modalApology.classList.remove("hide");
    fireConfetti();
});

btnLove.addEventListener("click", () => {
    modalLove.classList.remove("hide");
    fireConfetti();
});

btnReject.addEventListener("click", () => {
    modalReject.classList.remove("hide");
});

function closePopups() {
    modalApology.classList.add("hide");
    modalLove.classList.add("hide");
    modalReject.classList.add("hide");
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, 1000);
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
});
