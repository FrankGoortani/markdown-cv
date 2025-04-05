# Static JSON Files for CV Chat Interface

This directory contains pre-generated JSON responses that power the CV chat interface. These static files replace the need for a dynamic backend server, allowing the chat functionality to work directly from GitHub Pages.

## Overview

Each JSON file follows a simple structure:

```json
{
  "text": "The content to display in the chat interface"
}
```

## Available Files

### Basic Information
- `profile.json` - Professional profile summary
- `skills.json` - List of professional skills
- `interests.json` - Professional interests
- `resume.json` - Path to resume PDF file
- `picture.json` - Path to profile picture

### Company Experience
- `company-uber.json` - Experience at Uber
- `company-home-depot.json` - Experience at Home Depot

### Search Results
- `search-javascript.json` - Search results for "JavaScript"

## Adding More Content

### For New Companies

To add experience for a new company:

1. Create a file named `company-{companyname}.json` (use lowercase and hyphens)
2. Format the content with proper newlines (`\n`) for the chat display
3. Update the `fetchDataFromJson` function in `assets/js/cv-chat.js` to recognize the new company

Example for a new company:

```json
{
  "text": "Company Name (YYYY-YYYY)\nPosition: Job Title\n\nResponsibilities:\n• Responsibility 1\n• Responsibility 2\n• Responsibility 3"
}
```

### For New Search Terms

To add a new pre-computed search result:

1. Create a file named `search-{term}.json` (use lowercase and hyphens)
2. Format the content as a search result with matches
3. Update the `fetchDataFromJson` function in `assets/js/cv-chat.js` to recognize the new search term

Example for a new search term:

```json
{
  "text": "Found X matches for \"SearchTerm\":\n\nMatch 1\n\nMatch 2\n\nMatch 3"
}
```

## Benefits of the Static Approach

- No server costs or external dependencies
- Works directly on GitHub Pages
- No rate limits or quotas
- Fast loading times
- Simple to update and maintain
- Can still create an MCP server that connects to these static files
