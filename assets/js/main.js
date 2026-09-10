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
  function initNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-desktop");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
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
