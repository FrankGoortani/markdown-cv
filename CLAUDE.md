# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Terminal-themed CV website for Frank Goortani featuring a 90s hacker aesthetic with command-based navigation. Built as a static site with vanilla JavaScript, optimized for GitHub Pages deployment.

## Development Commands

### Local Development Server (Required)
CORS restrictions prevent opening `index.html` directly. Always use a local server:

```bash
# Python 3 (recommended)
python3 -m http.server 8080

# Alternative options
npx serve
npx http-server -p 8080
php -S localhost:8080
```

Open `http://localhost:8080` in browser.

### Content Import Tool
```bash
npm install
node tools/import-from-goortani.js
```

Fetches CV content from goortani.com and generates `content/cv-full.html` and `content/cv-short.html`.

## Architecture

### Core System Components

**Three-file core:**
- `index.html` - Terminal interface structure with SEO metadata
- `terminal.js` - Command router, content loader, and terminal output system
- `terminal.css` - Retro terminal styling with responsive breakpoints (768px, 480px)

**Command system architecture:**
```javascript
const commands = {
  // Sync commands output directly
  help() { line("text"); },

  // Async commands load external content
  async cv() {
    const html = await load("./content/cv-full.html");
    write(html);
  }
};
```

**Content loading with caching:**
- `load(path)` - Fetches and caches HTML content
- `resolvePath(path)` - Handles relative paths from both root and `/short/` subdirectory
- Content cached in `cache` object to prevent redundant fetches

**Terminal output helpers:**
- `write(s)` - Append HTML to terminal
- `line(s)` - Append text line with newline
- `hr()` - Responsive horizontal rule (adapts to terminal width)
- `createBox(content)` - Draw bordered box around content

### Path Resolution Strategy

Critical for GitHub Pages compatibility:
- All paths must be relative (start with `./`)
- `resolvePath()` handles both root page and `/short/` subdirectory contexts
- Links object centralizes external URLs

### Responsive Terminal Width System

Terminal UI adapts to viewport size:
- `getTerminalWidth()` - Calculates character width based on actual font metrics
- Returns 40-60 characters based on available space
- Used by `hr()` and `createBox()` for responsive ASCII art

## Common Modifications

### Adding New Terminal Command

1. Add command function to `commands` object in `terminal.js`:
```javascript
const commands = {
  newcommand() {
    line("Command output here");
  },
  // or async for content loading
  async loadcontent() {
    const html = await load("./content/file.html");
    write(html);
    hr();
  }
};
```

2. Update help text in `help()` function (line ~107)

3. Optionally add to `ls()` directory listing (line ~124)

### Updating CV Content

Modify `content/cv-full.html` or `content/cv-short.html`. Loaded via `cv` and `short` commands using the `load()` function.

### Updating Links

**Must update both locations:**
1. `links` object in `terminal.js` (line ~9)
2. `content/links.json` (not currently used by terminal.js, but maintained for consistency)

### Styling Changes

Edit CSS custom properties in `terminal.css`:
```css
:root {
  --fg: #00ff9c;        /* Terminal text */
  --fg-dim: #5fffb1;    /* Dimmed text */
  --bg: #0b0f0c;        /* Background */
  --accent: #00ffaa;    /* Highlights */
  --error: #ff3b3b;     /* Errors */
}
```

Responsive breakpoints at 768px (tablet) and 480px (mobile).

## GitHub Pages Deployment

### Path Requirements
- All paths relative: `./content/file.html` not `/content/file.html`
- No leading slashes in any resource references
- `_config.yml` configures Jekyll processing

### Configuration Files
- `_config.yml` - GitHub Pages settings
- `sitemap.xml` - SEO sitemap (update URLs when changing domain)
- `robots.txt` - Search engine directives
- Meta tags in `index.html` - Update canonical URLs and structured data

### SEO Elements
- Structured data (JSON-LD) in `index.html`
- Open Graph and Twitter Card meta tags
- Comprehensive meta descriptions (<160 chars)

## Key Technical Patterns

### Command Argument Handling
The `search` command demonstrates argument parsing:
```javascript
search(query) {
  // Receives joined arguments from run() function
  // Example: "search python AI" → query = "python AI"
}
```

Arguments split in `run()` function and passed as single string to command.

### Content Caching Strategy
- First load fetches from network
- Subsequent loads return cached HTML
- Search command leverages cache to avoid redundant fetches
- Cache persists for session duration

### Responsive Terminal Rendering
- Dynamic width calculation based on actual character metrics
- Creates temporary `<span>` element to measure 'M' character width
- Accounts for padding and calculates max characters per line
- Used for horizontal rules and bordered boxes

## Special Considerations

### Terminal Aesthetic Preservation
All changes must maintain:
- Green-on-black CRT color scheme
- Monospace font rendering
- Command-line interface patterns
- Retro 90s hacker aesthetic

### Accessibility Requirements
- Maintain ARIA labels and roles
- Preserve keyboard navigation
- Ensure screen reader compatibility
- High contrast ratios for readability

### Cross-Browser Compatibility
Test across Chrome, Firefox, Safari, and Edge. Vanilla JavaScript ensures broad compatibility.

## File Reference

```
/
├── index.html                    # Terminal interface + SEO
├── terminal.js                   # Command system
├── terminal.css                  # Styling + responsive
├── _config.yml                   # GitHub Pages config
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine rules
├── short/
│   └── index.html               # Auto-loads short CV
├── content/
│   ├── cv-full.html             # Full resume content
│   ├── cv-short.html            # Concise resume
│   └── links.json               # Link configuration
└── tools/
    └── import-from-goortani.js  # Content import utility
```

## Additional Documentation

- `AGENTS.md` - Detailed technical architecture and agent interaction guidelines
- `README.md` - User-facing documentation with setup instructions
