// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.section h2, .about-text, .skills, .project-card, .certificate-card, .timeline-item, .contact-content, .stat-item');

revealElements.forEach(el => {
    el.classList.add('reveal');
});

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== TYPING EFFECT FOR SUBTITLE =====
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--accent)';
    subtitle.style.paddingRight = '5px';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 2000);
        }
    };

    setTimeout(typeWriter, 1000);
}

// ===== FLOATING PARTICLES IN HERO =====
const hero = document.querySelector('.hero');
if (hero) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1})`;
        particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);
}

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 15) + 'px';
    cursorGlow.style.top = (e.clientY - 15) + 'px';
});

// ===== PROJECT CARD TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SKILL BAR ANIMATION =====
const skills = document.querySelectorAll('.skills li');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'slideInLeft 0.5s ease-out forwards';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skills.forEach(skill => skillObserver.observe(skill));

// ===== MAGNETIC BUTTON EFFECT =====
const buttons = document.querySelectorAll('.btn, .btn-small');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== RANDOM QUOTE (AUTO) =====
const quotes = [
    "Koding itu kayak masak, kadang berhasil kadang gosong 🔥",
    "Bug itu bukan musuh, itu teka-teki yang belum pecahkan 🧩",
    "HTML itu kerangka, CSS itu baju, JavaScript itu otaknya 🧠",
    "Kalau error, jangan panik. Copy paste aja ke Google 😎",
    "Programmer itu bukan sihir, cuma banyak coba-coba 🪄",
    "Kopi + Koding = Solusi (atau bug baru) ☕",
    "Jangan takut salah, takutnya nggak nyoba 💪",
    "Code itu seperti lelucon, kalau dijelaskan jadi nggak lucu 😂",
    "Hidup itu seperti git, kadang perlu reset 🔄",
    "Belajar coding itu maraton, bukan sprint 🏃",
    "Kalau stuck, coba dulu restart. 90% sembuh 🖥️",
    "Yang penting bukan sempurna, tapi jadi dulu 🚀"
];

const quoteText = document.getElementById('quoteText');
let currentQuote = 0;

function rotateQuote() {
    quoteText.classList.add('fade');
    setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        quoteText.textContent = quotes[currentQuote];
        quoteText.classList.remove('fade');
    }, 300);
}

setInterval(rotateQuote, 4000);

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ===== CERTIFICATE MODAL =====
function openModal(certId) {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    
    const certNames = {
        'sertifikat1': 'Belajar Membuat Front-End Web untuk Pemula',
        'sertifikat2': 'JavaScript Developer Certification',
        'sertifikat3': 'React - The Complete Guide',
        'sertifikat4': 'UI/UX Design Professional'
    };
    
    modalTitle.textContent = certNames[certId] || 'Sertifikat';
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.getElementById('certModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
