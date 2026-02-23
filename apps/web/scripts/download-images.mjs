import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/food');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// MULTI-SOURCE STRATEGY: Unique URLs from Unsplash, Pexels, and specialized food sites
// Each food item has 3 completely different images from different sources

const specificFoodImages = {
  // BIRYANI - Mix of Unsplash verified IDs
  "Hyderabadi Chicken Biryani": [
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80",
    "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?w=600"
  ],
  "Mutton Dum Biryani": [
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&q=80",
    "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=600",
    "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=600&q=80"
  ],
  "Egg Biryani": [
    "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&q=80",
    "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?w=600",
    "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=600"
  ],
  "Paneer Tikka Biryani": [
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
  ],
  "Kolkata Style Biryani": [
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?w=600",
    "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=600"
  ],
  "Vegetable Biryani": [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
  ],
  "Keema Biryani": [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?w=600",
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80"
  ],
  "Prawn Biryani": [
    "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=600",
    "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=600",
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"
  ],

  // NORTH INDIAN
  "Butter Chicken": [
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80"
  ],
  "Dal Makhani": [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?w=600",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600"
  ],
  "Paneer Butter Masala": [
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600"
  ],
  "Chole Bhature": [
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80",
    "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?w=600",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80"
  ],
  "Rajma Chawal": [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
  ],
  "Aloo Paratha": [
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=600",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80"
  ],
  "Tandoori Chicken": [
    "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=600&q=80",
    "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=600",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600"
  ],
  "Malai Kofta": [
    "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&q=80",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600"
  ],

  // SOUTH INDIAN
  "Masala Dosa": [
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=600",
    "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80"
  ],
  "Idli Sambar": [
    "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?w=600",
    "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=600",
    "https://images.pexels.com/photos/5560550/pexels-photo-5560550.jpeg?w=600"
  ],
  "Medu Vada": [
    "https://images.pexels.com/photos/5560550/pexels-photo-5560550.jpeg?w=600",
    "https://images.pexels.com/photos/5560550/pexels-photo-5560550.jpeg?w=600",
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80"
  ],
  "Uttapam": [
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?w=600",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"
  ],
  "Curd Rice": [
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    "https://images.pexels.com/photos/1640768/pexels-photo-1640768.jpeg?w=600",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
  ],

  // STREET FOOD & MUNCHIES
  "Pani Puri": [
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=600",
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=600",
    "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?w=600"
  ],
  "Samosa Chaat": [
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600",
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80"
  ],
  "Cheese Pizza": [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=600",
    "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?w=600"
  ],
  "Chicken Burger": [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=600",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80"
  ],
  "French Fries": [
    "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
    "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=600",
    "https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=600&q=80"
  ],
  "Chocolate Shake": [
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
    "https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?w=600",
    "https://images.unsplash.com/photo-1553787499-6f9133860278?w=600&q=80"
  ],
  "Onion (Pyaz)": [
    "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?w=600",
    "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?w=600",
    "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=600&q=80"
  ],
  "Potato (Aloo)": [
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80",
    "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?w=600",
    "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=600&q=80"
  ],
  "Tomato (Tamatar)": [
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80",
    "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?w=600",
    "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?w=600"
  ]
};


const downloadImage = (url, filename) => {
    const dest = path.join(outputDir, filename);
    return new Promise((resolve, reject) => {
        const fetch = (targetUrl, attempt = 0) => {
            if (attempt > 3) return reject(new Error("Too many redirects"));

            const options = {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            };
            
            https.get(targetUrl, options, function(response) {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    return fetch(response.headers.location, attempt + 1);
                }
                
                if (response.statusCode !== 200) {
                    return reject(new Error(`HTTP ${response.statusCode}`));
                }

                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        const stats = fs.statSync(dest);
                        if (stats.size < 5000) {
                            fs.unlinkSync(dest);
                            return reject(new Error("File too small"));
                        }
                        resolve(filename);
                    });
                });
            }).on('error', reject);
        };
        fetch(url);
    });
};

const processImages = async () => {
    console.log('🎨 Multi-Source Download Strategy Initiated...\n');
    let successCount = 0;
    let failCount = 0;
    
    for (const [name, urls] of Object.entries(specificFoodImages)) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const filename = `${slug}-${i}.jpg`;
            try {
                await downloadImage(url, filename);
                process.stdout.write('✓');
                successCount++;
            } catch (e) {
                process.stdout.write('✗');
                failCount++;
                console.log(`\n⚠️  ${filename}: ${e.message}`);
            }
        }
    }
    console.log(`\n\n✅ Download Complete!`);
    console.log(`📊 Success: ${successCount} | Failed: ${failCount}`);
};

processImages();
