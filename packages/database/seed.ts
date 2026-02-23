
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// --- DATA FROM apps/web/src/lib/data.ts ---
interface FoodItem {
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
  images?: string[];
}

const CATEGORIES = [
  "Biryani World",
  "North Indian Spice",
  "South Indian Tiffins",
  "Street Food Hits",
  "Late Night Munchies",
  "Vegetables & Fruits", 
  "New Arrivals",
  "Chef's Specials",
];

// Helper for consistent images
const getImages = (mainImage: string) => [mainImage, mainImage, mainImage];

const CURATED_ITEMS: FoodItem[] = [
  // --- Biryani World ---
  {
    id: "biryani-1",
    name: "Hyderabadi Chicken Dum Biryani",
    price: 349,
    rating: 4.8,
    time: "35 mins",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
    category: "Biryani World",
    description: "Authentic Hyderabadi Dum Biryani cooked with long grain basmati rice and tender chicken pieces marinated in secret spices.",
    unit: "1 Kg",
    mrp: 499,
    discount: 30,
    images: getImages("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "biryani-2",
    name: "Special Paneer Tikka Biryani",
    price: 299,
    rating: 4.6,
    time: "30 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop",
    category: "Biryani World",
    description: "A fusion of chargrilled Paneer Tikka and aromatic Biryani rice.",
    unit: "1 Portion",
    mrp: 350,
    discount: 15,
    images: getImages("https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "biryani-3",
    name: "Lucknowi Mutton Biryani",
    price: 449,
    rating: 4.9,
    time: "45 mins",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop",
    category: "Biryani World",
    description: "Aromatic and mild Lucknawi style biryani with melt-in-the-mouth mutton pieces.",
    unit: "1 Kg",
    mrp: 599,
    discount: 25,
    images: getImages("https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "biryani-4",
    name: "Egg Biryani",
    price: 249,
    rating: 4.5,
    time: "30 mins",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
    category: "Biryani World",
    description: "Classic biryani served with roasted boiled eggs and raita.",
    unit: "1 Portion",
    mrp: 299,
    discount: 17,
    images: getImages("https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop"),
  },

  // --- North Indian Spice ---
  {
    id: "north-1",
    name: "Creamy Butter Chicken",
    price: 320,
    rating: 4.9,
    time: "25 mins",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop",
    category: "North Indian Spice",
    description: "Classic Chicken Makhani cooked in a rich tomato and cashew gravy with butter and cream.",
    unit: "500ml",
    mrp: 400,
    discount: 20,
    images: getImages("https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "north-2",
    name: "Paneer Butter Masala",
    price: 280,
    rating: 4.7,
    time: "25 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop",
    category: "North Indian Spice",
    description: "Soft paneer cubes simmered in a rich, creamy, and mildly sweet onion-tomato gravy.",
    unit: "500ml",
    mrp: 350,
    discount: 20,
    images: getImages("https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "north-3",
    name: "Dal Makhani",
    price: 240,
    rating: 4.8,
    time: "30 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
    category: "North Indian Spice",
    description: "Slow-cooked black lentils with kidney beans, cream, and butter.",
    unit: "500ml",
    mrp: 300,
    discount: 20,
    images: getImages("https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "north-4",
    name: "Amritsari Chole Kulche",
    price: 180,
    rating: 4.6,
    time: "20 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    category: "North Indian Spice",
    description: "Spicy chickpea curry served with fluffy tandoori kulchas.",
    unit: "1 Plate",
    mrp: 220,
    discount: 18,
    images: getImages("https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"),
  },

  // --- South Indian Tiffins ---
  {
    id: "south-1",
    name: "Crispy Masala Dosa",
    price: 90,
    rating: 4.8,
    time: "15 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    category: "South Indian Tiffins",
    description: "Golden crispy crepe made from fermented rice and lentil batter, stuffed with spiced potato filling.",
    unit: "1 Pc",
    mrp: 120,
    discount: 25,
    images: getImages("https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "south-2",
    name: "Idli Sambar Combo",
    price: 70,
    rating: 4.7,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    category: "South Indian Tiffins",
    description: "Soft steaming hot idlis served with spicy sambar and coconut chutney.",
    unit: "2 Pcs",
    mrp: 90,
    discount: 22,
    images: [
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop"
    ],
  },
  {
    id: "south-3",
    name: "Medu Vada",
    price: 60,
    rating: 4.5,
    time: "15 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1630395822970-4b1d6cb5eb1e?q=80&w=800&auto=format&fit=crop",
    category: "South Indian Tiffins",
    description: "Crispy donut-shaped lentil fritters served with sambar and chutney.",
    unit: "2 Pcs",
    mrp: 80,
    discount: 25,
    images: [
        "https://images.unsplash.com/photo-1630395822970-4b1d6cb5eb1e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1668236543090-d2f896911062?q=80&w=800&auto=format&fit=crop"
    ],
  },

  // --- Street Food Hits ---
  {
    id: "street-1",
    name: "Mumbai Pav Bhaji",
    price: 140,
    rating: 4.8,
    time: "20 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1606491956689-2ea28c6746ed?q=80&w=800&auto=format&fit=crop",
    category: "Street Food Hits",
    description: "Spicy vegetable mash served with butter-toasted pav bread.",
    unit: "1 Plate",
    mrp: 180,
    discount: 22,
    images: ["https://images.unsplash.com/photo-1606491956689-2ea28c6746ed?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "street-2",
    name: "Pani Puri (Gol Gappe)",
    price: 50,
    rating: 4.9,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800&auto=format&fit=crop",
    category: "Street Food Hits",
    description: "Crispy hollow puri filled with spicy mint water and potatoes.",
    unit: "6 Pcs",
    mrp: 60,
    discount: 16,
    images: ["https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "street-3",
    name: "Veg Momos",
    price: 100,
    rating: 4.6,
    time: "15 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1625223007374-ee506169c9b6?q=80&w=800&auto=format&fit=crop", 
    category: "Street Food Hits",
    description: "Steamed dumplings filled with mixed vegetables.",
    unit: "8 Pcs",
    mrp: 120,
    discount: 16,
    images: ["https://images.unsplash.com/photo-1625223007374-ee506169c9b6?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "street-4",
    name: "Samosa Chat",
    price: 60,
    rating: 4.7,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    category: "Street Food Hits",
    description: "Crushed samosas topped with yogurt, chutneys, and spices.",
    unit: "1 Plate",
    mrp: 80,
    discount: 25,
    images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"],
  },

  // --- Late Night Munchies ---
  {
    id: "late-1",
    name: "Double Cheese Pizza",
    price: 399,
    rating: 4.7,
    time: "30 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    category: "Late Night Munchies",
    description: "Loaded with extra cheese and Italian herbs.",
    unit: "Regular 8\"",
    mrp: 499,
    discount: 20,
    images: getImages("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "late-2",
    name: "Crispy Chicken Burger",
    price: 189,
    rating: 4.6,
    time: "25 mins",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    category: "Late Night Munchies",
    description: "Crispy fried chicken patty with lettuce, mayo, and cheese.",
    unit: "1 Pc",
    mrp: 229,
    discount: 17,
    images: getImages("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "late-3",
    name: "Chocolate Brownie Sunday",
    price: 150,
    rating: 4.9,
    time: "15 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop",
    category: "Late Night Munchies",
    description: "Warm chocolate brownie served with vanilla ice cream and hot fudge sauce.",
    unit: "1 Pc",
    mrp: 190,
    discount: 21,
    images: getImages("https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop"),
  },

  // --- Vegetables (Essentials) ---
  {
    id: "veg-1",
    name: "Fresh Onion (Pyaz)",
    price: 35,
    rating: 4.5,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop",
    category: "Vegetables & Fruits",
    description: "Premium quality Nashik onions.",
    unit: "1 Kg",
    mrp: 45,
    discount: 22,
    images: getImages("https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "veg-2",
    name: "Fresh Potato (Aloo)",
    price: 30,
    rating: 4.6,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    category: "Vegetables & Fruits",
    description: "New harvest potatoes, perfect for frying and curries.",
    unit: "1 Kg",
    mrp: 40,
    discount: 25,
    images: getImages("https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop"),
  },
  {
    id: "veg-3",
    name: "Fresh Tomato",
    price: 25,
    rating: 4.4,
    time: "10 mins",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    category: "Vegetables & Fruits",
    description: "Ripe, red, and juicy tomatoes directly from the farm.",
    unit: "1 Kg",
    mrp: 35,
    discount: 28,
    images: getImages("https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"),
  },
  // --- New Arrivals ---
  {
    id: "new-1",
    name: "Gourmet Prawns",
    price: 499,
    rating: 4.8,
    time: "30 mins",
    isVeg: false,
    image: "/images/new-uploads/prawans.png",
    category: "New Arrivals",
    description: "Fresh jumbo prawns cooked to perfection.",
    unit: "1 Portion",
    mrp: 599,
    discount: 15,
    images: ["/images/new-uploads/prawans.png"],
  },
  {
    id: "new-2",
    name: "Chef's Special Delight",
    price: 349,
    rating: 4.7,
    time: "25 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_268hwy268hwy268h.png",
    category: "New Arrivals",
    description: "A unique culinary creation.",
    unit: "1 Plate",
    mrp: 400,
    discount: 12,
    images: ["/images/new-uploads/Gemini_Generated_Image_268hwy268hwy268h.png"],
  },
  {
    id: "new-3",
    name: "Artisan Platter",
    price: 599,
    rating: 4.9,
    time: "40 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_5pkw6i5pkw6i5pkw.png",
    category: "New Arrivals",
    description: "An assortment of our finest meats and cheeses.",
    unit: "1 Platter",
    mrp: 700,
    discount: 14,
    images: ["/images/new-uploads/Gemini_Generated_Image_5pkw6i5pkw6i5pkw.png"],
  },
  {
    id: "new-4",
    name: "Royal Feast",
    price: 650,
    rating: 4.8,
    time: "45 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_8q4i0x8q4i0x8q4i.png",
    category: "New Arrivals",
    description: "A meal fit for a king.",
    unit: "1 Serving",
    mrp: 750,
    discount: 13,
    images: ["/images/new-uploads/Gemini_Generated_Image_8q4i0x8q4i0x8q4i.png"],
  },
  {
    id: "new-5",
    name: "Seafood Sensation",
    price: 550,
    rating: 4.7,
    time: "35 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_ag3ev4ag3ev4ag3e.png",
    category: "New Arrivals",
    description: "Ocean fresh flavors.",
    unit: "1 Portion",
    mrp: 600,
    discount: 8,
    images: ["/images/new-uploads/Gemini_Generated_Image_ag3ev4ag3ev4ag3e.png"],
  },
  {
    id: "new-6",
    name: "Garden Fresh Salad",
    price: 249,
    rating: 4.5,
    time: "15 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_ap0rc9ap0rc9ap0r.png",
    category: "New Arrivals",
    description: "Crisp vegetables with a zest dressing.",
    unit: "1 Bowl",
    mrp: 299,
    discount: 16,
    images: ["/images/new-uploads/Gemini_Generated_Image_ap0rc9ap0rc9ap0r.png"],
  },
  {
    id: "new-7",
    name: "Spicy Tandoori",
    price: 399,
    rating: 4.6,
    time: "30 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_dfpz06dfpz06dfpz.png",
    category: "New Arrivals",
    description: "Char-grilled to perfection.",
    unit: "1 Plate",
    mrp: 450,
    discount: 11,
    images: ["/images/new-uploads/Gemini_Generated_Image_dfpz06dfpz06dfpz.png"],
  },
  {
    id: "new-8",
    name: "Exotic Curry",
    price: 320,
    rating: 4.7,
    time: "25 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_eytdepeytdepeytd.png",
    category: "New Arrivals",
    description: "Rich flavors from the east.",
    unit: "1 Bowl",
    mrp: 380,
    discount: 15,
    images: ["/images/new-uploads/Gemini_Generated_Image_eytdepeytdepeytd.png"],
  },
  {
    id: "new-9",
    name: "Dessert Bliss",
    price: 199,
    rating: 4.8,
    time: "10 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_ezoubdezoubdezou.png",
    category: "New Arrivals",
    description: "Sweet indulgence.",
    unit: "1 Pc",
    mrp: 220,
    discount: 9,
    images: ["/images/new-uploads/Gemini_Generated_Image_ezoubdezoubdezou.png"],
  },
  {
    id: "new-10",
    name: "Morning Glory",
    price: 150,
    rating: 4.5,
    time: "15 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_ibgkxkibgkxkibgk.png",
    category: "New Arrivals",
    description: "Start your day right.",
    unit: "1 Plate",
    mrp: 180,
    discount: 16,
    images: ["/images/new-uploads/Gemini_Generated_Image_ibgkxkibgkxkibgk.png"],
  },
  // --- Chef's Specials ---
  {
    id: "chef-1",
    name: "Masterpiece Burger",
    price: 299,
    rating: 4.9,
    time: "25 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_j94obrj94obrj94o.png",
    category: "Chef's Specials",
    description: "Our chef's signature burger.",
    unit: "1 Pc",
    mrp: 350,
    discount: 14,
    images: ["/images/new-uploads/Gemini_Generated_Image_j94obrj94obrj94o.png"],
  },
  {
    id: "chef-2",
    name: "Golden Fries",
    price: 120,
    rating: 4.6,
    time: "15 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_jknr9cjknr9cjknr.png",
    category: "Chef's Specials",
    description: "Crispy and golden.",
    unit: "1 Portion",
    mrp: 150,
    discount: 20,
    images: ["/images/new-uploads/Gemini_Generated_Image_jknr9cjknr9cjknr.png"],
  },
  {
    id: "chef-3",
    name: "Sushi Platter",
    price: 799,
    rating: 4.9,
    time: "40 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_ndw285ndw285ndw2.png",
    category: "Chef's Specials",
    description: "Authentic Japanese sushi.",
    unit: "1 Platter",
    mrp: 900,
    discount: 11,
    images: ["/images/new-uploads/Gemini_Generated_Image_ndw285ndw285ndw2.png"],
  },
  {
    id: "chef-4",
    name: "Pasta Primavera",
    price: 280,
    rating: 4.7,
    time: "25 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_qj2vnrqj2vnrqj2v.png",
    category: "Chef's Specials",
    description: "Fresh vegetables and pasta in a light sauce.",
    unit: "1 Plate",
    mrp: 320,
    discount: 12,
    images: ["/images/new-uploads/Gemini_Generated_Image_qj2vnrqj2vnrqj2v.png"],
  },
  {
    id: "chef-5",
    name: "Grilled Salmon",
    price: 450,
    rating: 4.8,
    time: "35 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_t1hnk6t1hnk6t1hn.png",
    category: "Chef's Specials",
    description: "Perfectly grilled salmon fillet.",
    unit: "1 Portion",
    mrp: 500,
    discount: 10,
    images: ["/images/new-uploads/Gemini_Generated_Image_t1hnk6t1hnk6t1hn.png"],
  },
  {
    id: "chef-6",
    name: "Tacos Al Pastor",
    price: 220,
    rating: 4.7,
    time: "20 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_u1zic8u1zic8u1zi.png",
    category: "Chef's Specials",
    description: "Traditional Mexican tacos.",
    unit: "3 Pcs",
    mrp: 260,
    discount: 15,
    images: ["/images/new-uploads/Gemini_Generated_Image_u1zic8u1zic8u1zi.png"],
  },
  {
    id: "chef-7",
    name: "Mushroom Risotto",
    price: 310,
    rating: 4.6,
    time: "30 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_u3fl5qu3fl5qu3fl.png",
    category: "Chef's Specials",
    description: "Creamy risotto with wild mushrooms.",
    unit: "1 Plate",
    mrp: 360,
    discount: 13,
    images: ["/images/new-uploads/Gemini_Generated_Image_u3fl5qu3fl5qu3fl.png"],
  },
  {
    id: "chef-8",
    name: "Berry Smoothie",
    price: 140,
    rating: 4.8,
    time: "5 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_vfggw0vfggw0vfgg.png",
    category: "Chef's Specials",
    description: "A burst of berry goodness.",
    unit: "1 Glass",
    mrp: 160,
    discount: 12,
    images: ["/images/new-uploads/Gemini_Generated_Image_vfggw0vfggw0vfgg.png"],
  },
    {
    id: "chef-9",
    name: "Steak Frites",
    price: 550,
    rating: 4.9,
    time: "40 mins",
    isVeg: false,
    image: "/images/new-uploads/Gemini_Generated_Image_vvbtq3vvbtq3vvbt.png",
    category: "Chef's Specials",
    description: "Juicy steak with crispy fries.",
    unit: "1 Plate",
    mrp: 650,
    discount: 15,
    images: ["/images/new-uploads/Gemini_Generated_Image_vvbtq3vvbtq3vvbt.png"],
  },
  {
    id: "chef-10",
    name: "Veggie Delight Pizza",
    price: 380,
    rating: 4.7,
    time: "30 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_w17sk1w17sk1w17s.png",
    category: "Chef's Specials",
    description: "Loaded with fresh vegetables.",
    unit: "1 Pizza",
    mrp: 450,
    discount: 15,
    images: ["/images/new-uploads/Gemini_Generated_Image_w17sk1w17sk1w17s.png"],
  },
      {
    id: "chef-11",
    name: "Classic Pancakes",
    price: 180,
    rating: 4.8,
    time: "15 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_w1n0nlw1n0nlw1n0.png",
    category: "Chef's Specials",
    description: "Fluffy pancakes with syrup.",
    unit: "1 Plate",
    mrp: 220,
    discount: 18,
    images: ["/images/new-uploads/Gemini_Generated_Image_w1n0nlw1n0nlw1n0.png"],
  },
  {
    id: "chef-12",
    name: "Special Dish 12",
    price: 250,
    rating: 4.6,
    time: "20 mins",
    isVeg: true,
    image: "/images/new-uploads/Gemini_Generated_Image_w1x9a8w1x9a8w1x9.png",
    category: "Chef's Specials",
    description: "A special treat.",
    unit: "1 Portion",
    mrp: 300,
    discount: 16,
    images: ["/images/new-uploads/Gemini_Generated_Image_w1x9a8w1x9a8w1x9.png"],
  },
];
// --- END DATA COPY ---

async function main() {
  console.log('🌱 Starting seed...')

  // Cleanup with dependency order
  const deleteOrder = [
    prisma.cartItem.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.storeProduct.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.store.deleteMany(),
    prisma.address.deleteMany(),
    prisma.user.deleteMany(),
  ];

  try {
      await prisma.$transaction(deleteOrder);
  } catch (e) {
      console.log("Cleanup warning (might be empty db):", e);
  }

  // Create Users
  const passwordHash = '$2b$10$eXb4k9zuUwrRTuo3RghlgOAJ5gv63E1dt2QZMByODTVIfZGmX6dCG'; // 'password'

  const user = await prisma.user.create({
    data: {
      firstName: 'GrubHub',
      lastName: 'User',
      email: 'user@grubhub.com',
      phone: '9999999999',
      password: passwordHash, 
      role: 'USER',
      addresses: {
        create: {
            street: "123, Tech Park",
            city: "Mumbai",
            pincode: "400001",
            state: "MH",
            lat: 19.0760,
            lng: 72.8777,
            type: "Work",
            isDefault: true
        }
      }
    }
  })
  console.log(`👤 Created user: user@grubhub.com`)

  const admin = await prisma.user.create({
    data: {
      firstName: 'GrubHub',
      lastName: 'Admin',
      email: 'admin@grubhub.com',
      phone: '8888888888',
      password: passwordHash,
      role: 'ADMIN'
    }
  })
  console.log(`🔑 Created admin: admin@grubhub.com`)

  // Create Store
  const storeId = 1; // Changed to Int to match new Schema
  let store = await prisma.store.findUnique({ where: { id: storeId } });

  if (!store) {
      store = await prisma.store.create({
        data: {
          id: storeId,
          name: 'GrubHub Main Connector',
          address: 'MG Road, Bangalore',
          lat: 12.9716,
          lng: 77.5946,
          isActive: true
        }
      })
  }
  console.log(`🏪 Created/Found store: ${store.name}`)

  // Create Categories
  const categoryMap = new Map();
  const catImages: {[key: string]: string} = {
    "Biryani World": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop",
    "North Indian Spice": "https://images.unsplash.com/photo-1628190531618-436d99e52e46?q=80&w=400&auto=format&fit=crop",
    "South Indian Tiffins": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop",
    "Street Food Hits": "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=400&auto=format&fit=crop",
    "Late Night Munchies": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
    "Vegetables & Fruits": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400&auto=format&fit=crop",
    "New Arrivals": "/images/new-uploads/prawans.png",
    "Chef's Specials": "/images/new-uploads/Gemini_Generated_Image_j94obrj94obrj94o.png"
  };

  for (const catName of CATEGORIES) {
      let category = await prisma.category.findFirst({ where: { name: catName }});
      if (!category) {
          category = await prisma.category.create({
              data: {
                  name: catName,
                  image: catImages[catName] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400"
              }
          });
      }
      categoryMap.set(catName, category.id);
  }

  // Create Products
  let count = 0;
  for (const prod of CURATED_ITEMS) {
      // Find category ID
      let categoryId = categoryMap.get(prod.category);
      
      if (!categoryId) {
          console.warn(`Skipping product ${prod.name}: Category ${prod.category} not found`);
          continue;
      }

      // Upsert Product
      const product = await prisma.product.upsert({
          where: { sku: prod.id },
          update: {
              slug: prod.id,
              image: prod.image,
              isVeg: prod.isVeg
          },
          create: {
            name: prod.name,
            description: prod.description || `Delicious ${prod.name}`,
            image: prod.image,
            sku: prod.id,
            slug: prod.id,
            categoryId: categoryId,
            rating: prod.rating,
            numReviews: Math.floor(Math.random() * 500) + 10,
            isVeg: prod.isVeg,
            basePrice: prod.price,
            baseMrp: prod.mrp || prod.price
          }
      });

      // Upsert StoreProduct
      await prisma.storeProduct.upsert({
          where: {
              storeId_productId: {
                  storeId: store.id,
                  productId: product.id
              }
          },
          update: {
              stock: 50,
              price: prod.price
          },
          create: {
              storeId: store.id,
              productId: product.id,
              price: prod.price,
              mrp: prod.mrp || prod.price,
              stock: 50,
              isAvailable: true
          }
      });
      
      count++;
  }

  console.log(`✅ Seeded ${count} products.`);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
