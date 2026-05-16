(function () {
/* ══════════════════════════════════════════
KurdAccount — Ad Popup
فایل: assect/ads/pop.js
══════════════════════════════════════════ */

// ── CSS ──────────────────────────────────
const style = document.createElement(‘style’);
style.textContent = `
@keyframes ka-fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes ka-slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }

```
#ka-overlay {
  position:fixed; inset:0;
  background:rgba(0,0,0,.65);
  backdrop-filter:blur(5px);
  display:flex; align-items:center; justify-content:center;
  z-index:99999; padding:16px;
  animation:ka-fadeIn .35s ease;
}

#ka-card {
  background:#1a1a1a;
  border-radius:20px;
  overflow:hidden;
  width:100%; max-width:420px;
  box-shadow:0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06);
  animation:ka-slideUp .4s cubic-bezier(.22,1,.36,1);
  font-family:'Noto Kufi Arabic','Cairo',sans-serif;
  direction:rtl;
}

/* ── Banner ── */
#ka-banner {
  position:relative; width:100%;
  aspect-ratio:16/9; overflow:hidden; cursor:pointer;
  display:block; text-decoration:none;
}
#ka-banner img {
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform .4s ease;
}
#ka-banner:hover img { transform:scale(1.04); }

#ka-banner-overlay {
  position:absolute; inset:0;
  background:linear-gradient(120deg,rgba(0,0,0,.6) 40%,transparent);
  display:flex; flex-direction:column;
  justify-content:center; align-items:flex-end;
  padding:20px 22px; gap:10px;
}

#ka-title {
  color:#fff;
  font-size:clamp(15px,4vw,21px);
  font-weight:900; line-height:1.45;
  text-align:right;
  text-shadow:0 2px 12px rgba(0,0,0,.5);
}
#ka-title span { color:#f9ca24; font-style:italic; }

#ka-checks {
  list-style:none; margin:0; padding:0;
  display:flex; flex-direction:column; gap:5px; align-items:flex-end;
}
#ka-checks li {
  color:#fff;
  font-size:clamp(11px,2.5vw,13px);
  font-weight:600;
  display:flex; align-items:center; gap:6px;
  text-shadow:0 1px 6px rgba(0,0,0,.6);
}
#ka-checks li::before {
  content:'✓';
  background:#27ae60; color:#fff;
  border-radius:50%;
  width:18px; height:18px;
  display:flex; align-items:center; justify-content:center;
  font-size:11px; flex-shrink:0; order:1;
}

/* ── Buttons ── */
#ka-actions {
  display:flex; flex-direction:column; gap:10px;
  padding:16px 16px 20px;
}

#ka-btn-go {
  display:flex; align-items:center; justify-content:center; gap:8px;
  background:linear-gradient(135deg,#e84393,#c0392b);
  color:#fff;
  font-family:inherit;
  font-size:clamp(15px,3.5vw,18px); font-weight:700;
  border:none; border-radius:50px;
  padding:14px 24px; cursor:pointer;
  text-decoration:none;
  transition:transform .18s,box-shadow .18s,filter .18s;
  box-shadow:0 6px 24px rgba(232,67,147,.45);
}
#ka-btn-go:hover {
  transform:translateY(-2px) scale(1.02);
  box-shadow:0 10px 32px rgba(232,67,147,.6);
  filter:brightness(1.08);
}
#ka-btn-go:active { transform:scale(.97); }

#ka-btn-close {
  background:rgba(255,255,255,.07);
  color:rgba(255,255,255,.5);
  font-family:inherit;
  font-size:clamp(13px,3vw,15px); font-weight:500;
  border:1px solid rgba(255,255,255,.1);
  border-radius:50px;
  padding:12px 24px; cursor:pointer;
  transition:background .18s,color .18s;
}
#ka-btn-close:hover {
  background:rgba(255,255,255,.12);
  color:rgba(255,255,255,.8);
}

@media(min-width:768px){
  #ka-card { max-width:480px; }
  #ka-banner-overlay { padding:28px; gap:14px; }
  #ka-actions { padding:20px 20px 26px; gap:12px; }
}
@media(min-width:1024px){
  #ka-card { max-width:540px; }
}
```

`;
document.head.appendChild(style);

// ── HTML ─────────────────────────────────
const overlay = document.createElement(‘div’);
overlay.id = ‘ka-overlay’;
overlay.innerHTML = `
<div id="ka-card">

```
  <!-- ① ئەم href گۆڕ بۆ بەستەری ریکلامەکەت -->
  <a id="ka-banner" href="https://example.com" target="_blank" rel="noopener">

    <!-- ② وێنەکەت ئێرە: src="assect/ads/ad.jpg" -->
    <img src="assect/ads/ad.jpg" alt="ریکلام"
         onerror="this.style.display='none';document.getElementById('ka-banner').style.background='linear-gradient(135deg,#1a472a,#2d6a4f)'" />

    <div id="ka-banner-overlay">
      <!-- ③ ناونیشان و لیستەکان گۆڕ -->
      <div id="ka-title">
        باوەڕپێکراوترین سایتی گرەو<br>
        لە کوردستان <span>YourBrand</span>
      </div>
      <ul id="ka-checks">
        <li>100% کاشباکی وەرشی</li>
        <li>تا وەکو 20% کاشباکی هەفتانە</li>
        <li>تا وەکو 30% پۆینتی زیادە لە گرەوی وەرزشی</li>
      </ul>
    </div>
  </a>

  <div id="ka-actions">
    <!-- ④ href ی ئەمەش گۆڕ -->
    <a id="ka-btn-go" href="https://example.com" target="_blank" rel="noopener">
      بینینی زیاتر ←
    </a>
    <button id="ka-btn-close">داخستن</button>
  </div>

</div>
```

`;
document.body.appendChild(overlay);

// ── داخستن ──────────────────────────────
function closeAd() {
overlay.style.transition = ‘opacity .25s ease’;
overlay.style.opacity = ‘0’;
setTimeout(() => overlay.remove(), 260);
}

document.getElementById(‘ka-btn-close’).addEventListener(‘click’, closeAd);

// کلیک لەدەرەوەی کارت داخستنی ریکلام
overlay.addEventListener(‘click’, function (e) {
if (e.target === overlay) closeAd();
});

// کی‌بۆرد ESC
document.addEventListener(‘keydown’, function (e) {
if (e.key === ‘Escape’) closeAd();
});

})();