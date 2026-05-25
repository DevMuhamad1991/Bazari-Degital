function loadNavbar() {
  const navbarHTML = `
   <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="index.html" class="logo">
        <span class="logo-icon"><i class="fa-solid fa-shield-halved"></i></span>
        <span class="logo-text">Kurd<span class="accent">Account</span></span>
      </a>
        <div class="nav-links-wrap">
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="read.html" class="nav-link">Read</a></li>
            <li><a href="team.html" class="nav-link">Team</a></li>
            <li><a href="post.html" class="nav-link">post</a></li>
            <li><a href="market.html" class="nav-link">Market</a></li>
            <li><a href="profile.html" class="nav-link">Profile</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  const placeholder = document.getElementById('navbar-root');
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }
}
document.addEventListener('DOMContentLoaded', loadNavbar);

// ===== Active Nav Link - بمێنێتەوە =====
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const currentPath = window.location.pathname + window.location.hash;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath === '/' && linkPath === '/') ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
}

// کاتی کلیک کردن
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    // پاراستنی active state لە localStorage
    localStorage.setItem('activeNav', this.getAttribute('href'));
  });
});

// کاتی بارکردنی پەڕەکە — چەک بکە localStorage
const savedActive = localStorage.getItem('activeNav');
if (savedActive) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === savedActive) {
      link.classList.add('active');
    }
  });
} else {
  setActiveLink();
}