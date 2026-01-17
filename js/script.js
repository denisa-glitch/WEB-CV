// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const messageForm = document.getElementById('messageForm');
const currentYear = document.getElementById('currentYear');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Section Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Remove active class from all links and sections
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            // Reset animation
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show target section with animation
        const targetSection = document.querySelector(targetId);
        setTimeout(() => {
            targetSection.classList.add('active');
            // Trigger reflow for animation
            targetSection.offsetHeight;
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 10);
        
        // Scroll to top of section
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Tab Switching in Experience Section
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        alert('Harap lengkapi semua field yang diperlukan.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll show a success message
    const successMessage = `
        Terima kasih ${name}!
        
        Pesan Anda telah berhasil dikirim.
        
        Detail:
        - Nama: ${name}
        - Email: ${email}
        - Subjek: ${subject}
        
        Saya akan membalas pesan Anda ke ${email} secepatnya.
    `;
    
    alert(successMessage);
    
    // Reset form
    messageForm.reset();
});

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = this.nextElementSibling;
        if (fallback && fallback.classList.contains('image-fallback')) {
            fallback.style.display = 'flex';
        }
    });
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(skillBar => {
        const section = skillBar.closest('.section');
        if (section.classList.contains('active')) {
            // Get the width from the style attribute
            const width = skillBar.style.width;
            // Reset and animate
            skillBar.style.width = '0';
            setTimeout(() => {
                skillBar.style.width = width;
            }, 300);
        }
    });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show home section
    const homeSection = document.querySelector('#home');
    homeSection.classList.add('active');
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
    
    // Highlight first tab in experience section
    document.querySelector('[data-tab="organisasi"]').classList.add('active');
    document.querySelector('#organisasi').classList.add('active');
    
    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.experience-item, .stat-item, .timeline-item, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Animate skill bars when in view
        const aboutSection = document.querySelector('#about');
        if (aboutSection.classList.contains('active')) {
            animateSkillBars();
        }
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.experience-item, .stat-item, .timeline-item, .skill-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    setTimeout(animateOnScroll, 300);
    
    // Check if images loaded successfully
    const profileImage = document.querySelector('.profile-img');
    if (profileImage && profileImage.complete && profileImage.naturalHeight === 0) {
        // Image failed to load
        profileImage.style.display = 'none';
        const fallback = document.querySelector('.image-fallback');
        if (fallback) {
            fallback.style.display = 'flex';
        }
    }
});

// Log website info
console.log("Website CV Denisa Ayu Agustin telah dimuat!");
console.log("NRP: 152024171");
console.log("Institut Teknologi Nasional Bandung");
console.log("Semester: 3");