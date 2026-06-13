document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  root.innerHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-container">
        <a class="logo" href="index.html" aria-label="Kurd Account">
          <span class="logo-icon"><i class="fa-solid fa-store"></i></span>
          <span class="logo-text">Kurd <span class="accent">Account</span></span>
        </a>

        <div class="nav-links-wrap">
          <ul class="nav-links">
            <li><a class="nav-link" href="index.html">Home</a></li>
            <li><a class="nav-link" href="market.html">Market</a></li>
            <li><a class="nav-link" href="post.html">Post</a></li>
            <li><a class="nav-link" href="read.html">Read</a></li>
            <li><a class="nav-link" href="team.html">Team</a></li>
            <li><a class="nav-link" href="sign.html">Sign</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      setTimeout(() => {
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }, 100);
    }
  });

  const navList = document.querySelector('.nav-links');
  if (!navList) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const stopDrag = () => {
    isDown = false;
    navList.style.cursor = 'default';
  };

  navList.addEventListener('touchstart', (event) => {
    isDown = true;
    startX = event.touches[0].pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
  });

  navList.addEventListener('touchend', stopDrag);
  navList.addEventListener('touchmove', (event) => {
    if (!isDown) return;
    const x = event.touches[0].pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  navList.addEventListener('mousedown', (event) => {
    isDown = true;
    startX = event.pageX - navList.offsetLeft;
    scrollLeft = navList.scrollLeft;
    navList.style.cursor = 'grabbing';
  });

  navList.addEventListener('mouseleave', stopDrag);
  navList.addEventListener('mouseup', stopDrag);
  navList.addEventListener('mousemove', (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - navList.offsetLeft;
    navList.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
});
