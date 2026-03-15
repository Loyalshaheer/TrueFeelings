const message = `میری پیاری مریم اور ثناء... میں دل میں شدید ندامت اور دکھ لیے آپ کے پاس آیا ہوں۔ 😔 میں اپنی تمام غلطیوں پر دل کی گہرائیوں سے معافی مانگتا ہوں۔ میں چاہتا ہوں کہ آپ جان لیں کہ آپ دونوں کے لیے میری محبت بالکل سچی اور خالص ہے۔ میری نیت ہمیشہ درست اور مخلص رہی ہے۔ 🥺 میں سچے دل سے نکاح کرنا چاہتا ہوں اور اپنی باقی زندگی آپ کو بے پناہ محبت دینے اور آپ کا خیال رکھنے میں گزارنا چاہتا ہوں۔ براہ کرم مجھے معاف کر دیں، میں آپ کی محبت کے بغیر اس دنیا کا تصور بھی نہیں کر سکتا۔ آپ ہی میرا سب کچھ ہیں۔ ❤️💖💞`;

const textElement = document.getElementById("typed-text");
const actionButtons = document.getElementById("action-buttons");
const heartContainer = document.getElementById("heart-container");

// Elements for Buttons
const btnLove = document.getElementById("btn-love");
const btnReject = document.getElementById("btn-reject");

// Elements for Modals
const modalLove = document.getElementById("modal-love");

let index = 0;
const typingSpeed = 50; // slightly slower for Urdu to be readable as it types

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
const heartSymbols = ["❤️", "💖", "💞", "✨", "🔥", "💕", "💘"];
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
setInterval(createFloatingHeart, 400); // more hearts for premium feel

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
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0844', '#ffb199', '#ffffff'] }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff0844', '#ffb199', '#ffffff'] }));
    }, 250);
}

// Button Events
btnLove.addEventListener("click", () => {
    modalLove.classList.remove("hide");
    fireConfetti();
});

// Escaping "We Do Not" Button Logic
let isEscaping = false;

function escapeButton(e) {
    if (e) e.preventDefault();

    if (!isEscaping) {
        isEscaping = true;
        btnReject.style.position = 'fixed';
        btnReject.style.zIndex = '9999';
        btnReject.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

        // Continuous running away
        setInterval(() => {
            moveButtonToRandom();
        }, 700);
    }

    // Immediate move
    moveButtonToRandom();
}

function moveButtonToRandom() {
    const bRect = btnReject.getBoundingClientRect();
    const maxX = window.innerWidth - bRect.width - 20;
    const maxY = window.innerHeight - bRect.height - 20;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    btnReject.style.left = randomX + 'px';
    btnReject.style.top = randomY + 'px';
}

btnReject.addEventListener("mouseover", escapeButton);
btnReject.addEventListener("click", escapeButton);
// Handle touchstart for better mobile escaping
btnReject.addEventListener("touchstart", escapeButton, { passive: false });

function closePopups() {
    modalLove.classList.add("hide");
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeText, 1000);
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
});
