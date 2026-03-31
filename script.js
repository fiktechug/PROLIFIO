<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>NexusDev | Offline Portfolio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: #0a0f1c;
      color: #eef5ff;
      overflow-x: hidden;
      cursor: none;
    }

    /* custom cursor (offline, pure css+js) */
    .cursor, .cursor-follower {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    }
    .cursor {
      width: 8px;
      height: 8px;
      background: #00c8ff;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }
    .cursor-follower {
      width: 32px;
      height: 32px;
      border: 2px solid rgba(0, 200, 255, 0.5);
      background: transparent;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      transition: 0.15s ease-out;
    }
    @media (max-width: 768px) {
      body { cursor: auto; }
      .cursor, .cursor-follower { display: none; }
    }

    /* particle canvas (offline native) */
    #particles-js {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      background: radial-gradient(circle at 20% 30%, #0b1120, #03060c);
    }
    canvas.particles-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* main content */
    .container {
      position: relative;
      z-index: 2;
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(10, 15, 28, 0.75);
      backdrop-filter: blur(12px);
      z-index: 100;
      transition: all 0.3s ease;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0, 200, 255, 0.2);
    }
    .navbar.scrolled {
      background: rgba(3, 8, 20, 0.95);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      padding: 0.6rem 0;
    }
    .nav-container {
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #00c8ff, #7a2eff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.5px;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      text-decoration: none;
      color: #cddcff;
      font-weight: 500;
      transition: 0.2s;
      font-size: 1rem;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #00c8ff;
      text-shadow: 0 0 6px #00c8ff80;
    }
    .hamburger {
      display: none;
      font-size: 1.8rem;
      cursor: pointer;
      color: #00c8ff;
    }
    @media (max-width: 768px) {
      .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 70%;
        height: 100vh;
        background: #0b1120ee;
        backdrop-filter: blur(20px);
        flex-direction: column;
        align-items: center;
        padding-top: 3rem;
        transition: 0.3s;
        gap: 2rem;
        border-right: 1px solid #00c8ff44;
      }
      .nav-links.active {
        left: 0;
      }
      .hamburger {
        display: block;
      }
      .container {
        padding: 0 1.2rem;
      }
    }

    /* sections */
    section {
      padding: 100px 0 80px;
      border-bottom: 1px solid rgba(0,200,255,0.1);
    }
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-top: 70px;
    }
    .hero-content h1 {
      font-size: 3.2rem;
      font-weight: 700;
    }
    .hero-greeting {
      font-size: 1.4rem;
      color: #9aa9ff;
    }
    .typed-text {
      font-size: 2rem;
      font-weight: 600;
      background: linear-gradient(120deg, #00c8ff, #b477ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      min-height: 80px;
    }
    .typed-cursor {
      font-size: 2rem;
      color: #00c8ff;
    }
    .btn-group {
      margin-top: 2rem;
      display: flex;
      gap: 1.2rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      padding: 12px 30px;
      border-radius: 40px;
      text-decoration: none;
      font-weight: 600;
      transition: 0.2s;
      border: 1px solid #00c8ff;
      background: transparent;
      color: #00c8ff;
      cursor: pointer;
    }
    .btn-primary {
      background: #00c8ff;
      color: #0a0f1c;
      border: none;
      box-shadow: 0 0 12px #00c8ff80;
    }
    .btn-primary:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px #00c8ff;
    }
    .btn-outline:hover {
      background: #00c8ff22;
      transform: translateY(-3px);
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      text-align: center;
      background: linear-gradient(135deg, #fff, #00c8ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .about-text {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      font-size: 1.1rem;
      line-height: 1.6;
    }
    /* skills */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }
    .skill-card {
      background: rgba(255,255,255,0.05);
      padding: 1.5rem;
      border-radius: 24px;
      backdrop-filter: blur(4px);
      border: 1px solid rgba(0,200,255,0.2);
    }
    .skill-name {
      font-weight: 600;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    .skill-bar-bg {
      background: #1e2a3a;
      height: 8px;
      border-radius: 10px;
      overflow: hidden;
    }
    .skill-progress {
      width: 0%;
      height: 8px;
      background: linear-gradient(90deg, #00c8ff, #7a2eff);
      border-radius: 10px;
      transition: width 1s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    }
    /* projects */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .project-card {
      background: rgba(12, 20, 30, 0.7);
      border-radius: 28px;
      padding: 1.8rem;
      transition: 0.3s;
      border: 1px solid #00c8ff30;
      text-align: center;
    }
    .project-card i {
      font-size: 2.5rem;
      color: #00c8ff;
      margin-bottom: 1rem;
    }
    /* testimonials */
    .testimonials-slider {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      min-height: 260px;
    }
    .testimonial {
      display: none;
      background: rgba(0,200,255,0.05);
      padding: 2rem;
      border-radius: 32px;
      text-align: center;
      backdrop-filter: blur(8px);
    }
    .testimonial.active {
      display: block;
      animation: fade 0.5s;
    }
    @keyframes fade {
      from { opacity: 0; transform: translateY(10px);}
      to { opacity: 1; transform: translateY(0);}
    }
    .testimonial p {
      font-style: italic;
      margin: 1rem 0;
    }
    .dots {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
    }
    .dot {
      width: 12px;
      height: 12px;
      background: #4a5b6e;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.2s;
    }
    .dot.active, .dot:hover {
      background: #00c8ff;
      transform: scale(1.2);
    }
    /* contact form */
    .contact-form {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(10,20,32,0.5);
      padding: 2rem;
      border-radius: 32px;
      backdrop-filter: blur(8px);
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    input, textarea {
      width: 100%;
      padding: 14px 18px;
      background: #111a28;
      border: 1px solid #2a3b4e;
      border-radius: 28px;
      color: white;
      font-size: 1rem;
      transition: 0.2s;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #00c8ff;
      box-shadow: 0 0 6px #00c8ff;
    }
    button[type="submit"] {
      background: #00c8ff;
      border: none;
      width: 100%;
      padding: 12px;
      font-weight: bold;
      border-radius: 40px;
      cursor: pointer;
      font-size: 1rem;
    }
    #formStatus {
      margin-top: 1rem;
      text-align: center;
    }
    footer {
      text-align: center;
      padding: 2rem;
      font-size: 0.85rem;
      border-top: 1px solid #00c8ff20;
    }
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 46px;
      height: 46px;
      background: #00c8ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0a0f1c;
      font-weight: bold;
      cursor: pointer;
      opacity: 0;
      transition: 0.3s;
      z-index: 99;
      box-shadow: 0 4px 12px #00c8ff80;
      pointer-events: none;
    }
    .back-to-top.active {
      opacity: 1;
      pointer-events: auto;
    }
    .social-links {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }
    .social-links a {
      color: #b0c4ff;
      text-decoration: none;
      font-size: 1.4rem;
      transition: 0.2s;
    }
    .social-links a:hover {
      color: #00c8ff;
      transform: translateY(-3px);
    }
    @media (max-width: 500px) {
      h2 { font-size: 2rem; }
      .hero-content h1 { font-size: 2.3rem; }
    }
  </style>
</head>
<body>

<!-- custom cursor elements -->
<div class="cursor"></div>
<div class="cursor-follower"></div>

<!-- offline particle canvas container -->
<div id="particles-js"></div>

<nav class="navbar" id="navbar">
  <div class="nav-container">
    <div class="logo">NexusDev</div>
    <div class="hamburger" id="hamburger">☰</div>
    <ul class="nav-links" id="navLinks">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>

<main class="container">
  <section id="home" class="hero">
    <div class="hero-content">
      <p class="hero-greeting">Hi, I'm</p>
      <h1>Alex Morgan</h1>
      <div class="typed-text" style="font-size: 2rem; margin: 1rem 0;"></div>
      <div class="btn-group">
        <a href="#contact" class="btn btn-primary">Hire Me</a>
        <button id="downloadCvBtn" class="btn btn-outline">📄 Download CV</button>
      </div>
    </div>
  </section>

  <section id="about">
    <h2>About Me</h2>
    <div class="about-text">
      <p>🏆 Full-Stack Architect with 6+ years of experience crafting blazing-fast web apps. I love building digital solutions that merge elegant UX with high-performance engineering. Offline-first, real-time, and pixel-perfect — that's my mantra. Based in NYC, working worldwide.</p>
      <div class="social-links">
        <a href="#">🐙 GitHub</a>
        <a href="#">🔗 LinkedIn</a>
        <a href="#">📧 Email</a>
      </div>
    </div>
  </section>

  <section id="skills">
    <h2>Technical Arsenal</h2>
    <div class="skills-grid">
      <div class="skill-card"><div class="skill-name">React/Next.js <span>92%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="92"></div></div></div>
      <div class="skill-card"><div class="skill-name">Node.js <span>88%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="88"></div></div></div>
      <div class="skill-card"><div class="skill-name">TypeScript <span>85%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="85"></div></div></div>
      <div class="skill-card"><div class="skill-name">Python/Django <span>78%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="78"></div></div></div>
      <div class="skill-card"><div class="skill-name">Tailwind/CSS <span>94%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="94"></div></div></div>
      <div class="skill-card"><div class="skill-name">MongoDB/Postgres <span>82%</span></div><div class="skill-bar-bg"><div class="skill-progress" data-percent="82"></div></div></div>
    </div>
  </section>

  <section id="projects">
    <h2>Featured Work</h2>
    <div class="projects-grid">
      <div class="project-card"><i>⚛️</i><h3>Nexus AI Dashboard</h3><p>Real-time analytics with AI predictions, React + WebSocket</p></div>
      <div class="project-card"><i>📱</i><h3>Fintech Mobile UI</h3><p>PWA with offline sync, 60fps animations</p></div>
      <div class="project-card"><i>🔗</i><h3>Blockchain Explorer</h3><p>Web3 integration, smart contract interactions</p></div>
    </div>
  </section>

  <section id="testimonials">
    <h2>Client Love</h2>
    <div class="testimonials-slider">
      <div class="testimonial active">
        <p>"Alex delivered a premium full-stack solution ahead of deadline. The code quality is exceptional and he’s a true React specialist!"</p>
        <h4>— Maria Chen, CTO @ VisionaryLabs</h4>
      </div>
      <div class="testimonial">
        <p>"Innovative thinker! He solved our real-time architecture challenge with elegance. Highly recommend for complex projects."</p>
        <h4>— David O., Product Lead</h4>
      </div>
      <div class="testimonial">
        <p>"One of the most dedicated developers I've worked with. He turns problems into opportunities and writes clean, scalable code."</p>
        <h4>— Sarah V., Startup Founder</h4>
      </div>
    </div>
    <div class="dots">
      <div class="dot active" data-index="0"></div>
      <div class="dot" data-index="1"></div>
      <div class="dot" data-index="2"></div>
    </div>
  </section>

  <section id="contact">
    <h2>Let's Connect</h2>
    <div class="contact-form">
      <form id="contactForm">
        <div class="form-group"><input type="text" id="nameInput" placeholder="Your Name *" autocomplete="off"></div>
        <div class="form-group"><input type="email" id="emailInput" placeholder="Email *"></div>
        <div class="form-group"><textarea rows="4" id="messageInput" placeholder="Your Message *"></textarea></div>
        <button type="submit" class="btn-primary" style="border:none;">Send Message →</button>
        <div id="formStatus"></div>
      </form>
    </div>
  </section>
</main>

<footer>
  <p>© <span id="year"></span> NexusDev — Crafted with ⚡ for offline excellence</p>
</footer>
<div class="back-to-top" id="backToTop">↑</div>

<script>
  // --------------------------------------------------------------
  // 1. OFFLINE TYPEWRITER EFFECT (no typed.js)
  // --------------------------------------------------------------
  const strings = ["Premium Full-Stack Developer", "React Specialist", "Problem Solver", "Innovative Thinker"];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.querySelector(".typed-text");
  
  function typeEffect() {
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
  // 2. OFFLINE PARTICLE SYSTEM (replaces particles.js)
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
          color: `hsl(${180 + Math.random() * 40}, 80%, 60%)`
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
      // repulse effect if mouse exists
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
        // boundaries + damping
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
  // 3. NAVBAR SCROLL & ACTIVE HIGHLIGHT (vanilla)
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
  // 4. SKILL BARS ANIMATION ON SCROLL
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
  // 5. TESTIMONIAL SLIDER (auto + dots)
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
  // 6. CONTACT FORM (offline validation)
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
  // 7. DOWNLOAD CV (alert offline simulation)
  // --------------------------------------------------------------
  const cvBtn = document.getElementById('downloadCvBtn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('📄 CV demo: In a real scenario, your PDF would download. (Offline version ready)');
    });
  }
  
  // --------------------------------------------------------------
  // 8. BACK TO TOP
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
  // 9. YEAR
  // --------------------------------------------------------------
  document.getElementById('year').innerText = new Date().getFullYear();
  
  // --------------------------------------------------------------
  // 10. SMOOTH SCROLL FOR ANCHOR LINKS + mobile menu
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
        if (mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
      }
    });
  });
  
  // mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
  
  // --------------------------------------------------------------
  // 11. CUSTOM CURSOR MOVEMENT (offline friendly)
  // --------------------------------------------------------------
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (cursor && follower && window.matchMedia("(min-width: 768px)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });
  }
</script>
</body>
</html>