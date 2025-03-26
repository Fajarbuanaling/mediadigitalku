document.addEventListener('DOMContentLoaded', function () {
  // Cache DOM elements
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const roleElement = document.querySelector('.role-text');
  const sections = document.querySelectorAll('section, .hero-content');
  const revealElements = document.querySelectorAll('.reveal');

  // Constants
  const TYPING_CONFIG = {
    roles: ['Web Developer', 'Frontend Designer', 'UI/UX Enthusiast', 'Coder'],
    typingDelay: 150,
    erasingDelay: 100,
    newTextDelay: 2000,
  };

  // Hamburger Menu Functions
  function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isExpanded);
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Typing Effect
  function setupTypingEffect() {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
      const currentRole = TYPING_CONFIG.roles[roleIndex];
      let delay = TYPING_CONFIG.typingDelay;

      if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        delay = TYPING_CONFIG.erasingDelay;
      } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        delay = TYPING_CONFIG.newTextDelay;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % TYPING_CONFIG.roles.length;
      }

      requestAnimationFrame(() => setTimeout(typeText, delay));
    }

    setTimeout(typeText, 1000);
  }

  // Scroll Functions
  function updateActiveLink() {
    const scrollPosition = window.pageYOffset;
    let current = '';

    sections.forEach((section) => {
      if (!section.id) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop - 200) {
        current = section.id;
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (current && item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      } else if (scrollPosition < 100 && item.getAttribute('href') === '#home') {
        item.classList.add('active');
      }
    });
  }

  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Close menu if open
      closeMenu();
    }
  }

  function handleReveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  }

  // Event Listeners
  hamburger.addEventListener('click', toggleMenu);
  navItems.forEach((item) => item.addEventListener('click', closeMenu));
  document.querySelector('.typing-effect')?.addEventListener('click', (e) => e.preventDefault());
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', smoothScroll);
  });

  // Throttled scroll event listeners
  const throttledUpdateActiveLink = throttle(updateActiveLink, 100);
  const throttledHandleReveal = throttle(handleReveal, 100);

  window.addEventListener('scroll', () => {
    throttledUpdateActiveLink();
    throttledHandleReveal();
  });

  // Utility function for throttling
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Initialize
  setupTypingEffect();
  updateActiveLink();
  handleReveal();
});

// Tambahkan ini ke dalam file script.js yang ada

// Reveal on scroll
function revealElements() {
  const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });

  // Juga aktifkan fade-in
  const fades = document.querySelectorAll('.about-img');
  fades.forEach((fade) => {
    const windowHeight = window.innerHeight;
    const elementTop = fade.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      fade.classList.add('active');
    }
  });
}

// Animasi counting untuk statistik
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');

  stats.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-count'));
    const count = +stat.innerText;
    const speed = 200; // Waktu dalam ms untuk setiap increment

    if (count < target) {
      stat.innerText = Math.ceil(count + target / speed);
      setTimeout(animateStats, 1);
    } else {
      stat.innerText = target;
    }
  });
}

// Start animation when scrolled to about section
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Stats animation only when in viewport
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(aboutStats);
}

// Tambahkan ini ke file script.js yang sudah ada

// Project Filtering
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Update active class
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach((card) => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.add('show');
          }, 100);
        } else {
          card.style.display = 'none';
          card.classList.remove('show');
        }
      });
    });
  });
}

// Project Modal
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.close-modal');
  const modalContent = document.getElementById('modal-content-container');
  const detailButtons = document.querySelectorAll('.view-details-btn');

  // Project details data (in a real application, this might come from a database or API)
  const projectDetails = {
    project1: {
      title: 'ShopEase E-commerce',
      description: `
                <p>ShopEase adalah platform e-commerce modern yang menyediakan pengalaman belanja online yang mudah dan aman. Proyek ini dikembangkan untuk memenuhi kebutuhan toko online dengan fitur lengkap dan performa tinggi.</p>
                
                <h4>Tantangan:</h4>
                <p>Mengembangkan sistem e-commerce yang aman, cepat, dan mudah digunakan dengan integrasi pembayaran dan manajemen inventaris yang efisien.</p>
                
                <h4>Solusi:</h4>
                <ul>
                    <li>Arsitektur MERN stack (MongoDB, Express, React, Node.js) untuk performa dan skalabilitas</li>
                    <li>Integrasi Stripe API untuk pemrosesan pembayaran</li>
                    <li>Sistem manajemen inventaris real-time</li>
                    <li>Autentikasi JWT dengan fitur OAuth</li>
                    <li>Responsive design dengan Material UI</li>
                </ul>
                
                <div class="project-gallery">
                    <img src="img/fotou.png" alt="ShopEase Dashboard">
                    <img src="img/project1-detail2.jpg" alt="ShopEase Mobile View">
                    <img src="img/project1-detail3.jpg" alt="ShopEase Checkout">
                </div>
                
                <h4>Hasil:</h4>
                <p>Platform e-commerce yang berhasil meningkatkan konversi penjualan sebesar 30% dan mengurangi waktu checkout sebesar 45% dibandingkan sistem sebelumnya.</p>
            `,
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API', 'JWT', 'Material UI'],
    },
    project2: {
      title: 'FitTrack Mobile App',
      description: `
                <p>FitTrack adalah aplikasi mobile yang membantu pengguna melacak aktivitas fitness, membuat program latihan, dan monitor kemajuan kesehatan. Aplikasi ini juga mendukung sinkronisasi dengan perangkat wearable.</p>
                
                <h4>Tantangan:</h4>
                <p>Mengembangkan aplikasi mobile cross-platform dengan dukungan offline dan integrasi dengan sensor perangkat.</p>
                
                <h4>Solusi:</h4>
                <ul>
                    <li>React Native untuk pengembangan cross-platform (iOS & Android)</li>
                    <li>Firebase untuk backend dan sinkronisasi data</li>
                    <li>Redux untuk state management</li>
                    <li>Integration dengan Health API dari Google dan Apple</li>
                    <li>Offline support dengan local storage dan sinkronisasi saat online</li>
                </ul>
                
                <div class="project-gallery">
                    <img src="img/project2-detail1.jpg" alt="FitTrack Dashboard">
                    <img src="img/project2-detail2.jpg" alt="FitTrack Workout">
                    <img src="img/project2-detail3.jpg" alt="FitTrack Progress">
                </div>
                
                <h4>Hasil:</h4>
                <p>Aplikasi dengan 10,000+ download di Google Play Store dengan rating 4.7/5 dan fitur sinkronisasi tanpa hambatan dengan perangkat wearable.</p>
            `,
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Google Fit API', 'Apple HealthKit'],
    },
    // Tambahkan detail proyek lainnya
    project3: {
      title: 'AdminPanel Dashboard',
      description: `
                <p>AdminPanel adalah UI dashboard modern untuk aplikasi admin dengan visualisasi data yang interaktif, fitur dark/light mode, dan komponen yang dapat dikustomisasi.</p>
                
                <h4>Tantangan:</h4>
                <p>Membuat dashboard admin yang intuitif dan menarik secara visual, dengan kemampuan visualisasi data yang canggih.</p>
                
                <h4>Solusi:</h4>
                <ul>
                    <li>Desain UI/UX menggunakan Figma dan Adobe XD</li>
                    <li>Prototyping interaktif dengan transisi yang halus</li>
                    <li>Visualisasi data dengan Chart.js dan D3.js</li>
                    <li>Design system lengkap dengan komponen yang dapat digunakan kembali</li>
                    <li>Dukungan untuk tema gelap/terang dengan transisi yang mulus</li>
                </ul>
                
                <div class="project-gallery">
                    <img src="img/project3-detail1.jpg" alt="AdminPanel Light Mode">
                    <img src="img/project3-detail2.jpg" alt="AdminPanel Dark Mode">
                    <img src="img/project3-detail3.jpg" alt="AdminPanel Mobile View">
                </div>
                
                <h4>Hasil:</h4>
                <p>Design system yang meningkatkan efisiensi pengembangan frontend hingga 40% dan menghasilkan pengalaman pengguna yang konsisten di seluruh aplikasi.</p>
            `,
      technologies: ['Figma', 'Adobe XD', 'CSS Grid', 'Chart.js', 'D3.js', 'Sketch', 'InVision'],
    },
    project4: {
      title: 'EduLearn LMS',
      description: `
                <p>EduLearn adalah platform Learning Management System (LMS) yang dirancang untuk institusi pendidikan dengan fitur manajemen kursus, streaming video, kuis interaktif, dan sertifikasi digital.</p>
                
                <h4>Tantangan:</h4>
                <p>Mengembangkan platform pembelajaran online yang skalabel dengan kemampuan streaming video yang handal dan alat penilaian yang komprehensif.</p>
                
                <h4>Solusi:</h4>
                <ul>
                    <li>Arsitektur berbasis Vue.js dan Laravel</li>
                    <li>Database MySQL dengan optimasi query untuk performa</li>
                    <li>Streaming video dengan AWS S3 dan CloudFront</li>
                    <li>Fitur kuis dan penilaian interaktif</li>
                    <li>Sistem sertifikasi digital dengan verifikasi blockchain</li>
                </ul>
                
                <div class="project-gallery">
                    <img src="img/project4-detail1.jpg" alt="EduLearn Course Page">
                    <img src="img/project4-detail2.jpg" alt="EduLearn Video Player">
                    <img src="img/project4-detail3.jpg" alt="EduLearn Quiz System">
                </div>
                
                <h4>Hasil:</h4>
                <p>Platform yang mendukung 5,000+ siswa secara bersamaan dengan uptime 99.9% dan tingkat kepuasan pengguna 92%.</p>
            `,
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3', 'CloudFront', 'WebSockets', 'TailwindCSS'],
    },
  };

  // Open modal with project details
  detailButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const projectId = this.getAttribute('data-project');
      const project = projectDetails[projectId];

      if (project) {
        const content = `
                    <div class="modal-header">
                        <h2>${project.title}</h2>
                    </div>
                    <div class="modal-body">
                        ${project.description}
                        
                        <div class="tech-stack">
                            <h4>Tech Stack:</h4>
                            <div class="tech-tags">
                                ${project.technologies.map((tech) => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;

        modalContent.innerHTML = content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      }
    });
  });

  // Close modal
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling again
  });

  // Close modal when clicking outside
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Initialize project features when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initProjectFilters();
  initProjectModal();

  // Reveal animations for project cards
  const revealItems = document.querySelectorAll('.reveal-item');

  function revealOnScroll() {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight - 100) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on initial load
});

// Tambahkan ini ke file script.js yang sudah ada

/**
 * Mengelola perpindahan tab pada bagian skills
 * Menangani klik pada tombol tab dan menampilkan konten yang sesuai
 */
function initSkillsTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabButtons.length || !tabContents.length) {
    console.warn('Elemen tab tidak ditemukan di halaman');
    return;
  }

  // Set tab pertama sebagai aktif secara default jika belum ada yang aktif
  if (!document.querySelector('.tab-btn.active')) {
    tabButtons[0]?.classList.add('active');
    const firstTabId = tabButtons[0]?.getAttribute('data-tab') + '-tab';
    document.getElementById(firstTabId)?.classList.add('active');
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Hide all tab contents
      tabContents.forEach((content) => content.classList.remove('active'));

      // Show the selected tab content
      const tabId = button.getAttribute('data-tab') + '-tab';
      const targetTab = document.getElementById(tabId);

      if (targetTab) {
        targetTab.classList.add('active');
      } else {
        console.error(`Tab dengan ID ${tabId} tidak ditemukan`);
      }
    });
  });
}

/**
 * Menganimasikan skill bar ketika masuk ke viewport
 * Menggunakan Intersection Observer untuk efisiensi
 */
function animateSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');

  if (!skillLevels.length) {
    console.warn('Elemen skill level tidak ditemukan di halaman');
    return;
  }

  // Periksa dukungan Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Fallback untuk browser yang tidak mendukung IntersectionObserver
    skillLevels.forEach((skillLevel) => {
      const level = skillLevel.getAttribute('data-level');
      skillLevel.style.width = level + '%';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target;
          const level = skillLevel.getAttribute('data-level');

          if (level !== null) {
            // Gunakan requestAnimationFrame untuk animasi yang lebih halus
            requestAnimationFrame(() => {
              skillLevel.style.width = level + '%';
            });
          }

          observer.unobserve(skillLevel);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px', // Mulai animasi sedikit sebelum elemen sepenuhnya terlihat
    }
  );

  skillLevels.forEach((skillLevel) => {
    observer.observe(skillLevel);
  });
}

/**
 * Menangani efek reveal untuk elemen saat di-scroll
 */
function initRevealAnimation() {
  const revealItems = document.querySelectorAll('.reveal-item');

  if (!revealItems.length) {
    console.warn('Elemen reveal-item tidak ditemukan di halaman');
    return;
  }

  // Periksa dukungan Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Fallback untuk browser yang tidak mendukung IntersectionObserver
    revealItems.forEach((item) => {
      item.classList.add('active');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Tambahkan sedikit delay untuk efek bertahap jika ada banyak item
          const delay = entry.target.dataset.delay || 0;

          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // Mulai animasi sedikit sebelum elemen sepenuhnya terlihat
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

/**
 * Inisialisasi semua fitur skills saat DOM telah dimuat
 */
function initSkillsFeatures() {
  try {
    initSkillsTabs();
    animateSkillBars();
    initRevealAnimation();
  } catch (error) {
    console.error('Terjadi kesalahan saat menginisialisasi fitur skills:', error);
  }
}

// Gunakan event listener dengan opsi once untuk memastikan hanya dijalankan sekali
document.addEventListener('DOMContentLoaded', initSkillsFeatures, { once: true });

// Tambahkan event listener untuk load event sebagai fallback jika DOMContentLoaded sudah terlewat
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initSkillsFeatures();
}
//End
// Tambahkan ini ke file script.js yang sudah ada

// Contact Form Validation & Submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const formInputs = contactForm.querySelectorAll('.form-input');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const loadingIndicator = contactForm.querySelector('.loading');
  const errorText = contactForm.querySelector('.error-text');
  const successText = contactForm.querySelector('.success-text');

  // Input validation
  formInputs.forEach((input) => {
    // Validate on blur
    input.addEventListener('blur', function () {
      validateInput(this);
    });

    // Clear validation on focus
    input.addEventListener('focus', function () {
      const container = this.parentElement;
      container.classList.remove('valid', 'invalid');
      container.querySelector('.error-message').textContent = '';
    });
  });

  // Form submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all inputs
    let isValid = true;
    formInputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    loadingIndicator.classList.add('show');
    errorText.classList.remove('show');
    successText.classList.remove('show');

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success for demo

      loadingIndicator.classList.remove('show');
      submitBtn.classList.remove('loading');

      if (success) {
        // Show success message
        successText.classList.add('show');
        contactForm.reset();
        formInputs.forEach((input) => {
          const container = input.parentElement;
          container.classList.remove('valid', 'invalid');
        });

        // Reset button after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          successText.classList.remove('show');
        }, 3000);
      } else {
        // Show error message
        errorText.classList.add('show');
        submitBtn.disabled = false;

        // Hide error after delay
        setTimeout(() => {
          errorText.classList.remove('show');
        }, 3000);
      }
    }, 2000);
  });

  // Validate a single input
  function validateInput(input) {
    const container = input.parentElement;
    const errorElement = container.querySelector('.error-message');
    const errorMessage = input.getAttribute('data-error') || 'This field is required';

    let isValid = true;

    // Check if empty
    if (input.required && !input.value.trim()) {
      setInvalid(container, errorElement, errorMessage);
      isValid = false;
    }
    // Email validation
    else if (input.type === 'email' && !validateEmail(input.value)) {
      setInvalid(container, errorElement, 'Please enter a valid email address');
      isValid = false;
    }
    // If valid
    else {
      setValid(container, errorElement);
    }

    return isValid;
  }

  function setInvalid(container, errorElement, message) {
    container.classList.add('invalid');
    container.classList.remove('valid');
    errorElement.textContent = message;
  }

  function setValid(container, errorElement) {
    container.classList.add('valid');
    container.classList.remove('invalid');
    errorElement.textContent = '';
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

// Reveal animations for contact section
function initContactAnimations() {
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize contact features
document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initContactAnimations();
});

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function () {
  initChatWidget();
});

function initChatWidget() {
  const chatWidget = document.getElementById('chat-widget');
  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const closeChat = document.querySelectorAll('.close-chat');
  const minimizeChat = document.querySelector('.minimize-chat');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const scrollBottomBtn = document.querySelector('.scroll-bottom-btn');
  const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
  const emojiToggle = document.querySelector('.emoji-option');
  const emojiPicker = document.querySelector('.emoji-picker');
  const emojis = document.querySelectorAll('.emoji');
  const emojiCategories = document.querySelectorAll('.emoji-category');
  const emojiGroups = document.querySelectorAll('.emoji-group');
  const fileInput = document.getElementById('file-upload');
  const filePreview = document.querySelector('.file-preview');
  const removeFileBtn = document.querySelector('.remove-file');
  const fileName = document.querySelector('.file-name');

  // Initialize chat state
  let chatState = {
    open: false,
    minimized: false,
    unreadCount: 1,
    currentFile: null,
    typingTimeout: null,
  };

  // Toggle chat box
  chatToggle.addEventListener('click', function () {
    chatState.open = !chatState.open;
    chatState.minimized = false;
    updateChatUI();

    if (chatState.open) {
      // Reset unread count when opening chat
      chatState.unreadCount = 0;
      document.querySelector('.notification-badge').textContent = '';
      document.querySelector('.notification-badge').style.display = 'none';

      // Focus input
      setTimeout(() => {
        chatInput.focus();
      }, 300);

      // Scroll to bottom of messages
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  });

  // Close chat
  closeChat.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      chatState.open = false;
      updateChatUI();
    });
  });

  // Minimize chat
  if (minimizeChat) {
    minimizeChat.addEventListener('click', function (e) {
      e.stopPropagation();
      chatState.minimized = !chatState.minimized;
      updateChatUI();
    });
  }

  // Handle message submission
  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText && !chatState.currentFile) return;

    // Create message element
    const messageElement = createMessageElement('sent', messageText, 'Baru saja');
    chatMessages.appendChild(messageElement);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    sendButton.disabled = true;

    // Reset file if any
    if (chatState.currentFile) {
      filePreview.classList.remove('open');
      chatState.currentFile = null;
    }

    // Scroll to bottom
    scrollToBottom();

    // Simulate response
    simulateResponse(messageText);
  }

  // Send button click
  sendButton.addEventListener('click', function () {
    sendMessage();
  });

  // Enter key to send
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendButton.disabled) {
        sendMessage();
      }
    }
  });

  // Input validation
  chatInput.addEventListener('input', function () {
    // Auto resize textarea
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

    // Enable/disable send button
    sendButton.disabled = this.value.trim() === '' && !chatState.currentFile;
  });

  // Scroll handling
  chatMessages.addEventListener('scroll', function () {
    toggleScrollButton();
  });

  scrollBottomBtn.addEventListener('click', function () {
    scrollToBottom();
  });

  // Quick reply buttons
  quickReplyBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const replyText = this.getAttribute('data-message');
      chatInput.value = replyText;
      sendButton.disabled = false;
      chatInput.focus();

      // Hide quick replies after selection
      document.querySelector('.quick-replies').style.display = 'none';
    });
  });

  // Emoji picker
  emojiToggle.addEventListener('click', function () {
    emojiPicker.classList.toggle('open');
    if (emojiPicker.classList.contains('open')) {
      setTimeout(() => {
        document.addEventListener('click', closeEmojiPickerOutside);
      }, 10);
    } else {
      document.removeEventListener('click', closeEmojiPickerOutside);
    }
  });

  // Close emoji picker when clicking outside
  function closeEmojiPickerOutside(e) {
    if (!emojiPicker.contains(e.target) && e.target !== emojiToggle) {
      emojiPicker.classList.remove('open');
      document.removeEventListener('click', closeEmojiPickerOutside);
    }
  }

  // Emoji category switching
  emojiCategories.forEach((category) => {
    category.addEventListener('click', function () {
      // Update active category
      emojiCategories.forEach((c) => c.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding emoji group
      const categoryName = this.getAttribute('data-category');
      emojiGroups.forEach((group) => {
        group.classList.remove('active');
        if (group.getAttribute('data-category') === categoryName) {
          group.classList.add('active');
        }
      });
    });
  });

  // Emoji insertion
  emojis.forEach((emoji) => {
    emoji.addEventListener('click', function () {
      const emojiChar = this.getAttribute('data-emoji');
      insertAtCursor(chatInput, emojiChar);
      sendButton.disabled = chatInput.value.trim() === '';
    });
  });

  // File upload
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      chatState.currentFile = file;
      fileName.textContent = file.name;
      filePreview.classList.add('open');
      sendButton.disabled = false;
    }
  });

  // Remove file
  removeFileBtn.addEventListener('click', function () {
    filePreview.classList.remove('open');
    chatState.currentFile = null;
    fileInput.value = '';
    sendButton.disabled = chatInput.value.trim() === '';
  });

  // Helper function to create message elements
  function createMessageElement(type, text, time) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'message-info';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = time;

    const statusSpan = document.createElement('span');
    statusSpan.className = 'message-status';

    if (type === 'sent') {
      const icon = document.createElement('i');
      icon.className = 'fas fa-check-double';
      icon.setAttribute('aria-hidden', 'true');
      statusSpan.appendChild(icon);
    }

    infoDiv.appendChild(timeSpan);

    if (type === 'sent') {
      infoDiv.appendChild(statusSpan);
    }

    bubbleDiv.appendChild(paragraph);
    contentDiv.appendChild(bubbleDiv);
    contentDiv.appendChild(infoDiv);
    messageDiv.appendChild(contentDiv);

    // Add animation
    messageDiv.style.animationDelay = '0.1s';
    messageDiv.style.animation = `${type === 'sent' ? 'slideInRight' : 'slideInLeft'} 0.3s forwards`;

    return messageDiv;
  }

  // Simulate typing and response
  function simulateResponse(userMessage) {
    // Show typing indicator
    showTypingIndicator();

    // Calculate response time based on message length (for realism)
    const responseTime = Math.min(1000 + userMessage.length * 20, 3000);

    // Prepare response based on user message
    let response;

    if (userMessage.toLowerCase().includes('halo') || userMessage.toLowerCase().includes('hai') || userMessage.toLowerCase().includes('hi') || userMessage.toLowerCase().includes('hello')) {
      response = 'Halo! Senang bisa berbincang dengan Anda. Ada yang bisa saya bantu?';
    } else if (userMessage.toLowerCase().includes('project') || userMessage.toLowerCase().includes('proyek') || userMessage.toLowerCase().includes('portofolio')) {
      response = "Anda bisa melihat detail proyek yang telah saya kerjakan di bagian 'Projects'. Saya memiliki pengalaman dengan berbagai jenis proyek web dan mobile.";
    } else if (userMessage.toLowerCase().includes('kontak') || userMessage.toLowerCase().includes('hubungi') || userMessage.toLowerCase().includes('email')) {
      response = 'Anda dapat menghubungi saya melalui email di mfajarbuana@yahoo.com atau telepon di +62 812 2575 4014. Saya biasanya merespon dalam waktu 24 jam.';
    }
    // TAMBAHKAN BAGIAN PENDIDIKAN DISINI
    else if (
      userMessage.toLowerCase().includes('pendidikan') ||
      userMessage.toLowerCase().includes('sekolah') ||
      userMessage.toLowerCase().includes('kuliah') ||
      userMessage.toLowerCase().includes('gelar') ||
      userMessage.toLowerCase().includes('jurusan') ||
      userMessage.toLowerCase().includes('universitas') ||
      userMessage.toLowerCase().includes('kampus') ||
      userMessage.toLowerCase().includes('study') ||
      userMessage.toLowerCase().includes('education')
    ) {
      response =
        'Saya menempuh pendidikan D3 di Jurusan Sistem Informatika, Universitas Bina Sarana Informatika dan lulus pada tahun 2020. Sebelumnya, saya bersekolah di SMK Perindustrian Yogyakarta (2013-2016). Saya juga memiliki berbagai sertifikasi di bidang web development, seperti Full-Stack Web Developer dari Dicoding dan Modern JavaScript dari Udemy.';
    } else if (userMessage.toLowerCase().includes('layanan') || userMessage.toLowerCase().includes('jasa') || userMessage.toLowerCase().includes('service')) {
      response = 'Saya menawarkan jasa pengembangan website, aplikasi mobile, dan desain UI/UX. Untuk diskusi lebih lanjut tentang kebutuhan proyek Anda, silakan kirim email atau isi form kontak.';
    } else if (userMessage.toLowerCase().includes('terima kasih') || userMessage.toLowerCase().includes('makasih')) {
      response = 'Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya lagi jika ada hal lain yang ingin Anda ketahui.';
    } else if (userMessage.toLowerCase().includes('pengalaman') || userMessage.toLowerCase().includes('kerja') || userMessage.toLowerCase().includes('karir')) {
      response =
        'Saya memiliki pengalaman 4+ tahun di bidang web development. Saya pernah bekerja sebagai Frontend Developer di TechCorp (2019-2021) dan saat ini bekerja sebagai Full-Stack Developer di InnoSolutions sejak 2021. Saya juga aktif mengerjakan proyek freelance untuk berbagai startup dan bisnis lokal.';
    } else if (userMessage.toLowerCase().includes('skill') || userMessage.toLowerCase().includes('kemampuan') || userMessage.toLowerCase().includes('keahlian')) {
      response =
        'Saya ahli dalam pengembangan frontend (HTML, CSS, JavaScript, React) dan backend (Node.js, PHP, Python). Saya juga memiliki kemampuan dalam UI/UX design menggunakan Figma dan Adobe XD, serta familiar dengan database seperti MySQL, MongoDB, dan PostgreSQL.';
    } else {
      response = 'Terima kasih atas pesan Anda. Saya akan segera menghubungi Anda untuk diskusi lebih lanjut. Atau, Anda bisa langsung menghubungi saya melalui email atau telepon yang tertera di bagian kontak.';
    }

    // Send response after delay
    setTimeout(() => {
      hideTypingIndicator();

      setTimeout(() => {
        const responseElement = createMessageElement('received', response, 'Baru saja');
        chatMessages.appendChild(responseElement);
        scrollToBottom();

        // Increment unread count if chat is closed
        if (!chatState.open) {
          chatState.unreadCount++;
          document.querySelector('.notification-badge').textContent = chatState.unreadCount;
          document.querySelector('.notification-badge').style.display = 'flex';
        }
      }, 500);
    }, responseTime);
  }
  // Show typing indicator
  function showTypingIndicator() {
    const statusText = document.querySelector('.status-text');
    const typingIndicator = document.querySelector('.typing-indicator');

    statusText.style.display = 'none';
    typingIndicator.classList.add('active');
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const statusText = document.querySelector('.status-text');
    const typingIndicator = document.querySelector('.typing-indicator');

    statusText.style.display = 'inline';
    typingIndicator.classList.remove('active');
  }

  // Scroll to bottom of messages
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    toggleScrollButton();
  }

  // Toggle scroll button visibility
  function toggleScrollButton() {
    const isScrollable = chatMessages.scrollHeight > chatMessages.clientHeight;
    const isScrolledUp = chatMessages.scrollTop < chatMessages.scrollHeight - chatMessages.clientHeight - 50;

    if (isScrollable && isScrolledUp) {
      scrollBottomBtn.classList.add('visible');
    } else {
      scrollBottomBtn.classList.remove('visible');
    }
  }

  // Insert text at cursor position in textarea
  function insertAtCursor(input, text) {
    const startPos = input.selectionStart;
    const endPos = input.selectionEnd;
    const before = input.value.substring(0, startPos);
    const after = input.value.substring(endPos, input.value.length);

    input.value = before + text + after;
    input.selectionStart = input.selectionEnd = startPos + text.length;
    input.focus();

    // Trigger resize
    input.dispatchEvent(new Event('input'));
  }

  // Update chat UI based on state
  function updateChatUI() {
    if (chatState.open) {
      chatWidget.classList.add('open');
      chatToggle.setAttribute('aria-expanded', 'true');
      chatBox.setAttribute('aria-hidden', 'false');

      if (chatState.minimized) {
        chatBox.style.height = '60px';
        chatMessages.style.display = 'none';
        document.querySelector('.chat-input').style.display = 'none';
        document.querySelector('.chat-footer').style.display = 'none';
      } else {
        chatBox.style.height = '';
        chatMessages.style.display = '';
        document.querySelector('.chat-input').style.display = '';
        document.querySelector('.chat-footer').style.display = '';
      }
    } else {
      chatWidget.classList.remove('open');
      chatToggle.setAttribute('aria-expanded', 'false');
      chatBox.setAttribute('aria-hidden', 'true');

      // Close emoji picker if open
      emojiPicker.classList.remove('open');
    }
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
  document.head.appendChild(style);

  // Initialize UI
  toggleScrollButton();
}

document.addEventListener('DOMContentLoaded', function () {
  // Update copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  const formMessage = document.getElementById('form-message');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      // Email validation
      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }

      // Show loading state
      const submitButton = this.querySelector('button');
      const originalButtonContent = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        showMessage('Thank you for subscribing!', 'success');
        emailInput.value = '';

        // Restore button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
      }, 1500);
    });
  }

  // Helper functions
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = `form-message ${type}-message`;

      // Clear message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 5000);
    }
  }

  // Smooth scroll for footer links
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');

  footerLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    });
  });
});

function downloadCV() {
  const link = document.createElement('a');
  link.href = 'pdf/cv.pdf';
  link.download = 'CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function () {
  // Memuat animasi programmer dari LottieFiles
  // Anda bisa mengganti URL dengan animasi programmer lain dari LottieFiles
  lottie.loadAnimation({
    container: document.getElementById('lottie-programmer'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json', // Animasi programmer
  });
});
