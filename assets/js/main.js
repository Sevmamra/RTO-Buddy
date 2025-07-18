// ========== NAVIGATION TOGGLE ==========
const navToggle = document.querySelector('#navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ========== ACTIVE LINK HIGHLIGHT ==========
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ========== SCROLL TO TOP ==========
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== TOAST / ALERT ==========
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

// ========== DARK MODE TOGGLE (Optional) ==========
function toggleDarkMode() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

(function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
})();
