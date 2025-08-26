
# GOORTANI // Terminal — 90s Hacker / HomeBrew Style

A lightweight, interactive terminal-style CV website featuring a retro 90s hacker aesthetic. Users navigate through content using familiar terminal commands in an authentic CRT-style interface.

Live site: <https://goortani.com>

## 🚀 Features

- **Interactive Terminal Interface**: Command-based navigation system
- **Retro 90s Aesthetic**: Green-on-black CRT styling with scanlines
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **GitHub Pages Ready**: Deployment-optimized with relative paths
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Fast & Lightweight**: No frameworks, minimal dependencies

## 📁 Project Structure

```
/
├── index.html              # Main terminal interface
├── terminal.js             # Command system and logic
├── terminal.css            # Terminal styling with responsive breakpoints
├── _config.yml            # GitHub Pages configuration
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── short/
│   └── index.html         # Short CV page with auto-load
├── content/
│   ├── cv-full.html       # Full CV content
│   ├── cv-short.html      # Short CV content
│   └── links.json         # Centralized link configuration
├── tools/
│   └── import-from-goortani.js  # Content import utility
├── CLAUDE.md              # AI agent instructions
├── AGENTS.md              # Technical architecture guide
└── package.json           # Node.js dependencies for tools
```

## 🎮 Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Display profile summary |
| `cv` | Load full CV content |
| `short` | Load concise CV version |
| `skills` | Quick skills overview |
| `projects` | Project highlights |
| `links` | All important links |
| `contact` | Contact information |
| `blog` | Open Medium blog profile |
| `pdf` | Download resume PDF |
| `ls` | List available commands (directory style) |
| `search <query>` | Search CV content for keywords |
| `clear` | Clear terminal screen |

## 🛠️ Local Development

### ⚠️ Important: Local Server Required

**CORS Issue Notice:** This website cannot be opened directly with `file://` protocol (double-clicking `index.html`) due to browser security restrictions that prevent loading content files. You **must** use a local development server.

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd goortani-terminal-site

# Serve locally (choose one method)
python3 -m http.server 8080
# or
npx serve
# or
php -S localhost:8080
# or (Node.js)
npx http-server -p 8080
```

Open `http://localhost:8080` in your browser.

### Alternative Development Options
```bash
# Using Python 2 (if Python 3 not available)
python -m SimpleHTTPServer 8080

# Using Node.js with live reload
npm install -g live-server
live-server --port=8080

# Using Ruby
ruby -run -e httpd . -p 8080
```

### Content Import (Optional)
```bash
# Install Node.js dependencies
npm install

# Import content from existing website
node tools/import-from-goortani.js
```

## 🚀 Deployment

### GitHub Pages
1. **Fork or clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Set source** to "Deploy from a branch" → main branch
4. **Update URLs** in [`_config.yml`](_config.yml), [`sitemap.xml`](sitemap.xml), and [`robots.txt`](robots.txt)
5. **Add your content** to [`content/cv-full.html`](content/cv-full.html) and [`content/cv-short.html`](content/cv-short.html)

### Other Static Hosts
Works with any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration deployment
- **AWS S3**: Static website hosting
- **Traditional hosting**: Upload files via FTP

## 🎨 Customization

### Colors & Styling
Edit CSS custom properties in [`terminal.css`](terminal.css):
```css
:root {
  --fg: #00ff9c;        /* Terminal text color */
  --fg-dim: #5fffb1;    /* Dimmed text */
  --bg: #0b0f0c;        /* Background color */
  --accent: #00ffaa;    /* Accent highlights */
  --error: #ff3b3b;     /* Error messages */
}
```

### Adding Commands
Add new commands in [`terminal.js`](terminal.js):
```javascript
const commands = {
  // Add your new command
  mycommand() {
    line("Output text here");
  },

  // Async command for loading content
  async mycontent() {
    line("Loading...");
    const html = await load("./path/to/content.html");
    write(html);
    hr();
  }
};
```

### Updating Links
Maintain link synchronization between:
1. [`content/links.json`](content/links.json) - JSON configuration
2. [`terminal.js`](terminal.js) - JavaScript links object

## 🔧 Troubleshooting

### Common Issues

**Commands not working?**
- Check JavaScript console for errors
- Verify command spelling in [`terminal.js`](terminal.js) commands object
- Ensure function names match command strings exactly

**Content not loading?**
- Verify file paths in [`load()`](terminal.js:31) function calls
- Check browser Network tab for 404 errors
- Ensure all paths are relative (start with `./`)

**Styling broken?**
- Check CSS custom properties in [`:root`](terminal.css:3)
- Verify responsive breakpoint syntax
- Test across different screen sizes

**GitHub Pages deployment issues?**
- Ensure all paths are relative (no leading `/`)
- Check [`_config.yml`](_config.yml) configuration
- Verify [`sitemap.xml`](sitemap.xml) and [`robots.txt`](robots.txt) URLs

### Debug Tools
- **Browser Console**: JavaScript errors and warnings
- **Network Tab**: Failed resource loading
- **Responsive Design Mode**: Mobile compatibility testing
- **Accessibility Inspector**: Screen reader compliance

## 🤝 Contributing

### Development Setup
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature-name`
3. **Test thoroughly** across devices and browsers
4. **Submit pull request** with clear description

### Contribution Guidelines
- **Preserve terminal aesthetic** in all changes
- **Test responsive design** on mobile, tablet, desktop
- **Maintain accessibility** standards (WCAG compliance)
- **Follow existing code style** and structure
- **Update documentation** for significant changes
- **Test all commands** before submitting

### Code Style
- **JavaScript**: Use ES6+ features, async/await for loading
- **CSS**: Use custom properties, maintain responsive breakpoints
- **HTML**: Semantic markup with proper ARIA labels
- **Comments**: Document complex logic and command purposes

## 📋 Testing Checklist

Before deployment, verify:
- [ ] All terminal commands work correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Links open correctly (internal/external)
- [ ] Content loads without errors
- [ ] SEO meta tags are accurate
- [ ] Accessibility with keyboard navigation
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)**: AI agent instructions and context
- **[AGENTS.md](AGENTS.md)**: Technical architecture and interaction guidelines

## 📄 License

This project is open source. Feel free to use, modify, and distribute according to your needs.

## 🙋‍♂️ Support

For questions, issues, or contributions:
- **Create an issue** in the repository
- **Review documentation** in [`CLAUDE.md`](CLAUDE.md) and [`AGENTS.md`](AGENTS.md)
- **Check troubleshooting** section above

---

*Built with ❤️ using vanilla HTML, CSS, and JavaScript*
