# goortani.com: agent instructions

Frank Goortani's professional profile site, served by GitHub Pages from the `gh-pages` branch. Static HTML and one stylesheet (`profile.css`); no build step beyond GitHub Pages' Jekyll pass.

## Pages

| Path | What it is | Indexed |
|---|---|---|
| `/` (`index.html`) | Professional profile, Person / ProfilePage JSON-LD (`#person` is the shared entity for all of Frank's sites) | yes |
| `/cv/` | Full CV. **Generated**, do not edit by hand (see below) | yes |
| `/resume/`, `/resume-cto/`, `/resume-master/` | Download cards for the résumé PDFs in `media/` | no |
| `/resume-*/` others | Redirects to `/resume-cto/` | no |
| `/terminal/`, `/short/`, `/magazine/` | Redirect stubs to `/cv/` (the old alternate modes were removed 2026-11-12) | no |

`sitemap.xml` lists `/` and `/cv/` only. `llms.txt` and `robots.txt` are hand-maintained.

## Rules

- **The full CV and the PDFs are generated** from Frank's private, reconciled career record. Change facts there and regenerate; never hand-edit `cv/index.html` or the PDFs.
- Never fabricate resume facts, dates, metrics, employers, titles or links.
- Keep dates, titles and wording consistent with architect.solutions and visionzlab.com.
- Do not edit `node_modules/`, `.git/`, generated PDFs or verification token files unless asked.
- Preview locally with `python3 -m http.server 8080` and check at 1440px and 390px wide.
- `content/` holds legacy HTML fragments from the removed terminal site; they are excluded from the build.
