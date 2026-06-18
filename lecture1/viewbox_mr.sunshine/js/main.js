/* ─── SUPABASE SETUP ──────────────────────────────── */
const SUPABASE_URL = 'https://qvuxtgulownzjzmqcqdf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dXh0Z3Vsb3duemp6bXFjcWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTc4NTEsImV4cCI6MjA5NjQzMzg1MX0.-ruoUeTh267KubAQtjr-1RsNy5MY4PJwpi61nfF_gMk';

let sb = null;
if (typeof window.supabase !== 'undefined') {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

/* ─── SESSION ─────────────────────────────────────── */
function getSessionId() {
  let sid = localStorage.getItem('vb_session');
  if (!sid) {
    sid = 'vb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('vb_session', sid);
  }
  return sid;
}

/* ─── WATCHLIST ───────────────────────────────────── */
async function loadWatchlist() {
  if (!sb) return;
  try {
    const { data } = await sb
      .from('viewbox_watchlist')
      .select('episode_id')
      .eq('session_id', getSessionId());

    const ids = new Set((data || []).map(d => d.episode_id));
    document.querySelectorAll('[data-wishlist]').forEach(btn => {
      if (ids.has(parseInt(btn.dataset.wishlist))) setWishActive(btn, true);
    });
  } catch {}
}

function setWishActive(btn, active) {
  btn.classList.toggle('active', active);
  btn.setAttribute('aria-label', active ? '찜 취소' : '찜하기');
  const path = btn.querySelector('path');
  if (path) path.setAttribute('fill', active ? 'currentColor' : 'none');
}

async function toggleWishlist(btn) {
  if (!sb) { showToast('연결 중입니다. 잠시 후 다시 시도해주세요.'); return; }
  const epId = parseInt(btn.dataset.wishlist);
  const sid = getSessionId();
  const isActive = btn.classList.contains('active');

  btn.disabled = true;
  try {
    if (isActive) {
      const { error } = await sb
        .from('viewbox_watchlist').delete()
        .eq('session_id', sid).eq('episode_id', epId);
      if (!error) { setWishActive(btn, false); showToast('찜 목록에서 제거되었습니다'); }
    } else {
      const { error } = await sb
        .from('viewbox_watchlist').insert({ session_id: sid, episode_id: epId });
      if (!error) { setWishActive(btn, true); showToast('찜 목록에 추가되었습니다 ♥'); }
    }
  } catch { showToast('오류가 발생했습니다. 다시 시도해주세요.'); }
  finally { btn.disabled = false; }
}

/* ─── NOTIFICATION ────────────────────────────────── */
async function subscribeNotification() {
  if (!sb) { closeModal('modal-notify'); showToast('알림 신청이 완료되었습니다! 🔔'); return; }
  try {
    await sb.from('viewbox_notifications').insert({ session_id: getSessionId() });
  } catch {}
  closeModal('modal-notify');
  showToast('알림 신청이 완료되었습니다! 🔔');
}

/* ─── MODALS ──────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}

/* ─── TOAST ───────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ─── HEADER SCROLL ───────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── MUTE BUTTON ─────────────────────────────────── */
function initMuteBtn() {
  const btn = document.getElementById('btn-mute');
  if (!btn) return;
  let muted = true;
  const muteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  const unmuteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
  btn.innerHTML = muteIcon;
  btn.addEventListener('click', () => {
    muted = !muted;
    btn.innerHTML = muted ? muteIcon : unmuteIcon;
    btn.setAttribute('aria-label', muted ? '음소거' : '소리 켜기');
    showToast(muted ? '음소거 되었습니다' : '소리가 켜졌습니다');
  });
}

/* ─── SCROLL FADE-IN ──────────────────────────────── */
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ─── EVENT BINDING ───────────────────────────────── */
function bindEvents() {
  /* Logo → top */
  document.getElementById('logo-link')?.addEventListener('click', e => {
    e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Header buttons */
  document.getElementById('btn-login')?.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  document.getElementById('btn-alarm')?.addEventListener('click', () => {
    window.location.href = 'alarm.html';
  });

  /* Hero notify */
  document.getElementById('btn-notify')?.addEventListener('click', () => openModal('modal-notify'));

  /* Notify modal confirm */
  document.getElementById('btn-notify-confirm')?.addEventListener('click', subscribeNotification);

  /* Modal close buttons */
  document.getElementById('btn-devonly-close')?.addEventListener('click', () => closeModal('modal-devonly'));
  document.getElementById('btn-notify-close')?.addEventListener('click', () => closeModal('modal-notify'));

  /* Overlay click → close */
  document.querySelectorAll('.modal-overlay').forEach(ov =>
    ov.addEventListener('click', e => { if (e.target === ov) { ov.classList.remove('active'); document.body.style.overflow = ''; } })
  );

  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.querySelectorAll('.modal-overlay.active').forEach(m => { m.classList.remove('active'); document.body.style.overflow = ''; }); }
  });

  /* Footer dev-modal links */
  document.querySelectorAll('[data-devmodal]').forEach(btn =>
    btn.addEventListener('click', () => openModal('modal-devonly'))
  );

  /* Wishlist buttons */
  document.querySelectorAll('[data-wishlist]').forEach(btn =>
    btn.addEventListener('click', () => toggleWishlist(btn))
  );

  /* Share buttons */
  document.querySelectorAll('.btn-share').forEach(btn =>
    btn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({ title: 'VIEWBOX | 미스터 선샤인', url: window.location.href }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => showToast('링크가 복사되었습니다 📋')).catch(() => showToast('링크: ' + window.location.href));
      }
    })
  );
}

/* ─── DEV PAGE LINKS ──────────────────────────────── */
function initDevLinks() {
  const DEV = 'dev.html';

  /* 1화 무료 시청하기 */
  document.getElementById('btn-watch-free')?.addEventListener('click', () => {
    window.location.href = DEV;
  });

  /* 에피소드 카드 — 푸터(공유·찜) 버튼 제외한 영역 클릭 */
  document.querySelectorAll('.ep-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('.ep-card-footer')) {
        window.location.href = DEV;
      }
    });
  });

  /* 추천 카드 전체 영역 클릭 */
  document.querySelectorAll('.rec-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = DEV;
    });
  });
}

/* ─── INIT ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMuteBtn();
  initFadeUp();
  bindEvents();
  loadWatchlist();
  initDevLinks();
});
