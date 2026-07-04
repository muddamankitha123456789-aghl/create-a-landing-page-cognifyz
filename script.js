// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// MODAL FUNCTIONALITY
// ============================================
const modal = document.getElementById('signupModal');
const closeBtn = document.querySelector('.close');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// ============================================
// CTA BUTTON HANDLERS
// ============================================
function handlePrimaryAction() {
    openModal();
}

function handleSecondaryAction() {
    const videoSection = document.createElement('div');
    videoSection.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    videoSection.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            position: relative;
        ">
            <button onclick="this.parentElement.parentElement.remove()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
            ">×</button>
            <h2 style="margin-bottom: 1rem;">TechFlow Demo Video</h2>
            <div style="background: #f0f0f0; padding: 2rem; border-radius: 8px; text-align: center;">
                <i class="fas fa-video" style="font-size: 3rem; color: #6366f1; margin-bottom: 1rem;"></i>
                <p>Demo video would play here. This is a placeholder for the demo video content.</p>
                <p style="margin-top: 1rem; color: #64748b; font-size: 0.9rem;">Click the X button to close.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoSection);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    setTimeout(() => {
        closeModal();
        showSuccessMessage();
        form.reset();
    }, 500);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 4000;
        animation: slideUp 0.3s ease;
        max-width: 400px;
    `;
    
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Welcome!</strong>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Check your email to confirm your account.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .pricing-card, .step'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideUp 0.6s ease forwards`;
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
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

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PRICING CARD INTERACTION
// ============================================
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.parentElement.querySelector('h3').textContent;
        if (this.textContent.includes('Contact')) {
            alert(`Thank you for your interest in our ${planName} plan. Our sales team will contact you soon!`);
        } else if (this.textContent.includes('Free Trial')) {
            openModal();
        } else {
            openModal();
        }
    });
});

// ============================================
// FORM VALIDATION
// ============================================
const signupForm = document.querySelector('.signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        const inputs = signupForm.querySelectorAll('input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#10b981';
                }
            }
            
            if (input.type === 'password' && input.value.length < 6) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else if (input.type === 'password') {
                input.style.borderColor = '#10b981';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all fields correctly. Password must be at least 6 characters.');
        }
    });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================
// PERFORMANCE: DEBOUNCE FOR SCROLL EVENTS
// ============================================
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 's' to open signup modal
    if (e.key === 's' || e.key === 'S') {
        openModal();
    }
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// LOCAL STORAGE - REMEMBER USER PREFERENCES
// ============================================
function initializeUserPreferences() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // You can send this data to your analytics service
}

// Track CTA button clicks
document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            buttonText: button.textContent,
            timestamp: new Date()
        });
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    initializeUserPreferences();
});

// ============================================
// ACCESSIBILITY - FOCUS MANAGEMENT
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// DYNAMIC CONTENT LOADING SIMULATION
// ============================================
function loadMoreTestimonials() {
    console.log('Loading more testimonials...');
    // This would typically load content from a server
}

// ============================================
// EXPORT FOR MODULE SYSTEMS
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        handlePrimaryAction,
        handleSecondaryAction,
        handleFormSubmit,
        trackEvent
    };
}
