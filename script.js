// Ensure plugins are registered
gsap.registerPlugin(ScrollTrigger);

// 1. Ultra Modern tsParticles Background
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: { color: "transparent" },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "bubble" },
            resize: true
        },
        modes: {
            bubble: { distance: 200, duration: 2, size: 4, opacity: 0.8 }
        }
    },
    particles: {
        color: { value: ["#ffffff", "#d4af37", "#ff2a5f"] },
        links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.1,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out"
        },
        number: {
            density: { enable: true, area: 800 },
            value: 70
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: { enable: true, speed: 1, minimumValue: 0.1 }
        },
        size: {
            value: { min: 1, max: 2.5 },
            animation: { enable: true, speed: 2, minimumValue: 0.5 }
        }
    }
});

// 2. High-end GSAP Animations
window.addEventListener("load", () => {
    // Split texts for character/word reveals
    const heroTitle = new SplitType('.english-title.split-text', { types: 'chars' });
    const profileTitle = new SplitType('#profiles .section-title', { types: 'chars' });
    const closureTitle = new SplitType('#closure .english-title', { types: 'chars' });

    // Initial Hero Timeline
    const tl = gsap.timeline();

    tl.from(heroTitle.chars, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.5,
        ease: "power4.out"
    })
        .from(".gsap-fade-up", {
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1.0");

    // Eid Mubarak Reval
    gsap.from(".moon-icon", {
        scrollTrigger: {
            trigger: "#eid",
            start: "top 80%",
        },
        opacity: 0,
        scale: 0.5,
        rotation: -45,
        duration: 1.5,
        ease: "back.out(2)"
    });

    const eidTitle = new SplitType('#eid .english-title', { types: 'chars' });
    gsap.from(eidTitle.chars, {
        scrollTrigger: {
            trigger: "#eid",
            start: "top 75%",
        },
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out"
    });

    gsap.from(".reveal-panel", {
        scrollTrigger: {
            trigger: "#eid",
            start: "top 60%",
        },
        opacity: 0,
        y: 100,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out"
    });

    // Cards ScrollTrigger
    const cards = gsap.utils.toArray('.glass-card.tilt-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 100,
            rotationX: 10,
            duration: 1.5,
            ease: "power4.out",
            delay: i * 0.1
        });
    });

    // Profiles ScrollTrigger
    gsap.from(profileTitle.chars, {
        scrollTrigger: {
            trigger: "#profiles",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        rotationZ: -10,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(2)"
    });

    gsap.from(".profile-anim", {
        scrollTrigger: {
            trigger: ".profiles-container",
            start: "top 75%",
        },
        opacity: 0,
        scale: 0.5,
        stagger: 0.3,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
    });

    // Closure ScrollTrigger
    gsap.from(".closure-content", {
        scrollTrigger: {
            trigger: "#closure",
            start: "top 70%",
        },
        opacity: 0,
        y: 150,
        scale: 0.9,
        duration: 1.5,
        ease: "power4.out"
    });

    gsap.from(closureTitle.chars, {
        scrollTrigger: { trigger: "#closure", start: "top 70%" },
        opacity: 0, y: 30, stagger: 0.03, duration: 1, ease: "power3.out", delay: 0.5
    });
});

// 3. Interactive 'No' Button Logic
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-forgive');

if (btnNo) {
    // Escape logic for mouse
    btnNo.addEventListener("mouseenter", () => {
        runAway(btnNo);
    });
    // Escape logic for mobile touch
    btnNo.addEventListener("touchstart", (e) => {
        e.preventDefault();
        runAway(btnNo);
    });
}

function runAway(btn) {
    const maxX = 300;
    const maxY = 200;
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;

    gsap.to(btn, {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power3.out"
    });
}

// 4. "Yes" Celebration Logic
btnYes.addEventListener('click', () => {
    // Transform button
    btnYes.querySelector('.btn-text').innerText = "I LOVE YOU! ❤️";
    btnYes.style.pointerEvents = "none";
    gsap.to(btnYes.querySelector('.btn-bg'), { left: "0", duration: 0.5 });

    // Hide 'No' button beautifully
    gsap.to(btnNo, { opacity: 0, scale: 0, y: 50, duration: 0.5, ease: "back.in(2)" });

    // Show Success Modal
    setTimeout(() => {
        document.querySelector('.success-message').classList.add('active');
        createHeartBurst();
    }, 500);
});

// 5. Celebration Particle Animation
function createHeartBurst() {
    const container = document.getElementById('celebration-container');
    const colors = ["#ff2a5f", "#d4af37", "#ffffff"];
    const emojis = ["❤️", "✨", "👑"];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.classList.add('floating-heart');
            el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.position = "absolute";
            el.style.left = (Math.random() * 100) + "vw";
            el.style.bottom = "-50px";
            el.style.fontSize = (Math.random() * 30 + 15) + "px";
            el.style.color = colors[Math.floor(Math.random() * colors.length)];
            el.style.zIndex = 9999;
            el.style.filter = `drop-shadow(0 0 10px ${el.style.color})`;
            container.appendChild(el);

            // GSAP magic
            gsap.to(el, {
                y: -(Math.random() * 100 + 100) + "vh",
                x: (Math.random() * 400 - 200),
                rotation: Math.random() * 720,
                opacity: 0,
                duration: Math.random() * 4 + 3,
                ease: "power1.out",
                onComplete: () => el.remove()
            });
        }, i * 40); // Stagger generation
    }
}
