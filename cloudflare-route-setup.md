# Setting Up a Cloudflare Route to Your Worker

For `https://goortani.com/sse` to work, you need to set up a Workers Route in Cloudflare. Here's how:

## Prerequisites:
- Your domain (goortani.com) should be using Cloudflare's nameservers (the domain needs to be on Cloudflare)
- Your Cloudflare Worker (frank-cv-sse) should be deployed and working

## Steps to Create a Route:

1. **Log in to your Cloudflare dashboard**:
   - Go to https://dash.cloudflare.com/
   - Sign in with your account

2. **Select your domain**:
   - From the list of domains, click on `goortani.com`

3. **Navigate to Workers & Pages**:
   - In the left sidebar, click on "Workers & Pages"

4. **Set up a route for your Worker**:
   - Click on the "Add route" button
   - For the route pattern, enter: `goortani.com/sse*`
     (This will route all requests to paths starting with /sse to your Worker)
   - From the Worker dropdown, select your `frank-cv-sse` Worker
   - Click "Save"

5. **Test the route**:
   - After saving, try accessing:
     - `https://goortani.com/sse/profile`
     - `https://goortani.com/sse/skills`
   - These should now connect to your Worker instead of GitHub Pages

## Alternative (If Your Domain is Not on Cloudflare):

If your domain is not managed by Cloudflare:

1. **Option 1: Move your domain to Cloudflare**:
   - Follow Cloudflare's instructions to add your domain: https://developers.cloudflare.com/fundamentals/setup/add-site/
   - Then follow the steps above

2. **Option 2: Use the direct Worker URL**:
   - Continue using `https://frank-cv-sse.frank-b2a.workers.dev` for your SSE endpoint
   - Update your chat interface to use this URL instead of trying to use goortani.com/sse

## For the MCP Server:

Since the direct Worker URL works, update your MCP server code to always use the direct URL:

```javascript
async fetchFromSSE(path) {
  // Always use direct Cloudflare Worker URL since it's known to work
  const sseUrl = `https://frank-cv-sse.frank-b2a.workers.dev/sse/${path}`;

  // rest of the function...
}
```

In your MCP guides, instruct users to configure the MCP with the direct Worker URL rather than trying to use the goortani.com/sse path.
