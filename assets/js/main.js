/* Abhishek Kuntal — portfolio scripts
   - theme toggle with persistence
   - scroll-reveal animation
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
})();
