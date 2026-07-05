"use strict";

// Dragon that floats and wanders on its own (does NOT follow cursor)
(function() {
    const screen = document.getElementById("dragon-screen");
    if (!screen) return;
    
    const xmlns = "http://www.w3.org/2000/svg";
    const xlinkns = "http://www.w3.org/1999/xlink";

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rad = 0;
    let frm = Math.random();
    
    // Autonomous wandering position (starts at center)
    let autoX = width / 2;
    let autoY = height / 2;
    
    // Wandering parameters
    let wanderAngle = Math.random() * Math.PI * 2;
    let wanderSpeed = 0.002;
    let wanderRadius = Math.min(width, height) * 0.2; // How far it travels

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        wanderRadius = Math.min(width, height) * 0.3;
    };
    window.addEventListener("resize", () => resize(), false);
    resize();

    const prepend = (use, i) => {
        const elem = document.createElementNS(xmlns, "use");
        elems[i].use = elem;
        elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
        screen.prepend(elem);
    };

    const N = 40;
    const elems = [];
    for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
    const radm = Math.min(width, height) * 0.3;

    for (let i = 1; i < N; i++) {
        if (i === 1) prepend("Cabeza", i);
        else if (i === 8 || i === 14) prepend("Aletas", i);
        else prepend("Espina", i);
    }

    const run = () => {
        requestAnimationFrame(run);
        
        // Generate wandering movement using sine/cosine waves
        frm += wanderSpeed;
        
        // Create a smooth, organic wandering path
        const wanderX = Math.sin(frm * 0.3) * Math.cos(frm * 0.17) * wanderRadius;
        const wanderY = Math.sin(frm * 0.23) * Math.sin(frm * 0.41) * wanderRadius;
        
        // Target position wanders around the center
        const targetX = width / 2 + wanderX;
        const targetY = height / 2 + wanderY;
        
        // Smoothly move auto position toward target
        autoX += (targetX - autoX) * 0.02;
        autoY += (targetY - autoY) * 0.02;
        
        let e = elems[0];
        const ax = (Math.cos(3 * frm) * rad * width) / height;
        const ay = (Math.sin(4 * frm) * rad * height) / width;
        
        // Use wandering position instead of cursor
        e.x += (ax + autoX - e.x) / 10;
        e.y += (ay + autoY - e.y) / 10;
        
        for (let i = 1; i < N; i++) {
            let e = elems[i];
            let ep = elems[i - 1];
            const a = Math.atan2(e.y - ep.y, e.x - ep.x);
            e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
            e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
            const s = (162 + 4 * (1 - i)) / 50;
            e.use.setAttributeNS(
                null,
                "transform",
                `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a}) translate(${0},${0}) scale(${s},${s})`
            );
        }
        
        if (rad < radm) rad++;
        
        // No cursor reset logic needed anymore
    };

    run();
})();