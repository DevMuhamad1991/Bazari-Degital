import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyASJbu_rNecyaHi9gqrE9PSOwyA7pvq92E",
  authDomain: "kurd-account.firebaseapp.com",
  projectId: "kurd-account",
  storageBucket: "kurd-account.firebasestorage.app",
  messagingSenderId: "325274297633",
  appId: "1:325274297633:web:04f9b4b209d3d0f6a90a60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Tab Panel
function showPanel(name) {
  document.querySelectorAll('.panel').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  document.getElementById('panel-' + name).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}

window.showPanel = showPanel;

// تۆماركردن
document.getElementById('registerBtn').addEventListener('click', async function() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('registerEmail').value.trim();
  const password  = document.getElementById('registerPassword').value;

  if (!firstName || !lastName || !email || !password) {
    alert('تکایە هەموو خانەکان پڕبکەرەوە');
    return;
  }

  if (password.length < 8) {
    alert('وشەی نهێنی دەبێت لانی کەم ٨ پیت بێت');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('هەژمارەکەت بەسەرکەوتوویی دروستکرا ✅');
    showPanel('login');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('ئەم ئیمەیڵە پێشتر تۆماركراوە ❌');
    } else if (error.code === 'auth/invalid-email') {
      alert('ئیمەیڵەکە دروست نییە ❌');
    } else if (error.code === 'auth/weak-password') {
      alert('وشەی نهێنی قەولەیە ❌');
    } else {
      alert(error.message);
    }
  }
});

// چوونەژوورەوە
document.getElementById('loginBtn').addEventListener('click', async function() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('تکایە ئیمەیڵ و وشەی نهێنی بنووسە');
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('بەخێربێیت! ✅');
    // ئێرە بنووسە بەکارهێنەر بۆ کوێ بڕوات دوای چوونەژوورەوە
    window.location.href = 'market.html';
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      alert('ئەم بەکارهێنەرە نەدۆزرایەوە ❌');
    } else if (error.code === 'auth/wrong-password') {
      alert('وشەی نهێنی هەڵەیە ❌');
    } else if (error.code === 'auth/invalid-email') {
      alert('ئیمەیڵەکە دروست نییە ❌');
    } else if (error.code === 'auth/invalid-credential') {
      alert('ئیمەیڵ یان وشەی نهێنی هەڵەیە ❌');
    } else {
      alert(error.message);
    }
  }
});
