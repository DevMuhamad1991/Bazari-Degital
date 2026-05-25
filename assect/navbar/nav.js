function loadNavbar() {
  const navbarHTML = `
   <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="index.html" class="logo">
        <span class="logo-icon"><i class="fa-solid fa-shield-halved"></i></span>
        <span class="logo-text">Kurd<span class="accent">Account</span></span>
      </a>
        <div class="nav-links-wrap">
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="read.html" class="nav-link">Review</a></li>
            <li><a href="team.html" class="nav-link">Team</a></li>
            <li><a href="sell.html" class="nav-link">Sell</a></li>
            <li><a href="market.html" class="nav-link">Market</a></li>
            <li><a href="profile.html" class="nav-link">Profile</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  const placeholder = document.getElementById('navbar-root');
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }
}
document.addEventListener('DOMContentLoaded', loadNavbar);