/* Abhishek Kuntal — portfolio scripts
   - theme toggle with persistence
   - scroll-reveal animation
   - scroll progress indicator
   - back-to-top button
   - project filter (work page)
   - set current year
   - mark active nav item
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

  // ---- Year in footer ----------------------------------------------------
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    var scrollBuffer = 60;
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
  if (filterBar) {
    var cards = document.querySelectorAll('[data-category]');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      cards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(/\s+/);
        var match = cat === 'all' || categories.indexOf(cat) !== -1;
        card.classList.toggle('is-hidden', !match);
      });
    });
  }

  // ---- Lightbox ----------------------------------------------------------
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // Make project figures clickable for lightbox
  document.querySelectorAll('figure img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  // ---- Lazy loading with fade-in -----------------------------------------
  var lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(function (img) {
    img.addEventListener('load', function () {
      img.classList.add('loaded');
    });
    // If already loaded (cached)
    if (img.complete) {
      img.classList.add('loaded');
    }
  });

  // ---- Skill bar animation on scroll -------------------------------------
  var skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length && 'IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var level = bar.parentElement.parentElement.classList.contains('skill-expert') ? 100 :
                      bar.parentElement.parentElement.classList.contains('skill-advanced') ? 90 :
                      bar.parentElement.parentElement.classList.contains('skill-intermediate') ? 65 : 40;
          bar.style.width = level + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(function (bar) { skillObserver.observe(bar); });
  }

  // ---- Reading time calculator -------------------------------------------
  function calcReadingTime() {
    var readingTimeEls = document.querySelectorAll('[data-reading-time]');
    readingTimeEls.forEach(function (el) {
      var text = el.textContent || '';
      var words = text.trim().split(/\s+/).length;
      var minutes = Math.max(1, Math.round(words / 200));
      el.textContent = minutes + ' min read';
    });
  }
  calcReadingTime();

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
          navigator.clipboard.writeText(url).then(function () {
            alert('Link copied to clipboard!');
          });
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
})();
