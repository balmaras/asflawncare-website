# ASF Lawn Care — Website

Static site for ASF Lawn Care, built with plain HTML/CSS/JS for GitHub Pages.

## Status

**Built so far:** `index.html`, `contact.html`
**Still to build:** `services.html`, `about.html`

## Stack

- Plain HTML / CSS / JS — no frameworks, no build step
- Google Fonts: Poppins (headings), DM Sans (body)
- Formspree for the contact form
- GitHub Pages for hosting

## Setup checklist

### 1. Logo
The header/footer currently use a placeholder SVG mark (an orange shears
icon in a green circle) so the site works before your real logo is ready.
Once you upload it:
1. Save the file(s) to `images/` — e.g. `logo-color.png` and, if you have
   a white/reversed version, `logo-white.png`.
2. Replace the `<span class="nav__logo-mark">...</span>` block in each
   page's header and footer with an `<img>` tag pointing to your logo.

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

## File structure

```
asf-lawncare-website/
├── index.html
├── contact.html
├── services.html      (coming next)
├── about.html          (coming next)
├── css/
│   ├── style.css        — shared tokens, header, footer, buttons
│   ├── index.css         — homepage-only styles
│   └── contact.css       — contact-page-only styles
├── js/
│   └── main.js           — mobile nav, footer year, form submit
├── images/
│   └── (logo files go here once uploaded)
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
