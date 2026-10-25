import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const urls = [
  { name: 'Home (/)', url: 'http://localhost:4322/' },
  { name: 'Schedule (/schedule)', url: 'http://localhost:4322/schedule' },
  { name: 'Route (/routes/kohat-to-lahore)', url: 'http://localhost:4322/routes/kohat-to-lahore' },
  { name: 'Contact (/contact)', url: 'http://localhost:4322/contact' }
];

const results = [];
const reportsDir = 'c:/shaheen/yes/.lighthouse-reports';
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('Running mobile Lighthouse audits on 4 key pages...');

for (const item of urls) {
  const safeName = item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const jsonPath = path.join(reportsDir, `${safeName}.json`);

  console.log(`Auditing ${item.name}...`);
  try {
    const cmd = `npx lighthouse ${item.url} --output=json --output-path="${jsonPath}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --quiet`;
    execSync(cmd, { stdio: 'inherit' });

    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(raw);
    const scores = {
      page: item.name,
      performance: Math.round((data.categories.performance?.score || 0) * 100),
      accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
      seo: Math.round((data.categories.seo?.score || 0) * 100),
    };
    results.push(scores);
    console.log(`Scores for ${item.name}:`, scores);
  } catch (err) {
    console.error(`Failed to audit ${item.name}:`, err.message);
  }
}

console.log('\n--- FINAL LIGHTHOUSE SUMMARY ---');
console.table(results);
