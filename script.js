// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR =====
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop default jump behavior
            
            // Get the section to scroll to
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Calculate position (accounting for fixed navbar)
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to the section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // ===== FADE-IN ANIMATION ON SCROLL =====
    // This makes sections appear as you scroll down
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Add initial hidden class
    sections.forEach(section => {
        if (section.id !== 'home') { // Don't hide home section
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    });
    
    // Function to reveal sections when scrolling
    function revealOnScroll() {
        sections.forEach(section => {
            if (section.id !== 'home') {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // If section is in view
                if (rect.top < windowHeight * 0.75) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Check once on page load
    revealOnScroll();
    
    // ===== HIGHLIGHT ACTIVE NAVIGATION LINK =====
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== TYPING EFFECT FOR NAME (OPTIONAL BONUS) =====
    const nameElement = document.querySelector('.highlight');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                nameElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100); // Speed of typing (milliseconds)
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    console.log('Portfolio website loaded successfully! 🚀');
});
