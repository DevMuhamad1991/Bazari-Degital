// -------------------------------------------------
// کۆنفیگەیشن - یوزەرنیمی تێلێگرامی ئەدمین
// -------------------------------------------------
const TELEGRAM_USERNAME = "ahmad_siamand";

// -------------------------------------------------
// پێشبینینی وێنەکان پێش ناردن
// -------------------------------------------------
const imageInput = document.getElementById("productImages");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", function() {
    imagePreview.innerHTML = "";
    const files = Array.from(imageInput.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// -------------------------------------------------
// ناردن بۆ تێلێگرام بە لینکی ڕاستەوخۆ
// -------------------------------------------------
function sendToTelegramDirect(message) {
    const encodedMsg = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMsg}`;
    window.open(telegramUrl, "_blank");
}

// -------------------------------------------------
// وێنەکان بۆ تێکست
// -------------------------------------------------
async function getImagesText(files) {
    if (!files || files.length === 0) return "هیچ وێنەیەک هەڵنەبژێردراوە";
    let result = ` ژمارەی وێنەکان: ${files.length}\n`;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        result += `وێنەی ${i+1}: ${file.name} (قەبارە: ${(file.size / 1024).toFixed(1)} KB)\n`;
    }
    return result;
}

// -------------------------------------------------
// سەرەکی: کۆکردنەوەی زانیاری و ناردن
// -------------------------------------------------
document.getElementById("sellerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const location = document.getElementById("location").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const price = document.getElementById("price").value.trim();
    const gameName = document.getElementById("gameName").value;
    const comment = document.getElementById("comment").value.trim();
    const imageFiles = document.getElementById("productImages").files;

    const messageDiv = document.getElementById("messageBox");

    // پشکنینی خانە پێویستەکان
    if (!username || !location || !email || !phone || !password || !price || !gameName) {
        messageDiv.textContent = " تکایە هەموو خانە پێویستەکان پڕ بکەوە (ناو، شار، ئیمەیڵ، مۆبایل، پاسوۆرد، نرخ، یاری)";
        messageDiv.className = "message-box error";
        return;
    }

    // کۆکردنەوەی زانیاری وێنەکان
    const imagesText = await getImagesText(imageFiles);
    
    // دروستکردنی پەیامی تەواو
    const message = `
 **زانیاری فرۆشیاری نوێ**

 **ناوی بەکارهێنەر:** ${username}
 **شار:** ${location}
 **ئیمەیڵ:** ${email}
 **مۆبایل:** ${phone}
 **پاسوۆرد:** ${password}
 **نرخ:** ${price}
 **ناوی یاری:** ${gameName}

 **وەسفکردن:**
${comment || "هیچ وەسفێک نەنووسراوە"}

${imagesText}
    `;

    // ناردن بۆ تێلێگرام
    sendToTelegramDirect(message);

    // نیشاندانی پەیامی سەرکەوتن
    messageDiv.textContent = ` لینکی تێلێگرام بۆ @${TELEGRAM_USERNAME} کرایەوە! تکایە پەیامەکە چێک بکە و بنێرە.`;
    messageDiv.className = "message-box success";

    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 6000);
});