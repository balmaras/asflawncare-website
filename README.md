# ASF Lawn Care — Website

Static site for ASF Lawn Care, built with plain HTML/CSS/JS for GitHub Pages.

## Status

**Built:** `index.html`, `contact.html`, `services.html`, `about.html` — full starting site.
**Live:** published to GitHub Pages.

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

### 2. Formspree
The contact form currently points to a placeholder:
```
action="https://formspree.io/f/YOUR_FORM_ID"
```
1. Create a form at [formspree.io](https://formspree.io) (free tier is fine
   for low volume).
2. Replace `YOUR_FORM_ID` in `contact.html` with your real form ID.
3. Submit a test message and confirm it lands in your inbox.

No API keys or secrets are stored in this repo — Formspree's public form
endpoint is safe to expose in client-side code.

### 3. GitHub Pages
1. Push this repo to GitHub (can stay public — no secrets in here).
2. In repo Settings → Pages, set the source to the `main` branch, root folder.
3. Site will be live at `https://<username>.github.io/<repo-name>/`.

### 4. Custom domain (asflawncare.com) — later
When you're ready:
1. Add a `CNAME` file to the repo root containing just `asflawncare.com`.
2. At your domain registrar, point:
   - `A` records for the apex domain to GitHub Pages' IPs, **or**
   - a `CNAME` record for `www` to `<username>.github.io`
3. In repo Settings → Pages, add the custom domain and enable "Enforce HTTPS"
   once DNS propagates.

## Next steps

- [ ] **Review all four pages live** on GitHub Pages (desktop + mobile) and flag anything to fix.
- [ ] **Consider a styling refresh.** Current build reuses the original Squarespace
      palette and layout closely. Two directions to weigh:
      1. Stay closer to the original screenshots (safer, more familiar to existing customers).
      2. Go sleeker/more modern — tighter type scale, more whitespace, refined card/button
         treatments — while keeping the same forest green + rust orange brand colors.
      **Keep the current files as the baseline** — any restyle should be done as a new pass
      (e.g. a `v2` branch or a copy of the CSS) so this version stays available to fall back to
      or compare against.
- [x] Swap in real logo (see checklist above).
- [ ] Swap in real Formspree ID (see checklist above).
- [ ] Point custom domain when ready (see checklist above).

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
