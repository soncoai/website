# sonco website

Static marketing landing page for sonco, styled with Tailwind CSS. Served from
a Cloudflare Worker at [sonco.ai](https://sonco.ai).

## Structure

```
index.html           Page markup (Tailwind utility classes)
404.html             Not-found page, served by the Worker for unmatched paths
src/input.css        Tailwind entry — @theme tokens, @font-face, custom @utility gradients
css/site.css         Built stylesheet (generated — do not edit by hand)
fonts/               Self-hosted Geist (latin variable subset, woff2)
images/              Screenshots and image assets
images/brand/        Logo SVGs, copied from soncoai/brand
favicon.*, icon-*    Favicons and app icons, copied from soncoai/brand
site.webmanifest     App manifest, copied from soncoai/brand
_headers             Response headers applied at deploy time
wrangler.jsonc       Worker config
dist/                Assembled upload directory (generated, gitignored)
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

A new icon or manifest file also has to be named in `npm run dist` — see Deploy.

## Develop

```bash
npm install
npm run dev      # rebuild css/site.css on change
npm run serve    # serve at http://localhost:8000
```

`npm run serve` is enough for markup and styling. To exercise what the Worker
actually does — the 404 page, the `_headers` rules — build and run it:

```bash
npm run build && npm run dist
npx wrangler dev
```

## Deploy

Pushing to `main` deploys. Cloudflare watches the repo through Workers Builds
(Workers → the `sonco-website` Worker → Settings → Build), so there is no CI
file here and no API token anywhere: Cloudflare's GitHub App carries the auth.
The dashboard holds two commands, and they are the whole of what it knows:

```
Build command    npm run build && npm run dist
Deploy command   npx wrangler deploy
```

`npm run dist` has to be in there. `dist/` is generated and gitignored, so a
build that only compiles the CSS leaves `wrangler deploy` pointing at a
directory that does not exist.

To deploy from a laptop instead — `wrangler login` does browser OAuth, so this
needs no token either:

```bash
npm run deploy   # build css, assemble dist/, wrangler deploy
```

`npm run dist` is an allow-list, not a copy of the tree: it names every file and
directory that ships. Anything else in the repo — `src/`, `node_modules/`, this
README — is not uploaded because it was never named.

The cost of that safety is that it does not update itself. **Anything new at the
top level has to be added to the script or it 404s on the live site**, which is
how the root icons and `site.webmanifest` nearly shipped missing.

## Hosting

The site is a Worker with static assets and no entrypoint script:
`wrangler.jsonc` declares `assets` and no `main`, so Cloudflare serves the files
directly and no JavaScript runs per request. Adding a `main` would put a Worker
invocation in front of every asset — worth it only for something a static file
cannot answer.

`sonco.ai` is attached as a custom domain in `wrangler.jsonc`, which manages its
DNS record on deploy. Two things are deliberately **not** in the config, because
they are zone settings rather than Worker settings:

- **`www.sonco.ai`** — add a Redirect Rule in the dashboard (Rules → Redirect
  Rules) sending `www.sonco.ai/*` to `https://sonco.ai/$1`, 301. Attaching www
  as a second custom domain would serve one page at two hostnames with no
  canonical to settle which is which.
- **`sonnco.com`** — the domain this site was on under GitHub Pages. Redirect it
  the same way if it should follow, or leave it.

### First-time setup

1. Make sure `sonco.ai` is a zone on the same Cloudflare account — a custom
   domain can only attach to a zone Cloudflare holds, so this comes before any
   deploy.
2. Workers → Create → Connect to Git → `soncoai/website`. Take the project name
   from `wrangler.jsonc` (`sonco-website`): the deploy command reads that file,
   so a different name in the dashboard leaves the build project and the Worker
   pointing at two different things.
3. Set the two commands above.
4. Turn GitHub Pages off under Settings → Pages, so the old build stops
   answering.
