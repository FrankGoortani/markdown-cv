# CLAUDE.md - AI Agent Instructions for Terminal CV Website

## Project Overview

This is a **terminal-themed CV website** for Frank Goortani, featuring a 90s hacker/homebrew aesthetic with a command-based interface. The site is built as a lightweight, static website that simulates a terminal environment where users can interact with commands to view different sections of the CV.

## Key Features

- **Interactive Terminal Interface**: Users type commands to navigate and view content
- **Retro Terminal Aesthetic**: Green-on-black color scheme with CRT-style effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **GitHub Pages Compatible**: Uses relative paths and proper configuration
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Accessible**: Keyboard navigation, screen reader support, ARIA labels

## Architecture

### Core Files
- [`index.html`](index.html) - Main terminal interface with command input
- [`terminal.js`](terminal.js) - Command router and terminal logic
- [`terminal.css`](terminal.css) - Terminal styling with responsive breakpoints
- [`content/`](content/) - CV content files (HTML format)
- [`_config.yml`](_config.yml) - GitHub Pages configuration

### Command System
The terminal accepts these commands:
- `help` - Show available commands
- `about` - Display profile summary
- `cv` - Load full CV from content/cv-full.html
- `short` - Load short CV from content/cv-short.html
- `skills` - Quick skills overview
- `projects` - Project highlights
- `links` - All important links
- `contact` - Contact information
- `blog` - Open Medium profile
- `pdf` - Download resume PDF
- `clear` - Clear terminal screen

### Content Management
- CV content is stored in [`content/cv-full.html`](content/cv-full.html) and [`content/cv-short.html`](content/cv-short.html)
- Links are centralized in [`content/links.json`](content/links.json) and [`terminal.js`](terminal.js)
- Import tool available at [`tools/import-from-goortani.js`](tools/import-from-goortani.js)

## AI Agent Guidelines

### When Working on This Project

1. **Maintain Terminal Aesthetic**: All changes should preserve the retro terminal look and feel
2. **Test Command Functionality**: Ensure all terminal commands work correctly
3. **Check Path Compatibility**: Use relative paths for GitHub Pages compatibility
4. **Preserve Responsive Design**: Test changes across mobile, tablet, and desktop
5. **Validate SEO Elements**: Ensure meta tags and structured data remain intact

### Common Tasks

#### Adding New Commands
1. Add command function to `commands` object in [`terminal.js`](terminal.js:40)
2. Update help text in [`help()`](terminal.js:41) function
3. Test command functionality in terminal interface

#### Updating CV Content
1. Modify [`content/cv-full.html`](content/cv-full.html) or [`content/cv-short.html`](content/cv-short.html)
2. Ensure HTML is clean and properly formatted
3. Test loading via `cv` or `short` commands

#### Styling Changes
1. Modify [`terminal.css`](terminal.css) using CSS custom properties
2. Test responsive breakpoints (768px, 480px)
3. Ensure terminal aesthetic is preserved

#### Link Updates
1. Update both [`content/links.json`](content/links.json) and [`terminal.js`](terminal.js:9)
2. Test all links via `links` command
3. Verify external links open in new tabs

### Technical Considerations

#### GitHub Pages Deployment
- Use relative paths (`./ ` instead of `/`)
- Ensure [`_config.yml`](_config.yml) is properly configured
- Test subdomain path resolution

#### SEO and Performance
- Maintain structured data in [`index.html`](index.html)
- Keep meta descriptions under 160 characters
- Optimize for Core Web Vitals

#### Accessibility
- Preserve ARIA labels and roles
- Maintain keyboard navigation
- Ensure high contrast ratios
- Test with screen readers

### File Structure Understanding

```
/
├── index.html              # Main terminal interface
├── terminal.js             # Command system and logic
├── terminal.css            # Terminal styling
├── _config.yml            # GitHub Pages config
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── short/
│   └── index.html         # Short CV page
├── content/
│   ├── cv-full.html       # Full CV content
│   ├── cv-short.html      # Short CV content
│   └── links.json         # Centralized links
└── tools/
    └── import-from-goortani.js  # Content import tool
```

### Troubleshooting Common Issues

#### Commands Not Working
- Check [`terminal.js`](terminal.js) command object syntax
- Verify function names match command strings
- Test with browser console for JavaScript errors

#### Styling Issues
- Check CSS custom properties in `:root`
- Verify responsive breakpoint syntax
- Test terminal aesthetic preservation

#### Path Resolution Problems
- Ensure all paths are relative (start with `./`)
- Check [`_config.yml`](_config.yml) configuration
- Test GitHub Pages subdomain compatibility

#### Content Loading Issues
- Verify HTML syntax in content files
- Check file paths in load functions
- Test with browser network tab for 404s

## Context for AI Agents

This website represents a unique approach to presenting a professional CV through an interactive terminal interface. The design balances nostalgia (90s terminal aesthetic) with modern web standards (responsive design, SEO, accessibility).

**Key Success Factors:**
- Terminal commands must be intuitive and discoverable
- Responsive design must work seamlessly across devices
- Professional content presentation within terminal aesthetic
- Fast loading and GitHub Pages compatibility
- Strong SEO foundation for professional visibility

**User Experience Goals:**
- Engaging, memorable first impression
- Easy navigation via familiar terminal commands
- Professional credibility through quality content
- Accessibility for all users regardless of device or ability

When modifying this project, always consider both the technical implementation and the user experience. The terminal interface should feel authentic while remaining user-friendly and professional.
