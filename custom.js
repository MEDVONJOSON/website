
  (function ($) {
  
  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });

    // CUSTOM LINK
    $('.custom-link').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 10;

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
  }
});
    
  })(window.jQuery);

  // Menu Loading System
  $(document).ready(function() {
    // Menu loading functionality
    var loadingOverlay = document.getElementById('menuLoadingOverlay');
    var loadingText = document.getElementById('loadingText');
    var loadingBar = document.getElementById('loadingBar');
    var loadingPercentage = document.getElementById('loadingPercentage');
    var isLoading = false;

    // Menu item texts for loading
    var menuTexts = {
      '#section_1': 'Loading Home...',
      '#section_2': 'Loading About...',
      '#section_resume': 'Loading Resume...',
      '#section_3': 'Loading Services...',
      '#section_4': 'Loading Projects...',
      '#section_5': 'Loading Contact...'
    };

    // Function to show loading overlay
    function showLoading(targetText) {
      if (isLoading) return;
      
      isLoading = true;
      loadingText.textContent = targetText;
      loadingBar.style.width = '0%';
      loadingPercentage.textContent = '0%';
      loadingOverlay.classList.add('show');
      
      // Animate progress bar over 1 second
      var progress = 0;
      var interval = setInterval(function() {
        progress += 10; // 100% over 1 second (10% every 100ms)
        loadingBar.style.width = progress + '%';
        loadingPercentage.textContent = Math.round(progress) + '%';
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(function() {
            loadingOverlay.classList.remove('show');
            isLoading = false;
          }, 150);
        }
      }, 100);
    }

    // Override menu click behavior
    $('.navbar-nav .nav-link').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');
      var targetText = menuTexts[target] || 'Loading...';
      
      showLoading(targetText);
      
      // Navigate after 1 second
      setTimeout(function() {
        if (target === '#section_1') {
          $('html, body').animate({scrollTop: 0}, 300);
        } else {
          var elWrapped = $(target);
          var header_height = $('.navbar').height() + 10;
          var offset = elWrapped.offset();
          var offsetTop = offset.top;
          var totalScroll = offsetTop - header_height;
          
          $('body,html').animate({
            scrollTop: totalScroll
          }, 300);
        }
      }, 2000);
    });

    // Override custom-link behavior
    $('.custom-link').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');
      var targetText = menuTexts[target] || 'Loading...';
      
      showLoading(targetText);
      
      // Navigate after 1 second
      setTimeout(function() {
        var elWrapped = $(target);
        var header_height = $('.navbar').height() + 10;
        var offset = elWrapped.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop - header_height;
        
        $('body,html').animate({
          scrollTop: totalScroll
        }, 300);
      }, 2500);
    });
  });

  // Animation trigger for resume section
  $(document).ready(function() {
    // Function to check if element is in viewport (more lenient)
    function isInViewport(element) {
      var rect = element.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Element is in viewport if any part of it is visible
      return (
        rect.top < windowHeight && 
        rect.bottom > 0
      );
    }

    // Function to trigger animations
    function triggerAnimations() {
      // Target the main resume section
      var mainResumeSection = document.querySelector('#section_resume');
      var resumeSections = document.querySelectorAll('.resume-section');
      var featuredSection = document.querySelector('.featured');
      var skillsSection = document.querySelector('.skills');
      
      // Check main resume section first
      if (mainResumeSection && isInViewport(mainResumeSection)) {
        resumeSections.forEach(function(section) {
          if (!section.classList.contains('visible')) {
            section.classList.add('visible');
            console.log('Resume section animation triggered!');
          }
        });
      }
      
      // Also check individual sections
      resumeSections.forEach(function(section) {
        if (isInViewport(section) && !section.classList.contains('visible')) {
          section.classList.add('visible');
          console.log('Individual resume section animation triggered!');
        }
      });
      
      // Personal Information section animation
      if (featuredSection && isInViewport(featuredSection)) {
        if (!featuredSection.classList.contains('visible')) {
          featuredSection.classList.add('visible');
          console.log('Personal Information section animation triggered!');
        }
      }
      
      // Skills section animation
      if (skillsSection && isInViewport(skillsSection)) {
        if (!skillsSection.classList.contains('visible')) {
          skillsSection.classList.add('visible');
          console.log('Skills section animation triggered!');
          
          // Animate progress bars
          setTimeout(function() {
            var skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach(function(bar) {
              var targetWidth = bar.getAttribute('data-width');
              if (targetWidth) {
                bar.style.width = targetWidth + '%';
                bar.setAttribute('aria-valuenow', targetWidth);
              }
            });
            
            // Animate featured progress bars and counters
            var featuredBars = document.querySelectorAll('.featured-progress-bar .progress-bar');
            var featuredNumbers = document.querySelectorAll('.featured-numbers');
            
            featuredBars.forEach(function(bar) {
              var targetWidth = bar.getAttribute('data-width');
              if (targetWidth) {
                bar.style.width = targetWidth + '%';
                bar.setAttribute('aria-valuenow', targetWidth);
              }
            });
            
            // Animate counters
            featuredNumbers.forEach(function(counter) {
              var target = parseInt(counter.getAttribute('data-target'));
              var suffix = counter.textContent.includes('+') ? '+' : '';
              var duration = 2000; // 2 seconds
              var increment = target / (duration / 16); // 60fps
              var current = 0;
              
              var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + suffix;
              }, 16);
            });
          }, 500);
        }
      }
    }

    // Trigger on scroll with throttling
    var scrollTimeout;
    $(window).on('scroll', function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(triggerAnimations, 100);
    });

    // Trigger on page load
    setTimeout(triggerAnimations, 500);
    
    // Fallback: Auto-trigger animation after 3 seconds
    setTimeout(function() {
      var resumeSections = document.querySelectorAll('.resume-section');
      var featuredSection = document.querySelector('.featured');
      var skillsSection = document.querySelector('.skills');
      
      resumeSections.forEach(function(section) {
        if (!section.classList.contains('visible')) {
          section.classList.add('auto-trigger');
          console.log('Fallback animation triggered!');
        }
      });
      
      // Personal Information fallback
      if (featuredSection && !featuredSection.classList.contains('visible')) {
        featuredSection.classList.add('auto-trigger');
        console.log('Personal Information fallback animation triggered!');
      }
      
      // Skills section fallback
      if (skillsSection && !skillsSection.classList.contains('visible')) {
        skillsSection.classList.add('auto-trigger');
        console.log('Skills section fallback animation triggered!');
        
        // Animate progress bars
        setTimeout(function() {
          var skillBars = document.querySelectorAll('.skill-bar');
          skillBars.forEach(function(bar) {
            var targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              bar.style.width = targetWidth + '%';
              bar.setAttribute('aria-valuenow', targetWidth);
            }
          });
          
          // Animate featured progress bars and counters
          var featuredBars = document.querySelectorAll('.featured-progress-bar .progress-bar');
          var featuredNumbers = document.querySelectorAll('.featured-numbers');
          
          featuredBars.forEach(function(bar) {
            var targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              bar.style.width = targetWidth + '%';
              bar.setAttribute('aria-valuenow', targetWidth);
            }
          });
          
          // Animate counters
          featuredNumbers.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var suffix = counter.textContent.includes('+') ? '+' : '';
            var duration = 2000; // 2 seconds
            var increment = target / (duration / 16); // 60fps
            var current = 0;
            
            var timer = setInterval(function() {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = Math.floor(current) + suffix;
            }, 16);
          });
        }, 500);
      }
    }, 3000);
    
    // Also trigger when window is resized
    $(window).on('resize', function() {
      triggerAnimations();
    });
    
    // Debug: Add click trigger for testing
    $(document).on('click', '.resume-section-title', function() {
      var section = $(this).closest('.resume-section');
      if (!section.hasClass('visible')) {
        section.addClass('visible');
        console.log('Animation triggered by click!');
      }
    });
    
    // Debug: Add click trigger for Personal Information
    $(document).on('click', '.profile-title h4', function() {
      var featuredSection = document.querySelector('.featured');
      if (featuredSection && !featuredSection.classList.contains('visible')) {
        featuredSection.classList.add('visible');
        console.log('Personal Information animation triggered by click!');
      }
    });
    
    // Debug: Add click trigger for Skills section
    $(document).on('click', '.skill-category-title', function() {
      var skillsSection = document.querySelector('.skills');
      if (skillsSection && !skillsSection.classList.contains('visible')) {
        skillsSection.classList.add('visible');
        console.log('Skills section animation triggered by click!');
        
        // Animate progress bars
        setTimeout(function() {
          var skillBars = document.querySelectorAll('.skill-bar');
          skillBars.forEach(function(bar) {
            var targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              bar.style.width = targetWidth + '%';
              bar.setAttribute('aria-valuenow', targetWidth);
            }
          });
          
          // Animate featured progress bars and counters
          var featuredBars = document.querySelectorAll('.featured-progress-bar .progress-bar');
          var featuredNumbers = document.querySelectorAll('.featured-numbers');
          
          featuredBars.forEach(function(bar) {
            var targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              bar.style.width = targetWidth + '%';
              bar.setAttribute('aria-valuenow', targetWidth);
            }
          });
          
          // Animate counters
          featuredNumbers.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var suffix = counter.textContent.includes('+') ? '+' : '';
            var duration = 2000; // 2 seconds
            var increment = target / (duration / 16); // 60fps
            var current = 0;
            
            var timer = setInterval(function() {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = Math.floor(current) + suffix;
            }, 16);
          });
        }, 500);
      }
    });
  });


