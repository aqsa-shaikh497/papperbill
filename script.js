// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.mobile-nav').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        document.querySelector('.mobile-nav').classList.remove('active');
    });
});

// Feature Cards Animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Button click animation
const downloadBtn = document.querySelector('.download-btn');

downloadBtn.addEventListener('click', function() {
    // Add your download functionality here
    console.log("Download button clicked!");
    
    // Optional: Add temporary click effect
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Optional: Add animation when page loads
document.addEventListener('DOMContentLoaded', function() {
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
    // Animate compact cards on scroll
    const compactCards = document.querySelectorAll('.compact-card');
    
    const animateCards = function() {
        compactCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    compactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize animations
    window.addEventListener('load', animateCards);
    window.addEventListener('scroll', animateCards);
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
});

document.addEventListener('DOMContentLoaded', function() {
    // Animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const compactCards = document.querySelectorAll('.compact-card');
    
    const animateOnScroll = function() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        compactCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    featureCards.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    compactCards.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
        el.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});

/* q&A */
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentNode;
    item.classList.toggle('active');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
  });
});

//rating

document.querySelectorAll('.star').forEach(star => {
  // Display current average (4.83 = 96.6% of 5 stars)
  if (star.dataset.value <= 4) {
    star.classList.add('active');
  } else if (star.dataset.value < 5) {
    star.style.color = '#FFD700';
    star.style.width = '66%'; // For partial star (4.83 rating)
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
    
    // Here you would typically send the rating to your server
    console.log(`User rated: ${value} stars`);
  });
});