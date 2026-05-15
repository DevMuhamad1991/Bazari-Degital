// ══════════════════════════════════════════
//  ١. CSS و HTML لۆد بکە
// ══════════════════════════════════════════
(function () {
// CSS
const link = document.createElement(‘link’);
link.rel = ‘stylesheet’;
link.href = ‘popup-ad.css’;
document.head.appendChild(link);

// HTML فەچ بکە و بیخەرە ناو body
fetch(‘popup-ad.html’)
.then(r => r.text())
.then(html => {
const wrapper = document.createElement(‘div’);
wrapper.innerHTML = html;
document.body.appendChild(wrapper);
initPopup(); // دوای هاوردەکردن ستارت بکە
});
})();

// ══════════════════════════════════════════
//  ٢. براندەکان — ئێرەدا دەیگۆڕی
// ══════════════════════════════════════════
const brands = [
{
index: 0,
headline: ‘هەتا <span>١٠٠٪</span> کاشباکی بەخشینی بە خێرایی وەربگرە!’,
features: [
‘١٠٠٪ کاشباکی وەرشی’,
‘تا وەکو ٢٠٪ کاشباکی هەفتانە’,
‘تا وەکو ٣٠٪ پۆینتی زیادە لە گرەوی وەرزشی’
],
ctaText: ‘بینینی زیاتر ←’,
ctaLink: ‘https://aryanbet.com’
},
{
index: 1,
headline: ‘<span>Sport99</span> — گرەو لەسەر هەموو لیگەکان’,
features: [
‘ئۆدزی بەرز لە ١٠٠٠+ رووداو’,
‘کاشیەکردنی خێرا لە ٥ خولەک’,
‘بۆنوسی بەخێرهاتن بۆ تازەکان’
],
ctaText: ‘تۆمار بکە ←’,
ctaLink: ‘https://sport99.com’
},
{
index: 2,
headline: ‘<span>BetKurd</span> — بەرزترین ئۆدز بۆ تۆ’,
features: [
‘بەرزترین ئۆدز لە مارکێت’,
‘لایڤ بەتینگ ٢٤/٧’,
‘بۆنوسی رەفیق زیادکردن’
],
ctaText: ‘ئێستا بەشداری بکە ←’,
ctaLink: ‘https://betkurd.com’
},
{
index: 3,
headline: ‘<span>WinZone</span> — کازینۆی ئۆنلاین ژمارە یەک’,
features: [
‘سلات، پۆکەر، بلاک جاک’,
‘جایزەی ڕۆژانە تا $500’,
‘دیلەری ڕاستەوخۆ ٢٤ کاتژمێر’
],
ctaText: ‘خەزینەکە وەربگرە ←’,
ctaLink: ‘https://winzone.com’
}
];

// ══════════════════════════════════════════
//  ٣. لۆجیکی پۆپئەپ
// ══════════════════════════════════════════
let currentBrand = 0;
let autoTimer = null;

function initPopup() {
// Dot ەکان دروست بکە
const dotsContainer = document.getElementById(‘brandDots’);
brands.forEach((_, i) => {
const d = document.createElement(‘button’);
d.className = ‘dot’ + (i === 0 ? ’ active’ : ‘’);
d.setAttribute(‘aria-label’, ’براند ’ + (i + 1));
d.onclick = () => goToBrand(i);
dotsContainer.appendChild(d);
});

// کرتە لەسەر دەرەوەی کارد داخستن
document.getElementById(‘ad-overlay’).addEventListener(‘click’, function (e) {
if (e.target === this) closeAd();
});

// ئۆتۆماتیک کرادەوە
setTimeout(showAd, 800);
}

function goToBrand(index) {
document.querySelectorAll(’.ad-banner’).forEach((b, i) => {
b.classList.toggle(‘active’, i === index);
});
document.querySelectorAll(’.dot’).forEach((d, i) => {
d.classList.toggle(‘active’, i === index);
});

const b = brands[index];
document.getElementById(‘adHeadline’).innerHTML = b.headline;
document.getElementById(‘adFeatures’).innerHTML = b.features
.map(f => `<li><span class="icon">✓</span><span>${f}</span></li>`)
.join(’’);
const cta = document.getElementById(‘adCta’);
cta.textContent = b.ctaText;
cta.href = b.ctaLink;

currentBrand = index;
}

function startAutoRotate() {
clearInterval(autoTimer);
autoTimer = setInterval(() => {
const next = (currentBrand + 1) % brands.length;
goToBrand(next);
const bar = document.getElementById(‘timerBar’);
bar.style.animation = ‘none’;
bar.offsetHeight;
bar.style.animation = ‘timer-anim 8s linear infinite’;
}, 8000);
}

function showAd() {
document.getElementById(‘ad-overlay’).classList.add(‘show’);
goToBrand(0);
startAutoRotate();
}

function closeAd() {
document.getElementById(‘ad-overlay’).classList.remove(‘show’);
clearInterval(autoTimer);
}
