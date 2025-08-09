# AGENTS.md - Technical Architecture & Agent Interaction Guidelines

## Technical Architecture Overview

### System Design Principles

The terminal CV website is built on a **lightweight, static architecture** that prioritizes:
- **Performance**: Minimal dependencies, optimized loading
- **Maintainability**: Modular code structure, centralized configuration
- **Compatibility**: Cross-browser support, GitHub Pages deployment
- **Accessibility**: Universal usability across devices and abilities

### Core Architecture Components

#### 1. Frontend Layer
- **HTML Structure**: Semantic markup with ARIA accessibility
- **CSS Styling**: Custom properties, responsive breakpoints, terminal aesthetic
- **JavaScript Logic**: Command routing, content loading, user interaction

#### 2. Content Management
- **Static Content**: HTML files for CV sections
- **Configuration**: JSON for links, YAML for deployment
- **Asset Management**: Relative paths for GitHub Pages compatibility

#### 3. Deployment Layer
- **GitHub Pages**: Static hosting with Jekyll processing
- **SEO Integration**: Meta tags, structured data, sitemap
- **CDN Delivery**: Global content distribution

## Technical Stack

### Languages & Technologies
- **HTML5**: Semantic structure, accessibility features
- **CSS3**: Custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, DOM manipulation
- **JSON**: Configuration and data storage
- **YAML**: GitHub Pages configuration

### Build & Deployment
- **GitHub Pages**: Automated deployment from repository
- **Jekyll**: Static site generation (optional processing)
- **Git**: Version control and collaboration

### Performance Optimizations
- **Minimal Dependencies**: No external frameworks or libraries
- **Efficient Loading**: Deferred script execution, optimized CSS
- **Caching Strategy**: Browser caching with cache-busting for updates

## Agent Interaction Guidelines

### For AI Development Agents

#### Code Modification Protocol
1. **Read Current State**: Always examine existing code before modifications
2. **Preserve Architecture**: Maintain the modular, lightweight design
3. **Test Thoroughly**: Verify functionality across all supported commands
4. **Document Changes**: Update relevant documentation files

#### File Priority Matrix
**High Priority** (Core Functionality):
- [`terminal.js`](terminal.js) - Command system logic
- [`terminal.css`](terminal.css) - Visual presentation
- [`index.html`](index.html) - Main interface structure

**Medium Priority** (Content & Configuration):
- [`content/`](content/) directory files
- [`_config.yml`](_config.yml), [`sitemap.xml`](sitemap.xml), [`robots.txt`](robots.txt)

**Low Priority** (Supporting Files):
- [`short/index.html`](short/index.html)
- Documentation files (this file, [`CLAUDE.md`](CLAUDE.md))

#### Command System Architecture

```javascript
// Command Structure in terminal.js
const commands = {
  // Synchronous commands
  commandName() {
    // Direct output to terminal
    line("Content here");
  },

  // Asynchronous commands (content loading)
  async commandName() {
    line("Loading...");
    const content = await load("./path/to/content.html");
    write(content);
    hr(); // Add separator
  }
};
```

#### Content Loading System

```javascript
// Content caching mechanism
const cache = {};
async function load(path) {
  if(cache[path]) return cache[path];
  const res = await fetch(path, {cache:"no-store"});
  if(!res.ok) throw new Error("Failed to load " + path);
  const txt = await res.text();
  cache[path] = txt;
  return txt;
}
```

### For Content Management Agents

#### Content Update Workflow
1. **Backup Current Content**: Store existing versions before changes
2. **Update Source Files**: Modify [`content/cv-full.html`](content/cv-full.html) or [`content/cv-short.html`](content/cv-short.html)
3. **Sync Link References**: Update both [`content/links.json`](content/links.json) and [`terminal.js`](terminal.js)
4. **Test Commands**: Verify `cv`, `short`, and `links` commands work correctly

#### Content Structure Requirements
- **Clean HTML**: No external styling, use semantic markup
- **Relative Links**: All paths must be relative for GitHub Pages
- **Accessibility**: Include alt text, proper heading structure
- **Performance**: Optimize for fast loading, minimal overhead

### For SEO & Marketing Agents

#### SEO Architecture
- **Structured Data**: JSON-LD schema in [`index.html`](index.html)
- **Meta Tags**: Open Graph, Twitter Cards across all pages
- **Sitemap**: Auto-generated XML with proper priorities
- **Robots.txt**: Search engine directive configuration

#### Analytics Integration Points
```html
<!-- Add tracking code before closing </body> tag -->
<!-- Google Analytics, Adobe Analytics, etc. -->
<!-- Ensure compliance with privacy regulations -->
```

#### Social Media Optimization
- **Open Graph Images**: 1200x630px for optimal sharing
- **Twitter Cards**: Summary with large image format
- **LinkedIn Sharing**: Professional-focused descriptions

### For Deployment Agents

#### GitHub Pages Configuration
```yaml
# _config.yml structure
title: "Site Title"
description: "Site Description"
baseurl: "" # Empty for user pages
url: "" # Auto-set by GitHub Pages
plugins:
  - jekyll-sitemap
  - jekyll-feed
```

#### Deployment Checklist
- [ ] All paths are relative (start with `./`)
- [ ] [`_config.yml`](_config.yml) properly configured
- [ ] [`sitemap.xml`](sitemap.xml) includes all pages
- [ ] [`robots.txt`](robots.txt) references correct sitemap URL
- [ ] Meta tags include correct canonical URLs

## Error Handling & Debugging

### Common Issues & Solutions

#### Command Not Found
**Problem**: Terminal shows "Command not found"
**Solution**: Check command spelling in [`commands`](terminal.js:40) object

#### Content Not Loading
**Problem**: CV content shows loading but never appears
**Solution**: Verify file path in [`load()`](terminal.js:31) calls, check browser network tab

#### Styling Broken
**Problem**: Terminal appearance doesn't match expected design
**Solution**: Check CSS custom properties in [`:root`](terminal.css:3), verify responsive breakpoints

#### Links Not Working
**Problem**: Navigation or external links fail
**Solution**: Verify paths are relative, check [`links`](terminal.js:9) object synchronization

### Debugging Tools
- **Browser Console**: JavaScript errors and network issues
- **Developer Tools**: Responsive testing, accessibility audit
- **GitHub Pages**: Build logs and deployment status
- **Validator Tools**: HTML, CSS, and SEO validation

## Performance Monitoring

### Key Metrics
- **First Contentful Paint**: Target < 1.5s
- **Largest Contentful Paint**: Target < 2.5s
- **Cumulative Layout Shift**: Target < 0.1
- **First Input Delay**: Target < 100ms

### Optimization Strategies
- **Code Splitting**: Separate concerns between files
- **Lazy Loading**: Load content only when requested
- **Resource Hints**: Preload critical assets
- **Compression**: Minify CSS/JS for production

## Security Considerations

### Content Security Policy
```html
<!-- Add to <head> for enhanced security -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

### External Dependencies
- **Minimize Third-Party**: Avoid unnecessary external resources
- **Validate Inputs**: Sanitize any user-generated content
- **HTTPS Only**: Ensure all external links use secure protocols

## Collaboration Guidelines

### For Multi-Agent Systems
1. **Coordination**: Use Git branches for simultaneous work
2. **Communication**: Document all significant changes
3. **Testing**: Validate changes don't break existing functionality
4. **Integration**: Merge changes systematically with proper review

### Version Control Strategy
- **Main Branch**: Stable, deployed version
- **Feature Branches**: Individual enhancements or fixes
- **Documentation**: Keep docs in sync with code changes
- **Releases**: Tag stable versions for rollback capability

This architecture supports scalable, maintainable development while preserving the unique terminal-style user experience that defines this CV website.
