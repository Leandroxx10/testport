/* ========================================
   LEANDRO MOURA - PORTFOLIO 2.0
   Interactive JavaScript
======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initTypingEffect();
    initParallax();
    initParticles();
    initScrollAnimations();
    initCountUp();
    initSmoothScroll();
    initHeaderScroll();
});

/* ========================================
   Custom Cursor
======================================== */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-card, .service-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'transparent';
            follower.style.background = 'rgba(16, 185, 129, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = '#10b981';
            follower.style.background = 'transparent';
        });
    });
}

/* ========================================
   Typing Effect
======================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Talk is cheap.\nShow me the code.',
        'Clean code always\nlooks like it was\nwritten by someone\nwho cares.',
        'Code is poetry.',
        'First, solve the\nproblem. Then,\nwrite the code.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.innerHTML = currentPhrase.substring(0, charIndex - 1).replace(/\n/g, '<br>');
            charIndex--;
            typingSpeed = 30;
        } else {
            typingElement.innerHTML = currentPhrase.substring(0, charIndex + 1).replace(/\n/g, '<br>');
            charIndex++;
            typingSpeed = 80;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

/* ========================================
   Parallax Effect
======================================== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            const offset = (centerY - windowCenterY) * speed;
            
            el.style.transform = `translateY(${offset}px)`;
        });
    }
    
    // Mouse parallax for hero section
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            const floatingIcons = heroImage.querySelectorAll('.floating-icon');
            floatingIcons.forEach((icon, index) => {
                const depth = (index + 1) * 10;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            const dots = heroImage.querySelectorAll('.floating-dot');
            dots.forEach((dot, index) => {
                const depth = (index + 1) * 5;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

/* ========================================
   Particles Background
======================================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        container.appendChild(particle);
    }
}

/* ========================================
   Scroll Animations
======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.service-card, .work-card, .about-content, .about-image, .testimonial-card, .contact-container'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* ========================================
   Count Up Animation
======================================== */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (target - start) * easeOutQuart);
                    
                    counter.textContent = current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/* ========================================
   Smooth Scroll
======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Header Scroll Effect
======================================== */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0) 100%)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   Navigation Active State
======================================== */
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const arrows = link.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => arrow.remove());
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            const leftArrow = document.createElement('span');
            leftArrow.className = 'nav-arrow';
            leftArrow.textContent = '<';
            const rightArrow = document.createElement('span');
            rightArrow.className = 'nav-arrow';
            rightArrow.textContent = '>';
            
            link.prepend(leftArrow);
            link.append(rightArrow);
        }
    });
});

/* ========================================
   Magnetic Button Effect
======================================== */
document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

/* ========================================
   Tilt Effect for Cards
======================================== */
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ========================================
   ABOUT LENS REVEAL - CORREÇÃO FINAL
   A primeira foto É a máscara que revela a segunda foto
======================================== */

function initAboutLensReveal() {
    const container = document.getElementById('aboutLensReveal');
    if (!container) return;
    
    const foreground = container.querySelector('.about-lens-foreground');
    if (!foreground) return;
    
    let rafId = null;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    
    // Suaviza o movimento do mouse
    function smoothLens() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        
        foreground.style.setProperty('--mouse-x', `${currentX}%`);
        foreground.style.setProperty('--mouse-y', `${currentY}%`);
        
        rafId = requestAnimationFrame(smoothLens);
    }
    
    rafId = requestAnimationFrame(smoothLens);
    
    // Atualiza a posição alvo quando o mouse se move
    const updateLensPosition = (e) => {
        const rect = container.getBoundingClientRect();
        
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));
        
        targetX = (x / rect.width) * 100;
        targetY = (y / rect.height) * 100;
    };
    
    // Event listeners
    container.addEventListener('mousemove', updateLensPosition);
    
    container.addEventListener('mouseleave', () => {
        targetX = 50;
        targetY = 50;
    });
    
    // Inicializa posição central
    foreground.style.setProperty('--mouse-x', '50%');
    foreground.style.setProperty('--mouse-y', '50%');
    
    // Cleanup
    return () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        container.removeEventListener('mousemove', updateLensPosition);
    };
}

/* ========================================
   INICIALIZAÇÃO - ATUALIZE SEU DOMContentLoaded
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initTypingEffect();
    initParallax();
    initParticles();
    initScrollAnimations();
    initCountUp();
    initSmoothScroll();
    initHeaderScroll();
    initAboutLensReveal(); // 🟢 NOVO EFEITO NA SEÇÃO INTEIRA
});

console.log('🚀 Leandro Moura Portfolio 2.0 - Loaded Successfully!');
