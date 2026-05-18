// دۆخی سڵایدەکان
const st = {};

// فەنکشنی گۆڕینی سڵاید
function go(id, idx) {
	st[id] = idx;
	const slidesEl = document.getElementById(id + '-slides');
	if (slidesEl) slidesEl.style.transform = `translateX(-${idx * 100}%)`;
	const dotsEl = document.getElementById(id + '-dots');
	if (dotsEl) {
		dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === idx));
	}
}

// کلیک لە خاڵەکان
document.querySelectorAll('.dot').forEach(el => {
	el.addEventListener('click', (e) => {
		e.stopPropagation();
		go(el.dataset.c, +el.dataset.i);
	});
});

// تاچ (swipe) بۆ مۆبایل
document.querySelectorAll('.img-wrap').forEach(wrap => {
	const id = wrap.id.replace('-wrap', '');
	st[id] = 0;
	let sx = 0;
	wrap.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
	wrap.addEventListener('touchend', e => {
		const dx = e.changedTouches[0].clientX - sx;
		const slidesEl = document.getElementById(id + '-slides');
		const n = slidesEl ? slidesEl.children.length : 0;
		if (dx < -40 && st[id] < n - 1) go(id, st[id] + 1);
		if (dx > 40 && st[id] > 0) go(id, st[id] - 1);
	}, { passive: true });
});

// ========== مۆدال ==========
const modal = document.getElementById('imageModal');
const modalSlides = document.getElementById('modalSlides');
const modalDots = document.getElementById('modalDots');
let currentModalCard = null;
let currentModalIndex = 0;

document.querySelectorAll('.img-wrap').forEach((wrap) => {
	wrap.addEventListener('click', (e) => {
		e.stopPropagation();
		const id = wrap.id.replace('-wrap', '');
		const slidesContainer = document.getElementById(id + '-slides');
		const slides = slidesContainer ? Array.from(slidesContainer.children) : [];

		modalSlides.innerHTML = '';
		modalDots.innerHTML = '';

		slides.forEach((slide, i) => {
			const clone = slide.cloneNode(true);
			clone.classList.add('modal-slide');
			modalSlides.appendChild(clone);

			const dot = document.createElement('div');
			dot.classList.add('modal-dot');
			if (i === st[id]) dot.classList.add('on');
			dot.addEventListener('click', (e) => {
				e.stopPropagation();
				currentModalIndex = i;
				updateModalSlide();
			});
			modalDots.appendChild(dot);
		});

		currentModalCard = id;
		currentModalIndex = st[id];
		updateModalSlide();
		modal.classList.add('show');
	});
});

function updateModalSlide() {
	if (!currentModalCard) return;
	modalSlides.style.transform = `translateX(-${currentModalIndex * 100}%)`;
	const dots = modalDots.querySelectorAll('.modal-dot');
	dots.forEach((d, i) => d.classList.toggle('on', i === currentModalIndex));
}

let modalTouchStart = 0;
let modalTouchEnd = 0;

modalSlides.addEventListener('touchstart', (e) => {
	modalTouchStart = e.touches[0].clientX;
}, { passive: true });

modalSlides.addEventListener('touchmove', (e) => {
	modalTouchEnd = e.touches[0].clientX;
}, { passive: true });

modalSlides.addEventListener('touchend', () => {
	const dx = modalTouchEnd - modalTouchStart;
	const slides = modalSlides.children;
	if (Math.abs(dx) > 50) {
		if (dx < 0 && currentModalIndex < slides.length - 1) currentModalIndex++;
		if (dx > 0 && currentModalIndex > 0) currentModalIndex--;
		updateModalSlide();
	}
	modalTouchStart = 0;
	modalTouchEnd = 0;
});

document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', (e) => {
	if (e.target === modal) modal.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
	if (!modal.classList.contains('show')) return;
	const slides = modalSlides.children;
	if (e.key === 'ArrowLeft' && currentModalIndex < slides.length - 1) {
		currentModalIndex++;
		updateModalSlide();
	} else if (e.key === 'ArrowRight' && currentModalIndex > 0) {
		currentModalIndex--;
		updateModalSlide();
	} else if (e.key === 'Escape') {
		modal.classList.remove('show');
	}
});

// ========== کڕینی کاڵا ==========
function buyProduct(productName, price) {
	if (confirm(`تۆ دەتەوێت "${productName}" بە $${price} بکڕیت؟`)) {
		const phone = "964XXXXXXXXX";
		const message = encodeURIComponent(`سڵاو، من حەز بە کڕینی ${productName} بە $${price} دەکەم`);
		window.location.href = `https://wa.me/${phone}?text=${message}`;
	}
}

document.querySelectorAll('.buy-btn, .price-side').forEach(el => {
	el.addEventListener('click', (e) => {
		e.stopPropagation();
		const card = el.closest('.card');
		if (card) buyProduct(card.dataset.product, card.dataset.price);
	});
});

// چالاککردنی چێپەکان
document.querySelectorAll('.chips .chip').forEach(c => {
	c.addEventListener('click', () => {
		document.querySelectorAll('.chips .chip').forEach(x => x.classList.remove('active-blue'));
		c.classList.add('active-blue');
	});
});

document.querySelectorAll('.sort-chips .chip').forEach(c => {
	c.addEventListener('click', () => {
		document.querySelectorAll('.sort-chips .chip').forEach(x => x.classList.remove('active-green'));
		c.classList.add('active-green');
	});
});

// بەشی بەلێن (Subscribe)
const subscribeBtn = document.querySelector('.subscribe-input-group button');
if (subscribeBtn) {
	subscribeBtn.addEventListener('click', () => {
		const emailInput = document.querySelector('.subscribe-input-group input');
		if (emailInput && emailInput.value) {
			alert(`زۆر سوپاس! ئیمەیڵی ${emailInput.value} تۆمارکرا.`);
			emailInput.value = '';
		} else {
			alert('تکایە ئیمەیڵێکی دروست بنوسە.');
		}
	});
}