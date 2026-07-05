document.addEventListener('DOMContentLoaded', function () {
    const follower = document.querySelector('.cursor-follower');
    const ellipse = follower.querySelector('ellipse');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let velocityX = 0;
    let velocityY = 0;

    // Mouse move event
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // GSAP animation loop with velocity-based stretching
    function animateCursor() {
        // Calculate velocity
        const deltaX = mouseX - followerX;
        const deltaY = mouseY - followerY;

        // Smooth lerp movement
        followerX += deltaX * 0.08;
        followerY += deltaY * 0.08;

        // Calculate velocity for stretching
        velocityX = deltaX * 0.01;
        velocityY = deltaY * 0.01;

        // Calculate speed for morphing
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

        // Morph ellipse based on velocity
        const maxStretch = 0.5;
        const minHeight = 0.3;
        const stretchFactor = Math.min(speed * 0.8, maxStretch);

        const newRx = 10 + stretchFactor * 2;
        const newRy = Math.max(10 - stretchFactor * 3, minHeight * 10);

        // Calculate angle based on movement direction
        const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);

        // Apply position using GSAP
        gsap.set(follower, {
            x: followerX - 10,
            y: followerY - 10
        });

        // Apply morphing and rotation to ellipse
        gsap.set(ellipse, {
            attr: {
                rx: newRx,
                ry: newRy
            },
            rotation: angle,
            transformOrigin: "center"
        });

        requestAnimationFrame(animateCursor);
    }

    // Start animation loop
    animateCursor();

    // Hover effects for interactive elements

    // Click effect
    document.addEventListener('mousedown', function () {
        gsap.to(ellipse, {
            attr: {
                rx: 5,
                ry: 15
            },
            duration: 0.1
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
        gsap.to(follower, {
            opacity: 0,
            duration: 0.3
        });
    });

    document.addEventListener('mouseenter', function () {
        gsap.to(follower, {
            opacity: 1,
            duration: 0.3
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

