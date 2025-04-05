# CV Chat Interface Documentation (Static JSON Version)

This document explains how to use and customize the chat interface for Frank Goortani's CV using the static JSON approach.

## Overview

The CV chat interface is a small, floating chat bubble that appears in the bottom-right corner of the CV website. When clicked, it opens a chat interface that allows visitors to:

- View your professional profile
- See your skills list
- Check your interests
- Search for specific terms
- Get information about your experience at specific companies
- View/download your resume
- See your profile picture

## How It Works

The chat interface fetches data from static JSON files stored in your GitHub Pages repository. Each query type (profile, skills, etc.) has its own JSON file with a standardized format.

## Files

### Frontend Files
- `assets/css/cv-chat.css` - Styling for the chat interface
- `assets/js/cv-chat.js` - JavaScript code that creates the interface and fetches JSON data
- `_layouts/cv.html` - Template file that includes the chat interface

### Static JSON Files
- `static-json/profile.json` - Professional profile information
- `static-json/skills.json` - List of skills
- `static-json/interests.json` - Professional interests
- `static-json/resume.json` - Path to resume PDF
- `static-json/picture.json` - Path to profile picture
- `static-json/company-*.json` - Experience at specific companies
- `static-json/search-*.json` - Pre-computed search results

## Customization

### Modifying the Chat Interface

You can customize the appearance of the chat interface by editing the CSS file:

- Change colors, sizes, fonts, etc. in `assets/css/cv-chat.css`
- Modify button labels and other text in `assets/js/cv-chat.js`

### Updating CV Data

Your CV data is stored in individual JSON files:

1. Find the appropriate JSON file in the `static-json/` directory
2. Update the content as needed
3. Commit and push to your GitHub repository

### Adding New Content

To add new content types:

1. Create a new JSON file in the `static-json/` directory
2. Follow the standard format: `{"text": "Your content here with \n newlines for formatting"}`
3. Update the JavaScript to recognize and handle the new content type

## Integration with Claude (MCP)

The chat interface can be accessed by Claude and other AI assistants using the Model Context Protocol (MCP). This allows the AI to answer questions about your CV by connecting to the same static JSON files used by the chat interface.

## Troubleshooting

### Chat Interface Not Loading

- Check that the CSS and JS files are included in your CV template
- Verify that all static JSON files are properly deployed
- Check browser console for errors

### JSON Fetch Issues

- Ensure path references are correct in the JavaScript code
- Check that JSON files are valid and properly formatted
- Verify that GitHub Pages is correctly serving the static files

## Benefits of the Static Approach

- No server costs or maintenance of Cloudflare Workers
- Works directly on GitHub Pages without additional configuration
- No rate limits or quotas to worry about
- Easier to update individual pieces of content
- Better performance with direct file access
