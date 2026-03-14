// The heartfelt message
const message = `I know I made mistakes and lied out of the fear of losing you both. I was so scared that if you knew everything, you would leave me. I did it because my love for you, Maryam and Sana, is true and absolute. I swear to you, there is no one else in my life. You both mean everything to me. Now that Allah has brought us closer and we are finally moving towards happiness and a better life together, please don't leave me. Without you, my whole world becomes empty and desolate. I love you both so incredibly much.`;

const textElement = document.getElementById("typed-text");
const actionButtons = document.getElementById("action-buttons");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const mainCard = document.getElementById("main-card");
const celebrationScreen = document.getElementById("celebration-screen");

// 1. Typing Effect Logic
let index = 0;
const typingSpeed = 50; // milliseconds per character

function typeText() {
    if (index < message.length) {
        textElement.innerHTML = message.substring(0, index + 1) + '<span class="cursor">|</span>';
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        // Remove cursor
        textElement.innerHTML = message;
        // Show buttons after typing completes
        setTimeout(() => {
            actionButtons.classList.remove("hide");
            actionButtons.style.opacity = 0;
            requestAnimationFrame(() => {
                actionButtons.style.opacity = 1;
            });
            positionNoButtonInitial();
        }, 1000);
    }
}

// 2. Floating Hearts Background Setup
const heartContainer = document.getElementById("heart-container");
const heartSymbols = ["❤️", "💖", "💕", "🤍", "🌸"];

function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Random position across the screen width
    heart.style.left = Math.random() * 100 + "vw";
    
    // Randomize duration and size slightly for natural look
    const duration = Math.random() * 10 + 8; // 8s to 18s
    heart.style.animationDuration = duration + "s";
    
    const size = Math.random() * 1.5 + 0.5; // 0.5x to 2x scale
    heart.style.transform = \`scale(\${size})\`;
    
    heartContainer.appendChild(heart);
    
    // Remove heart after it goes off screen
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generate hearts periodically
setInterval(createFloatingHeart, 800);

// 3. Playful "No" Button Logic
function positionNoButtonInitial() {
    // Put "No" button next to "Yes" button initially, using absolute positioning relative to their container
    // The container is flex center, so to place it physically next to the Yes button:
    const yesRect = btnYes.getBoundingClientRect();
    const containerRect = document.querySelector('.buttons').getBoundingClientRect();
    
    // Place standard offset to the right
    btnNo.style.left = \`calc(50% + \${yesRect.width / 2 + 10}px)\`;
    btnNo.style.top = '10px';
}

function dodgeCursor(e) {
    const btnRect = btnNo.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate random new position, ensuring it stays well within viewport bounds
    const maxX = viewportWidth - btnRect.width - 20;
    const maxY = viewportHeight - btnRect.height - 20;
    
    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);
    
    // We break it out of the absolute positioning of its parent to move relative to viewport
    btnNo.style.position = 'fixed';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
    
    // Optional: Add a subtle rotation when it runs away
    const rotation = (Math.random() - 0.5) * 40;
    btnNo.style.transform = \`rotate(\${rotation}deg)\`;
}

// Support both mouse and touch
btnNo.addEventListener("mouseover", dodgeCursor);
btnNo.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent standard touch click
    dodgeCursor();
});

// Just in case they somehow manage to click it
btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    dodgeCursor();
});


// 4. "Yes" Button Confetti & Celebration Logic
btnYes.addEventListener("click", () => {
    // Hide main card
    mainCard.style.animation = "fadeDown 1s ease forwards";
    
    // Wait for card to visually disappear, then show celebration
    setTimeout(() => {
        mainCard.classList.add("hide");
        celebrationScreen.classList.remove("hide");
        
        // Trigger glorious confetti
        fireConfetti();
    }, 800);
});

// Custom CSS animation for fading down
const styleSheet = document.createElement("style");
styleSheet.innerText = \`
    @keyframes fadeDown {
        to {
            opacity: 0;
            transform: translateY(50px);
        }
    }
\`;
document.head.appendChild(styleSheet);

function fireConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff4b72', '#ffebf0', '#ffffff']
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff4b72', '#ffebf0', '#ffffff']
        }));
    }, 250);
}

// Initialization
window.addEventListener("DOMContentLoaded", () => {
    // Small delay before typing starts for cinematic effect
    setTimeout(typeText, 800);
    
    // Create initial batch of floating hearts
    for(let i=0; i<5; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
});
