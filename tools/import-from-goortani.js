/*
 * Import script to pull content from the current goortani.com site
 * and generate local HTML content files used by the terminal UI.
 *
 * Usage:
 *   1) npm install
 *   2) node tools/import-from-goortani.js
 */
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const ROOT = path.resolve(process.cwd());
const CONTENT = path.join(ROOT, "content");

async function fetchHTML(url){
  const res = await fetch(url, { redirect: "follow" });
  if(!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return await res.text();
}

function extractMain(html){
  // Keep it simple: pull the body content and strip the nav/header/footer elements if present.
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  // Try to find the main content container; fallback to body
  const main = doc.querySelector("main") || doc.body;
  // Remove images
  main.querySelectorAll("img").forEach(n => n.remove());
  // Return inner HTML
  return main.innerHTML.trim();
}

async function run(){
  const sources = [
    { url: "https://goortani.com/", out: "cv-full.html" },
    { url: "https://goortani.com/short", out: "cv-short.html" },
  ];

  for(const s of sources){
    console.log("Fetching:", s.url);
    const html = await fetchHTML(s.url);
    const body = extractMain(html);
    const outfile = path.join(CONTENT, s.out);
    fs.writeFileSync(outfile, body, "utf8");
    console.log("Wrote:", outfile);
  }

  console.log("\nDone. Open index.html locally with a simple server:");
  console.log("  npx serve  (or)  python3 -m http.server  (or)  bun run --use server\n");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
