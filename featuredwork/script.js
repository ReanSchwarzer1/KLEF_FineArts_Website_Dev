// Back to Top
const backToTop = document.getElementById('backToTop');
window.onscroll = function () {
    backToTop.style.display = (window.scrollY > 320) ? 'block' : 'none';
};
backToTop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Automatic Scrollspy Highlight for section headers
window.addEventListener('scroll', function() {
  const titles = document.querySelectorAll('.section-title');
  let lastActive = null;
  let minDist = window.innerHeight;

  titles.forEach(title => {
    const rect = title.getBoundingClientRect();
    // Track which title is closest to top (but in view)
    if(rect.top >= 0 && rect.top < minDist) {
      minDist = rect.top;
      lastActive = title;
    }
  });

  titles.forEach(title => title.classList.remove('_active'));
  if (lastActive) lastActive.classList.add('_active');
});

// Run once on load too
window.dispatchEvent(new Event('scroll'));

// Assigns a random rotation value to each project card
document.querySelectorAll('.project-card').forEach(card => {
  // Random angle between -1.9deg and +1.9deg (or any range you like)
  const angle = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 0.9);
  card.dataset.rotate = angle.toFixed(2);
});

// Read More toggle functionality - UPDATED VERSION
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', function(event) {
    // Prevent the click from bubbling up to parent elements (like card links)
    event.stopPropagation();
    event.preventDefault();
    
    const parent = this.closest('.project-desc');
    const shortText = parent.querySelector('.short-text');
    const fullText = parent.querySelector('.full-text');
    
    if (fullText.style.display === 'none' || fullText.style.display === '') {
      // Expand
      shortText.style.display = 'none';
      fullText.style.display = 'inline';
      this.textContent = 'Read Less';
    } else {
      // Collapse
      shortText.style.display = 'inline';
      fullText.style.display = 'none';
      this.textContent = 'Read More';
    }
  });
});

// Intersection Observer for smooth scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});

// Cursor trail effect
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.clientX - 10 + 'px';
  trail.style.top = e.clientY - 10 + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => trail.remove(), 800);
});


// Parallax sections
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.project-section');
  sections.forEach((section, index) => {
    const speed = (index + 1) * 0.1;
    const yPos = -(window.pageYOffset * speed);
    section.style.backgroundPositionY = yPos + 'px';
  });
});

// Typewriter effect
const heroSlogan = document.querySelector('.hero-slogan');
if (heroSlogan) {
  const text = heroSlogan.textContent;
  heroSlogan.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroSlogan.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 500);
}

// Magnetic cursor effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) rotate(-1deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Spotlight effect
const header = document.querySelector('.kl-header-bg');
header.addEventListener('mousemove', (e) => {
  const rect = header.getBoundingClientRect();
  header.style.setProperty('--x', e.clientX - rect.left + 'px');
  header.style.setProperty('--y', e.clientY - rect.top + 'px');
});

// Particle background
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  particle.style.opacity = Math.random() * 0.5;
  document.body.appendChild(particle);
  
  setTimeout(() => particle.remove(), 5000);
}

setInterval(createParticle, 500);

// Animate SVG doodles on scroll
const doodleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-doodle').forEach(doodle => {
  doodleObserver.observe(doodle);
});



// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  document.getElementById('theme-toggle').textContent = '☀️';
}




















/*
  Copyright © 2025 Adhiraj Bhagawati. All rights reserved.
*/
