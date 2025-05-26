# AGENTS Instructions

This repository contains the source for Frank Goortani's CV. The site is generated with Jekyll and includes a small JavaScript chat interface served via Server-Sent Events.

## Style Guidelines
- Use **2 spaces** for indentation in JavaScript, CSS, HTML and YAML files.
- Use LF line endings.
- Keep markdown wrapped at 120 characters when possible.

## Project Structure
- `index.md` and `short.md` hold the long and short versions of the CV.
- `assets/` contains all CSS and JavaScript used by the site.
- `_layouts/cv.html` is the Jekyll layout template.
- `sse-worker.js` implements an SSE endpoint, while `sse-test.html` is a standalone test page.

## Development
- Install Jekyll (e.g. `gem install bundler jekyll`) to preview changes with `jekyll serve`.
- For any new features or larger changes, update `README.md`.

## Testing
- No automated tests are provided.

