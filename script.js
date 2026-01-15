// Audio Amplifier Project - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initNavigationHighlight();
    initTeamMemberHover();
    initResultCards();
    initScrollAnimations();
    initPageLoadEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Add active class to current section in navigation
function initNavigationHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Set initial active link based on URL hash
    const currentHash = window.location.hash;
    if (currentHash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add hover effect to team members
function initTeamMemberHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.member-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.backgroundColor = 'var(--accent-color)';
            
            // Add subtle pulse animation
            icon.style.animation = 'pulse 0.5s ease';
        });
        
        member.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.member-icon');
            icon.style.transform = 'scale(1)';
            icon.style.backgroundColor = 'var(--secondary-color)';
            icon.style.animation = '';
        });
    });
}

// Add click effect to result cards
function initResultCards() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            // Get result type
            const cardType = this.classList.contains('audio-quality') ? 'Audio Quality' :
                           this.classList.contains('power-efficiency') ? 'Power Efficiency' : 'Reliability';
            
            // Show a simple alert (could be enhanced with modal)
            console.log(`Result card clicked: ${cardType}`);
            
            // Reset animation after delay
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

// Add animation to section numbers on scroll
function initScrollAnimations() {
    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section number
                const sectionNumber = entry.target.querySelector('.section-number');
                if (sectionNumber && !sectionNumber.classList.contains('animated')) {
                    sectionNumber.classList.add('animated');
                    sectionNumber.style.animation = 'pulse 0.6s ease';
                }
                
                // Animate methodology steps
                const steps = entry.target.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                        step.style.opacity = '0';
                    }, 100);
                });
                
                // Animate result cards
                const resultCards = entry.target.querySelectorAll('.result-card');
                resultCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                        card.style.opacity = '0';
                    }, 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Page load effects
function initPageLoadEffects() {
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Animate team members on page load
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.style.animation = `fadeInUp 0.5s ease forwards`;
            member.style.opacity = '0';
        }, 300 + (index * 100));
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Report';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Add CSS for print
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            .nav-container, .print-button {
                display: none !important;
            }
            
            .section {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                page-break-inside: avoid;
            }
            
            header {
                background: #2c3e50 !important;
                -webkit-print-color-adjust: exact;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// Additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s
