// Theme toggle (remembers choice)
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Highlight the nav link of the section in view
const links = document.querySelectorAll('nav a[href^="#"]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

// Copy email to clipboard
const copyBtn = document.getElementById('copy-email');
copyBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').textContent;
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = 'Copied';
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
});
