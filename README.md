# sonco website

Static marketing landing page for sonco, styled with Tailwind CSS.

## Structure

```
index.html          Page markup (Tailwind utility classes)
src/input.css        Tailwind entry — @theme tokens, @font-face, custom @utility gradients
css/site.css         Built stylesheet (generated — do not edit by hand)
fonts/               Self-hosted Geist (latin variable subset, woff2)
images/              Screenshots and image assets
images/brand/        Logo SVGs, copied from soncoai/brand
favicon.*, icon-*    Favicons and app icons, copied from soncoai/brand
site.webmanifest     App manifest, copied from soncoai/brand
```

## Brand assets

The logo, favicons and app icons come from **soncoai/brand** (`logo/svg/` and
`logo/web/`) and are copied in rather than linked — that repo is private, so raw
URLs would 404 in a browser. The nav lockup and footer mark are inlined in
`index.html` so they inherit `currentColor`.

Do not hand-edit the logo paths: the geometry is generated on a 24-unit grid and
every file has to be regenerated together. If the logo changes, re-copy from the
brand repo:

```bash
cp ../brand/logo/svg/sonco-{horizontal,mark}.svg images/brand/
cp ../brand/logo/web/{favicon.ico,favicon.svg,apple-touch-icon.png,site.webmanifest,icon-192.png,icon-512.png,icon-maskable-512.png} .
```

## Develop

```bash
npm install
npm run dev      # rebuild css/site.css on change
npm run serve    # serve at http://localhost:8000
```

## Build

```bash
npm run build    # minified css/site.css
```

The site is fully static — open `index.html` through any web server (or the
`npm run serve` helper). No runtime dependencies; the Geist font is self-hosted
in `fonts/`, so nothing is fetched from a third-party CDN.
