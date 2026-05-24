/**
 * =====================================================
 *  KURDACCOUNT — NAVBAR.JS  v3.0
 *  ئەم فایلە بە خۆی ناڤبار دادەنێت بە هەموو پەرەکان
 *
 *  بەکارهێنان لە هەر پەرەیەک:
 *    <script src="assets/navbar/navbar.js" defer></script>
 *
 *  ئینجا هیچ کۆدی تر پێویست نیە!
 * =====================================================
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     1. ژیرەکانی پەرەناسین
  ══════════════════════════════════════════════ */
  var PAGE_MAP = {
    'index.html':   'home',
    '':             'home',
    'market.html':  'market',
    'post.html':    'sell',
    'team.html':    'team',
    'read.html':    'review',
    'sign.html':    'profile',
    'profile.html': 'profile',
    /* ئەگەر پەرەی تر زیادت کرد، ئێرە زیاد بکە */
  };

  /* ── لینکەکانی ناڤبار ── */
  var NAV_LINKS = [
    { href: 'index.html',  label: '🏠 سەرەکی',  key: 'home'    },
    { href: 'market.html', label: '🛒 بازاڕ',    key: 'market'  },
    { href: 'post.html',   label: '➕ فرۆشتن',   key: 'sell'    },
    { href: 'team.html',   label: '👥 تیم',      key: 'team'    },
    { href: 'read.html',   label: '⭐ بۆچوون',   key: 'review'  },
    { href: 'sign.html',   label: '👤 پرۆفایل',  key: 'profile' },
  ];

  /* ══════════════════════════════════════════════
     2. CSS دابار بکە  (ئەگەر نەبێت)
  ══════════════════════════════════════════════ */
  function injectCSS() {
    if (document.querySelector('link[data-navbar-css]')) return;

    /* ڕێگای فایل navbar.js دەگرین، css لە هەمان پۆڵ */
    var scripts = document.querySelectorAll('script');
    var base    = '';

    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('navbar.js') !== -1) {
        base = src.replace('navbar.js', '');
        break;
      }
    }

    var link = document.createElement('link');
    link.rel           = 'stylesheet';
    link.href          = base + 'navbar.css';
    link.setAttribute('data-navbar-css', '1');
    document.head.appendChild(link);
  }

  /* ══════════════════════════════════════════════
     3. HTML ی ناڤبار دروست بکە
  ══════════════════════════════════════════════ */
  function buildNavbar() {
    var currentFile = window.location.pathname.split('/').pop() || '';
    var activePage  = PAGE_MAP[currentFile] || '';

    /* لینکەکان */
    var linksHTML = NAV_LINKS.map(function (item) {
      var isActive = (item.key === activePage) ? ' active' : '';
      return (
        '<li>' +
          '<a href="' + item.href + '" class="nav-link' + isActive + '">' +
            item.label +
          '</a>' +
        '</li>'
      );
    }).join('');

    /* HTML ی تەواوی ناڤبار */
    var html =
      '<nav class="navbar" id="navbar" role="navigation" aria-label="ناڤبار">' +
        '<div class="nav-container">' +

          /* Logo */
          '<a href="index.html" class="logo" aria-label="KurdAccount">' +
            '<span class="logo-icon" aria-hidden="true">' +
              '<i class="fa-solid fa-shield-halved"></i>' +
            '</span>' +
            '<span class="logo-text-wrap">' +
              'Kurd<span class="accent">Account</span>' +
            '</span>' +
          '</a>' +

          /* Nav links */
          '<div class="nav-links-wrap">' +
            '<ul class="nav-links" role="list">' +
              linksHTML +
            '</ul>' +
          '</div>' +

        '</div>' +
      '</nav>';

    return html;
  }

  /* ══════════════════════════════════════════════
     4. ناڤبار لە پەرەکەدا دادەنێت
  ══════════════════════════════════════════════ */
  function insertNavbar() {
    /* ئەگەر ئێستاش ناڤبار هەیە، سڕینەوە */
    var old = document.getElementById('navbar');
    if (old) old.remove();

    /* بۆ دی دانان */
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildNavbar();
    var navbar = wrapper.firstChild;

    document.body.insertBefore(navbar, document.body.firstChild);

    /* padding-top بۆ body — بۆ ئەوەی ناڤبار سەرووی ناوەڕۆک نەبێت */
    if (!document.querySelector('style[data-navbar-pad]')) {
      var style = document.createElement('style');
      style.setAttribute('data-navbar-pad', '1');
      style.textContent = 'body { padding-top: var(--nav-h, 64px) !important; }';
      document.head.appendChild(style);
    }
  }

  /* ══════════════════════════════════════════════
     5. Scroll effect
  ══════════════════════════════════════════════ */
  function initScroll() {
    var navbar  = document.getElementById('navbar');
    if (!navbar) return;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      requestAnimationFrame(function () {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════
     6. Hover spring animation
  ══════════════════════════════════════════════ */
  function initHover() {
    var links = document.querySelectorAll('.nav-link');
    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        this.style.transition =
          'color .3s ease, background .3s ease,' +
          'transform .3s cubic-bezier(.34,1.56,.64,1),' +
          'box-shadow .3s ease';
      });
      link.addEventListener('mouseleave', function () {
        this.style.transition =
          'color .3s ease, background .3s ease,' +
          'transform .3s ease, box-shadow .3s ease';
      });
    });
  }

  /* ══════════════════════════════════════════════
     7. دەستپێکردن
  ══════════════════════════════════════════════ */
  function init() {
    injectCSS();
    insertNavbar();
    initScroll();
    initHover();
  }

  /* منتەظری DOM ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
