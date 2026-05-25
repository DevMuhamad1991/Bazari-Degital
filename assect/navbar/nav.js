/**
 * KurdAccount — nav.js
 * ناڤبار ئۆتۆماتیک دادەنێت — وەک ناو خودی پەرەکە
 *
 * لە هەر پەرەیەک تەنها ئەمانە لە <head> بنووسە:
 *   <link rel="stylesheet" href="navbar/nav.css">
 *   <script src="navbar/nav.js" defer></script>
 */
(function () {
  'use strict';

  /* ══════════════════════════
     پەرەناسین
  ══════════════════════════ */
  var PAGE_MAP = {
    'index.html':   'home',
    '':             'home',
    'market.html':  'market',
    'post.html':    'sell',
    'team.html':    'team',
    'read.html':    'review',
    'sign.html':    'profile',
    'profile.html': 'profile',
  };

  /* ══════════════════════════
     لینکەکان
  ══════════════════════════ */
  var LINKS = [
    { href: 'index.html',  text: '🏠 سەرەکی',  key: 'home'    },
    { href: 'market.html', text: '🛒 بازاڕ',    key: 'market'  },
    { href: 'post.html',   text: '➕ فرۆشتن',   key: 'sell'    },
    { href: 'team.html',   text: '👥 تیم',      key: 'team'    },
    { href: 'read.html',   text: '⭐ بۆچوون',   key: 'review'  },
    { href: 'sign.html',   text: '👤 پرۆفایل',  key: 'profile' },
  ];

  /* ══════════════════════════
     ناڤبار دروست بکە
  ══════════════════════════ */
  function createNavbar() {
    var page = PAGE_MAP[window.location.pathname.split('/').pop() || ''] || '';

    var items = LINKS.map(function (l) {
      return (
        '<li>' +
          '<a href="' + l.href + '" class="nav-link' + (l.key === page ? ' active' : '') + '">' +
            l.text +
          '</a>' +
        '</li>'
      );
    }).join('');

    var nav = document.createElement('nav');
    nav.id = 'navbar';
    nav.innerHTML =
      '<div class="nav-container">' +
        '<a href="index.html" class="logo">' +
          '<span class="logo-icon"><i class="fa-solid fa-shield-halved"></i></span>' +
          '<span class="logo-text">Kurd<span class="accent">Account</span></span>' +
        '</a>' +
        '<div class="nav-links-wrap">' +
          '<ul class="nav-links">' + items + '</ul>' +
        '</div>' +
      '</div>';

    return nav;
  }

  /* ══════════════════════════
     دابنێ
  ══════════════════════════ */
  function mount() {
    /* ناڤبارێکی کۆن ئەگەر هەبوو بیسرەوە */
    var old = document.getElementById('navbar');
    if (old) old.parentNode.removeChild(old);

    /* لە سەرەوەی body دابنێ */
    var nav = createNavbar();
    document.body.insertBefore(nav, document.body.firstChild);

    /* body padding — بۆ ئەوەی ناڤبار سەرووی ناوەڕۆک نەبێت */
    document.body.style.paddingTop = '64px';
  }

  /* ══════════════════════════
     Scroll — scrolled class
  ══════════════════════════ */
  function watchScroll() {
    var nav  = document.getElementById('navbar');
    var busy = false;

    window.addEventListener('scroll', function () {
      if (busy) return;
      requestAnimationFrame(function () {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
        busy = false;
      });
      busy = true;
    }, { passive: true });
  }

  /* ══════════════════════════
     Hover spring
  ══════════════════════════ */
  function watchHover() {
    document.querySelectorAll('#navbar .nav-link').forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        this.style.transition =
          'color .3s ease, background .3s ease,' +
          'transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease';
      });
      a.addEventListener('mouseleave', function () {
        this.style.transition =
          'color .3s ease, background .3s ease, transform .3s ease, box-shadow .3s ease';
      });
    });
  }

  /* ══════════════════════════
     دەستپێک
  ══════════════════════════ */
  function init() {
    mount();
    watchScroll();
    watchHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();