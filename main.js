/* FLaME Lab — Global JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── ACTIVE NAV LINK ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── HAMBURGER ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  }

  /* ── SCROLL TO TOP ── */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── GALLERY SLIDER ── */
  const slides = document.querySelectorAll('.gallery-slide');
  const dots   = document.querySelectorAll('.gallery-dot');
  let current  = 0, timer;

  function goTo(i) {
    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  if (slides.length) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
    timer = setInterval(() => goTo(current + 1), 4500);

    dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); goTo(i); timer = setInterval(() => goTo(current + 1), 4500); }));
    document.querySelector('.gallery-prev')?.addEventListener('click', () => { clearInterval(timer); goTo(current - 1); timer = setInterval(() => goTo(current + 1), 4500); });
    document.querySelector('.gallery-next')?.addEventListener('click', () => { clearInterval(timer); goTo(current + 1); timer = setInterval(() => goTo(current + 1), 4500); });
  }

  /* ── NEWS TOGGLE ── */
  const hiddenRows = document.querySelectorAll('.news-hidden');
  const viewMore   = document.querySelector('.view-more-btn');
  let expanded     = false;
  if (viewMore) {
    viewMore.addEventListener('click', e => {
      e.preventDefault();
      expanded = !expanded;
      hiddenRows.forEach(r => r.style.display = expanded ? 'grid' : 'none');
      viewMore.textContent = expanded ? 'View less' : 'View more';
    });
  }

  /* ── RESEARCH CARDS TOGGLE ── */
  const raCards = document.querySelectorAll('.ra-card');
  raCards.forEach(card => {
    card.addEventListener('click', () => {
      const id    = card.dataset.research;
      const detailId = id + '-detail';
      const detail   = document.getElementById(detailId);
      const wasOpen  = card.classList.contains('active');

      raCards.forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.ra-detail').forEach(d => d.classList.remove('open'));

      if (!wasOpen && detail) {
        card.classList.add('active');
        detail.classList.add('open');
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  /* ── PUB SEARCH & FILTER ── */
  const searchInput = document.getElementById('pubSearch');
  const yearSelect  = document.getElementById('yearFilter');
  const catBtns     = document.querySelectorAll('.cat-btn');
  let currentCat    = 'all';

  function filterPubs() {
    const q    = searchInput?.value.toLowerCase() || '';
    const yr   = yearSelect?.value || 'all';
    document.querySelectorAll('.pub-entry').forEach(entry => {
      const text = entry.textContent.toLowerCase();
      const year = entry.dataset.year;
      const cat  = entry.dataset.category?.toLowerCase() || '';
      const matchQ   = !q || text.includes(q);
      const matchYr  = yr === 'all' || year === yr;
      const matchCat = currentCat === 'all' || cat.includes(currentCat);
      entry.style.display = (matchQ && matchYr && matchCat) ? 'grid' : 'none';
    });
    document.querySelectorAll('.pub-year-section').forEach(sec => {
      const visible = [...sec.querySelectorAll('.pub-entry')].some(e => e.style.display !== 'none');
      sec.style.display = visible ? 'block' : 'none';
    });
  }

  searchInput?.addEventListener('input', filterPubs);
  yearSelect?.addEventListener('change', filterPubs);
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      filterPubs();
    });
  });

  /* ── MAP TOGGLE ── */
  const mapContainer = document.getElementById('mapContainer');
  document.querySelector('.toggle-map')?.addEventListener('click', () => {
    if (mapContainer) {
      mapContainer.style.display = mapContainer.style.display === 'none' ? 'block' : 'none';
    }
  });
});
