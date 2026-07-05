// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: true,
    touchMultiplier: 3,
    infinite: false,
});

// Get scroll value
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // Update ScrollTrigger
    ScrollTrigger.update();
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate with GSAP ScrollTrigger
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Handle anchor links with smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -80, // Account for fixed header
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
});

// Stop/start lenis on window focus/blur for performance
window.addEventListener('blur', () => {
    lenis.stop();
});

window.addEventListener('focus', () => {
    lenis.start();
});

// Resize handler
window.addEventListener('resize', () => {
    lenis.resize();
});