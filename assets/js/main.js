document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-4-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-4-line');
            }
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                
                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    // Call function every ms
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + (target > 1000 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger counters when Stats section is in view
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const navLinks = document.getElementById('navLinks');
                    if (navLinks && navLinks.classList.contains('active')) {
                        const menuToggle = document.getElementById('menuToggle');
                        if (menuToggle) {
                            const icon = menuToggle.querySelector('i');
                            navLinks.classList.remove('active');
                            if (icon) {
                                icon.classList.remove('ri-close-line');
                                icon.classList.add('ri-menu-4-line');
                            }
                        }
                    }

                    const offset = 80; // nav height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active state
                    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // ---- Services Page: Stat Counter Animation ----
    const svcStatsSection = document.getElementById('svcStats');
    if (svcStatsSection) {
        const svcCounters = svcStatsSection.querySelectorAll('.svc-counter');

        const animateSvcCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1800;
            const steps = 60;
            const increment = target / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const current = Math.min(Math.ceil(increment * step), target);
                el.textContent = current + suffix;
                if (current >= target) {
                    el.textContent = target + suffix;
                    clearInterval(timer);
                }
            }, duration / steps);
        };

        const svcObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    svcCounters.forEach(el => animateSvcCounter(el));
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        svcObserver.observe(svcStatsSection);
    }

    // ---- About Page: Stat Counter Animation ----
    const aboutStatsSection = document.getElementById('aboutStats');
    if (aboutStatsSection) {
        const aboutCounters = aboutStatsSection.querySelectorAll('.about-counter');

        const animateAboutCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000;
            const steps = 80;
            const increment = target / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const current = Math.min(Math.ceil(increment * step), target);
                el.textContent = current >= 1000
                    ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 0) + 'k' + suffix
                    : current + suffix;
                if (current >= target) {
                    el.textContent = target >= 1000
                        ? (target / 1000) + 'k' + suffix
                        : target + suffix;
                    clearInterval(timer);
                }
            }, duration / steps);
        };

        const aboutObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutCounters.forEach(el => animateAboutCounter(el));
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        aboutObserver.observe(aboutStatsSection);
    }


    // Preloader Logout Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Remove from DOM after fade out
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500); // Small delay for "premium" feel
        }
    });

});
