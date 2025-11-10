document.addEventListener('DOMContentLoaded', function() {
  // THEME TOGGLE/DARK MODE
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
});


// Scroll Up Button
const scrollUpBtn = document.createElement('div');
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('scrollUpBtn');
  // Show when scrolled down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


/*
Copyright © 2025 Adhiraj Bhagawati. All rights reserved.
*/
