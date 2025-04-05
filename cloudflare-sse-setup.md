# Setting Up the CV SSE Server on Cloudflare Workers

This guide walks you through deploying your combined CV SSE and MCP server to Cloudflare Workers.

## What's New: True SSE Implementation

The previous implementation used static JSON files. The new implementation:

1. Uses Server-Sent Events (SSE) for real-time streaming
2. Combines both the chat interface backend and MCP server in one worker
3. Handles both GET requests (for SSE streaming) and POST requests (for MCP protocol)
4. Embeds all CV data directly in the worker code

## Step 1: Deploy to Cloudflare Workers

1. **Log in to your Cloudflare account**
   - Go to https://dash.cloudflare.com/ and sign in
   - If you don't have an account, you'll need to create one

2. **Go to Workers & Pages**
   - Click on "Workers & Pages" in the left sidebar

3. **Create a new Worker**
   - Click "Create application"
   - Select "Create Worker"
   - Give it a name (e.g., "cv-sse-worker")

4. **Deploy the Worker code**
   - Delete any default code in the editor
   - Copy and paste the entire content of `sse-worker.js` into the editor
   - Click "Save and deploy"

5. **Note your Worker URL**
   - After deployment, you'll see a URL like:
   - `https://cv-sse-worker.yourname.workers.dev`
   - This is your SSE server URL

## Step 2: Configure the Frontend JavaScript

The frontend JavaScript has been updated to use the direct Worker URL:

```javascript
const sseUrl = `https://frank-cv-sse.frank-b2a.workers.dev/sse/${endpoint}`;
```

This approach has several benefits:
- Works directly with GitHub Pages without custom domain routing
- Avoids CORS issues as the worker has permissive CORS headers
- Simplifies deployment (no need to set up DNS or Cloudflare routes)

## Step 3: Configure Cline with the Remote MCP Server

To connect Cline to your MCP server:

1. **Open the MCP Servers Interface**
   - Click on the Cline icon in the VSCode sidebar
   - Open the menu (⋮) in the top right corner of the Cline panel
   - Select "MCP Servers" from the dropdown menu

2. **Add a new Remote MCP Server**
   - Click on the "Remote Servers" tab in the MCP Servers interface
   - Fill in the required information:
     - **Server Name**: `frank-cv` (or any descriptive name)
     - **Server URL**: `https://frank-cv-sse.frank-b2a.workers.dev/sse` (or your own worker URL + `/sse`)
   - Click "Add Server" to initiate the connection

3. **Verify Connection**
   - Cline will attempt to connect to the server
   - A green dot indicates the server is connected and ready to use

## Step 4: Test the Implementation

### Testing the Chat Interface:

1. **Open your CV website or test page**
   - The chat interface should appear in the bottom-right corner
   - Click it to open the chat box
   - Try clicking buttons like "Profile", "Skills", etc.
   - Try searching for "JavaScript" and looking up companies

2. **Check your browser console (F12) for debug messages**
   - You should see SSE connection openings and messages

### Testing with Claude:

After adding the server in Claude settings, ask questions like:
- "What is Frank's professional profile?"
- "What skills does Frank have?"
- "Tell me about Frank's experience at Uber"
- "Search Frank's CV for JavaScript"

## Troubleshooting

### Worker Issues
- Check the Cloudflare Workers logs for errors
- Ensure the worker is correctly handling both GET requests (SSE) and POST requests (MCP)

### SSE Connection Issues
- Open your browser's Network tab and filter for "EventSource" to see the SSE connections
- Check for any CORS errors in the console
- Verify that your SSE endpoints are returning the proper content type and headers

### MCP Connection Issues
- Verify you're using the correct URL format for Claude's MCP connection
- Remember that MCP connections use POST to `/sse` while the chat interface uses GET to `/sse/{endpoint}`

## Customizing the CV Data

All CV data is now embedded directly in the `sse-worker.js` file. To update your information:

1. Edit the `cvData` object at the top of the file
2. Add new entries to the appropriate sections (profile, skills, etc.)
3. For new searchable terms, add them to the `search` object
4. For new companies, add them to the `company` object
5. Re-deploy the worker in Cloudflare

## Security Considerations

- The worker allows CORS from any origin (`*`). For production, you may want to restrict this to your specific domain.
- Consider adding authentication if the CV data contains sensitive information.
