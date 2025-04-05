# CV Data Files for Chat Interface

This directory contains the JSON files that power the CV chat interface. These static files provide data for the chat interface and MCP server, allowing users to query information about Frank Goortani's portfolio.

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

## How These Files Are Used

1. **Direct Access via Chat Interface**:
   - The frontend JavaScript accesses these files directly when users click on buttons or search
   - For example, clicking the "Skills" button fetches `sse/skills.json`

2. **Indirect Access via MCP Server**:
   - The Cloudflare Worker for MCP server also accesses these files
   - This allows AI assistants like Claude to query your CV information

## Adding More Content

### For New Companies

To add experience for a new company:

1. Create a file named `company-{companyname}.json` (use lowercase and hyphens)
2. Format the content with proper newlines (`\n`) for the chat display
3. Update the JavaScript in `assets/js/cv-chat.js` to recognize the new company

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
3. Update the JavaScript in `assets/js/cv-chat.js` to recognize the new search term

Example for a new search term:

```json
{
  "text": "Found X matches for \"SearchTerm\":\n\nMatch 1\n\nMatch 2\n\nMatch 3"
}
```

## Benefits of This Approach

- No server costs or external dependencies
- Works directly on GitHub Pages
- No rate limits or quotas
- Fast loading times
- Simple to update and maintain
