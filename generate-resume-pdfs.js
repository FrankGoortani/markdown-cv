#!/usr/bin/env node

/**
 * Generate PDFs from HTML resume files in markdown-cv directory
 *
 * Usage:
 *   node generate-resume-pdfs.js
 *
 * This will regenerate resume PDFs with updated dates.
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resumes = [
  {
    htmlPath: join(__dirname, 'resume-master', 'resume.html'),
    pdfPath: join(__dirname, 'media', 'frank-goortani-master-resume_2026.pdf'),
  },
  {
    htmlPath: join(__dirname, 'resume-cto', 'resume.html'),
    pdfPath: join(__dirname, 'media', 'frank-goortani-cto-executive_2026.pdf'),
  },
];

async function generatePDF(htmlPath, pdfPath) {
  console.log(`Generating: ${pdfPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
  });

  const page = await browser.newPage();

  // Load the HTML file
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
  });

  // Generate PDF
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      bottom: '0.5in',
      left: '0.75in',
      right: '0.75in',
    },
  });

  await browser.close();
  console.log(`✓ Generated: ${pdfPath}`);
}

async function main() {
  console.log('Regenerating markdown-cv resume PDFs with updated dates...\n');

  for (const resume of resumes) {
    try {
      await generatePDF(resume.htmlPath, resume.pdfPath);
    } catch (error) {
      console.error(`Error generating PDF:`, error.message);
    }
  }

  console.log('\n✓ All PDFs regenerated successfully!');
  console.log('\nUpdated dates:');
  console.log('  - Uber: January 2021 - December 2025');
  console.log('  - FasterOutcomes: January 2026 - Present (Full-Time CTO)');
  console.log('  - BayRockLabs: January 2021 - December 2025');
}

main().catch(console.error);
