function loadNavbar() {
  const navbarHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <div class="nav-links-wrap">
          <ul class="nav-links">
            <li><a href="index.html"   class="nav-link">Home</a></li>
            <li><a href="post.html"    class="nav-link">post</a></li>
            <li><a href="market.html"  class="nav-link">Market</a></li>
            <li><a href="read.html"    class="nav-link">Read</a></li>
            <li><a href="profile.html" class="nav-link">Profile</a></li>
            <li><a href="team.html"    class="nav-link">Team</a></li>
          </ul>
        </div>
        <a href="index.html" class="logo">
          <span class="logo-icon"><i class="fa-solid fa-shield-halved"></i></span>
          <span class="logo-text">Kurd<span class="accent">Account</span></span>
        </a>
      </div>
    </nav>
  `;

  const placeholder = document.getElementById('navbar-root');
  if (!placeholder) return;
  placeholder.innerHTML = navbarHTML;

  setTimeout(function() {
    const path = window.location.pathname;
    let currentPage;
    if (path.endsWith('/') || path === '/Bazari-Degital' || path === '/Bazari-Degital/') {
      currentPage = 'index.html';
    } else {
      currentPage = path.split('/').pop() || 'index.html';
    }

    const navLinks = placeholder.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
      link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }, 200);

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

document.addEventListener('DOMContentLoaded', loadNavbar);