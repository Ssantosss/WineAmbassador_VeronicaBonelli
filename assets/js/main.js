/*
 * Veronica Bonelli — site behaviour
 * Progressive enhancement only: every page works with this file absent.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------------- Language switch (persisted) ---------------- */
  var LANG_KEY = "vb-lang";
  var html = document.documentElement;

  function applyLang(lang) {
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var pressed = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", String(pressed));
    });
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) {}
    var lang = stored || "en";
    applyLang(lang);

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        applyLang(lang);
        try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      });
    });
  }

  /* ---------------- Mobile navigation ---------------- */
  /*
   * Scroll-lock uses the "freeze body at its current scroll position"
   * technique instead of plain `overflow:hidden`. On iOS Safari,
   * `overflow:hidden` alone does not reliably stop the page from
   * scrolling/rubber-banding behind a `position:fixed` overlay, and the
   * dynamic address bar can then shift the fixed menu so it appears
   * anchored too high (the first item or two rendered above the visible
   * viewport). Locking via `position:fixed` on the body removes it from
   * the scroll flow entirely, which is the reliable cross-browser fix.
   */
  var lockedScrollY = 0;

  function lockScroll() {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = "fixed";
    document.body.style.top = -lockedScrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    // Restore instantly — the page's global `scroll-behavior: smooth`
    // would otherwise animate this jump and look like an odd scroll-hijack.
    var root = document.documentElement;
    var prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, lockedScrollY);
    root.style.scrollBehavior = prevBehavior;
  }

  function initNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-desktop");
    if (!toggle || !nav) return;

    var closeNav = function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      unlockScroll();
    };

    toggle.addEventListener("click", function () {
      var willOpen = !nav.classList.contains("open");
      if (willOpen) {
        nav.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        lockScroll();
      } else {
        closeNav();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) closeNav();
    });
  }

  /* ---------------- Sticky header shadow on scroll ---------------- */
  function initHeaderState() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------------- Contact form (static demo submit) ---------------- */
  function initForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent =
          html.getAttribute("data-lang") === "it"
            ? "Grazie. Il messaggio è pronto per l'invio — collega il form a un servizio email prima della pubblicazione."
            : "Thank you. The message is ready to send — connect this form to an email service before launch.";
      }
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initNav();
    initHeaderState();
    initReveal();
    initForm();
  });
})();
