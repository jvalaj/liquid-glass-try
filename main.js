// Splash screen enter button
const splashScreen = document.getElementById('splashScreen');
const enterSiteBtn = document.getElementById('enterSiteBtn');

if (enterSiteBtn && splashScreen) {
  enterSiteBtn.addEventListener('click', () => {
    splashScreen.classList.add('hidden');
    // Allow scrolling after splash is hidden
    document.body.style.overflow = '';
  });
  // Prevent scrolling while splash is visible
  document.body.style.overflow = 'hidden';
}

const cursor = document.querySelector('.cursor');
const toggleButton = document.querySelector('.nav__toggle-cursor');
let isCustomCursor = true;  // Start with custom cursor active
const cursorcircle = document.querySelector('.cursor');  // New: Select the image
const cursorIcon = document.querySelector('.cursorico');  // New: Select the image


// Existing mouse move logic
document.addEventListener('mousemove', (e) => {
  if (isCustomCursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});
// New toggle logic
toggleButton.addEventListener('click', () => {
  isCustomCursor = !isCustomCursor;
  if (isCustomCursor) {
    cursorIcon.style.opacity = '1'; // Hide image when custom cursor is active
    cursorcircle.style.opacity = '1'; 
  } else {
    cursorcircle.style.opacity = '0';  // Show image when normal cursor is active
    cursorIcon.style.opacity = '0';
  }
});

//animations:// ...existing code...

// Collect any element that declares a data-animate attribute
const ioAnimatedEls = document.querySelectorAll('[data-animate]');

// Helper: convert "1s"/"750ms" -> milliseconds number
function toMs(val) {
  if (!val) return 0;
  return val.endsWith('ms') ? parseFloat(val) : parseFloat(val) * 1000;
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const animName = el.dataset.animate;                 // required
    const duration = el.dataset.duration || '0.9s';      // optional
    const easing = el.dataset.easing || 'ease-out';      // optional
    const delay = el.dataset.delay || '0s';              // optional
    const fill = el.dataset.fill || 'forwards';          // optional
    const iteration = el.dataset.iteration || '1';       // optional

    // Entrance animation
    const firstAnim = `${animName} ${duration} ${easing} ${delay} ${iteration} ${fill}`;
    el.style.animation = firstAnim;
    el.classList.add('is-animated');

    // Chain a float/hover loop if requested (data-float-after="floatPulse")
    if (el.dataset.floatAfter) {
      const floatName = el.dataset.floatAfter;
      const floatDur = el.dataset.floatDuration || '4s';
      const floatEase = el.dataset.floatEasing || 'ease-in-out';
      const floatDelay = el.dataset.floatDelay || '0s'; // usually 0
      const total = toMs(delay) + toMs(duration);

      setTimeout(() => {
        // Preserve completed first animation (it already ended & used forwards)
        el.style.animation = `${firstAnim}, ${floatName} ${floatDur} ${floatEase} ${floatDelay} infinite`;
      }, total);
    }

    io.unobserve(el);
  });
}, {
  threshold: 0.25,
  rootMargin: '0px 0px -10% 0px'
});

// Observe all declarative animated elements
ioAnimatedEls.forEach(el => io.observe(el));

// Optional: helper to apply stagger inside a container
function applyStagger(containerSelector, stepMs = 120) {
  const parent = document.querySelector(containerSelector);
  if (!parent) return;
  [...parent.querySelectorAll('[data-animate]')].forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = `${i * stepMs}ms`;
  });
}

// ...existing code...

// Disable scroll/entrance animations on small screens
const isSmallScreen = window.matchMedia('(max-width:700px)').matches;
if (isSmallScreen) {
  document.documentElement.classList.add('no-anim-mobile');
}

// Collect any element that declares a data-animate attribute
if (!isSmallScreen) {
  const ioAnimatedEls = document.querySelectorAll('[data-animate]');

  function toMs(val) {
    if (!val) return 0;
    return val.endsWith('ms') ? parseFloat(val) : parseFloat(val) * 1000;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const animName = el.dataset.animate;
      const duration = el.dataset.duration || '0.9s';
      const easing = el.dataset.easing || 'ease-out';
      const delay = el.dataset.delay || '0s';
      const fill = el.dataset.fill || 'forwards';
      const iteration = el.dataset.iteration || '1';
      el.style.animation = `${animName} ${duration} ${easing} ${delay} ${iteration} ${fill}`;
      el.classList.add('is-animated');
      io.unobserve(el);
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  });

  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
}


// Nav hamburger toggle (keep this one, remove the duplicate below)
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');
const navLinksPanel = document.getElementById('primary-nav');
if (hamburger && nav && navLinksPanel) {
  navLinksPanel.setAttribute('aria-hidden', 'true');

  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(open));
    navLinksPanel.setAttribute('aria-hidden', String(!open));
  });

  navLinksPanel.addEventListener('click', e => {
    if (e.target.closest('a')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      navLinksPanel.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      navLinksPanel.setAttribute('aria-hidden', 'true');
      hamburger.focus();
    }
  });
}
// video:

        const asciiChars = ' .:-=+*#%@';
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const asciiDiv = document.getElementById('ascii');

        const width = 100;
        const height = 60;

        canvas.width = width;
        canvas.height = height;

        video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        video.load();

        function convertToAscii() {
            ctx.drawImage(video, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            let ascii = '';

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const offset = (y * width + x) * 4;
                    const r = imageData.data[offset];
                    const g = imageData.data[offset + 1];
                    const b = imageData.data[offset + 2];
                    
                    const brightness = (r + g + b) / 3;
                    const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
                    ascii += asciiChars[charIndex];
                }
                ascii += '\n';
            }

            asciiDiv.textContent = ascii;
            requestAnimationFrame(convertToAscii);
        }

        video.addEventListener('loadeddata', () => {
            video.play();
            convertToAscii();
        });