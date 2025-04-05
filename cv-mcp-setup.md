# Setting Up the CV MCP Server for AI Assistants

This guide provides step-by-step instructions for setting up and using the CV MCP server with your Cloudflare Worker SSE endpoint.

## Prerequisites

- Node.js installed on your system
- A deployed Cloudflare Worker at `https://frank-cv-sse.frank-b2a.workers.dev`

## Installation

1. Create a new directory for your MCP server:
   ```bash
   mkdir cv-mcp-server
   cd cv-mcp-server
   ```

2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```

3. Install the required dependencies:
   ```bash
   npm install @modelcontextprotocol/sdk axios
   ```

4. Copy the `cv-mcp-server-fixed.js` file to this directory as `index.js`:
   ```bash
   cp /path/to/cv-mcp-server-fixed.js index.js
   ```

5. Update the `package.json` file to include the start script:
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

## Testing the MCP Server

You can test that the MCP server connects to your Cloudflare Worker by running:

```bash
npm start
```

The server should start and display: `CV MCP server running on stdio`

Press Ctrl+C to stop the server.

## Setting Up with Claude

To use this MCP server with Claude:

1. Open your Claude UI
2. Navigate to settings (gear icon)
3. Find and select the "MCP Servers" section
4. Add a new MCP server with the following configuration:

```json
{
  "mcpServers": {
    "cv": {
      "command": "node",
      "args": ["/full/path/to/cv-mcp-server/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace `/full/path/to/cv-mcp-server/index.js` with the actual full path to your `index.js` file.

## Testing with Claude

Once connected, you can ask Claude to use your tools:

1. "What are Frank's skills?"
   - Claude should use the `get_skills` tool

2. "Can you search Frank's CV for 'Cloud'?"
   - Claude should use the `search_cv` tool with query="Cloud"

3. "Tell me about Frank's experience at Uber."
   - Claude should use the `get_company_experience` tool with company="Uber"

## MCP Server Tools

The MCP server provides the following tools:

- `get_profile`: Get Frank's professional profile
- `get_skills`: Get Frank's skills list
- `get_interests`: Get Frank's interests
- `search_cv`: Search for terms in Frank's CV (requires a query parameter)
- `get_company_experience`: Get experience at a specific company (requires a company parameter)
- `get_resume_link`: Get a link to Frank's resume PDF
- `get_profile_picture`: Get a link to Frank's profile picture

## Troubleshooting

### Error: Cannot connect to MCP server

- Ensure Node.js is installed (`node --version`)
- Check that all dependencies are installed (`npm install`)
- Verify the path in the MCP configuration is correct

### Error: Failed to fetch from SSE endpoint

- Confirm the Cloudflare Worker is deployed and accessible
- Try accessing `https://frank-cv-sse.frank-b2a.workers.dev/sse/profile` directly in a browser
- Check the console logs when running the MCP server for detailed error information

### Error: Timeout or connection refused

- Make sure your internet connection is stable
- Check if there are any firewalls blocking the connection
- Try increasing the timeout value in the code (currently set to 10000ms/10s)

## Updates and Maintenance

If you update your CV content in the Cloudflare Worker, the MCP server will automatically use the updated information the next time it's called. No changes to the MCP server are needed unless you change the API endpoints or structure.
