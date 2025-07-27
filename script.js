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

//fixed button
  document.querySelector('.floating-btn').addEventListener('click', function() {
  // Add your download functionality here
  window.location.href = '#download'; // or your download link
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

  document.querySelectorAll('.star').forEach(star => {
    // Display current average rating (4.83)
    const averageRating = 4.83;
    const starValue = parseInt(star.dataset.value);
    
    // Full stars for whole numbers
    if (starValue <= Math.floor(averageRating)) {
        star.classList.add('active');
    } 
    // Partial star for decimal
    else if (starValue === Math.ceil(averageRating)) {
        const percentage = (averageRating - Math.floor(averageRating)) * 100;
        star.innerHTML = '★';
        star.style.position = 'relative';
        star.style.display = 'inline-block';
        star.style.color = '#ccc'; // Base color
        
        // Create partial fill effect
        star.innerHTML += `<span style="position: absolute; left: 0; top: 0; width: ${percentage}%; overflow: hidden; color: #FFD700;">★</span>`;
    }
    
    // Interactive rating
    star.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        const stars = document.querySelectorAll('.star');
        const ratingDisplay = document.querySelector('.current-rating .average');
        const thankYou = document.querySelector('.thank-you');
        
        // Update visual stars
        stars.forEach((s, index) => {
            s.classList.toggle('active', index < value);
            s.style.color = '';
            s.innerHTML = '★'; // Reset partial stars
            
            // Remove any existing partial star spans
            if (s.querySelector('span')) {
                s.querySelector('span').remove();
            }
        });
        
        // Update displayed rating
        ratingDisplay.textContent = value.toFixed(2);
        
        // Show thank you message
        thankYou.classList.add('show');
        setTimeout(() => thankYou.classList.remove('show'), 2000);
        
        console.log(`User rated: ${value} stars`);
        
        // Here you would typically send the rating to your server
        // sendRatingToServer(value);
    });
});

        // FAQ accordion functionality//
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Add toggle icon if it doesn't exist
        if (!question.querySelector('.toggle-icon')) {
            const icon = document.createElement('span');
            icon.className = 'toggle-icon';
            icon.textContent = '+';
            question.appendChild(icon);
        }
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.toggle-icon');
                    if (otherIcon) {
                        otherIcon.textContent = '+';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Update icon
            const icon = question.querySelector('.toggle-icon');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.textContent = '×'; // or '−' for minus
                    icon.style.transform = 'rotate(45deg)';
                } else {
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                }
            }
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

// ============ SLIDER FUNCTIONALITY ============

document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.nav-btn');
    let autoSlideInterval;
    const SLIDE_INTERVAL = 3000;
    // 3 seconds

    // Initialize slider on page load
    function initSlider() {
        updateSlider();
        startAutoSlide();
        
        // Optional: Pause on hover for better UX
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
            sliderContainer.addEventListener('mouseleave', resumeAutoSlide);
        }
    }

    function updateSlider() {
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        navButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
        }
    }

    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }

    function resumeAutoSlide() {
        if (!autoSlideInterval) {
            startAutoSlide();
        }
    }

    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }

    // Initialize everything when page loads
    initSlider();

    // Add click handlers for navigation buttons
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => goToSlide(index));
    });

    // Optional: Clean up interval when leaving page
    window.addEventListener('beforeunload', pauseAutoSlide);
});


// Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // FAQ accordion functionality//
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });


document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const track = document.querySelector('.view-track');
    const views = document.querySelectorAll('.software-view');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 3000; // 3 seconds per slide

    // Initialize
    updateSlidePosition();
    startAutoSlide();

    // Tab click event
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentIndex = index;
            updateActiveTab();
            updateSlidePosition();
            resetAutoSlide();
        });
    });

    function updateSlidePosition() {
        // Apply smooth transition for normal slides
        track.style.transition = 'transform 0.6s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * 25}%)`;
        
        // Check if we need to loop (after last slide)
        if (currentIndex >= views.length) {
            setTimeout(() => {
                // Disable transition for instant reset
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = 'translateX(0%)';
                updateActiveTab();
                
                // Force reflow and re-enable transition
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s ease-in-out';
            }, 600); // Wait for the slide animation to finish
        }
    }

    function updateActiveTab() {
        tabs.forEach(tab => tab.classList.remove('active'));
        const activeTabIndex = currentIndex % views.length;
        tabs[activeTabIndex].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            updateActiveTab();
            updateSlidePosition();
        }, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Pause on hover
    const viewport = document.querySelector('.showcase-viewport');
    viewport.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    viewport.addEventListener('mouseleave', startAutoSlide);
});

                
   