# ASF Lawn Care — Website

Static site for ASF Lawn Care, built with plain HTML/CSS/JS for GitHub Pages.

## Status

**Built:** `index.html`, `contact.html`, `services.html`, `about.html` — full starting site.
**Live:** https://balmaras.github.io/asflawncare-website/ (repo: github.com/balmaras/asflawncare-website, branch: `master`)

## Stack

- Plain HTML / CSS / JS — no frameworks, no build step
- Google Fonts: Poppins (headings), DM Sans (body)
- Formspree for the contact form
- GitHub Pages for hosting

## Setup checklist

### 1. Logo — ✅ done
The real logo (`images/asf_logo.png`) is wired into the header and footer
on all four pages, replacing the earlier placeholder SVG mark.
- If you add a white/reversed version later (e.g. for a dark-background
  header), save it as `images/logo-white.png` and let Claude know — it's
  not used anywhere yet.
- The circle is sized via `.nav__logo-mark` in `css/style.css` (48px in
  the header, 64px in the footer) and the image is set to `object-fit:
  contain`, so it won't stretch or crop — just make sure `asf_logo.png`
  has a transparent or white background so it doesn't show a hard box
  edge on the page background.

### 2. Formspree — ✅ done
`contact.html` is wired to the live form: `https://formspree.io/f/xvkgojwn`.
Notification emails arrive with a dynamic subject like "New ASF Lawn Care
lead: Jane Smith" (set via a hidden `_subject` field, populated by
`js/main.js` from the name fields right before submit) so leads are easy
to scan/triage in the inbox. When replying to a lead, compose a fresh
email to their address rather than hitting Reply on the Formspree
notification — Reply works (Reply-To is set to the submitter), but keeps
the raw internal field dump in the quoted history.
1. Submit a test message through the live site and confirm it lands at
   almaras.asf@gmail.com.
2. Free tier caps at 50 submissions/month with 30-day retention — check the
   Formspree dashboard periodically so nothing gets lost before the window
   closes.
3. Free tier has lighter spam protection than paid tiers — if spam becomes
   an issue, Formspree's built-in honeypot field is a free first step.

No API keys or secrets are stored in this repo — Formspree's public form
endpoint is safe to expose in client-side code.

### Security hardening — ✅ done
A `Content-Security-Policy` meta tag was added to every page's `<head>`
(defense-in-depth — not urgent for a static site with no user-generated
content, but cheap to add and worth having). Policy, in plain terms:
- Only loads scripts/styles/images from this same site, plus Google Fonts
  (styles from `fonts.googleapis.com`, font files from `fonts.gstatic.com`)
- Only allows network requests (the contact form's AJAX submit) to go to
  `formspree.io`
- Blocks the site from being embedded in an iframe elsewhere (`frame-ancestors
  'none'`) and blocks `<object>`/plugin embeds entirely

This required removing the one remaining inline `style="margin-bottom:1rem;"`
on the footer logo (present on all 4 pages) and moving it to a `.footer-logo`
class in `css/style.css` instead — a strict CSP can't allow inline styles
without weakening the policy (`'unsafe-inline'`), so this keeps it tight.

### 3. GitHub Pages — ✅ done
Live at `https://balmaras.github.io/asflawncare-website/`.
1. Repo pushed to GitHub (public — no secrets in here).
2. In repo Settings → Pages, source is set to the `master` branch
   (this repo's default/root branch is `master`, not `main`), root folder.
3. Site confirmed live at the URL above.

### 4. Custom domain (asflawncare.com) — ready to switch over

Security review done first (see commit/chat notes) — repo is clean, no secrets,
no insecure resource loads, nothing blocking the domain switch.

1. **`CNAME` file — done.** Added to the repo root containing just `asflawncare.com`.
   Push it along with the rest of the site.
2. **At your domain registrar** (wherever asflawncare.com's DNS is currently managed —
   check if that's still pointed at Squarespace or somewhere else), update DNS:
   - Add **4 `A` records** for the apex/root domain (`asflawncare.com`) pointing to
     GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a **`CNAME` record** for `www` pointing to `balmaras.github.io`
   - **Important:** if the domain currently has `MX` records (for email) through
     Squarespace or elsewhere, **do not delete those** — only touch the `A`/`CNAME`
     records used for the website itself, or you'll break existing email.
   - Remove/replace any old `A` or `CNAME` records that were pointing the domain at
     Squarespace.
3. **In GitHub repo Settings → Pages**, enter `asflawncare.com` as the custom domain
   and save (GitHub will also write/verify the `CNAME` file for you here).
4. **Wait for DNS to propagate** — can take anywhere from a few minutes to ~48 hours
   depending on the registrar and TTL settings.
5. Once GitHub shows the domain as verified (green checkmark in Pages settings),
   **check "Enforce HTTPS"** — this may take a little extra time to provision the SSL
   certificate after DNS first resolves.
6. Confirm both `asflawncare.com` and `www.asflawncare.com` load the site correctly
   over `https://`.

## Next steps

- [ ] **Review all four pages live** on GitHub Pages (desktop + mobile) and flag anything to fix.
- [x] **Homepage service card photos — done.** Real ASF job-site photos (from Brandon's
      personal archive, 2000s–2010s) now appear on all four homepage service cards:
      `images/services/lawn-maintenance.jpg`, `leaf-removal.jpg`, `selected-pruning.jpg`,
      `sod-installation.jpg` (no sod-specific photo existed, so a strong lush-lawn shot
      stands in). Cropped to 800×600 (4:3) and lightly enhanced (color/contrast/sharpness
      via PIL) from the originals.
- [x] **Fixed: homepage service photos displaying stretched/distorted.** `css/index.css`
      used `aspect-ratio: 4/3` on `.service-card__img`, which rendered inconsistently.
      Replaced with a fixed `height: 190px` + `object-fit: cover` + `flex-shrink: 0`,
      which is guaranteed consistent across browsers. (Turned out the real symptom was
      partly browser cache — a hard refresh was also needed after pushing the fix.)
- [x] **Fixed: homepage service card description text invisible (white-on-white).**
      `.section--forest p` in `style.css` sets paragraph text white for the dark-green
      section, which also applied inside the white service cards nested in that section.
      Added an explicit `color: var(--ink-soft)` to `.service-card p` in `index.css` to
      override it. (The `<h3>` headings already had a color override; the `<p>` tags
      didn't.)
- [x] **Areas-of-Service graphic — done.** None of Brandon's 76 real photos fit this slot
      (it needs to show the service area, not a job site), so built a custom illustrated
      map instead: `images/areas-map.svg`, branded in site colors, with Rome marked as
      home base and all 7 service towns (Armuchee, Cartersville, Calhoun, Cedartown,
      Kingston, Lindale) pinned and labeled. Lightweight (~6KB) since it's vector, not a
      photo.
- [x] **Contact page photo — done (switched again, now a real photo).** Went through a
      few rounds here: first a real dry-creek photo (`contact-photo.jpg`), then a custom
      illustration (`contact-illustration.svg`), and now settled on a real photo again —
      `images/truck-decal.jpg`, a close-up macro shot of the actual old ASF truck door
      decal (A.S.F. Lawn Care, (706) 331-9311, and the full service list), lightly
      enhanced (color/contrast/sharpness) and cropped to trim the dark out-of-focus
      background. Ties directly into the site's original truck-sign branding and gives
      the Contact page an authentic, personal touch. `contact-photo.jpg` and
      `contact-illustration.svg` are both left in `images/` but no longer referenced, in
      case either is wanted again later.
- [x] **Founder photo — done.** `images/founder.jpg` — a real headshot of Francisco
      Almaras, lightly enhanced (color/contrast/sharpness) via PIL and resized for web.
      Wired into the About page's founder section, replacing the gradient placeholder.
      `.founder-photo` in `css/about.css` uses `object-fit: cover` with
      `object-position: 50% 22%` so his full smiling face stays in frame across both
      the desktop (landscape box) and mobile (shorter box) layouts.
- [x] **Fixed: founder photo displaying huge/zoomed-in.** First attempt wrapped the
      `<img>` in a fixed-height, `overflow: hidden` frame (cropped to fill the box) —
      but per request, the final version instead shows the **full, uncropped** photo:
      `.founder-photo` uses `height: auto` with `max-width: 420px` (280px on mobile) so
      it scales down to fit neatly beside the text without cropping anything out. Same
      `border-radius` token as the `.founder-card` text box, so corners match. If it
      ever displays oversized/square-cornered again, that's almost certainly browser
      cache (hard refresh), not the code — this has happened before on this project.
- [x] **Service-area list reordered — done.** The "Areas we serve" list on the
      homepage and the About page's "Areas of Service" list are now alphabetical
      (Armuchee, Calhoun, Cartersville, Cedartown, Kingston, Lindale, Rome), with an
      "... & Surrounding Areas" line added at the end. Note: `images/areas-map.svg`
      still labels the same 7 towns but keeps its own geographic layout (Rome centered
      as home base) — that art wasn't reordered since it's a map, not a list.
- [x] **Fixed: contact form submitted successfully even when left blank.** The
      `<form>` has `novalidate` (so validation styling could be controlled manually
      later), but no JS validation was ever added to replace the browser's native
      required-field checks — so an empty form still POSTed to Formspree and showed a
      false "Thanks!" message. Fixed in `js/main.js`: the submit handler now calls
      `form.checkValidity()` before sending anything; if any required field is empty,
      it calls `form.reportValidity()` (triggers the browser's built-in "please fill
      out this field" tooltip on the first missing field) and shows an error message
      instead of submitting.
- [x] **More visible submit status — done.** The confirmation/error message under the
      Submit button (`#formStatus`) now renders as a bordered, colored box instead of
      plain small text — green/kelly border for success, rust border for errors — via
      new `.form-status--success` / `.form-status--error` / `.form-status--info`
      classes in `css/contact.css`, so it's much harder to miss after submitting.
- [x] **Fixed: status message text unreadable (white-on-white).** The new box styling
      above had the same root cause as the earlier service-card text bug: a global
      `.section--forest p { color: white; }` rule in `style.css` is a class+element
      selector, which beats a single class selector like `.form-status--success` in CSS
      specificity — so the text stayed forced white even sitting on the white message
      box. Fixed by using compound `.form-status.form-status--success` (and `--error`,
      `--info`) selectors in `css/contact.css`, which out-specificity the global rule.
- [ ] **Add remaining real photos.** Still using a gradient/placeholder panel for the
      homepage hero banner (index). Also services.html page (full 11-service grid has
      no photos yet — homepage's 4-card preview does). Brandon has 76 real photos on
      hand to pick from for these spots.
- [ ] **Consider a styling refresh.** Current build reuses the original Squarespace
      palette and layout closely. Two directions to weigh:
      1. Stay closer to the original screenshots (safer, more familiar to existing customers).
      2. Go sleeker/more modern — tighter type scale, more whitespace, refined card/button
         treatments — while keeping the same forest green + rust orange brand colors.
      **Keep the current files as the baseline** — any restyle should be done as a new pass
      (e.g. a `v2` branch or a copy of the CSS) so this version stays available to fall back to
      or compare against.
- [x] Swap in real logo (see checklist above).
- [x] Swap in real Formspree ID (see checklist above).
- [ ] Point custom domain when ready (see checklist above).

## Future ideas (not started, just notes for later)

- [ ] **Business email on the domain.** Maybe set up Google Workspace (or similar) on
      asflawncare.com for a real address like `team@asflawncare.com` instead of the
      current Gmail address, once the domain is pointed to GitHub Pages.
- [ ] **Revisit the Contact page photo again.** Currently the real truck-decal close-up
      (`images/truck-decal.jpg`). Open to trying something else down the line —
      `contact-photo.jpg` (dry creek bed) and `contact-illustration.svg` (custom front-yard
      illustration) are both still sitting unused in `images/` from earlier rounds.
- [ ] **Online payments.** Potentially add Stripe-based payment collection (e.g. for
      deposits or invoices) per the project's standard tech stack — would need a Stripe
      account and likely a simple checkout/payment-link flow added to the site.
- [ ] **Privacy policy / legal disclaimers.** The contact form collects name, email,
      phone, and address (via Formspree), so a basic privacy policy page explaining what's
      collected and how it's used would be good practice — and genuinely useful cover for
      the business, not just a formality. Also worth a general liability/terms disclaimer
      (e.g. estimates are non-binding, work subject to a separate agreement, etc.) if
      Francisco wants one. **Not legal advice** — worth having an actual attorney review
      or draft the final wording, especially the liability/disclaimer language; I can
      build the page and wire it in once there's text to use.
- [ ] **Gallery of work.** Once professional photos are taken (vs. the archival/phone
      photos used so far), build a dedicated gallery/portfolio page or section showing
      finished jobs — before/after shots, standout installs, etc.

## File structure

```
asf-lawncare-website/
├── index.html
├── contact.html
├── services.html
├── about.html
├── css/
│   ├── style.css        — shared tokens, header, footer, buttons
│   ├── index.css         — homepage-only styles
│   ├── contact.css       — contact-page-only styles
│   ├── services.css      — services-page-only styles
│   └── about.css         — about-page-only styles
├── js/
│   └── main.js           — mobile nav, footer year, form submit
├── images/
│   └── asf_logo.png      — real logo, used in header + footer
└── README.md
```

## Brand reference

| Token | Value |
|---|---|
| Forest Green | `#10442C` |
| Kelly Green | `#197B52` |
| Rust Orange | `#C8432B` |
| Cream | `#F6F4EE` |
| Heading font | Poppins |
| Body font | DM Sans |

Business info: Est. 2006 · Rome, GA · almaras.asf@gmail.com · (706) 331-9311
Service area: Armuchee, Rome, Cartersville, Calhoun, Cedartown, Kingston, Lindale

