(() => {

  /* ── 1. CSS دەخرێتە <head> ──────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: 64px;
      background: rgba(2,8,23,0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(59,130,246,0.2);
      transition: 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .navbar.scrolled {
      background: rgba(2,8,23,0.98);
      box-shadow: 0 2px 40px rgba(37,99,235,0.15);
    }
    .nav-container {
      max-width: 1400px; margin: 0 auto;
      height: 100%;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
      gap: 16px;
    }
    .logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; color: #e2e8f0;
      font-size: 1.25rem; font-weight: 900;
      flex-shrink: 0; white-space: nowrap;
    }
    .logo-icon {
      width: 38px; height: 38px; flex-shrink: 0;
      background: linear-gradient(135deg, #2563eb, #38bdf8);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; color: white;
      box-shadow: 0 0 18px rgba(59,130,246,0.45);
    }
    .logo .accent { color: #3b82f6; }
    .logo-text { display: inline-flex; }
    .nav-links-wrap {
      position: relative; flex-shrink: 1;
      min-width: 0; display: flex; align-items: center;
    }
    .nav-links {
      display: flex; align-items: center; gap: 4px;
      list-style: none; margin: 0; padding-bottom: 2px;
      overflow-x: auto; overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; flex-shrink: 1; min-width: 0;
    }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-link {
      text-decoration: none !important;
      color: #94a3b8 !important;
      font-size: 0.9rem !important;
      font-weight: 600 !important;
      padding: 8px 14px !important;
      border-radius: 8px !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      position: relative !important;
      transform: translateY(0) !important;
      transition: color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    .nav-link::after {
      content: '' !important;
      position: absolute !important;
      bottom: 4px !important; left: 14px !important; right: 14px !important;
      height: 2px !important;
      background: linear-gradient(90deg, #3b82f6, #38bdf8) !important;
      border-radius: 2px !important;
      transform: scaleX(0) !important;
      transform-origin: center !important;
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .nav-link:hover {
      color: #e2e8f0 !important;
      background: rgba(59,130,246,0.08) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 16px rgba(37,99,235,0.15) !important;
    }
    .nav-link:hover::after  { transform: scaleX(1) !important; }
    .nav-link.active {
      color: #3b82f6 !important;
      background: rgba(59,130,246,0.1) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 16px rgba(37,99,235,0.15) !important;
    }
    .nav-link.active::after { transform: scaleX(1) !important; }
    @media (max-width: 768px) {
      .logo-text { display: none; }
      .logo { gap: 0; }
      .nav-links-wrap { flex: 1; min-width: 0; }
    }
    @media (min-width: 769px) {
      .logo-text { display: inline-flex; }
    }
  `;
  (document.head || document.documentElement).appendChild(style);

  /* ── 2. HTML دادەنرێت ────────────────────────── */
  function loadNavbar() {
    const placeholder = document.getElementById('navbar-root');
    if (!placeholder) return;

    placeholder.innerHTML = `
      <nav class="navbar" id="navbar" dir="ltr">
        <div class="nav-container">
          <a href="index.html" class="logo">
            <span class="logo-icon"><i class="fa-solid fa-shield-halved"></i></span>
            <span class="logo-text">Kurd<span class="accent">Account</span></span>
          </a>
          <div class="nav-links-wrap">
            <ul class="nav-links">
              <li><a href="index.html"   class="nav-link">Home</a></li>
              <li><a href="post.html"    class="nav-link">Post</a></li>
              <li><a href="market.html"  class="nav-link">Market</a></li>
              <li><a href="read.html"    class="nav-link">Read</a></li>
              <li><a href="profile.html" class="nav-link">Profile</a></li>
              <li><a href="team.html"    class="nav-link">Team</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    /* Active لینک */
    const path = window.location.pathname;
    let currentPage;
    if (path.endsWith('/') || path === '/Bazari-Degital' || path === '/Bazari-Degital/') {
      currentPage = 'index.html';
    } else {
      currentPage = path.split('/').pop() || 'index.html';
    }

    placeholder.querySelectorAll('.nav-link').forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage) link.classList.add('active');
    });

    /* Scroll effect */
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── 3. بانگکردنەوە — defer دڵنیایمان لە ئامادەبوونی DOM ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }

})();