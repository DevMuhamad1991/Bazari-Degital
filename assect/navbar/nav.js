(() => {

  /* ── CSS ───────────────────────────────────── */
  const style = document.createElement('style');

  style.textContent = `
    body{
      padding-top:64px;
    }

    .navbar{
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:1000;

      height:64px;

      background:rgba(2,8,23,.88);
      backdrop-filter:blur(20px);
      -webkit-backdrop-filter:blur(20px);

      border-bottom:1px solid rgba(59,130,246,.2);

      transition:.3s cubic-bezier(.4,0,.2,1);
    }

    .navbar.scrolled{
      background:rgba(2,8,23,.98);
      box-shadow:0 2px 40px rgba(37,99,235,.15);
    }

    .nav-container{
      max-width:1400px;
      margin:0 auto;

      height:100%;
      padding:0 24px;

      display:flex;
      align-items:center;
      justify-content:space-between;

      gap:24px;
    }

    .logo{
      display:flex;
      align-items:center;
      gap:10px;

      text-decoration:none;
      color:#e2e8f0;

      font-size:1.25rem;
      font-weight:900;

      white-space:nowrap;
      flex:0 0 auto;
    }

    .logo-icon{
      width:38px;
      height:38px;

      display:flex;
      align-items:center;
      justify-content:center;

      border-radius:10px;

      background:linear-gradient(135deg,#2563eb,#38bdf8);

      color:#fff;
      font-size:1rem;

      box-shadow:0 0 18px rgba(59,130,246,.45);
    }

    .logo .accent{
      color:#3b82f6;
    }

    .logo-text{
      display:inline-flex;
    }

    .nav-links-wrap{
      flex:1;
      min-width:0;

      display:flex;
      align-items:center;
      justify-content:center;
    }

    .nav-links{
      display:flex;
      align-items:center;
      justify-content:center;

      gap:6px;

      list-style:none;

      margin:0;
      padding:0;

      flex-wrap:nowrap;
      overflow:hidden;
    }

    .nav-link{
      text-decoration:none !important;

      color:#94a3b8 !important;

      font-size:.9rem !important;
      font-weight:600 !important;

      padding:8px 14px !important;

      border-radius:8px !important;

      white-space:nowrap !important;
      flex-shrink:0 !important;

      position:relative !important;

      background:transparent !important;
      border:none !important;
      box-shadow:none !important;

      transform:translateY(0) !important;

      transition:
        color .3s ease,
        background .3s ease,
        transform .3s ease,
        box-shadow .3s ease !important;
    }

    .nav-link::after{
      content:'';

      position:absolute;

      left:14px;
      right:14px;
      bottom:4px;

      height:2px;

      border-radius:2px;

      background:linear-gradient(
        90deg,
        #3b82f6,
        #38bdf8
      );

      transform:scaleX(0);
      transform-origin:center;

      transition:transform .35s cubic-bezier(.4,0,.2,1);
    }

    .nav-link:hover{
      color:#e2e8f0 !important;

      background:rgba(59,130,246,.08) !important;

      transform:translateY(-2px) !important;

      box-shadow:0 4px 16px rgba(37,99,235,.15) !important;
    }

    .nav-link:hover::after{
      transform:scaleX(1);
    }

    .nav-link.active{
      color:#3b82f6 !important;

      background:rgba(59,130,246,.1) !important;

      transform:translateY(-2px) !important;

      box-shadow:0 4px 16px rgba(37,99,235,.15) !important;
    }

    .nav-link.active::after{
      transform:scaleX(1);
    }

    @media (max-width:768px){

      .nav-container{
        padding:0 12px;
        gap:10px;
      }

      .logo{
        gap:0;
      }

      .logo-text{
        display:none;
      }

      .nav-link{
        padding:8px 10px !important;
        font-size:.82rem !important;
      }
    }

    @media (min-width:769px){
      .logo-text{
        display:inline-flex;
      }
    }
  `;

  document.head.appendChild(style);

  /* ── HTML ───────────────────────────────────── */
  function loadNavbar() {

    const placeholder =
      document.getElementById('navbar-root');

    if (!placeholder) return;

    placeholder.innerHTML = `
      <nav class="navbar" id="navbar" dir="ltr">

        <div class="nav-container">

          <a href="index.html" class="logo">
            <span class="logo-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </span>

            <span class="logo-text">
              Kurd<span class="accent">Account</span>
            </span>
          </a>

          <div class="nav-links-wrap">

            <ul class="nav-links">

              <li>
                <a href="index.html" class="nav-link">
                  Home
                </a>
              </li>

              <li>
                <a href="post.html" class="nav-link">
                  Post
                </a>
              </li>

              <li>
                <a href="market.html" class="nav-link">
                  Market
                </a>
              </li>

              <li>
                <a href="read.html" class="nav-link">
                  Read
                </a>
              </li>

              <li>
                <a href="profile.html" class="nav-link">
                  Profile
                </a>
              </li>

              <li>
                <a href="team.html" class="nav-link">
                  Team
                </a>
              </li>

            </ul>

          </div>

        </div>

      </nav>
    `;

    /* Active Link */
    const path = window.location.pathname;

    let currentPage;

    if (
      path.endsWith('/') ||
      path === '/Bazari-Degital' ||
      path === '/Bazari-Degital/'
    ) {
      currentPage = 'index.html';
    } else {
      currentPage =
        path.split('/').pop() || 'index.html';
    }

    placeholder
      .querySelectorAll('.nav-link')
      .forEach(link => {

        const linkPage =
          link.getAttribute('href')
          .split('/')
          .pop();

        if (linkPage === currentPage) {
          link.classList.add('active');
        }
      });

    /* Scroll Effect */
    window.addEventListener(
      'scroll',
      () => {

        const nav =
          document.getElementById('navbar');

        if (nav) {
          nav.classList.toggle(
            'scrolled',
            window.scrollY > 50
          );
        }
      },
      { passive:true }
    );
  }

  /* Init */
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      loadNavbar
    );
  } else {
    loadNavbar();
  }

})();