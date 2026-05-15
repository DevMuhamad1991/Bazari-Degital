(function () {
  // ١. CSS لۆد بکە
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assect/ads/pop.css';
  document.head.appendChild(link);

  // ٢. HTML ڕاستەوخۆ بخەرە ناو body — بەبێ fetch
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="ad-overlay">
      <div class="ad-card">
        <button class="ad-x" onclick="closeAd()">✕</button>
        <div class="timer-bar"><div class="timer-bar-fill" id="timerBar"></div></div>

        <div class="ad-banner active" data-brand="0">
          <div class="bg-grad" style="background: radial-gradient(ellipse at 30% 50%, rgba(230,57,70,0.25) 0%, transparent 60%), linear-gradient(135deg,#0f2027,#203a43,#2c5364);"></div>
          <div class="brand-overlay">
            <div class="brand-name">aryanbet</div>
            <div class="brand-tagline">باوەڕپێکراوترین سایتی گرەو لە کوردستان</div>
          </div>
        </div>

        <div class="ad-banner" data-brand="1">
          <div class="bg-grad" style="background: radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.3) 0%, transparent 60%), linear-gradient(135deg,#064e3b,#065f46,#047857);"></div>
          <div class="brand-overlay">
            <div class="brand-name">Sport99 ⚽</div>
            <div class="brand-tagline">گرەوی وەرزشی ژیر و خێرا</div>
          </div>
        </div>

        <div class="ad-banner" data-brand="2">
          <div class="bg-grad" style="background: radial-gradient(ellipse at 50% 30%, rgba(234,179,8,0.3) 0%, transparent 60%), linear-gradient(135deg,#1c1917,#292524,#3d2e00);"></div>
          <div class="brand-overlay">
            <div class="brand-name" style="color:#fbbf24;">BetKurd 🏆</div>
            <div class="brand-tagline">بەرزترین ئۆدز لە مارکێت</div>
          </div>
        </div>

        <div class="ad-banner" data-brand="3">
          <div class="bg-grad" style="background: radial-gradient(ellipse at 40% 60%, rgba(139,92,246,0.35) 0%, transparent 60%), linear-gradient(135deg,#1e1b4b,#312e81,#4338ca);"></div>
          <div class="brand-overlay">
            <div class="brand-name">WinZone 🎰</div>
            <div class="brand-tagline">کازینۆی ئۆنلاین ژمارە یەک</div>
          </div>
        </div>

        <div class="brand-dots" id="brandDots"></div>

        <div class="ad-body">
          <p class="ad-headline" id="adHeadline"></p>
          <ul class="features" id="adFeatures"></ul>
          <a href="#" class="ad-cta-main" id="adCta"></a>
          <button class="ad-cta-close" onclick="closeAd()">داخستن</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  // ٣. براندەکان
  const brands = [
    {
      index: 0,
      headline: 'هەتا <span>١٠٠٪</span> کاشباکی بەخشینی بە خێرایی وەربگرە!',
      features: ['١٠٠٪ کاشباکی وەرشی','تا وەکو ٢٠٪ کاشباکی هەفتانە','تا وەکو ٣٠٪ پۆینتی زیادە'],
      ctaText: 'بینینی زیاتر ←', ctaLink: 'https://aryanbet.com'
    },
    {
      index: 1,
      headline: '<span>Sport99</span> — گرەو لەسەر هەموو لیگەکان',
      features: ['ئۆدزی بەرز لە ١٠٠٠+ رووداو','کاشیەکردنی خێرا لە ٥ خولەک','بۆنوسی بەخێرهاتن'],
      ctaText: 'تۆمار بکە ←', ctaLink: 'https://sport99.com'
    },
    {
      index: 2,
      headline: '<span>BetKurd</span> — بەرزترین ئۆدز بۆ تۆ',
      features: ['بەرزترین ئۆدز لە مارکێت','لایڤ بەتینگ ٢٤/٧','بۆنوسی رەفیق زیادکردن'],
      ctaText: 'ئێستا بەشداری بکە ←', ctaLink: 'https://betkurd.com'
    },
    {
      index: 3,
      headline: '<span>WinZone</span> — کازینۆی ئۆنلاین ژمارە یەک',
      features: ['سلات، پۆکەر، بلاک جاک','جایزەی ڕۆژانە تا $500','دیلەری ڕاستەوخۆ ٢٤ کاتژمێر'],
      ctaText: 'خەزینەکە وەربگرە ←', ctaLink: 'https://winzone.com'
    }
  ];

  let currentBrand = 0;
  let autoTimer = null;

  // Dot ەکان
  const dotsContainer = document.getElementById('brandDots');
  brands.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goToBrand(i);
    dotsContainer.appendChild(d);
  });

  document.getElementById('ad-overlay').addEventListener('click', function(e){
    if(e.target === this) closeAd();
  });

  function goToBrand(index) {
    document.querySelectorAll('.ad-banner').forEach((b,i) => b.classList.toggle('active', i===index));
    document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===index));
    const b = brands[index];
    document.getElementById('adHeadline').innerHTML = b.headline;
    document.getElementById('adFeatures').innerHTML = b.features.map(f=>`<li><span class="icon">✓</span><span>${f}</span></li>`).join('');
    const cta = document.getElementById('adCta');
    cta.innerHTML = b.ctaText;
    cta.href = b.ctaLink;
    currentBrand = index;
  }

  function startAutoRotate() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goToBrand((currentBrand + 1) % brands.length);
      const bar = document.getElementById('timerBar');
      bar.style.animation = 'none';
      bar.offsetHeight;
      bar.style.animation = 'timer-anim 8s linear infinite';
    }, 8000);
  }

  window.closeAd = function() {
    document.getElementById('ad-overlay').classList.remove('show');
    clearInterval(autoTimer);
  };

  // ستارت
  setTimeout(() => {
    goToBrand(0);
    document.getElementById('ad-overlay').classList.add('show');
    startAutoRotate();
  }, 800);

})();
