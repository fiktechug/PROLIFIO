// script.js - NexusDev Portfolio (Offline-ready)

(function() {
    // --------------------------------------------------------------
    // 1. SIMPLE & RELIABLE CUSTOM CURSOR (single element)
    // --------------------------------------------------------------
    const cursor = document.getElementById('custom-cursor');
    if (cursor && !window.matchMedia("(pointer: coarse)").matches) {
        // hide default cursor
        document.body.style.cursor = 'none';
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // direct update for instant feel
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // optional: scale effect on hover interactive elements
        const interactive = document.querySelectorAll('a, button, .btn, input, textarea, .dot');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '36px';
                cursor.style.height = '36px';
                cursor.style.background = 'radial-gradient(circle, #00c8ff, #0077ff)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '24px';
                cursor.style.height = '24px';
                cursor.style.background = 'radial-gradient(circle, #ffffff, #00c8ff)';
            });
        });
        
        // make sure cursor never gets stuck off-screen
        cursor.style.left = '0px';
        cursor.style.top = '0px';
    } else {
        // on touch, ensure default cursor is visible
        document.body.style.cursor = 'auto';
        if (cursor) cursor.style.display = 'none';
    }

    // --------------------------------------------------------------
    // 2. OFFLINE TYPEWRITER EFFECT
    // --------------------------------------------------------------
    const strings = ["Premium Full-Stack Developer", "React Specialist", "Problem Solver", "Innovative Thinker"];
    let stringIndex = 0, charIndex = 0, isDeleting = false;
    const typedElement = document.querySelector(".typed-text");
    
    function typeEffect() {
        if (!typedElement) return;
        const currentString = strings[stringIndex];
        if (isDeleting) {
            typedElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentString.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            setTimeout(typeEffect, 300);
            return;
        }
        let speed = isDeleting ? 40 : 70;
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // --------------------------------------------------------------
    // 3. OFFLINE PARTICLE SYSTEM (background only, does not block cursor)
    // --------------------------------------------------------------
    class ParticleNetwork {
        constructor(container) {
            this.canvas = document.createElement('canvas');
            this.canvas.classList.add('particles-canvas');
            container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.mouseX = null;
            this.mouseY = null;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.resizeHandler = this.resize.bind(this);
            this.mousemoveHandler = this.onMouseMove.bind(this);
            window.addEventListener('resize', this.resizeHandler);
            window.addEventListener('mousemove', this.mousemoveHandler);
            this.init();
            this.animate();
        }
        
        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.initParticles();
        }
        
        onMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        
        initParticles() {
            const count = Math.min(80, Math.floor((this.width * this.height) / 12000));
            this.particles = [];
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 2.5 + 1.2,
                    vx: (Math.random() - 0.5) * 0.7,
                    vy: (Math.random() - 0.5) * 0.5,
                    alpha: Math.random() * 0.5 + 0.2,
                });
            }
        }
        
        init() {
            this.resize();
            this.initParticles();
        }
        
        drawLines() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 130) {
                        this.ctx.beginPath();
                        const opacity = (1 - dist/130) * 0.25;
                        this.ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
                        this.ctx.lineWidth = 0.9;
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        animate() {
            if (!this.ctx) return;
            this.ctx.clearRect(0, 0, this.width, this.height);
            for (let p of this.particles) {
                if (this.mouseX && this.mouseY) {
                    const dx = p.x - this.mouseX;
                    const dy = p.y - this.mouseY;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 100) {
                        const angle = Math.atan2(dy, dx);
                        const force = (100 - dist) / 100 * 1.2;
                        p.vx += Math.cos(angle) * force * 0.2;
                        p.vy += Math.sin(angle) * force * 0.2;
                    }
                }
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = this.width;
                if (p.x > this.width) p.x = 0;
                if (p.y < 0) p.y = this.height;
                if (p.y > this.height) p.y = 0;
                p.vx *= 0.99;
                p.vy *= 0.99;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha + 0.2})`;
                this.ctx.fill();
            }
            this.drawLines();
            requestAnimationFrame(this.animate.bind(this));
        }
    }
    
    const particleContainer = document.getElementById('particles-js');
    if (particleContainer) new ParticleNetwork(particleContainer);

    // --------------------------------------------------------------
    // 4. NAVBAR SCROLL & ACTIVE HIGHLIGHT
    // --------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);
    
    // --------------------------------------------------------------
    // 5. SKILL BARS ANIMATION
    // --------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkills() {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80 && rect.bottom > 0 && !bar.style.width) {
                bar.style.width = percent + '%';
            }
        });
    }
    window.addEventListener('scroll', animateSkills);
    window.addEventListener('load', animateSkills);
    
    // --------------------------------------------------------------
    // 6. TESTIMONIAL SLIDER
    // --------------------------------------------------------------
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    function showTestimonial(index) {
        testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentTestimonial = parseInt(dot.getAttribute('data-index'));
            showTestimonial(currentTestimonial);
        });
    });
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // --------------------------------------------------------------
    // 7. CONTACT FORM
    // --------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();
            if (!name || !email || !message) {
                formStatus.innerHTML = '<span style="color:#ff7b5c;">❌ Please fill all required fields.</span>';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                formStatus.innerHTML = '<span style="color:#ff7b5c;">⚠️ Enter a valid email address.</span>';
                return;
            }
            formStatus.innerHTML = '<span style="color:#00c8ff;">✅ Message sent! I’ll reply soon. (Offline demo)</span>';
            contactForm.reset();
            setTimeout(() => formStatus.innerHTML = '', 4000);
        });
    }
    
    // --------------------------------------------------------------
    // 8. DOWNLOAD CV
    // --------------------------------------------------------------
    if (cvBtn) {
    cvBtn.addEventListener('click', () => {
        alert('Your download is starting!');
        // No e.preventDefault() here, so the download proceeds!
    });
}
    
    // --------------------------------------------------------------
    // 9. BACK TO TOP
    // --------------------------------------------------------------
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) backToTop.classList.add('active');
        else backToTop.classList.remove('active');
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --------------------------------------------------------------
    // 10. YEAR
    // --------------------------------------------------------------
    document.getElementById('year').innerText = new Date().getFullYear();
    
    // --------------------------------------------------------------
    // 11. SMOOTH SCROLL & MOBILE MENU
    // --------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const mobileMenu = document.getElementById('navLinks');
                if (mobileMenu && mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
            }
        });
    });
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
        });
    });
})();