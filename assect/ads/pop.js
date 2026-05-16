(function () {

// ١. CSS ڕاستەوخۆ لەناو JS
const style = document.createElement(‘style’);
style.textContent = `


```
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

#ad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
  font-family: 'Noto Naskh Arabic', sans-serif;
  direction: rtl;
}
#ad-overlay.show {
  opacity: 1;
  pointer-events: all;
}
.ad-card {
  background: #1a1a2e;
  border-radius: 22px;
  overflow: hidden;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07);
  transform: scale(0.88) translateY(30px);
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  position: relative;
}
#ad-overlay.show .ad-card {
  transform: scale(1) translateY(0);
}
.ad-banner {
  position: relative;
  height: 200px;
  overflow: hidden;
  display: none;
}
.ad-banner.active { display: block; }
.ad-banner .bg-grad {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.ad-banner .brand-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
}
.brand-name {
  font-size: 28px;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
  line-height: 1.4;
  text-align: right;
  font-family: 'Noto Naskh Arabic', sans-serif;
}
.brand-tagline {
  font-size: 14px;
  color: rgba(255,255,255,0.85);
  margin-top: 6px;
  text-align: right;
  line-height: 1.6;
  font-family: 'Noto Naskh Arabic', sans-serif;
}
.brand-dots {
  display: flex;
  justify-content: center;
  gap: 7px;
  padding: 12px 0 4px;
}
.dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
  border: none;
}
.dot.active {
  background: #e63946;
  transform: scale(1.3);
}
.ad-body {
  padding: 16px 24px 20px;
}
.ad-headline {
  font-size: 17px;
  font-weight: 700;
  color: #f0f0f0;
  text-align: center;
  line-height: 1.8;
  margin-bottom: 14px;
  font-family: 'Noto Naskh Arabic', sans-serif;
}
.ad-headline span { color: #e63946; }
.features {
  list-style: none;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #ccc;
  flex-direction: row-reverse;
  font-family: 'Noto Naskh Arabic', sans-serif;
  line-height: 1.6;
}
.features li .icon {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #e63946;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  color: #fff;
}
.ad-cta-main {
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #e63946, #c1121f);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 14px;
  font-family: 'Noto Naskh Arabic', sans-serif;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 18px rgba(230,57,70,0.35);
  transition: transform 0.18s, box-shadow 0.18s;
  margin-bottom: 10px;
  line-height: 1.6;
}
.ad-cta-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(230,57,70,0.45);
}
.ad-cta-close {
  display: block;
  width: 100%;
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 12px;
  font-family: 'Noto Naskh Arabic', sans-serif;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  line-height: 1.6;
}
.ad-cta-close:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}
.ad-x {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.45);
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
  transition: background 0.2s;
  line-height: 1;
}
.ad-x:hover { background: rgba(230,57,70,0.7); }
.timer-bar {
  height: 3px;
  background: rgba(255,255,255,0.08);
  position: relative;
  overflow: hidden;
}
.timer-bar-fill {
  position: absolute;
  top: 0; right: 0;
  height: 100%;
  background: linear-gradient(90deg, #e63946, #ff6b6b);
  animation: timer-anim 8s linear infinite;
}
@keyframes timer-anim {
  from { width: 100%; }
  to   { width: 0%; }
}
@media (min-width: 768px) {
  .ad-card { max-width: 480px; }
  .ad-banner { height: 230px; }
  .brand-name { font-size: 32px; }
  .ad-headline { font-size: 18px; }
  .features li { font-size: 16px; }
}
@media (min-width: 1024px) {
  .ad-card { max-width: 500px; }
}
```

`;
document.head.appendChild(style);

// ٢. HTML
const wrapper = document.createElement(‘div’);
wrapper.innerHTML = `
<div id="ad-overlay">
<div class="ad-card">
<button class="ad-x" onclick="closeAd()">✕</button>
<div class="timer-bar"><div class="timer-bar-fill" id="timerBar"></div></div>

```
    <div class="ad-banner active" data-brand="0">
      <div class="bg-grad" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.55)), url('assect/image/home.jpg'); background-size: cover; background-position: center;"></div>
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
```

`;
document.body.appendChild(wrapper);

// ٣. براندەکان
const brands = [
{
index: 0,
headline: ‘هەتا <span>١٠٠٪</span> کاشباکی بەخشینی بە خێرایی وەربگرە!’,
features: [‘١٠٠٪ کاشباکی وەرشی’,‘تا وەکو ٢٠٪ کاشباکی هەفتانە’,‘تا وەکو ٣٠٪ پۆینتی زیادە’],
ctaText: ‘بینینی زیاتر ←’, ctaLink: ‘https://aryanbet.com’
},
{
index: 1,
headline: ‘<span>Sport99</span> — گرەو لەسەر هەموو لیگەکان’,
features: [‘ئۆدزی بەرز لە ١٠٠٠+ رووداو’,‘کاشیەکردنی خێرا لە ٥ خولەک’,‘بۆنوسی بەخێرهاتن’],
ctaText: ‘تۆمار بکە ←’, ctaLink: ‘https://sport99.com’
},
{
index: 2,
headline: ‘<span>BetKurd</span> — بەرزترین ئۆدز بۆ تۆ’,
features: [‘بەرزترین ئۆدز لە مارکێت’,‘لایڤ بەتینگ ٢٤/٧’,‘بۆنوسی رەفیق زیادکردن’],
ctaText: ‘ئێستا بەشداری بکە ←’, ctaLink: ‘https://betkurd.com’
},
{
index: 3,
headline: ‘<span>WinZone</span> — کازینۆی ئۆنلاین ژمارە یەک’,
features: [‘سلات، پۆکەر، بلاک جاک’,‘جایزەی ڕۆژانە تا $500’,‘دیلەری ڕاستەوخۆ ٢٤ کاتژمێر’],
ctaText: ‘خەزینەکە وەربگرە ←’, ctaLink: ‘https://winzone.com’
}
];

let currentBrand = 0;
let autoTimer = null;

// Dot ەکان
const dotsContainer = document.getElementById(‘brandDots’);
brands.forEach((_, i) => {
const d = document.createElement(‘button’);
d.className = ‘dot’ + (i === 0 ? ’ active’ : ‘’);
d.onclick = () => { goToBrand(i); resetTimer(); };
dotsContainer.appendChild(d);
});

// داخستن بە کرتە لەدەرەوە
document.getElementById(‘ad-overlay’).addEventListener(‘click’, function(e){
if(e.target === this) closeAd();
});

// ══ سوایپ بۆ مۆبایل ══
let touchStartX = 0;
let touchEndX = 0;
const card = document.querySelector(’.ad-card’);

card.addEventListener(‘touchstart’, function(e) {
touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

card.addEventListener(‘touchend’, function(e) {
touchEndX = e.changedTouches[0].screenX;
const diff = touchStartX - touchEndX;
if (Math.abs(diff) < 50) return;
if (diff > 0) {
goToBrand((currentBrand + 1) % brands.length);
} else {
goToBrand((currentBrand - 1 + brands.length) % brands.length);
}
resetTimer();
}, { passive: true });

function goToBrand(index) {
document.querySelectorAll(’.ad-banner’).forEach((b,i) => b.classList.toggle(‘active’, i===index));
document.querySelectorAll(’.dot’).forEach((d,i) => d.classList.toggle(‘active’, i===index));
const b = brands[index];
document.getElementById(‘adHeadline’).innerHTML = b.headline;
document.getElementById(‘adFeatures’).innerHTML = b.features.map(f=>`<li><span class="icon">✓</span><span>${f}</span></li>`).join(’’);
const cta = document.getElementById(‘adCta’);
cta.innerHTML = b.ctaText;
cta.href = b.ctaLink;
currentBrand = index;
}

function resetTimer() {
clearInterval(autoTimer);
const bar = document.getElementById(‘timerBar’);
bar.style.animation = ‘none’;
bar.offsetHeight;
bar.style.animation = ‘timer-anim 8s linear infinite’;
startAutoRotate();
}

function startAutoRotate() {
clearInterval(autoTimer);
autoTimer = setInterval(() => {
goToBrand((currentBrand + 1) % brands.length);
const bar = document.getElementById(‘timerBar’);
bar.style.animation = ‘none’;
bar.offsetHeight;
bar.style.animation = ‘timer-anim 8s linear infinite’;
}, 8000);
}

window.closeAd = function() {
document.getElementById(‘ad-overlay’).classList.remove(‘show’);
clearInterval(autoTimer);
};

// ستارت
setTimeout(() => {
goToBrand(0);
document.getElementById(‘ad-overlay’).classList.add(‘show’);
startAutoRotate();
}, 800);

})();