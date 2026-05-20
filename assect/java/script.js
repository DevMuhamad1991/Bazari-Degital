mport { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyASJbu_rNecyaHi9gqrE9PSOwyA7pvq92E",
  authDomain: "kurd-account.firebaseapp.com",
  projectId: "kurd-account",
  storageBucket: "kurd-account.firebasestorage.app",
  messagingSenderId: "325274297633",
  appId: "1:325274297633:web:04f9b4b209d3d0f6a90a60"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Profile Redirect ──
onAuthStateChanged(auth, (user) => {
  const signupLink = document.querySelector('a[href="sign.html"]');
  if (!signupLink) return;
  if (user) {
    signupLink.href = 'profile.html';
    signupLink.textContent = 'Profile';
  } else {
    signupLink.href = 'sign.html';
    signupLink.textContent = 'SignUp';
  }
});


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 20);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => revealObserver.observe(r));

// ===== NAV SMOOTH EFFECT + DRAG SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      
      setTimeout(() => {
  link.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}, 100);

      
    }

    link.addEventListener('mouseenter', function () {
      this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transition = 'color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
  



  // ===== NAVBAR DRAG SCROLL =====
  const navList = document.querySelector('.nav-links');
  if (!navList) return;

  let isDown = false, startX, scrollLeft;

  navList.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
  });
  navList.addEventListener('touchend', () => { isDown = false; });
  navList.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  navList.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
    navList.style.cursor = 'grabbing';
  });
  navList.addEventListener('mouseleave', () => { isDown = false; navList.style.cursor = 'default'; });
  navList.addEventListener('mouseup', () => { isDown = false; navList.style.cursor = 'default'; });
  navList.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
});
