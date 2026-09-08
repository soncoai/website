# Sonnco website

Static marketing landing page for Sonnco, styled with Tailwind CSS. Served from
a Cloudflare Worker at [sonco.ai](https://sonco.ai).

## Structure

```
index.html           Page markup (Tailwind utility classes)
404.html             Not-found page, served by the Worker for unmatched paths
src/input.css        Tailwind entry — @theme tokens, @font-face, custom @utility gradients
css/site.css         Built stylesheet (generated — do not edit by hand)
fonts/               Self-hosted Geist and Gambetta (latin variable subsets, woff2)
images/              Screenshots and image assets
_headers             Response headers applied at deploy time
wrangler.jsonc       Worker config
dist/                Assembled upload directory (generated, gitignored)
```

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

Pushing to `main` deploys, via `.github/workflows/deploy.yml`. To deploy from a
laptop instead:

```bash
npm run deploy   # build css, assemble dist/, wrangler deploy
```

`npm run dist` is an allow-list, not a copy of the tree: it names the six things
that ship. Anything else in the repo — `src/`, `node_modules/`, this README — is
not uploaded because it was never named. A new top-level directory that belongs
on the site has to be added to that script.

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

1. Add repository secrets `CLOUDFLARE_API_TOKEN` (permissions: *Workers Scripts
   → Edit*, and *Workers Routes → Edit* for the custom domain) and
   `CLOUDFLARE_ACCOUNT_ID`.
2. Make sure `sonco.ai` is a zone on the same Cloudflare account — a custom
   domain can only attach to a zone Cloudflare holds.
3. Turn GitHub Pages off under Settings → Pages, so the old build stops
   answering.
