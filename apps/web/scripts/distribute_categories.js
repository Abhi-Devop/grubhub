const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Abhishek\\OneDrive\\Desktop\\JOBSearch\\Antigravity\\GRUBHUB-ReactApp\\abhishekimgvideodata';
const destDir = 'C:\\Users\\Abhishek\\OneDrive\\Desktop\\JOBSearch\\Antigravity\\GRUBHUB-ReactApp\\apps\\web\\public\\local_data\\products';
const dataTsPath = 'C:\\Users\\Abhishek\\OneDrive\\Desktop\\JOBSearch\\Antigravity\\GRUBHUB-ReactApp\\apps\\web\\src\\lib\\data.ts';

const categories = [
    "Biryani World",
    "North Indian Spice",
    "South Indian Tiffins",
    "Street Food Hits",
    "Late Night Munchies",
    "Vegetables & Fruits",
    "Premium Gourmet",
    "Seafood Specials"
];

const ogNames = [
    "Hyderabadi Chicken Dum Biryani", "Special Paneer Tikka Biryani", "Lucknowi Mutton Biryani", "Egg Biryani",
    "Creamy Butter Chicken", "Paneer Butter Masala", "Dal Makhani", "Amritsari Chole Kulche",
    "Crispy Masala Dosa", "Idli Sambar Combo", "Medu Vada", "Mumbai Pav Bhaji",
    "Pani Puri (Gol Gappe)", "Veg Momos", "Samosa Chat", "Double Cheese Pizza",
    "Crispy Chicken Burger", "Chocolate Brownie Sunday", "Fresh Onion (Pyaz)", "Fresh Potato (Aloo)", "Farm Fresh Tomato"
];

let allFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
allFiles = allFiles.filter(f => !f.includes('loginpage') && !f.includes('Video') && !f.includes('map_'));

let items = [];
let categoryIndex = 0;

allFiles.forEach((file, index) => {
    let name = '';
    let category = '';
    
    // Process unique AI files
    if (file.startsWith('ai_')) {
        name = file.replace('.png', '').replace('ai_', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    } else if (index < ogNames.length) {
        name = ogNames[index];
    } else {
        name = file.replace('.png', '').replace(/Gemini_Generated_Image_/gi, 'Gourmet Plate ').replace(/[^a-zA-Z0-9 ]/g, '').trim();
        if(name.startsWith('img') || name.startsWith('image')) {
            name = 'Premium Feast ' + name.replace(/[a-zA-Z]/g, '').trim();
        }
        if (file === 'prawans.png') name = 'Jumbo Garlic Prawns';
        if (name.length < 5) name = 'Gourmet Dish ' + index;
        
        name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
    
    // Explicit mapping for known originals
    if(name.includes('Biryani')) category = 'Biryani World';
    else if(name.includes('Chicken') || name.includes('Paneer') || name.includes('Makhani') || name.includes('Kulche')) category = 'North Indian Spice';
    else if(name.includes('Dosa') || name.includes('Idli') || name.includes('Vada')) category = 'South Indian Tiffins';
    else if(name.includes('Pav') || name.includes('Puri') || name.includes('Momos') || name.includes('Samosa')) category = 'Street Food Hits';
    else if(name.includes('Pizza') || name.includes('Burger') || name.includes('Brownie')) category = 'Late Night Munchies';
    else if(name.includes('Tomato') || name.includes('Potato') || name.includes('Onion')) category = 'Vegetables & Fruits';
    else if(name.includes('Prawn') || name.includes('Lobster') || name.includes('Cod') || name.includes('Scallop') || name.includes('Crab') || name.includes('Sushi')) category = 'Seafood Specials';
    else {
        // Round-robin distribute remaining items across ALL categories evenly!
        category = categories[categoryIndex % categories.length];
        categoryIndex++;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let finalPath = '';
    
    if(file.startsWith('ai_')) {
        finalPath = `/local_data/products/${slug}.png`;
        const targetFile = path.join(destDir, slug + '.png');
        if(!fs.existsSync(targetFile)) fs.renameSync(path.join(destDir, file), targetFile);
    } else {
        finalPath = `/local_data/products/${slug}.png`;
        const targetFile = path.join(destDir, slug + '.png');
        if(!fs.existsSync(targetFile)) fs.copyFileSync(path.join(sourceDir, file), targetFile);
    }

    items.push({
        id: slug,
        name: name,
        price: 150 + (index * 17 % 500),
        rating: 4.1 + (index % 8) / 10,
        time: '30 mins',
        isVeg: index % 3 === 0,
        image: finalPath,
        category: category,
        description: `Experience the elegant taste of ${name}, specially crafted by our executive chefs for the ${category} collection. Vibrant and rich.`,
        unit: '1 Portion',
        mrp: 150 + (index * 17 % 500) + 120,
        discount: 15,
        images: [finalPath, finalPath, finalPath]
    });
});

const dedup = [];
const seen = new Set();
for(const i of items) {
   if(!seen.has(i.id)) {
       seen.add(i.id);
       dedup.push(i);
   }
}

const dataTsContent = `
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  time: string;
  isVeg: boolean;
  image: string;
  category: string;
  description?: string;
  unit?: string;
  mrp?: number;
  discount?: number;
  slug?: string;
  sku?: string;
  images?: string[];
  variants?: {
    id: string;
    unit: string;
    price: number;
    mrp: number;
    discount: number;
  }[];
  details?: {
    [key: string]: string;
  };
}

export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const ALL_ITEMS: FoodItem[] = ${JSON.stringify(dedup, null, 2)};
`;

fs.writeFileSync(dataTsPath, dataTsContent);
console.log(`Successfully rebuilt data.ts with ${dedup.length} items spread across all categories!`);
