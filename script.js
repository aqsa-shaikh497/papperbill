// ============ MAIN DOCUMENT READY FUNCTION ============
document.addEventListener('DOMContentLoaded', function() {
  // ============ MOBILE MENU TOGGLE ============
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    // Toggle aria-expanded for accessibility
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    // Toggle hamburger icon
    this.textContent = isExpanded ? '☰' : '✕';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-menu-btn') && mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.textContent = '☰';
    }
  });

  // Initialize aria attributes
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');

  // ============ SMOOTH SCROLLING ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      mobileNav.classList.remove('active');
    });
  });

  // ============ FEATURE CARDS ANIMATION ============
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.style.transition = 'all 0.3s ease-out';
    
    // Mouse enter animation
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      this.style.zIndex = '10';
    });
    
    // Mouse leave animation
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
      this.style.zIndex = '1';
    });

    // Touch devices support
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
    }, {passive: true});

    card.addEventListener('touchend', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }, {passive: true});
  });

  // ============ BUTTON ANIMATIONS ============
  // Download button
  const downloadBtn = document.querySelector('.download-btn');
  downloadBtn.addEventListener('click', function() {
    console.log("Download button clicked!");
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });

  // All buttons hover effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    // Ripple effect
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // ============ SCROLL ANIMATIONS ============
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .compact-card');
    elements.forEach(el => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if(elementPosition < screenPosition) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state
  const animatedElements = document.querySelectorAll('.feature-card, .compact-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
  });

  // Initialize animations
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ============ TAB SYSTEM ============
document.addEventListener('DOMContentLoaded', function() {
    // Tab System
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        const activeButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
            activeContent.classList.add('active');
        }
    }
    
    // Add click event to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Initialize first tab as active by default
    if (tabButtons.length > 0) {
        tabButtons[0].setAttribute('aria-selected', 'true');
    }
});
  // ============ RATING SYSTEM ============
  document.querySelectorAll('.star').forEach(star => {
    // Display current average (4.83 = 96.6% of 5 stars)
    if (star.dataset.value <= 4) {
      star.classList.add('active');
    } else if (star.dataset.value < 5) {
      star.style.color = '#FFD700';
      star.style.width = '66%';
      star.style.overflow = 'hidden';
      star.style.display = 'inline-block';
    }

    // Interactive rating
    star.addEventListener('click', function() {
      const value = this.dataset.value;
      const stars = document.querySelectorAll('.star');
      
      stars.forEach(s => {
        s.classList.remove('active');
        s.style.color = '';
        s.style.width = '';
      });
      
      for (let i = 0; i < value; i++) {
        stars[i].classList.add('active');
      }
      
      document.querySelector('.thank-you').classList.add('show');
      console.log(`User rated: ${value} stars`);
    });
  });

  // ============ FAQ ACCORDION ============
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

  // ============ HERO ANIMATION ============
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(20px)';
  heroContent.style.transition = 'all 0.8s ease';
  
  setTimeout(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // Feature card animations
    const featureCards = document.querySelectorAll('.compact-card');
    
    // Animate cards on load
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add click event to feature cards
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            console.log(`Feature selected: ${feature}`);
            // Add your feature click handling here
        });
    });
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
});