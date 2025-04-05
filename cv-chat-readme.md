# CV Chat Interface Deployment Guide

This guide explains how to deploy the CV chat interface that allows users to query information about Frank Goortani's portfolio.

## Overview

The system consists of two main parts:
1. A **Cloudflare Worker** that processes queries and returns information about your CV
2. A **JavaScript/CSS frontend** that provides a chat interface on your CV website

## Deployment Steps

### 1. Set Up a Cloudflare Account

1. Sign up for a Cloudflare account at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) if you don't already have one
2. After signing in, go to **Workers & Pages** in the sidebar
3. Click **Create Worker** to create a new worker

### 2. Deploy the Worker

1. In the Cloudflare dashboard, after clicking "Create Worker", you'll see a code editor
2. Replace all the code with the contents of the `cv-worker.js` file we created
3. Click **Save and Deploy**
4. After deployment, note the URL of your worker (in your case: `https://frank-cv-sse.frank-b2a.workers.dev`)

### 3. Update the Frontend Code

You need to update the worker URL in the JavaScript file:

1. Open `assets/js/cv-chat.js`
2. Find all instances of `https://your-worker.workers.dev` and replace them with your actual Cloudflare Worker URL (`https://frank-cv-sse.frank-b2a.workers.dev`)
3. Save the file

### 4. Push Changes to GitHub Pages

1. Commit all the new and modified files to your GitHub repository:
   ```
   git add assets/css/cv-chat.css
   git add assets/js/cv-chat.js
   git add _layouts/cv.html
   git commit -m "Add CV chat interface"
   git push
   ```

2. Wait a few minutes for GitHub Pages to rebuild and deploy your site

## Customization Options

### Changing Colors

To change the color scheme of the chat interface:

1. Open `assets/css/cv-chat.css`
2. Find the color references (e.g., `#0078d7` for the main blue color)
3. Replace them with your preferred colors

### Modifying CV Data

To update the CV information that's returned by the worker:

1. Edit the `cvData` object at the top of `cv-worker.js`
2. Re-deploy the worker in the Cloudflare dashboard

## Troubleshooting

### Worker Not Responding

- Verify the Worker URL is correct in the JavaScript file
- Check the Cloudflare Workers dashboard to ensure the worker is active
- Look at the browser console for any JavaScript errors

### CORS Issues

If you see CORS errors in the browser console:

1. Make sure the Worker's `Access-Control-Allow-Origin` header is set correctly
2. The current setting allows any origin (`*`), but you may need to set it to your specific domain for better security

### Chat Interface Not Appearing

- Verify that both the CSS and JavaScript files are being loaded (check browser network tab)
- Check if there are any JavaScript console errors
- Make sure the DOM content is fully loaded before the script runs

## Notes

- The Cloudflare Workers free tier should be sufficient for this application, as it allows up to 100,000 requests per day
- You'll need to reconnect to your worker after 30 seconds of inactivity (this is handled automatically by the frontend code)
- The worker uses Server-Sent Events (SSE) instead of WebSockets for simplicity and broader compatibility
