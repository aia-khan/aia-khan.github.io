document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loading-screen");
    
    // 1. Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // 2. Hide elements initially (except the image)
    gsap.set(".hero-title", { opacity: 0, y: -50 });
    gsap.set(".typewriter", { opacity: 0, y: 20 });
    gsap.set(".hero-buttons", { opacity: 0, y: 20 });
    gsap.set(".scroll-down", { opacity: 0, y: 20 });
    
    // 3. Handle loading screen transition
    if (loadingScreen) {
        setTimeout(() => {
            // Fade out loading screen
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loadingScreen.style.display = "none";
                    // Start animations AFTER loading screen is gone
                    animateHero();
                }
            });
        }, 3000); // 3 second delay for loading screen
    } else {
        // If no loading screen, animate immediately
        animateHero();
    }

    function animateHero() {
        // Clear any existing tweens to prevent conflicts
        gsap.killTweensOf([".hero-title", ".typewriter", ".hero-buttons", ".scroll-down"]);
        
        // Create master timeline
        const tl = gsap.timeline();
        
        // Animate elements in sequence
        tl.to(".hero-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        })
        .to(".typewriter", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .to(".hero-buttons", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        .to(".scroll-down", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.1");
        
        // Start typewriter effect
        startTypewriter();
    }
  
    // Typewriter Effect
    function startTypewriter() {
      const typewriterText = document.getElementById("typewriter-text");
      if (!typewriterText) return;
  
      const strings = [
        "Legitimerad Tandläkare",
        "Driven av kvalitet och omtanke",
        "Trygg i både team och behandling",
        "Här för ditt bästa leende",
      ];
      
      let i = 0, j = 0, currentString = [], isDeleting = false, isEnd = false;
      
      function typeWriter() {
        isEnd = false;
        
        if (i < strings.length) {
          if (!isDeleting && j <= strings[i].length) {
            currentString.push(strings[i][j]);
            j++;
            typewriterText.innerHTML = currentString.join("") + '<span class="cursor">|</span>';
          }
          
          if (isDeleting && j >= 0) {
            currentString.pop();
            j--;
            typewriterText.innerHTML = currentString.join("") + '<span class="cursor">|</span>';
          }
          
          if (j === strings[i].length) {
            isEnd = true;
            isDeleting = true;
          }
          
          if (isDeleting && j === 0) {
            currentString = [];
            isDeleting = false;
            i++;
            if (i === strings.length) i = 0;
          }
        }
        
        const speed = isDeleting ? 40 : 80;
        const delay = isEnd ? 1500 : speed;
        setTimeout(typeWriter, delay);
      }
      
      typeWriter();
    }
  
    // Initialize EmailJS with your User ID
    (function () {
      emailjs.init("iDFSEsjCc1485PZwf"); 
    })();
  
    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formMessage = document.getElementById("formMessage");
        formMessage.style.display = "none";
  
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
  
        // Send email using EmailJS
        emailjs
          .send("service_twja73r", "template_hbhc5m2", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: "Ayakhan9898@gmail.com",
          })
          .then(
            function (response) {
              formMessage.textContent =
                "Tack för ditt meddelande! Jag kommer att svara så snart som möjligt.";
              formMessage.style.color = "#80FFDB";
              formMessage.style.display = "block";
              contactForm.reset();
            },
            function (error) {
              formMessage.textContent =
                "Något gick fel. Vänligen försök igen senare eller kontakta mig direkt på Ayakhan9898@gmail.com";
              formMessage.style.color = "#ff6b6b";
              formMessage.style.display = "block";
            }
          );
      });
    }
  
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  
    // Scroll down arrow functionality
    const scrollDownArrow = document.getElementById("scrollDownArrow");
    if (scrollDownArrow) {
      scrollDownArrow.addEventListener("click", function () {
        window.scrollBy({
          top: window.innerHeight - 80, // Adjust for navbar height
          behavior: "smooth",
        });
      });
    }
  
    // Initialize particles.js
    if (
      typeof particlesJS !== "undefined" &&
      document.getElementById("particles-js")
    ) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#80FFDB" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#80FFDB",
            opacity: 0.2,
            width: 1,
          },
          move: { enable: true, speed: 2, direction: "none", random: true },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    }
  
    // About Section Animations
    gsap.utils.toArray(
      "#about .section-title, #about .col-lg-5, #about .col-lg-7 h3, #about .col-lg-7 p, #about .highlight-item"
    ).forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  
    // Skills Section Animations
    gsap.utils.toArray("#skills .section-title, #skills .text-center, .skill-category")
      .forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
  
    // Contact Section Animations
    gsap.utils.toArray(
      "#contact .section-title, #contact .text-center, #contact .contact-info, #contact .glass-box"
    ).forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  
    // Timeline Animations
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 75%",
        onEnter: () => {
          gsap.to(item, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            delay: index * 0.1,
            ease: "power3.out",
            onComplete: () => {
              item.classList.add("animate");
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(item, { duration: 0.3, opacity: 0, y: 30 });
          item.classList.remove("animate");
        },
      });
    });
  
    // Floating animation for hero image
    gsap.to(".floating", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  
    // Scroll arrow animation
    gsap.to(".scroll-arrow", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  
    // Hero image hover effects
    const heroImg = document.querySelector(".hero-img");
    const heroDecoration = document.querySelector(".hero-img-decoration");
  
    if (heroImg && heroDecoration) {
      heroImg.addEventListener("mouseenter", () => {
        gsap.to(heroDecoration, {
          duration: 0.5,
          borderWidth: "4px",
          borderColor: "var(--accent)",
          ease: "power2.out",
        });
      });
  
      heroImg.addEventListener("mouseleave", () => {
        gsap.to(heroDecoration, {
          duration: 0.5,
          borderWidth: "2px",
          borderColor: "var(--secondary)",
          ease: "power2.out",
        });
      });
    }
  
    // Update active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    function updateActiveNav() {
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = `#${section.id}`;
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === current) {
          link.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();
  });