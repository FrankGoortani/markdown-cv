# CV Chat Interface Documentation (SSE Version)

This document explains how to use and customize the chat interface for Frank Goortani's CV using the Server-Sent Events (SSE) approach.

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

The chat interface connects to a Cloudflare Worker that implements a Server-Sent Events (SSE) endpoint. This provides real-time streaming of responses and allows for both a web interface and MCP integration for AI assistants.

## Files

### Frontend Files
- `assets/css/cv-chat.css` - Styling for the chat interface
- `assets/js/cv-chat.js` - JavaScript code that creates the interface and connects to the SSE endpoint
- `_layouts/cv.html` - Template file that includes the chat interface

### Backend Files
- `sse-worker.js` - Cloudflare Worker code that implements the SSE endpoint and MCP server
- `cloudflare-sse-setup.md` - Instructions for deploying the worker to Cloudflare
- `sse-test.html` - Test page for the chat interface

## Customization

### Modifying the Chat Interface

You can customize the appearance of the chat interface by editing the CSS file:

- Change colors, sizes, fonts, etc. in `assets/css/cv-chat.css`
- Modify button labels and other text in `assets/js/cv-chat.js`

### Updating CV Data

Your CV data is stored directly in the `sse-worker.js` file in the `cvData` object:

1. Edit the appropriate section in the `cvData` object (profile, skills, etc.)
2. For new searchable terms, add them to the `search` object
3. For new companies, add them to the `company` object
4. Re-deploy the worker to Cloudflare

## Integration with Cline and Other MCP Clients

The chat interface can be accessed by Cline, Claude, and other AI assistants using the Model Context Protocol (MCP). This allows the AI to answer questions about your CV by connecting to the same SSE endpoint used by the chat interface.

### Setting Up Cline with Your MCP Server

1. **Open the MCP Servers Interface**
   - Click on the Cline icon in the VSCode sidebar
   - Open the menu (⋮) in the top right corner of the Cline panel
   - Select "MCP Servers" from the dropdown menu

2. **Add a new Remote MCP Server**
   - Click on the "Remote Servers" tab
   - Fill in the required information:
     - **Server Name**: `frank-cv` (or any descriptive name)
     - **Server URL**: `https://frank-cv-sse.frank-b2a.workers.dev/sse`
   - Click "Add Server" to initiate the connection

3. **Verify and Use the Server**
   - A green indicator means the server is connected
   - Now you can ask Cline questions about Frank's CV
   - Example queries: "What skills does Frank have?", "Describe Frank's experience at Uber"

## Troubleshooting

### Chat Interface Not Loading

- Check that the CSS and JS files are included in your CV template
- Verify that the Cloudflare Worker is deployed and running
- Check browser console for errors

### SSE Connection Issues

- Open your browser's Network tab and filter for "EventSource" to see the SSE connections
- Check for any CORS errors in the console
- Verify that your SSE endpoints are returning the proper content type and headers

## Benefits of the SSE Approach

- Real-time streaming responses
- Works directly with GitHub Pages
- No need for custom domain routing or DNS configuration
- One implementation for both web interface and AI assistant integration
- All data in one place for easier maintenance
