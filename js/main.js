/* ============================================================
   PK Portfolio — Main JavaScript
   Greeting rotation · Typing · Dark mode · Resume panel
   Scroll animations · Navbar · Hamburger · Modals · Skills
   ============================================================ */

(function () {
    'use strict';

    /* -------------------------------------------------------
       Loading Screen
       ------------------------------------------------------- */
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    let loadProgress = 0;

    function advanceLoading() {
        loadProgress += Math.random() * 30 + 10;
        if (loadProgress > 100) loadProgress = 100;
        loadingBar.style.width = loadProgress + '%';

        if (loadProgress < 100) {
            setTimeout(advanceLoading, 200 + Math.random() * 200);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                revealInitial();
            }, 400);
        }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => {
        setTimeout(advanceLoading, 100);
    });

    /* -------------------------------------------------------
       Scroll Reveal (IntersectionObserver)
       ------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    function initReveal() {
        revealElements.forEach((el) => revealObserver.observe(el));
    }

    /* -------------------------------------------------------
       Multi-Language Greeting Rotation
       ------------------------------------------------------- */
    const GREETINGS = [
        'Namaste 👋',
        'Hi 👋',
        'Hola 👋',
        'Bonjour 👋',
        'Ciao 👋',
        'Hallo 👋',
        'Olá 👋',
        'こんにちは 👋',
        '안녕하세요 👋',
        '你好 👋'
    ];

    const greetingEl = document.querySelector('.hero-greeting-line');
    let greetingIndex = 0;
    let greetingInterval = null;

    function startGreetingRotation() {
        greetingEl.textContent = GREETINGS[0];
        greetingEl.classList.add('fade-in');

        greetingInterval = setInterval(() => {
            // Fade out
            greetingEl.classList.remove('fade-in');
            greetingEl.classList.add('fade-out');

            setTimeout(() => {
                greetingIndex = (greetingIndex + 1) % GREETINGS.length;
                greetingEl.textContent = GREETINGS[greetingIndex];
                greetingEl.classList.remove('fade-out');
                greetingEl.classList.add('fade-in');
            }, 300);
        }, 2300);
    }

    /* -------------------------------------------------------
       Hero Entry Animation + Typing Effect
       ------------------------------------------------------- */
    const FULL_NAME = 'Pranjal Khare';
    const FIRST_NAME_LEN = 8; // "Pranjal " — index where surname starts
    const TYPING_SPEED = 90;
    const heroTypingText = document.getElementById('heroTypingText');
    const heroCursor = document.getElementById('heroCursor');

    function typeHeroName() {
        let i = 0;
        function typeChar() {
            if (i <= FULL_NAME.length) {
                const currentText = FULL_NAME.slice(0, i);
                if (i <= FIRST_NAME_LEN) {
                    heroTypingText.innerHTML = currentText;
                } else {
                    heroTypingText.innerHTML =
                        FULL_NAME.slice(0, FIRST_NAME_LEN) +
                        '<span class="highlight">' + currentText.slice(FIRST_NAME_LEN) + '</span>';
                }
                i++;
                setTimeout(typeChar, TYPING_SPEED);
            } else {
                setTimeout(() => {
                    heroCursor.style.animation = 'none';
                    heroCursor.style.opacity = '0';
                }, 2000);
            }
        }
        typeChar();
    }

    function revealInitial() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image-wrapper');

        if (heroContent) heroContent.classList.add('hero-entered');
        if (heroImage) heroImage.classList.add('hero-entered');

        document.querySelectorAll('.hero .reveal').forEach((el) => {
            el.classList.add('revealed');
        });

        // Start typing then greeting rotation
        setTimeout(typeHeroName, 400);
        setTimeout(startGreetingRotation, 200);
    }

    initReveal();

    /* -------------------------------------------------------
       Navbar scroll behavior
       ------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* -------------------------------------------------------
       Hamburger / Mobile Menu
       ------------------------------------------------------- */
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMobileMenu() {
        const isOpen = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    /* -------------------------------------------------------
       Escape key — close everything
       ------------------------------------------------------- */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu.classList.contains('active')) toggleMobileMenu();
            closeAllModals();
            closeResumePanel();
        }
    });

    /* -------------------------------------------------------
       Smooth Scroll for anchor links
       ------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* -------------------------------------------------------
       Skill Category Tabs
       ------------------------------------------------------- */
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            skillTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            skillCards.forEach((card) => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* -------------------------------------------------------
       Skills Show More / Less Toggle
       ------------------------------------------------------- */
    const skillsGrid = document.getElementById('skillsGrid');
    const skillsToggleBtn = document.getElementById('skillsToggleBtn');

    if (skillsGrid) skillsGrid.classList.add('collapsed');

    if (skillsToggleBtn) {
        skillsToggleBtn.addEventListener('click', () => {
            const isCollapsed = skillsGrid.classList.toggle('collapsed');
            const icon = skillsToggleBtn.querySelector('.material-symbols-outlined');
            if (isCollapsed) {
                icon.textContent = 'expand_more';
                skillsToggleBtn.lastChild.textContent = ' Show More Skills';
            } else {
                icon.textContent = 'expand_less';
                skillsToggleBtn.lastChild.textContent = ' Show Less Skills';
            }
        });

        // Auto-expand when a category tab is selected
        skillTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                if (skillsGrid.classList.contains('collapsed')) {
                    skillsGrid.classList.remove('collapsed');
                    const icon = skillsToggleBtn.querySelector('.material-symbols-outlined');
                    icon.textContent = 'expand_less';
                    skillsToggleBtn.lastChild.textContent = ' Show Less Skills';
                }
            });
        });
    }

    /* -------------------------------------------------------
       Modal System (architecture modal)
       ------------------------------------------------------- */
    function openModal(modalEl) {
        modalEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalEl) {
        modalEl.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay.active').forEach((m) => closeModal(m));
    }

    // Old resume modal still wired (hero Resume button now opens side panel)
    const resumeBtn = document.getElementById('resumeBtn');
    const archModal = document.getElementById('archModal');
    const archModalClose = document.getElementById('archModalClose');

    document.querySelectorAll('.arch-card').forEach((card) => {
        card.addEventListener('click', () => openModal(archModal));
    });
    archModalClose.addEventListener('click', () => closeModal(archModal));

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });
    });

    /* -------------------------------------------------------
       Resume Side Panel
       ------------------------------------------------------- */
    const resumePanel = document.getElementById('resumePanel');
    const resumePanelOverlay = document.getElementById('resumePanelOverlay');
    const resumePanelClose = document.getElementById('resumePanelClose');
    const resumePanelBody = document.getElementById('resumePanelBody');
    const floatingResumeBtn = document.getElementById('floatingResumeBtn');

    let resumeLoaded = false;
    const RESUME_PATH = 'public/resume/pranjal-khare-resume.pdf';

    function openResumePanel() {
        resumePanel.classList.add('active');
        resumePanelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Lazy load PDF on first open
        if (!resumeLoaded) {
            const iframe = document.createElement('iframe');
            iframe.src = RESUME_PATH;
            iframe.title = 'Resume — Pranjal Khare';

            // Check if PDF exists; if not, keep placeholder
            iframe.onerror = () => {
                // PDF not found — keep placeholder
            };

            // Only replace placeholder if we can potentially load
            const placeholder = resumePanelBody.querySelector('.resume-panel-placeholder');
            if (placeholder) {
                resumePanelBody.innerHTML = '';
                resumePanelBody.appendChild(iframe);
            }
            resumeLoaded = true;
        }
    }

    function closeResumePanel() {
        resumePanel.classList.remove('active');
        resumePanelOverlay.classList.remove('active');
        if (!document.querySelector('.modal-overlay.active')) {
            document.body.style.overflow = '';
        }
    }

    // Wire up all resume triggers
    if (resumeBtn) resumeBtn.addEventListener('click', openResumePanel);
    floatingResumeBtn.addEventListener('click', openResumePanel);
    resumePanelClose.addEventListener('click', closeResumePanel);
    resumePanelOverlay.addEventListener('click', closeResumePanel);

    /* -------------------------------------------------------
       Dark / Light Mode Toggle
       ------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const nightOverlay = document.getElementById('nightVisionOverlay');
    const nightVisionText = document.getElementById('nightVisionText');

    // Detect system preference
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Initialize theme
    function initTheme() {
        const saved = localStorage.getItem('pk-theme');
        const theme = saved || getSystemTheme();
        applyTheme(theme, false);
    }

    function applyTheme(theme, animate) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        localStorage.setItem('pk-theme', theme);

        if (animate) {
            showModeOverlay(theme === 'dark' ? 'Dark Mode 🦉' : 'Light Mode ☀️');
        }
    }

    function showModeOverlay(text) {
        nightVisionText.textContent = text;
        nightOverlay.classList.add('active');
        setTimeout(() => {
            nightOverlay.classList.remove('active');
        }, 1000);
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('pk-theme')) {
            applyTheme(e.matches ? 'dark' : 'light', false);
        }
    });

    initTheme();

    /* -------------------------------------------------------
       Contact Form (basic UX)
       ------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#10B981';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2500);
        }, 1200);
    });

    /* -------------------------------------------------------
       Cursor Interaction Hooks (future-ready)
       ------------------------------------------------------- */
    document.querySelectorAll('.btn, .project-card, .skill-card, .nav-cta').forEach((el) => {
        el.setAttribute('data-cursor', 'interactive');
    });

    document.querySelectorAll('.project-overlay-btn, .social-link').forEach((el) => {
        el.setAttribute('data-cursor', 'magnetic');
    });

    /* -------------------------------------------------------
       Performance: Lazy observer for images
       ------------------------------------------------------- */
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading
    } else {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imgObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
            imgObserver.observe(img);
        });
    }

})();
