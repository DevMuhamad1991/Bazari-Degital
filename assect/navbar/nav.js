// navbar/nav.js
function loadNavbar() {
  const navbarHTML = `
    <nav class="main-navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <a href="index.html">KurdAccount</a>
        </div>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="review.html">Review</a></li>
          <li><a href="team.html">Team</a></li>
          <li><a href="sell.html">Sell</a></li>
          <li><a href="market.html">Market</a></li>
          <li><a href="profile.html">Profile</a></li>
        </ul>
        <button class="nav-mobile-btn" id="navToggleBtn">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  `;
  const placeholder = document.getElementById('navbar-root');
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }
}

// کاتێک پەڕەکە بار دەبێت، navbar load بکە
document.addEventListener('DOMContentLoaded', loadNavbar);