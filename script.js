document.addEventListener("DOMContentLoaded", () => {

    // 1. Intersection Observer for Fade-In Effects on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const contents = document.querySelectorAll('.fade-in');
    contents.forEach(content => {
        observer.observe(content);
    });

    // 2. Romantic Background Particles (Hearts / Sparkles)
    const container = document.getElementById('particles-container');
    const particleSymbols = ["❤️", "💖", "🌸", "✨", "💕", "🤍", "🎇", "🌹"];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize visual symbol
        const symbol = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.innerText = symbol;

        // Randomize horizontal position
        particle.style.left = Math.random() * 100 + 'vw';

        // Randomize float duration between 10s and 25s
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = duration + 's';

        // Randomize size scaling
        const size = Math.random() * 1.5 + 0.5;
        particle.style.transform = `scale(${size})`;

        // Append to container
        container.appendChild(particle);

        // Remove from DOM after animation completes to avoid memory leak
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Initialize with a few scattered particles spread out in time
    for (let i = 0; i < 25; i++) {
        setTimeout(createParticle, i * 300);
    }

    // Continuously generate new particles
    setInterval(createParticle, 800);
});
