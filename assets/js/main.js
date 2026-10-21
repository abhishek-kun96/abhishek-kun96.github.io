/* Abhishek Kuntal — portfolio scripts
   - theme toggle with persistence
   - scroll-reveal animation
   - scroll progress indicator
   - back-to-top button
   - project filter (work page)
   - mark active nav item
   - optional cookie-free visitor counts (GoatCounter, off by default)
*/
(function () {
  'use strict';

  // ---- Theme toggle ------------------------------------------------------
  var STORAGE_KEY = 'ak-theme';
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark');
      var icon = toggle.querySelector('.theme-toggle-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '◐';
    }
  }

  // Initial theme: saved > system > light
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  // ---- Autoplaying videos: respect reduced motion ----------------------
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }
  var heroVideo = document.querySelector('[data-hero-video]');
  var heroPause = document.querySelector('[data-hero-pause]');
  if (heroVideo && heroPause) {
    var syncPause = function () { heroPause.textContent = heroVideo.paused ? 'Play animation' : 'Pause animation'; };
    heroPause.addEventListener('click', function () {
      if (heroVideo.paused) heroVideo.play(); else heroVideo.pause();
      syncPause();
    });
    heroVideo.addEventListener('play', syncPause);
    heroVideo.addEventListener('pause', syncPause);
    syncPause();
  }

  // ---- Mark active nav link ---------------------------------------------
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page) a.setAttribute('aria-current', 'page');
  });

  // ---- Scroll-reveal -----------------------------------------------------
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Scroll progress indicator ----------------------------------------
  var scrollProgress = document.querySelector('[data-scroll-progress]');
  if (scrollProgress) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      scrollProgress.style.transform = 'scaleX(' + progress + ')';
    }, { passive: true });
  }

  // ---- Back-to-top button -----------------------------------------------
  var backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    var showThreshold = 400;
    window.addEventListener('scroll', function () {
      if (window.scrollY > showThreshold) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Project filter (work page) ---------------------------------------
  var filterBar = document.querySelector('[data-filter-bar]');
  var searchInput = document.querySelector('[data-search]');
  var cards = document.querySelectorAll('[data-category]');

  function filterProjects() {
    var activeBtn = filterBar && filterBar.querySelector('.filter-btn[aria-pressed="true"]');
    var cat = (activeBtn && activeBtn.getAttribute('data-filter')) || 'all';
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    cards.forEach(function (card) {
      var categories = (card.getAttribute('data-category') || '').split(/\s+/);
      var matchCat = cat === 'all' || categories.indexOf(cat) !== -1;

      var title = (card.querySelector('.project-title') || {}).textContent || '';
      var summary = (card.querySelector('.project-summary') || {}).textContent || '';
      var tools = Array.from(card.querySelectorAll('.tool')).map(function (t) { return t.textContent; }).join(' ');
      var matchQuery = !query || title.toLowerCase().indexOf(query) !== -1 || summary.toLowerCase().indexOf(query) !== -1 || tools.toLowerCase().indexOf(query) !== -1;

      card.classList.toggle('is-hidden', !(matchCat && matchQuery));
    });
    var empty = document.querySelector('[data-filter-empty]');
    if (empty) empty.hidden = document.querySelectorAll('.project-card:not(.is-hidden)').length > 0;
  }

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      filterProjects();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  // ---- Lightbox ----------------------------------------------------------
  // Each figure image is wrapped in a button that opens a native <dialog>,
  // which gives Esc, focus trapping and focus return for free.
  var zoomImgs = document.querySelectorAll('main figure img');
  if (zoomImgs.length && typeof HTMLDialogElement === 'function') {
    var dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Enlarged image');
    dialog.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">×</button><img alt="">';
    document.body.appendChild(dialog);
    var bigImg = dialog.querySelector('img');
    dialog.addEventListener('click', function (e) {
      if (e.target !== bigImg) dialog.close();
    });
    dialog.addEventListener('close', function () { bigImg.removeAttribute('src'); });

    zoomImgs.forEach(function (img) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zoom';
      btn.setAttribute('aria-label', 'Enlarge image' + (img.alt ? ': ' + img.alt : ''));
      img.parentNode.insertBefore(btn, img);
      btn.appendChild(img);
      btn.addEventListener('click', function () {
        bigImg.src = img.currentSrc || img.src;
        bigImg.alt = img.alt;
        dialog.showModal();
      });
    });
  }

  // ---- Share buttons -----------------------------------------------------
  document.querySelectorAll('.share-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var platform = this.getAttribute('data-share');
      var url = window.location.href;
      var title = document.title;
      var shareUrl = '';

      switch (platform) {
        case 'linkedin':
          shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
          break;
        case 'twitter':
          shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
          break;
        case 'copy':
          var selfBtn = this;
          navigator.clipboard.writeText(url).then(function () {
            selfBtn.textContent = 'Link copied';
          });
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });

  // ---- Visitor counts (GoatCounter, cookie-free) -------------------------
  // Off until GOATCOUNTER_SITE is set. ?ref=cv style tags are appended to the
  // counted path so CV and LinkedIn clicks show up as separate entries.
  var GOATCOUNTER_SITE = '';
  var isLocal = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var optedOut = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  if (GOATCOUNTER_SITE && !isLocal && !optedOut) {
    var ref = (new URLSearchParams(location.search).get('ref') || '').replace(/[^\w.-]/g, '').slice(0, 48);
    window.goatcounter = { no_events: true, path: function (p) { return ref ? p + '?ref=' + ref : p; } };
    var gc = document.createElement('script');
    gc.async = true;
    gc.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_SITE + '.goatcounter.com/count');
    gc.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(gc);
  }
})();
