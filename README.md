# sonco website

Static marketing landing page for sonco, styled with Tailwind CSS. Served from
a Cloudflare Worker at [sonco.ai](https://sonco.ai).

## Structure

```
index.html           Page markup (Tailwind utility classes)
404.html             Not-found page, served by the Worker for unmatched paths
thanks.html          Where a no-script demo request lands after the Worker takes it
worker.mjs           The Worker script: POST /contact → email; everything else → assets
contact.mjs          The form's validation and the email it becomes, pure, covered by test/
test/                `npm test` — node:test, no dependencies
js/contact-form.js   The form's in-page submit; without it the same form posts normally
privacy.html         Privacy policy — English only, no Alpine, like the 404
terms.html           Terms of use, the same shape
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

## Cache-busting

`css/site.css`, `js/i18n.js` and `js/contact-form.js` are referenced with a
`?v=N` query. Bump it in every page that names them whenever any of the three
changes, or a returning visitor keeps the old file — the translation file in
particular, where a stale copy leaves every newly added string blank.

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

`npm run serve` is enough for markup and styling. `npm test` covers the form's
validation and the email it builds. To exercise what the Worker actually does —
the form, the 404 page, the `_headers` rules — build and run it:

```bash
npm run build && npm run dist
npx wrangler dev
```

`wrangler dev` does not deliver mail; it logs the message it would have sent.

## Deploy

Pushing to `main` deploys. Cloudflare watches the repo through Workers Builds
(Workers → the `sonco-website` Worker → Settings → Build), so there is no CI
file here and no API token anywhere: Cloudflare's GitHub App carries the auth.
The dashboard holds two commands, and they are the whole of what it knows:

```
Build command    npm run build && npm run dist
Deploy command   npx wrangler deploy
```

**The demo form needs one secret**, the mailbox requests go to. It is a secret
rather than a value in `wrangler.jsonc` because it is a personal address in a
public repo. Set it once per Worker:

```bash
npx wrangler secret put CONTACT_TO      # e.g. the Gmail address Email Routing forwards to
```

The address must be a **verified destination** in the zone's Email Routing
(Email → Email Routing → Destination addresses), because that is what the
`send_email` binding is allowed to deliver to. Mail goes out as
`hello@sonco.ai`, and the visitor's own address is the Reply-To, so replying
from the inbox just works. A missing secret answers every submission with a
500 and one line in the Worker's logs saying so.

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

The site is a Worker with static assets and a one-route script. Assets are
matched first, so a page or an image never invokes the script; `worker.mjs`
runs only for paths no asset answers, handles `POST /contact`, and hands
everything else back to the assets binding so the 404 page still applies.
That is the whole of what the script does — keep it that way, since anything
it takes on runs in front of the site.

## Measuring

There is no analytics script, and the privacy page says so. What the site
does keep is one log line per demo request, written by the Worker
(`{"event":"demo-request", …}`), readable under the Worker's Logs tab. If page
analytics are ever wanted, Cloudflare Web Analytics is the fit — cookieless,
one `<script>` with a site token from the dashboard — and turning it on means
editing the "What we collect" section of `privacy.html` in the same commit.

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
