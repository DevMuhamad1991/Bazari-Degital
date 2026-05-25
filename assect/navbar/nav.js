function loadNavbar() {
  const navbarHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-container">

        <div class="nav-links-wrap">
          <ul class="nav-links">
            <li><a href="index.html"   class="nav-link">Home</a></li>
            <li><a href="read.html"    class="nav-link">Read</a></li>
            <li><a href="team.html"    class="nav-link">Team</a></li>
            <li><a href="post.html"    class="nav-link">post</a></li>
            <li><a href="market.html"  class="nav-link">Market</a></li>
            <li><a href="profile.html" class="nav-link">Profile</a></li>
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

  // ===== Active لەسەر پەڕەی ئێستا =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = placeholder.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }

    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== Scroll Effect =====
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

document.addEventListener('DOMContentLoaded', loadNavbar);