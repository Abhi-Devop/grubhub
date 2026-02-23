import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/food');
const MASTER_FALLBACK_ID = "1504674900247-0877df9cc836";
const fallbackUrl = `https://images.unsplash.com/photo-${MASTER_FALLBACK_ID}?q=80&w=500&auto=format&fit=crop`;

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const fetch = (targetUrl, attempt = 0) => {
            if (attempt > 3) return reject(new Error("Too many redirects"));
            const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
            https.get(targetUrl, options, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) return fetch(res.headers.location, attempt + 1);
                if (res.statusCode !== 200) return reject(new Error(`Status: ${res.statusCode}`));
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }).on('error', reject);
        };
        fetch(url);
    });
};

const repair = async () => {
    console.log('Checking for corrupted images...');
    const files = fs.readdirSync(outputDir);
    let fixedCount = 0;
    for (const file of files) {
        const fullPath = path.join(outputDir, file);
        const stats = fs.statSync(fullPath);
        if (stats.size < 1000) {
            console.log(`Repairing corrupted file: ${file} (${stats.size} bytes)`);
            try {
                await downloadImage(fallbackUrl, fullPath);
                fixedCount++;
            } catch (e) {
                console.error(`Failed to repair ${file}: ${e.message}`);
            }
        }
    }
    console.log(`Repair complete. Fixed ${fixedCount} files.`);
};

repair();
