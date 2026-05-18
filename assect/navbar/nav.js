// ===== LOAD NAVBAR =====
fetch('assets/navbar/nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ===== NAV ACTIVE + DRAG SCROLL =====
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
        }, 150);
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

  }); // ← کۆتایی fetch
