# Using Cloudflare with a GoDaddy-Registered Domain

Since your domain is registered with GoDaddy, there are a few additional steps to set up Cloudflare for routing to your Worker. You have two options:

## Option 1: Move DNS Management to Cloudflare (Full Setup)

This approach requires changing your domain's nameservers from GoDaddy to Cloudflare, transferring DNS management (but not domain registration).

### Steps:

1. **Create a Cloudflare account** (if you don't have one already):
   - Go to https://dash.cloudflare.com/sign-up

2. **Add your domain to Cloudflare**:
   - In the Cloudflare dashboard, click "Add a Site"
   - Enter your domain name (goortani.com) and click "Add Site"
   - Select the Free plan (sufficient for your needs) and continue
   - Cloudflare will scan and import your existing DNS records
   - Review the imported DNS records carefully to make sure they're correct
   - Make note of the Cloudflare nameservers shown (they'll look like `aisha.ns.cloudflare.com` and `kip.ns.cloudflare.com`)

3. **Update nameservers at GoDaddy**:
   - Log in to your GoDaddy account
   - Navigate to your domains list and select goortani.com
   - Find the "Nameservers" section and select "Change"
   - Select "Custom" nameservers
   - Enter the Cloudflare nameservers you noted earlier
   - Save changes

4. **Wait for DNS propagation**:
   - This can take 24-48 hours to fully propagate
   - Cloudflare will email you when your domain is active on their system

5. **Set up the Worker route in Cloudflare**:
   - Once Cloudflare confirms your domain is active, go to the Cloudflare dashboard
   - Select your domain
   - Click on "Workers & Pages" in the left sidebar
   - Click "Add route"
   - Enter the route pattern: `goortani.com/sse*`
   - Select your Worker from the dropdown
   - Click "Save"

### Important Notes:

- This process transfers DNS management from GoDaddy to Cloudflare
- Your domain will still be registered with GoDaddy
- All existing DNS records (website, email, etc.) should be preserved, but verify them in Cloudflare
- You'll get the additional benefits of Cloudflare (CDN, security, analytics)
- If you have email services tied to your domain, ensure those records are correctly imported

## Option 2: Use Direct Worker URL (Simpler Alternative)

If you prefer not to change your domain's DNS settings, you can simply use the direct Worker URL:

1. **Keep using the direct Worker URL**:
   - Continue using `https://frank-cv-sse.frank-b2a.workers.dev` for all SSE connections
   - This URL already works for both the chat interface and MCP server

2. **Update your frontend code** to always use this URL:
   - Ensure your chat.js file references this direct URL rather than `/sse`
   - Update the MCP server to use this direct URL (it already does)

3. **Benefits of this approach**:
   - No need to change DNS settings
   - No waiting for propagation
   - No risk of disrupting existing services
   - Works immediately

For your CV chat implementation, Option 2 is perfectly viable and simpler. The direct Worker URL works fine for both your website's chat interface and for MCP server integration.

## Recommendation

For simplicity and immediate results, I recommend Option 2 (using the direct Worker URL).

If you want deeper Cloudflare integration, website acceleration, and the ability to use your domain with the /sse path, then Option 1 is the way to go, but it requires more setup and waiting time.
