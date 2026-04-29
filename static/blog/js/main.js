// ===== Modern UI Interactions =====

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFormHandling();
    initializeInteractiveElements();
});

// ===== Initialize Animations =====
function initializeAnimations() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards
    document.querySelectorAll('.card-modern').forEach(card => {
        observer.observe(card);
    });
}

// ===== Form Handling =====
function initializeFormHandling() {
    // Add focus effects to form controls
    const formControls = document.querySelectorAll('.form-control-modern, .form-select, .form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // File input styling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.classList.add('form-control-modern');
        input.style.cursor = 'pointer';
    });
}

// ===== Interactive Elements =====
function initializeInteractiveElements() {
    // Navbar interactivity
    const navLinks = document.querySelectorAll('.nav-link-modern');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Tooltip initialization (if tooltips are used)
    initializeTooltips();
}

// ===== Tooltips =====
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ===== Utility Functions =====

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add Loading State to Forms
function addLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    }
}

// Remove Loading State from Forms
function removeLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.getAttribute('data-original-text') || 'Submit';
    }
}

// Dynamic Image Upload Preview
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // You can add preview logic here if needed
                console.log('File selected:', e.target.files[0].name);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.95';
});

window.addEventListener('load', function() {
    document.body.style.animation = 'fadeIn 0.5s ease';
});
