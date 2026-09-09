# Veronica Bonelli — Wine Ambassador, Grand Hotel Timeo (Belmond), Taormina

V1 of the personal site. Static HTML/CSS/JS, no build step, no framework —
deploy by uploading the folder as-is to any static host (Netlify, Vercel,
Cloudflare Pages, an S3 bucket, or standard hosting via FTP).

Direction: **Sicilian soul, international standard** (Direction C, agreed
between the two creative passes on this project). Palette, type and sitemap
are documented in the project's `decisioni-direzione-creativa.md`.

## Structure

```
index.html        Home
about.html         About
experience.html    The Wine Experience
sicily.html        Sicily
journal.html       Journal
contact.html       Contact
assets/css/style.css   All design tokens + components, single file
assets/js/main.js      Language switch, mobile nav, scroll-reveal, contact form
assets/img/            Photography (see below)
robots.txt, sitemap.xml, manifest.json
```

No build tooling — edit the HTML/CSS/JS directly. Header, nav and footer
markup is duplicated across the six pages (standard for a build-free static
site); if this grows past V1, porting to a static-site generator or a
framework's shared-layout system is a reasonable next step.

## Content model — what's real, what's placeholder

Every line of copy on the site was written from **verified facts only**:
Veronica's name, her role (Wine Ambassador), her hotel (Grand Hotel Timeo,
A Belmond Hotel, Taormina) and its publicly confirmed address, and general,
non-specific statements about wine, hospitality and Sicily. Nothing about
her biography, certifications, years of experience, awards, or specific
collaborations has been invented — those sections simply weren't written
until real information is available (see "Open items" below).

**Krug is not mentioned anywhere on the site** — no name, no logo, no
implied affiliation. This is intentional and non-negotiable until a written
confirmation from Krug exists. Search the codebase for "Krug" before adding
anything; there should be zero matches outside this README.

## Photography

The 15 images in `assets/img/` were selected from the 26 you uploaded to
the project (Pexels stock), chosen specifically to avoid the clichés flagged
in the brief — no posed sommeliers, no smiling stock models, no postcard
Sicily (lemons, maiolica, straw hats). The selection leans on architecture,
hands, texture, vineyards, cellars and coastline instead.

**These are placeholders.** Before launch, replace them with real
photography: a portrait of Veronica (editorial, not a corporate headshot),
an environmental portrait at the Timeo, a genuine wine moment, and detail
shots (hands, glass, table). The images are named by role
(`hero-timeo-garden.jpg`, `pour-hand-coastal.jpg`, etc.) — swap files
1-for-1 under the same filename and no HTML/CSS changes are needed. Each
image ships as optimized JPEG + WebP, with `-900` mobile variants for the
four largest hero images; keep that pattern when you swap in new photography
so performance doesn't regress.

## Language (EN/IT)

**Engineering trade-off, stated plainly:** this V1 uses a client-side
toggle (`data-en` / `data-it` pairs, switched by a button in the header,
persisted in `localStorage`) rather than separate `/it/` and `/en/` URLs.
It works well for a site this size and needs no routing — but it means
search engines only really index the English version, and there's no
`hreflang` story. If IT search visibility matters, the next step is
splitting into real `/it/` and `/en/` routes (or moving to a framework
with i18n routing) — a rebuild of the templating layer, not of the design.

## Open items — real inputs needed, not more drafting

1. **Full biography** — education, certifications, prior roles, years in
   the industry, the exact scope of the current role.
2. **Languages** Veronica works in professionally (IT / EN / FR / other).
3. **Confirmed collaborations** — Krug or otherwise — only with something
   in writing.
4. **Real photography**, or a window for an editorial shoot at the Timeo.
5. **Written authorization** to use the Belmond / Grand Hotel Timeo name
   and any logos beyond the plain-text role description already used here.
6. **A domain**, so `veronicabonelli.com` placeholders (canonical URLs,
   Open Graph tags, `sitemap.xml`, `robots.txt`) can be replaced with the
   real one.
7. **A real inbox** behind the contact form — it currently only shows a
   confirmation message client-side (see `initForm()` in `main.js`); wire
   it to an email service (Formspree, Netlify Forms, a serverless function)
   before launch.

## QA already done

Checked with Playwright, headless Chromium, both viewports (390px and
1440px), all six pages: no console errors, no failed network requests, no
broken internal links, real user-scroll confirmed the scroll-reveal
animations fire correctly on every page. Google Fonts failed to load
*inside this sandboxed build environment* only (its outbound network is
restricted) — the CSS fallback stack (`Georgia`/`system-ui`) rendered
correctly in its place; on a normal domain with open internet access,
Instrument Serif and Manrope will load as intended. Re-verify once deployed.

## Not yet done (flagged, not skipped)

- Full accessibility audit beyond the built-in basics (semantic landmarks,
  skip link, focus states, alt text, `prefers-reduced-motion`, aria on the
  mobile menu and language switch) — run an automated pass (e.g. axe) plus
  a manual keyboard/screen-reader pass before launch.
- Lighthouse/PageSpeed pass on the deployed (non-sandboxed) domain.
- Real `/it/` `/en/` routing, if you decide V1's toggle isn't enough.
