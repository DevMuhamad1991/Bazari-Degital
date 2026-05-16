(function () {

var overlay = document.createElement(‘div’);
overlay.id = ‘ka-overlay’;

var card = document.createElement(‘div’);
card.id = ‘ka-card’;

// Banner link
var banner = document.createElement(‘a’);
banner.id = ‘ka-banner’;
banner.href = ‘https://example.com’; // ← بەستەری ریکلامەکەت
banner.target = ‘_blank’;
banner.rel = ‘noopener’;

// Image
var img = document.createElement(‘img’);
img.src = ‘../image/home.jpg’;
img.alt = ‘Ad’;

// Banner overlay text
var bannerOverlay = document.createElement(‘div’);
bannerOverlay.id = ‘ka-banner-overlay’;

var title = document.createElement(‘div’);
title.id = ‘ka-title’;
title.innerHTML = ‘باوەڕپێکراوترین سایتی گرەو<br>لە کوردستان <span>YourBrand</span>’;

var checks = document.createElement(‘ul’);
checks.id = ‘ka-checks’;
checks.innerHTML =
‘<li>100% کاشباکی وەرشی</li>’ +
‘<li>تا وەکو 20% کاشباکی هەفتانە</li>’ +
‘<li>تا وەکو 30% پۆینتی زیادە لە گرەوی وەرزشی</li>’;

bannerOverlay.appendChild(title);
bannerOverlay.appendChild(checks);
banner.appendChild(img);
banner.appendChild(bannerOverlay);

// Buttons
var actions = document.createElement(‘div’);
actions.id = ‘ka-actions’;

var btnGo = document.createElement(‘a’);
btnGo.id = ‘ka-btn-go’;
btnGo.href = ‘https://example.com’; // ← بەستەری ریکلامەکەت
btnGo.target = ‘_blank’;
btnGo.rel = ‘noopener’;
btnGo.textContent = ‘بینینی زیاتر ←’;

var btnClose = document.createElement(‘button’);
btnClose.id = ‘ka-btn-close’;
btnClose.textContent = ‘داخستن’;

actions.appendChild(btnGo);
actions.appendChild(btnClose);

card.appendChild(banner);
card.appendChild(actions);
overlay.appendChild(card);
document.body.appendChild(overlay);

// Close
function closeAd() {
overlay.style.transition = ‘opacity .25s ease’;
overlay.style.opacity = ‘0’;
setTimeout(function () { overlay.remove(); }, 260);
}

btnClose.addEventListener(‘click’, closeAd);
overlay.addEventListener(‘click’, function (e) {
if (e.target === overlay) closeAd();
});
document.addEventListener(‘keydown’, function (e) {
if (e.key === ‘Escape’) closeAd();
});

})();