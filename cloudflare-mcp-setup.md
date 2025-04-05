# Setting Up the CV MCP Server on Cloudflare Workers

This guide walks you through deploying your CV MCP server to Cloudflare Workers and configuring it with Claude.

## Step 1: Deploy to Cloudflare Workers

1. **Log in to your Cloudflare account**
   - Go to https://dash.cloudflare.com/ and sign in
   - If you don't have an account, you'll need to create one

2. **Go to Workers & Pages**
   - Click on "Workers & Pages" in the left sidebar

3. **Create a new Worker**
   - Click "Create application"
   - Select "Create Worker"
   - Give it a name (e.g., "cv-mcp-server")

4. **Deploy the Worker code**
   - Delete any default code in the editor
   - Copy and paste the entire content of `cv-mcp-worker.js` into the editor
   - Click "Save and deploy"

5. **Note your Worker URL**
   - After deployment, you'll see a URL like:
   - `https://cv-mcp-server.yourname.workers.dev`
   - Copy this URL as you'll need it for the next step

## Step 2: Configure Claude with the Remote MCP Server

1. **Go to Claude settings**
   - Open Claude in your web browser
   - Click on settings (gear icon)
   - Go to "MCP Servers" section

2. **Add a new Remote MCP Server**
   - Select the "Remote (SSE)" tab
   - You'll see fields for "Server Name" and "Server URL"

3. **Fill in the server details**
   - **Server Name**: Enter a name for your server (e.g., "cv-mcp")
   - **Server URL**: Paste the Cloudflare Worker URL from Step 1 (e.g., `https://cv-mcp-server.yourname.workers.dev`)
   - Click "Add Server"

## Step 3: Test the MCP Server with Claude

After adding the server, you can test if it's working by asking Claude questions about your CV:

1. **Ask about your profile**
   - "What is Frank's professional profile?"

2. **Ask about your skills**
   - "What skills does Frank have?"

3. **Ask about specific experience**
   - "Tell me about Frank's experience at Uber"

4. **Search for specific terms**
   - "Search Frank's CV for JavaScript"

## Troubleshooting

If you encounter any issues:

1. **Worker Deployment Issues**
   - Make sure the worker code has no syntax errors
   - Check the Cloudflare Workers logs for any runtime errors

2. **Claude Connection Issues**
   - Verify the Server URL is correct
   - Check for CORS issues (the worker should allow all origins with `Access-Control-Allow-Origin: *`)
   - Try re-adding the server in Claude settings

3. **Tool Response Issues**
   - The worker currently only supports a limited set of queries (profile, skills, interests, resume, picture, company experience for Uber and Home Depot, and search for JavaScript)
   - For other queries, it will return a message saying the data isn't available

## Extending the Worker

To add more search terms or company experiences:

1. Add more JSON files to your GitHub Pages repository:
   - For companies: `static-json/company-companyname.json`
   - For search terms: `static-json/search-term.json`

2. Update the worker to recognize these new files:
   - You can make the worker more dynamic by checking if the file exists before giving an error
   - Alternatively, you can add more conditions to the existing switch statements

## Limitations

The Cloudflare Workers free plan includes:
- 100,000 requests per day
- 10ms CPU time per request
- 128MB memory limit

This should be more than sufficient for this use case.
