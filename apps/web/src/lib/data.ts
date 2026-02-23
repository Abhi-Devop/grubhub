
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

export const CATEGORIES = [
  "Biryani World",
  "North Indian Spice",
  "South Indian Tiffins",
  "Street Food Hits",
  "Late Night Munchies",
  "Vegetables & Fruits",
  "Premium Gourmet",
  "Seafood Specials"
];

export const ALL_ITEMS: FoodItem[] = [
  {
    "id": "hyderabadi-chicken-dum-biryani",
    "name": "Hyderabadi Chicken Dum Biryani",
    "price": 150,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/hyderabadi-chicken-dum-biryani.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Hyderabadi Chicken Dum Biryani, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 270,
    "discount": 15,
    "images": [
      "/local_data/products/hyderabadi-chicken-dum-biryani.png",
      "/local_data/products/hyderabadi-chicken-dum-biryani.png",
      "/local_data/products/hyderabadi-chicken-dum-biryani.png"
    ]
  },
  {
    "id": "special-paneer-tikka-biryani",
    "name": "Special Paneer Tikka Biryani",
    "price": 167,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/special-paneer-tikka-biryani.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Special Paneer Tikka Biryani, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 287,
    "discount": 15,
    "images": [
      "/local_data/products/special-paneer-tikka-biryani.png",
      "/local_data/products/special-paneer-tikka-biryani.png",
      "/local_data/products/special-paneer-tikka-biryani.png"
    ]
  },
  {
    "id": "lucknowi-mutton-biryani",
    "name": "Lucknowi Mutton Biryani",
    "price": 184,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/lucknowi-mutton-biryani.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Lucknowi Mutton Biryani, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 304,
    "discount": 15,
    "images": [
      "/local_data/products/lucknowi-mutton-biryani.png",
      "/local_data/products/lucknowi-mutton-biryani.png",
      "/local_data/products/lucknowi-mutton-biryani.png"
    ]
  },
  {
    "id": "egg-biryani",
    "name": "Egg Biryani",
    "price": 201,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/egg-biryani.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Egg Biryani, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 321,
    "discount": 15,
    "images": [
      "/local_data/products/egg-biryani.png",
      "/local_data/products/egg-biryani.png",
      "/local_data/products/egg-biryani.png"
    ]
  },
  {
    "id": "creamy-butter-chicken",
    "name": "Creamy Butter Chicken",
    "price": 218,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/creamy-butter-chicken.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Creamy Butter Chicken, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 338,
    "discount": 15,
    "images": [
      "/local_data/products/creamy-butter-chicken.png",
      "/local_data/products/creamy-butter-chicken.png",
      "/local_data/products/creamy-butter-chicken.png"
    ]
  },
  {
    "id": "paneer-butter-masala",
    "name": "Paneer Butter Masala",
    "price": 235,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/paneer-butter-masala.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Paneer Butter Masala, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 355,
    "discount": 15,
    "images": [
      "/local_data/products/paneer-butter-masala.png",
      "/local_data/products/paneer-butter-masala.png",
      "/local_data/products/paneer-butter-masala.png"
    ]
  },
  {
    "id": "dal-makhani",
    "name": "Dal Makhani",
    "price": 252,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/dal-makhani.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Dal Makhani, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 372,
    "discount": 15,
    "images": [
      "/local_data/products/dal-makhani.png",
      "/local_data/products/dal-makhani.png",
      "/local_data/products/dal-makhani.png"
    ]
  },
  {
    "id": "amritsari-chole-kulche",
    "name": "Amritsari Chole Kulche",
    "price": 269,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/amritsari-chole-kulche.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Amritsari Chole Kulche, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 389,
    "discount": 15,
    "images": [
      "/local_data/products/amritsari-chole-kulche.png",
      "/local_data/products/amritsari-chole-kulche.png",
      "/local_data/products/amritsari-chole-kulche.png"
    ]
  },
  {
    "id": "crispy-masala-dosa",
    "name": "Crispy Masala Dosa",
    "price": 286,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/crispy-masala-dosa.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Crispy Masala Dosa, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 406,
    "discount": 15,
    "images": [
      "/local_data/products/crispy-masala-dosa.png",
      "/local_data/products/crispy-masala-dosa.png",
      "/local_data/products/crispy-masala-dosa.png"
    ]
  },
  {
    "id": "idli-sambar-combo",
    "name": "Idli Sambar Combo",
    "price": 303,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/idli-sambar-combo.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Idli Sambar Combo, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 423,
    "discount": 15,
    "images": [
      "/local_data/products/idli-sambar-combo.png",
      "/local_data/products/idli-sambar-combo.png",
      "/local_data/products/idli-sambar-combo.png"
    ]
  },
  {
    "id": "medu-vada",
    "name": "Medu Vada",
    "price": 320,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/medu-vada.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Medu Vada, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 440,
    "discount": 15,
    "images": [
      "/local_data/products/medu-vada.png",
      "/local_data/products/medu-vada.png",
      "/local_data/products/medu-vada.png"
    ]
  },
  {
    "id": "mumbai-pav-bhaji",
    "name": "Mumbai Pav Bhaji",
    "price": 337,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/mumbai-pav-bhaji.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Mumbai Pav Bhaji, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 457,
    "discount": 15,
    "images": [
      "/local_data/products/mumbai-pav-bhaji.png",
      "/local_data/products/mumbai-pav-bhaji.png",
      "/local_data/products/mumbai-pav-bhaji.png"
    ]
  },
  {
    "id": "pani-puri-gol-gappe",
    "name": "Pani Puri (Gol Gappe)",
    "price": 354,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/pani-puri-gol-gappe.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Pani Puri (Gol Gappe), specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 474,
    "discount": 15,
    "images": [
      "/local_data/products/pani-puri-gol-gappe.png",
      "/local_data/products/pani-puri-gol-gappe.png",
      "/local_data/products/pani-puri-gol-gappe.png"
    ]
  },
  {
    "id": "veg-momos",
    "name": "Veg Momos",
    "price": 371,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/veg-momos.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Veg Momos, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 491,
    "discount": 15,
    "images": [
      "/local_data/products/veg-momos.png",
      "/local_data/products/veg-momos.png",
      "/local_data/products/veg-momos.png"
    ]
  },
  {
    "id": "samosa-chat",
    "name": "Samosa Chat",
    "price": 388,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/samosa-chat.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Samosa Chat, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 508,
    "discount": 15,
    "images": [
      "/local_data/products/samosa-chat.png",
      "/local_data/products/samosa-chat.png",
      "/local_data/products/samosa-chat.png"
    ]
  },
  {
    "id": "double-cheese-pizza",
    "name": "Double Cheese Pizza",
    "price": 405,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/double-cheese-pizza.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Double Cheese Pizza, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 525,
    "discount": 15,
    "images": [
      "/local_data/products/double-cheese-pizza.png",
      "/local_data/products/double-cheese-pizza.png",
      "/local_data/products/double-cheese-pizza.png"
    ]
  },
  {
    "id": "crispy-chicken-burger",
    "name": "Crispy Chicken Burger",
    "price": 422,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/crispy-chicken-burger.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Crispy Chicken Burger, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 542,
    "discount": 15,
    "images": [
      "/local_data/products/crispy-chicken-burger.png",
      "/local_data/products/crispy-chicken-burger.png",
      "/local_data/products/crispy-chicken-burger.png"
    ]
  },
  {
    "id": "chocolate-brownie-sunday",
    "name": "Chocolate Brownie Sunday",
    "price": 439,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/chocolate-brownie-sunday.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Chocolate Brownie Sunday, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 559,
    "discount": 15,
    "images": [
      "/local_data/products/chocolate-brownie-sunday.png",
      "/local_data/products/chocolate-brownie-sunday.png",
      "/local_data/products/chocolate-brownie-sunday.png"
    ]
  },
  {
    "id": "fresh-onion-pyaz",
    "name": "Fresh Onion (Pyaz)",
    "price": 456,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/fresh-onion-pyaz.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Fresh Onion (Pyaz), specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 576,
    "discount": 15,
    "images": [
      "/local_data/products/fresh-onion-pyaz.png",
      "/local_data/products/fresh-onion-pyaz.png",
      "/local_data/products/fresh-onion-pyaz.png"
    ]
  },
  {
    "id": "fresh-potato-aloo",
    "name": "Fresh Potato (Aloo)",
    "price": 473,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/fresh-potato-aloo.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Fresh Potato (Aloo), specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 593,
    "discount": 15,
    "images": [
      "/local_data/products/fresh-potato-aloo.png",
      "/local_data/products/fresh-potato-aloo.png",
      "/local_data/products/fresh-potato-aloo.png"
    ]
  },
  {
    "id": "farm-fresh-tomato",
    "name": "Farm Fresh Tomato",
    "price": 490,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/farm-fresh-tomato.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Farm Fresh Tomato, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 610,
    "discount": 15,
    "images": [
      "/local_data/products/farm-fresh-tomato.png",
      "/local_data/products/farm-fresh-tomato.png",
      "/local_data/products/farm-fresh-tomato.png"
    ]
  },
  {
    "id": "gourmet-plate-qj2vnrqj2vnrqj2v",
    "name": "Gourmet Plate Qj2vnrqj2vnrqj2v",
    "price": 507,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/gourmet-plate-qj2vnrqj2vnrqj2v.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Gourmet Plate Qj2vnrqj2vnrqj2v, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 627,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-qj2vnrqj2vnrqj2v.png",
      "/local_data/products/gourmet-plate-qj2vnrqj2vnrqj2v.png",
      "/local_data/products/gourmet-plate-qj2vnrqj2vnrqj2v.png"
    ]
  },
  {
    "id": "gourmet-plate-t1hnk6t1hnk6t1hn-1",
    "name": "Gourmet Plate T1hnk6t1hnk6t1hn 1",
    "price": 524,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn-1.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Gourmet Plate T1hnk6t1hnk6t1hn 1, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 644,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn-1.png",
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn-1.png",
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn-1.png"
    ]
  },
  {
    "id": "gourmet-plate-t1hnk6t1hnk6t1hn",
    "name": "Gourmet Plate T1hnk6t1hnk6t1hn",
    "price": 541,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Gourmet Plate T1hnk6t1hnk6t1hn, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 661,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn.png",
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn.png",
      "/local_data/products/gourmet-plate-t1hnk6t1hnk6t1hn.png"
    ]
  },
  {
    "id": "gourmet-plate-u1zic8u1zic8u1zi",
    "name": "Gourmet Plate U1zic8u1zic8u1zi",
    "price": 558,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/gourmet-plate-u1zic8u1zic8u1zi.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Gourmet Plate U1zic8u1zic8u1zi, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 678,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-u1zic8u1zic8u1zi.png",
      "/local_data/products/gourmet-plate-u1zic8u1zic8u1zi.png",
      "/local_data/products/gourmet-plate-u1zic8u1zic8u1zi.png"
    ]
  },
  {
    "id": "gourmet-plate-u3fl5qu3fl5qu3fl",
    "name": "Gourmet Plate U3fl5qu3fl5qu3fl",
    "price": 575,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-u3fl5qu3fl5qu3fl.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Gourmet Plate U3fl5qu3fl5qu3fl, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 695,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-u3fl5qu3fl5qu3fl.png",
      "/local_data/products/gourmet-plate-u3fl5qu3fl5qu3fl.png",
      "/local_data/products/gourmet-plate-u3fl5qu3fl5qu3fl.png"
    ]
  },
  {
    "id": "gourmet-plate-vfggw0vfggw0vfgg",
    "name": "Gourmet Plate Vfggw0vfggw0vfgg",
    "price": 592,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-vfggw0vfggw0vfgg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Gourmet Plate Vfggw0vfggw0vfgg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 712,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-vfggw0vfggw0vfgg.png",
      "/local_data/products/gourmet-plate-vfggw0vfggw0vfgg.png",
      "/local_data/products/gourmet-plate-vfggw0vfggw0vfgg.png"
    ]
  },
  {
    "id": "gourmet-plate-vvbtq3vvbtq3vvbt",
    "name": "Gourmet Plate Vvbtq3vvbtq3vvbt",
    "price": 609,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/gourmet-plate-vvbtq3vvbtq3vvbt.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Gourmet Plate Vvbtq3vvbtq3vvbt, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 729,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-vvbtq3vvbtq3vvbt.png",
      "/local_data/products/gourmet-plate-vvbtq3vvbtq3vvbt.png",
      "/local_data/products/gourmet-plate-vvbtq3vvbtq3vvbt.png"
    ]
  },
  {
    "id": "gourmet-plate-w17sk1w17sk1w17s",
    "name": "Gourmet Plate W17sk1w17sk1w17s",
    "price": 626,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-w17sk1w17sk1w17s.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Gourmet Plate W17sk1w17sk1w17s, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 746,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-w17sk1w17sk1w17s.png",
      "/local_data/products/gourmet-plate-w17sk1w17sk1w17s.png",
      "/local_data/products/gourmet-plate-w17sk1w17sk1w17s.png"
    ]
  },
  {
    "id": "gourmet-plate-w1n0nlw1n0nlw1n0",
    "name": "Gourmet Plate W1n0nlw1n0nlw1n0",
    "price": 643,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-w1n0nlw1n0nlw1n0.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Gourmet Plate W1n0nlw1n0nlw1n0, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 763,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-w1n0nlw1n0nlw1n0.png",
      "/local_data/products/gourmet-plate-w1n0nlw1n0nlw1n0.png",
      "/local_data/products/gourmet-plate-w1n0nlw1n0nlw1n0.png"
    ]
  },
  {
    "id": "gourmet-plate-w1x9a8w1x9a8w1x9-1",
    "name": "Gourmet Plate W1x9a8w1x9a8w1x9 1",
    "price": 160,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9-1.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Gourmet Plate W1x9a8w1x9a8w1x9 1, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 280,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9-1.png",
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9-1.png",
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9-1.png"
    ]
  },
  {
    "id": "gourmet-plate-w1x9a8w1x9a8w1x9",
    "name": "Gourmet Plate W1x9a8w1x9a8w1x9",
    "price": 177,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Gourmet Plate W1x9a8w1x9a8w1x9, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 297,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9.png",
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9.png",
      "/local_data/products/gourmet-plate-w1x9a8w1x9a8w1x9.png"
    ]
  },
  {
    "id": "gourmet-plate-xiqmxqxiqmxqxiqm",
    "name": "Gourmet Plate Xiqmxqxiqmxqxiqm",
    "price": 194,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/gourmet-plate-xiqmxqxiqmxqxiqm.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Gourmet Plate Xiqmxqxiqmxqxiqm, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 314,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-xiqmxqxiqmxqxiqm.png",
      "/local_data/products/gourmet-plate-xiqmxqxiqmxqxiqm.png",
      "/local_data/products/gourmet-plate-xiqmxqxiqmxqxiqm.png"
    ]
  },
  {
    "id": "gourmet-plate-zfd0tdzfd0tdzfd0",
    "name": "Gourmet Plate Zfd0tdzfd0tdzfd0",
    "price": 211,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/gourmet-plate-zfd0tdzfd0tdzfd0.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Gourmet Plate Zfd0tdzfd0tdzfd0, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 331,
    "discount": 15,
    "images": [
      "/local_data/products/gourmet-plate-zfd0tdzfd0tdzfd0.png",
      "/local_data/products/gourmet-plate-zfd0tdzfd0tdzfd0.png",
      "/local_data/products/gourmet-plate-zfd0tdzfd0tdzfd0.png"
    ]
  },
  {
    "id": "premium-feast-1",
    "name": "Premium Feast 1",
    "price": 228,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-1.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Premium Feast 1, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 348,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-1.png",
      "/local_data/products/premium-feast-1.png",
      "/local_data/products/premium-feast-1.png"
    ]
  },
  {
    "id": "premium-feast-10",
    "name": "Premium Feast 10",
    "price": 245,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-10.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Premium Feast 10, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 365,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-10.png",
      "/local_data/products/premium-feast-10.png",
      "/local_data/products/premium-feast-10.png"
    ]
  },
  {
    "id": "premium-feast-11",
    "name": "Premium Feast 11",
    "price": 262,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/premium-feast-11.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Premium Feast 11, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 382,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-11.png",
      "/local_data/products/premium-feast-11.png",
      "/local_data/products/premium-feast-11.png"
    ]
  },
  {
    "id": "premium-feast-12",
    "name": "Premium Feast 12",
    "price": 279,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-12.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Premium Feast 12, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 399,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-12.png",
      "/local_data/products/premium-feast-12.png",
      "/local_data/products/premium-feast-12.png"
    ]
  },
  {
    "id": "premium-feast-3",
    "name": "Premium Feast 3",
    "price": 296,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-3.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Premium Feast 3, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 416,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-3.png",
      "/local_data/products/premium-feast-3.png",
      "/local_data/products/premium-feast-3.png"
    ]
  },
  {
    "id": "premium-feast-4",
    "name": "Premium Feast 4",
    "price": 313,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/premium-feast-4.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Premium Feast 4, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 433,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-4.png",
      "/local_data/products/premium-feast-4.png",
      "/local_data/products/premium-feast-4.png"
    ]
  },
  {
    "id": "premium-feast-5",
    "name": "Premium Feast 5",
    "price": 330,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-5.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Premium Feast 5, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 450,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-5.png",
      "/local_data/products/premium-feast-5.png",
      "/local_data/products/premium-feast-5.png"
    ]
  },
  {
    "id": "premium-feast-6",
    "name": "Premium Feast 6",
    "price": 347,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-6.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Premium Feast 6, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 467,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-6.png",
      "/local_data/products/premium-feast-6.png",
      "/local_data/products/premium-feast-6.png"
    ]
  },
  {
    "id": "premium-feast-7",
    "name": "Premium Feast 7",
    "price": 364,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/premium-feast-7.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Premium Feast 7, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 484,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-7.png",
      "/local_data/products/premium-feast-7.png",
      "/local_data/products/premium-feast-7.png"
    ]
  },
  {
    "id": "premium-feast-8",
    "name": "Premium Feast 8",
    "price": 381,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-8.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Premium Feast 8, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 501,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-8.png",
      "/local_data/products/premium-feast-8.png",
      "/local_data/products/premium-feast-8.png"
    ]
  },
  {
    "id": "premium-feast-9",
    "name": "Premium Feast 9",
    "price": 398,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/premium-feast-9.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Premium Feast 9, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 518,
    "discount": 15,
    "images": [
      "/local_data/products/premium-feast-9.png",
      "/local_data/products/premium-feast-9.png",
      "/local_data/products/premium-feast-9.png"
    ]
  },
  {
    "id": "jumbo-garlic-prawns",
    "name": "Jumbo Garlic Prawns",
    "price": 415,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/jumbo-garlic-prawns.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Jumbo Garlic Prawns, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 535,
    "discount": 15,
    "images": [
      "/local_data/products/jumbo-garlic-prawns.png",
      "/local_data/products/jumbo-garlic-prawns.png",
      "/local_data/products/jumbo-garlic-prawns.png"
    ]
  },
  {
    "id": "themealdbbeefalgeriankeftameatballsjpg",
    "name": "Themealdbbeefalgeriankeftameatballsjpg",
    "price": 432,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefalgeriankeftameatballsjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbbeefalgeriankeftameatballsjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 552,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefalgeriankeftameatballsjpg.png",
      "/local_data/products/themealdbbeefalgeriankeftameatballsjpg.png",
      "/local_data/products/themealdbbeefalgeriankeftameatballsjpg.png"
    ]
  },
  {
    "id": "themealdbbeefaussieburgersjpg",
    "name": "Themealdbbeefaussieburgersjpg",
    "price": 449,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefaussieburgersjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbbeefaussieburgersjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 569,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefaussieburgersjpg.png",
      "/local_data/products/themealdbbeefaussieburgersjpg.png",
      "/local_data/products/themealdbbeefaussieburgersjpg.png"
    ]
  },
  {
    "id": "themealdbbeefbeefandbroccolistirfryjpg",
    "name": "Themealdbbeefbeefandbroccolistirfryjpg",
    "price": 466,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbbeefbeefandbroccolistirfryjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbbeefbeefandbroccolistirfryjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 586,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefbeefandbroccolistirfryjpg.png",
      "/local_data/products/themealdbbeefbeefandbroccolistirfryjpg.png",
      "/local_data/products/themealdbbeefbeefandbroccolistirfryjpg.png"
    ]
  },
  {
    "id": "themealdbbeefbeefbrisketpotroastjpg",
    "name": "Themealdbbeefbeefbrisketpotroastjpg",
    "price": 483,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefbeefbrisketpotroastjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbbeefbeefbrisketpotroastjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 603,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefbeefbrisketpotroastjpg.png",
      "/local_data/products/themealdbbeefbeefbrisketpotroastjpg.png",
      "/local_data/products/themealdbbeefbeefbrisketpotroastjpg.png"
    ]
  },
  {
    "id": "themealdbbeefbitterballendutchmeatballsjpg",
    "name": "Themealdbbeefbitterballendutchmeatballsjpg",
    "price": 500,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefbitterballendutchmeatballsjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbbeefbitterballendutchmeatballsjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 620,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefbitterballendutchmeatballsjpg.png",
      "/local_data/products/themealdbbeefbitterballendutchmeatballsjpg.png",
      "/local_data/products/themealdbbeefbitterballendutchmeatballsjpg.png"
    ]
  },
  {
    "id": "themealdbbeefcornedbeefandcabbagejpg",
    "name": "Themealdbbeefcornedbeefandcabbagejpg",
    "price": 517,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbbeefcornedbeefandcabbagejpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbbeefcornedbeefandcabbagejpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 637,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefcornedbeefandcabbagejpg.png",
      "/local_data/products/themealdbbeefcornedbeefandcabbagejpg.png",
      "/local_data/products/themealdbbeefcornedbeefandcabbagejpg.png"
    ]
  },
  {
    "id": "themealdbbeefcornedbeefhashjpg",
    "name": "Themealdbbeefcornedbeefhashjpg",
    "price": 534,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefcornedbeefhashjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbbeefcornedbeefhashjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 654,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefcornedbeefhashjpg.png",
      "/local_data/products/themealdbbeefcornedbeefhashjpg.png",
      "/local_data/products/themealdbbeefcornedbeefhashjpg.png"
    ]
  },
  {
    "id": "themealdbbeefjamaicanbeefpattiesjpg",
    "name": "Themealdbbeefjamaicanbeefpattiesjpg",
    "price": 551,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefjamaicanbeefpattiesjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbbeefjamaicanbeefpattiesjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 671,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefjamaicanbeefpattiesjpg.png",
      "/local_data/products/themealdbbeefjamaicanbeefpattiesjpg.png",
      "/local_data/products/themealdbbeefjamaicanbeefpattiesjpg.png"
    ]
  },
  {
    "id": "themealdbbeefmilanesajpg",
    "name": "Themealdbbeefmilanesajpg",
    "price": 568,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbbeefmilanesajpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbbeefmilanesajpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 688,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefmilanesajpg.png",
      "/local_data/products/themealdbbeefmilanesajpg.png",
      "/local_data/products/themealdbbeefmilanesajpg.png"
    ]
  },
  {
    "id": "themealdbbeefmontrealsmokedmeatjpg",
    "name": "Themealdbbeefmontrealsmokedmeatjpg",
    "price": 585,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefmontrealsmokedmeatjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbbeefmontrealsmokedmeatjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 705,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefmontrealsmokedmeatjpg.png",
      "/local_data/products/themealdbbeefmontrealsmokedmeatjpg.png",
      "/local_data/products/themealdbbeefmontrealsmokedmeatjpg.png"
    ]
  },
  {
    "id": "themealdbbeefvenezuelansancochojpg",
    "name": "Themealdbbeefvenezuelansancochojpg",
    "price": 602,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbeefvenezuelansancochojpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbbeefvenezuelansancochojpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 722,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefvenezuelansancochojpg.png",
      "/local_data/products/themealdbbeefvenezuelansancochojpg.png",
      "/local_data/products/themealdbbeefvenezuelansancochojpg.png"
    ]
  },
  {
    "id": "themealdbbeefvenezuelanshreddedbeefjpg",
    "name": "Themealdbbeefvenezuelanshreddedbeefjpg",
    "price": 619,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbbeefvenezuelanshreddedbeefjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbbeefvenezuelanshreddedbeefjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 739,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbeefvenezuelanshreddedbeefjpg.png",
      "/local_data/products/themealdbbeefvenezuelanshreddedbeefjpg.png",
      "/local_data/products/themealdbbeefvenezuelanshreddedbeefjpg.png"
    ]
  },
  {
    "id": "themealdbbreakfastbreakfastpotatoesjpg",
    "name": "Themealdbbreakfastbreakfastpotatoesjpg",
    "price": 636,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbreakfastbreakfastpotatoesjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbbreakfastbreakfastpotatoesjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 756,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbreakfastbreakfastpotatoesjpg.png",
      "/local_data/products/themealdbbreakfastbreakfastpotatoesjpg.png",
      "/local_data/products/themealdbbreakfastbreakfastpotatoesjpg.png"
    ]
  },
  {
    "id": "themealdbbreakfasthomemademandazijpg",
    "name": "Themealdbbreakfasthomemademandazijpg",
    "price": 153,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbbreakfasthomemademandazijpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbbreakfasthomemademandazijpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 273,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbreakfasthomemademandazijpg.png",
      "/local_data/products/themealdbbreakfasthomemademandazijpg.png",
      "/local_data/products/themealdbbreakfasthomemademandazijpg.png"
    ]
  },
  {
    "id": "themealdbbreakfastugalikenyancornmealjpg",
    "name": "Themealdbbreakfastugalikenyancornmealjpg",
    "price": 170,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbbreakfastugalikenyancornmealjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbbreakfastugalikenyancornmealjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 290,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbbreakfastugalikenyancornmealjpg.png",
      "/local_data/products/themealdbbreakfastugalikenyancornmealjpg.png",
      "/local_data/products/themealdbbreakfastugalikenyancornmealjpg.png"
    ]
  },
  {
    "id": "themealdbchickenayampercikjpg",
    "name": "Themealdbchickenayampercikjpg",
    "price": 187,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenayampercikjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbchickenayampercikjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 307,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenayampercikjpg.png",
      "/local_data/products/themealdbchickenayampercikjpg.png",
      "/local_data/products/themealdbchickenayampercikjpg.png"
    ]
  },
  {
    "id": "themealdbchickenchickenalfredoprimaverajpg",
    "name": "Themealdbchickenchickenalfredoprimaverajpg",
    "price": 204,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenchickenalfredoprimaverajpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbchickenchickenalfredoprimaverajpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 324,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenchickenalfredoprimaverajpg.png",
      "/local_data/products/themealdbchickenchickenalfredoprimaverajpg.png",
      "/local_data/products/themealdbchickenchickenalfredoprimaverajpg.png"
    ]
  },
  {
    "id": "themealdbchickenchickencongeejpg",
    "name": "Themealdbchickenchickencongeejpg",
    "price": 221,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbchickenchickencongeejpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbchickenchickencongeejpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 341,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenchickencongeejpg.png",
      "/local_data/products/themealdbchickenchickencongeejpg.png",
      "/local_data/products/themealdbchickenchickencongeejpg.png"
    ]
  },
  {
    "id": "themealdbchickenchickenquinoagreeksaladjpg",
    "name": "Themealdbchickenchickenquinoagreeksaladjpg",
    "price": 238,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenchickenquinoagreeksaladjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbchickenchickenquinoagreeksaladjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 358,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenchickenquinoagreeksaladjpg.png",
      "/local_data/products/themealdbchickenchickenquinoagreeksaladjpg.png",
      "/local_data/products/themealdbchickenchickenquinoagreeksaladjpg.png"
    ]
  },
  {
    "id": "themealdbchickenchickenchorizoricepotjpg",
    "name": "Themealdbchickenchickenchorizoricepotjpg",
    "price": 255,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenchickenchorizoricepotjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbchickenchickenchorizoricepotjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 375,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenchickenchorizoricepotjpg.png",
      "/local_data/products/themealdbchickenchickenchorizoricepotjpg.png",
      "/local_data/products/themealdbchickenchickenchorizoricepotjpg.png"
    ]
  },
  {
    "id": "themealdbchickenjerkchickenwithricepeasjpg",
    "name": "Themealdbchickenjerkchickenwithricepeasjpg",
    "price": 272,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbchickenjerkchickenwithricepeasjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbchickenjerkchickenwithricepeasjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 392,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenjerkchickenwithricepeasjpg.png",
      "/local_data/products/themealdbchickenjerkchickenwithricepeasjpg.png",
      "/local_data/products/themealdbchickenjerkchickenwithricepeasjpg.png"
    ]
  },
  {
    "id": "themealdbchickenpadseeewjpg",
    "name": "Themealdbchickenpadseeewjpg",
    "price": 289,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenpadseeewjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbchickenpadseeewjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 409,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenpadseeewjpg.png",
      "/local_data/products/themealdbchickenpadseeewjpg.png",
      "/local_data/products/themealdbchickenpadseeewjpg.png"
    ]
  },
  {
    "id": "themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg",
    "name": "Themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg",
    "price": 306,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 426,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg.png",
      "/local_data/products/themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg.png",
      "/local_data/products/themealdbchickenpouletrotialalgeriennealgerianroastchickenjpg.png"
    ]
  },
  {
    "id": "themealdbchickenrosolpolishchickensoupjpg",
    "name": "Themealdbchickenrosolpolishchickensoupjpg",
    "price": 323,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbchickenrosolpolishchickensoupjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbchickenrosolpolishchickensoupjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 443,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenrosolpolishchickensoupjpg.png",
      "/local_data/products/themealdbchickenrosolpolishchickensoupjpg.png",
      "/local_data/products/themealdbchickenrosolpolishchickensoupjpg.png"
    ]
  },
  {
    "id": "themealdbchickenthaigreenchickensoupjpg",
    "name": "Themealdbchickenthaigreenchickensoupjpg",
    "price": 340,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenthaigreenchickensoupjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbchickenthaigreenchickensoupjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 460,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenthaigreenchickensoupjpg.png",
      "/local_data/products/themealdbchickenthaigreenchickensoupjpg.png",
      "/local_data/products/themealdbchickenthaigreenchickensoupjpg.png"
    ]
  },
  {
    "id": "themealdbchickenthaigreencurryjpg",
    "name": "Themealdbchickenthaigreencurryjpg",
    "price": 357,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbchickenthaigreencurryjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbchickenthaigreencurryjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 477,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickenthaigreencurryjpg.png",
      "/local_data/products/themealdbchickenthaigreencurryjpg.png",
      "/local_data/products/themealdbchickenthaigreencurryjpg.png"
    ]
  },
  {
    "id": "themealdbchickentomkhagaijpg",
    "name": "Themealdbchickentomkhagaijpg",
    "price": 374,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbchickentomkhagaijpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbchickentomkhagaijpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 494,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbchickentomkhagaijpg.png",
      "/local_data/products/themealdbchickentomkhagaijpg.png",
      "/local_data/products/themealdbchickentomkhagaijpg.png"
    ]
  },
  {
    "id": "themealdbdessertbaklavawithspicednutsricottachocolatejpg",
    "name": "Themealdbdessertbaklavawithspicednutsricottachocolatejpg",
    "price": 391,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertbaklavawithspicednutsricottachocolatejpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbdessertbaklavawithspicednutsricottachocolatejpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 511,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertbaklavawithspicednutsricottachocolatejpg.png",
      "/local_data/products/themealdbdessertbaklavawithspicednutsricottachocolatejpg.png",
      "/local_data/products/themealdbdessertbaklavawithspicednutsricottachocolatejpg.png"
    ]
  },
  {
    "id": "themealdbdessertbeetrootpancakesjpg",
    "name": "Themealdbdessertbeetrootpancakesjpg",
    "price": 408,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertbeetrootpancakesjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbdessertbeetrootpancakesjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 528,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertbeetrootpancakesjpg.png",
      "/local_data/products/themealdbdessertbeetrootpancakesjpg.png",
      "/local_data/products/themealdbdessertbeetrootpancakesjpg.png"
    ]
  },
  {
    "id": "themealdbdessertbleskiverjpg",
    "name": "Themealdbdessertbleskiverjpg",
    "price": 425,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbdessertbleskiverjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbdessertbleskiverjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 545,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertbleskiverjpg.png",
      "/local_data/products/themealdbdessertbleskiverjpg.png",
      "/local_data/products/themealdbdessertbleskiverjpg.png"
    ]
  },
  {
    "id": "themealdbdessertbreadandbutterpuddingjpg",
    "name": "Themealdbdessertbreadandbutterpuddingjpg",
    "price": 442,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertbreadandbutterpuddingjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbdessertbreadandbutterpuddingjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 562,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertbreadandbutterpuddingjpg.png",
      "/local_data/products/themealdbdessertbreadandbutterpuddingjpg.png",
      "/local_data/products/themealdbdessertbreadandbutterpuddingjpg.png"
    ]
  },
  {
    "id": "themealdbdessertchocolategateaujpg",
    "name": "Themealdbdessertchocolategateaujpg",
    "price": 459,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertchocolategateaujpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbdessertchocolategateaujpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 579,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertchocolategateaujpg.png",
      "/local_data/products/themealdbdessertchocolategateaujpg.png",
      "/local_data/products/themealdbdessertchocolategateaujpg.png"
    ]
  },
  {
    "id": "themealdbdessertchocchippecanpiejpg",
    "name": "Themealdbdessertchocchippecanpiejpg",
    "price": 476,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbdessertchocchippecanpiejpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbdessertchocchippecanpiejpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 596,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertchocchippecanpiejpg.png",
      "/local_data/products/themealdbdessertchocchippecanpiejpg.png",
      "/local_data/products/themealdbdessertchocchippecanpiejpg.png"
    ]
  },
  {
    "id": "themealdbdessertchristmascakejpg",
    "name": "Themealdbdessertchristmascakejpg",
    "price": 493,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertchristmascakejpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbdessertchristmascakejpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 613,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertchristmascakejpg.png",
      "/local_data/products/themealdbdessertchristmascakejpg.png",
      "/local_data/products/themealdbdessertchristmascakejpg.png"
    ]
  },
  {
    "id": "themealdbdessertchristmaspuddingflapjackjpg",
    "name": "Themealdbdessertchristmaspuddingflapjackjpg",
    "price": 510,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertchristmaspuddingflapjackjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbdessertchristmaspuddingflapjackjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 630,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertchristmaspuddingflapjackjpg.png",
      "/local_data/products/themealdbdessertchristmaspuddingflapjackjpg.png",
      "/local_data/products/themealdbdessertchristmaspuddingflapjackjpg.png"
    ]
  },
  {
    "id": "themealdbdessertdundeecakejpg",
    "name": "Themealdbdessertdundeecakejpg",
    "price": 527,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbdessertdundeecakejpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbdessertdundeecakejpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 647,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertdundeecakejpg.png",
      "/local_data/products/themealdbdessertdundeecakejpg.png",
      "/local_data/products/themealdbdessertdundeecakejpg.png"
    ]
  },
  {
    "id": "themealdbdessertnanaimobarsjpg",
    "name": "Themealdbdessertnanaimobarsjpg",
    "price": 544,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertnanaimobarsjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbdessertnanaimobarsjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 664,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertnanaimobarsjpg.png",
      "/local_data/products/themealdbdessertnanaimobarsjpg.png",
      "/local_data/products/themealdbdessertnanaimobarsjpg.png"
    ]
  },
  {
    "id": "themealdbdessertnewyorkcheesecakejpg",
    "name": "Themealdbdessertnewyorkcheesecakejpg",
    "price": 561,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertnewyorkcheesecakejpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbdessertnewyorkcheesecakejpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 681,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertnewyorkcheesecakejpg.png",
      "/local_data/products/themealdbdessertnewyorkcheesecakejpg.png",
      "/local_data/products/themealdbdessertnewyorkcheesecakejpg.png"
    ]
  },
  {
    "id": "themealdbdessertnochurnrumraisinicecreamjpg",
    "name": "Themealdbdessertnochurnrumraisinicecreamjpg",
    "price": 578,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbdessertnochurnrumraisinicecreamjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbdessertnochurnrumraisinicecreamjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 698,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertnochurnrumraisinicecreamjpg.png",
      "/local_data/products/themealdbdessertnochurnrumraisinicecreamjpg.png",
      "/local_data/products/themealdbdessertnochurnrumraisinicecreamjpg.png"
    ]
  },
  {
    "id": "themealdbdessertpeartartetatinjpg",
    "name": "Themealdbdessertpeartartetatinjpg",
    "price": 595,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertpeartartetatinjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbdessertpeartartetatinjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 715,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertpeartartetatinjpg.png",
      "/local_data/products/themealdbdessertpeartartetatinjpg.png",
      "/local_data/products/themealdbdessertpeartartetatinjpg.png"
    ]
  },
  {
    "id": "themealdbdessertstrawberriesromanoffjpg",
    "name": "Themealdbdessertstrawberriesromanoffjpg",
    "price": 612,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbdessertstrawberriesromanoffjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbdessertstrawberriesromanoffjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 732,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertstrawberriesromanoffjpg.png",
      "/local_data/products/themealdbdessertstrawberriesromanoffjpg.png",
      "/local_data/products/themealdbdessertstrawberriesromanoffjpg.png"
    ]
  },
  {
    "id": "themealdbdessertwhitechocolatecremebruleejpg",
    "name": "Themealdbdessertwhitechocolatecremebruleejpg",
    "price": 629,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbdessertwhitechocolatecremebruleejpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbdessertwhitechocolatecremebruleejpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 749,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbdessertwhitechocolatecremebruleejpg.png",
      "/local_data/products/themealdbdessertwhitechocolatecremebruleejpg.png",
      "/local_data/products/themealdbdessertwhitechocolatecremebruleejpg.png"
    ]
  },
  {
    "id": "themealdbgoatjamaicancurrygoatjpg",
    "name": "Themealdbgoatjamaicancurrygoatjpg",
    "price": 646,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbgoatjamaicancurrygoatjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbgoatjamaicancurrygoatjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 766,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbgoatjamaicancurrygoatjpg.png",
      "/local_data/products/themealdbgoatjamaicancurrygoatjpg.png",
      "/local_data/products/themealdbgoatjamaicancurrygoatjpg.png"
    ]
  },
  {
    "id": "themealdbgoatmbuzichomaroastedgoatjpg",
    "name": "Themealdbgoatmbuzichomaroastedgoatjpg",
    "price": 163,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbgoatmbuzichomaroastedgoatjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbgoatmbuzichomaroastedgoatjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 283,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbgoatmbuzichomaroastedgoatjpg.png",
      "/local_data/products/themealdbgoatmbuzichomaroastedgoatjpg.png",
      "/local_data/products/themealdbgoatmbuzichomaroastedgoatjpg.png"
    ]
  },
  {
    "id": "themealdblambchilligingerlambchopsjpg",
    "name": "Themealdblambchilligingerlambchopsjpg",
    "price": 180,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdblambchilligingerlambchopsjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdblambchilligingerlambchopsjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 300,
    "discount": 15,
    "images": [
      "/local_data/products/themealdblambchilligingerlambchopsjpg.png",
      "/local_data/products/themealdblambchilligingerlambchopsjpg.png",
      "/local_data/products/themealdblambchilligingerlambchopsjpg.png"
    ]
  },
  {
    "id": "themealdblambrigatoniwithfennelsausagesaucejpg",
    "name": "Themealdblambrigatoniwithfennelsausagesaucejpg",
    "price": 197,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdblambrigatoniwithfennelsausagesaucejpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdblambrigatoniwithfennelsausagesaucejpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 317,
    "discount": 15,
    "images": [
      "/local_data/products/themealdblambrigatoniwithfennelsausagesaucejpg.png",
      "/local_data/products/themealdblambrigatoniwithfennelsausagesaucejpg.png",
      "/local_data/products/themealdblambrigatoniwithfennelsausagesaucejpg.png"
    ]
  },
  {
    "id": "themealdblambspanishstyleslowcookedlambshoulderbeansjpg",
    "name": "Themealdblambspanishstyleslowcookedlambshoulderbeansjpg",
    "price": 214,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdblambspanishstyleslowcookedlambshoulderbeansjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdblambspanishstyleslowcookedlambshoulderbeansjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 334,
    "discount": 15,
    "images": [
      "/local_data/products/themealdblambspanishstyleslowcookedlambshoulderbeansjpg.png",
      "/local_data/products/themealdblambspanishstyleslowcookedlambshoulderbeansjpg.png",
      "/local_data/products/themealdblambspanishstyleslowcookedlambshoulderbeansjpg.png"
    ]
  },
  {
    "id": "themealdbmiscellaneousturkeybnhmjpg",
    "name": "Themealdbmiscellaneousturkeybnhmjpg",
    "price": 231,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbmiscellaneousturkeybnhmjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbmiscellaneousturkeybnhmjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 351,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbmiscellaneousturkeybnhmjpg.png",
      "/local_data/products/themealdbmiscellaneousturkeybnhmjpg.png",
      "/local_data/products/themealdbmiscellaneousturkeybnhmjpg.png"
    ]
  },
  {
    "id": "themealdbpastafettucinealfredojpg",
    "name": "Themealdbpastafettucinealfredojpg",
    "price": 248,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbpastafettucinealfredojpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbpastafettucinealfredojpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 368,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbpastafettucinealfredojpg.png",
      "/local_data/products/themealdbpastafettucinealfredojpg.png",
      "/local_data/products/themealdbpastafettucinealfredojpg.png"
    ]
  },
  {
    "id": "themealdbporkcoddledporkwithciderjpg",
    "name": "Themealdbporkcoddledporkwithciderjpg",
    "price": 265,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbporkcoddledporkwithciderjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbporkcoddledporkwithciderjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 385,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkcoddledporkwithciderjpg.png",
      "/local_data/products/themealdbporkcoddledporkwithciderjpg.png",
      "/local_data/products/themealdbporkcoddledporkwithciderjpg.png"
    ]
  },
  {
    "id": "themealdbporkcrispysausagesandgreensjpg",
    "name": "Themealdbporkcrispysausagesandgreensjpg",
    "price": 282,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbporkcrispysausagesandgreensjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbporkcrispysausagesandgreensjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 402,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkcrispysausagesandgreensjpg.png",
      "/local_data/products/themealdbporkcrispysausagesandgreensjpg.png",
      "/local_data/products/themealdbporkcrispysausagesandgreensjpg.png"
    ]
  },
  {
    "id": "themealdbporkhamhockcolcannonjpg",
    "name": "Themealdbporkhamhockcolcannonjpg",
    "price": 299,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbporkhamhockcolcannonjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbporkhamhockcolcannonjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 419,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkhamhockcolcannonjpg.png",
      "/local_data/products/themealdbporkhamhockcolcannonjpg.png",
      "/local_data/products/themealdbporkhamhockcolcannonjpg.png"
    ]
  },
  {
    "id": "themealdbporkjapanesekatsudonjpg",
    "name": "Themealdbporkjapanesekatsudonjpg",
    "price": 316,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbporkjapanesekatsudonjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbporkjapanesekatsudonjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 436,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkjapanesekatsudonjpg.png",
      "/local_data/products/themealdbporkjapanesekatsudonjpg.png",
      "/local_data/products/themealdbporkjapanesekatsudonjpg.png"
    ]
  },
  {
    "id": "themealdbporkraspeballernorwegianpotatodumplingsjpg",
    "name": "Themealdbporkraspeballernorwegianpotatodumplingsjpg",
    "price": 333,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbporkraspeballernorwegianpotatodumplingsjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbporkraspeballernorwegianpotatodumplingsjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 453,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkraspeballernorwegianpotatodumplingsjpg.png",
      "/local_data/products/themealdbporkraspeballernorwegianpotatodumplingsjpg.png",
      "/local_data/products/themealdbporkraspeballernorwegianpotatodumplingsjpg.png"
    ]
  },
  {
    "id": "themealdbporkspaghettiwithspanishflavoursjpg",
    "name": "Themealdbporkspaghettiwithspanishflavoursjpg",
    "price": 350,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbporkspaghettiwithspanishflavoursjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbporkspaghettiwithspanishflavoursjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 470,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkspaghettiwithspanishflavoursjpg.png",
      "/local_data/products/themealdbporkspaghettiwithspanishflavoursjpg.png",
      "/local_data/products/themealdbporkspaghettiwithspanishflavoursjpg.png"
    ]
  },
  {
    "id": "themealdbporkstamppotjpg",
    "name": "Themealdbporkstamppotjpg",
    "price": 367,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbporkstamppotjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbporkstamppotjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 487,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbporkstamppotjpg.png",
      "/local_data/products/themealdbporkstamppotjpg.png",
      "/local_data/products/themealdbporkstamppotjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodescovitchfishjpg",
    "name": "Themealdbseafoodescovitchfishjpg",
    "price": 384,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbseafoodescovitchfishjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbseafoodescovitchfishjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 504,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodescovitchfishjpg.png",
      "/local_data/products/themealdbseafoodescovitchfishjpg.png",
      "/local_data/products/themealdbseafoodescovitchfishjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg",
    "name": "Themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg",
    "price": 401,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 521,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg.png",
      "/local_data/products/themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg.png",
      "/local_data/products/themealdbseafoodfiskesuppecreamynorwegianfishsoupjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodfriedcalamarijpg",
    "name": "Themealdbseafoodfriedcalamarijpg",
    "price": 418,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodfriedcalamarijpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbseafoodfriedcalamarijpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 538,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodfriedcalamarijpg.png",
      "/local_data/products/themealdbseafoodfriedcalamarijpg.png",
      "/local_data/products/themealdbseafoodfriedcalamarijpg.png"
    ]
  },
  {
    "id": "themealdbseafoodgarlickyprawnswithsherryjpg",
    "name": "Themealdbseafoodgarlickyprawnswithsherryjpg",
    "price": 435,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbseafoodgarlickyprawnswithsherryjpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbseafoodgarlickyprawnswithsherryjpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 555,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodgarlickyprawnswithsherryjpg.png",
      "/local_data/products/themealdbseafoodgarlickyprawnswithsherryjpg.png",
      "/local_data/products/themealdbseafoodgarlickyprawnswithsherryjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodmeegorengmamakjpg",
    "name": "Themealdbseafoodmeegorengmamakjpg",
    "price": 452,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodmeegorengmamakjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbseafoodmeegorengmamakjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 572,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodmeegorengmamakjpg.png",
      "/local_data/products/themealdbseafoodmeegorengmamakjpg.png",
      "/local_data/products/themealdbseafoodmeegorengmamakjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodnasilemakjpg",
    "name": "Themealdbseafoodnasilemakjpg",
    "price": 469,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodnasilemakjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbseafoodnasilemakjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 589,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodnasilemakjpg.png",
      "/local_data/products/themealdbseafoodnasilemakjpg.png",
      "/local_data/products/themealdbseafoodnasilemakjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodnoodlebowlsaladjpg",
    "name": "Themealdbseafoodnoodlebowlsaladjpg",
    "price": 486,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbseafoodnoodlebowlsaladjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbseafoodnoodlebowlsaladjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 606,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodnoodlebowlsaladjpg.png",
      "/local_data/products/themealdbseafoodnoodlebowlsaladjpg.png",
      "/local_data/products/themealdbseafoodnoodlebowlsaladjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodportuguesefishstewcaldeiradadepeixejpg",
    "name": "Themealdbseafoodportuguesefishstewcaldeiradadepeixejpg",
    "price": 503,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodportuguesefishstewcaldeiradadepeixejpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbseafoodportuguesefishstewcaldeiradadepeixejpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 623,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodportuguesefishstewcaldeiradadepeixejpg.png",
      "/local_data/products/themealdbseafoodportuguesefishstewcaldeiradadepeixejpg.png",
      "/local_data/products/themealdbseafoodportuguesefishstewcaldeiradadepeixejpg.png"
    ]
  },
  {
    "id": "themealdbseafoodquicksaltpeppersquidjpg",
    "name": "Themealdbseafoodquicksaltpeppersquidjpg",
    "price": 520,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodquicksaltpeppersquidjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbseafoodquicksaltpeppersquidjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 640,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodquicksaltpeppersquidjpg.png",
      "/local_data/products/themealdbseafoodquicksaltpeppersquidjpg.png",
      "/local_data/products/themealdbseafoodquicksaltpeppersquidjpg.png"
    ]
  },
  {
    "id": "themealdbseafoodsaltcodtortillajpg",
    "name": "Themealdbseafoodsaltcodtortillajpg",
    "price": 537,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbseafoodsaltcodtortillajpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbseafoodsaltcodtortillajpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 657,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodsaltcodtortillajpg.png",
      "/local_data/products/themealdbseafoodsaltcodtortillajpg.png",
      "/local_data/products/themealdbseafoodsaltcodtortillajpg.png"
    ]
  },
  {
    "id": "themealdbseafoodthaiprawncurryjpg",
    "name": "Themealdbseafoodthaiprawncurryjpg",
    "price": 554,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbseafoodthaiprawncurryjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbseafoodthaiprawncurryjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 674,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbseafoodthaiprawncurryjpg.png",
      "/local_data/products/themealdbseafoodthaiprawncurryjpg.png",
      "/local_data/products/themealdbseafoodthaiprawncurryjpg.png"
    ]
  },
  {
    "id": "themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg",
    "name": "Themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg",
    "price": 571,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 691,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg.png",
      "/local_data/products/themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg.png",
      "/local_data/products/themealdbsidealgerianbouzgeneberberbreadwithroastedpeppersaucejpg.png"
    ]
  },
  {
    "id": "themealdbsidebriewrappedinprosciuttobriochejpg",
    "name": "Themealdbsidebriewrappedinprosciuttobriochejpg",
    "price": 588,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbsidebriewrappedinprosciuttobriochejpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbsidebriewrappedinprosciuttobriochejpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 708,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidebriewrappedinprosciuttobriochejpg.png",
      "/local_data/products/themealdbsidebriewrappedinprosciuttobriochejpg.png",
      "/local_data/products/themealdbsidebriewrappedinprosciuttobriochejpg.png"
    ]
  },
  {
    "id": "themealdbsidefeteermeshaltetjpg",
    "name": "Themealdbsidefeteermeshaltetjpg",
    "price": 605,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbsidefeteermeshaltetjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbsidefeteermeshaltetjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 725,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidefeteermeshaltetjpg.png",
      "/local_data/products/themealdbsidefeteermeshaltetjpg.png",
      "/local_data/products/themealdbsidefeteermeshaltetjpg.png"
    ]
  },
  {
    "id": "themealdbsidejamaicansteamedcabbagejpg",
    "name": "Themealdbsidejamaicansteamedcabbagejpg",
    "price": 622,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbsidejamaicansteamedcabbagejpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbsidejamaicansteamedcabbagejpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 742,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidejamaicansteamedcabbagejpg.png",
      "/local_data/products/themealdbsidejamaicansteamedcabbagejpg.png",
      "/local_data/products/themealdbsidejamaicansteamedcabbagejpg.png"
    ]
  },
  {
    "id": "themealdbsidekhobzeldaralgeriansemolinabreadjpg",
    "name": "Themealdbsidekhobzeldaralgeriansemolinabreadjpg",
    "price": 639,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbsidekhobzeldaralgeriansemolinabreadjpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbsidekhobzeldaralgeriansemolinabreadjpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 759,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidekhobzeldaralgeriansemolinabreadjpg.png",
      "/local_data/products/themealdbsidekhobzeldaralgeriansemolinabreadjpg.png",
      "/local_data/products/themealdbsidekhobzeldaralgeriansemolinabreadjpg.png"
    ]
  },
  {
    "id": "themealdbsidesesamecucumbersaladjpg",
    "name": "Themealdbsidesesamecucumbersaladjpg",
    "price": 156,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbsidesesamecucumbersaladjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbsidesesamecucumbersaladjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 276,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidesesamecucumbersaladjpg.png",
      "/local_data/products/themealdbsidesesamecucumbersaladjpg.png",
      "/local_data/products/themealdbsidesesamecucumbersaladjpg.png"
    ]
  },
  {
    "id": "themealdbsidevenezuelanarepasjpg",
    "name": "Themealdbsidevenezuelanarepasjpg",
    "price": 173,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbsidevenezuelanarepasjpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbsidevenezuelanarepasjpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 293,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbsidevenezuelanarepasjpg.png",
      "/local_data/products/themealdbsidevenezuelanarepasjpg.png",
      "/local_data/products/themealdbsidevenezuelanarepasjpg.png"
    ]
  },
  {
    "id": "themealdbstarterclamchowderjpg",
    "name": "Themealdbstarterclamchowderjpg",
    "price": 190,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbstarterclamchowderjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbstarterclamchowderjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 310,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbstarterclamchowderjpg.png",
      "/local_data/products/themealdbstarterclamchowderjpg.png",
      "/local_data/products/themealdbstarterclamchowderjpg.png"
    ]
  },
  {
    "id": "themealdbveganveganlasagnajpg",
    "name": "Themealdbveganveganlasagnajpg",
    "price": 207,
    "rating": 4.199999999999999,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbveganveganlasagnajpg.png",
    "category": "Street Food Hits",
    "description": "Experience the elegant taste of Themealdbveganveganlasagnajpg, specially crafted by our executive chefs for the Street Food Hits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 327,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbveganveganlasagnajpg.png",
      "/local_data/products/themealdbveganveganlasagnajpg.png",
      "/local_data/products/themealdbveganveganlasagnajpg.png"
    ]
  },
  {
    "id": "themealdbvegetarianpatatasbravasjpg",
    "name": "Themealdbvegetarianpatatasbravasjpg",
    "price": 224,
    "rating": 4.3,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbvegetarianpatatasbravasjpg.png",
    "category": "Late Night Munchies",
    "description": "Experience the elegant taste of Themealdbvegetarianpatatasbravasjpg, specially crafted by our executive chefs for the Late Night Munchies collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 344,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetarianpatatasbravasjpg.png",
      "/local_data/products/themealdbvegetarianpatatasbravasjpg.png",
      "/local_data/products/themealdbvegetarianpatatasbravasjpg.png"
    ]
  },
  {
    "id": "themealdbvegetarianpistoconhuevosjpg",
    "name": "Themealdbvegetarianpistoconhuevosjpg",
    "price": 241,
    "rating": 4.3999999999999995,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbvegetarianpistoconhuevosjpg.png",
    "category": "Vegetables & Fruits",
    "description": "Experience the elegant taste of Themealdbvegetarianpistoconhuevosjpg, specially crafted by our executive chefs for the Vegetables & Fruits collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 361,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetarianpistoconhuevosjpg.png",
      "/local_data/products/themealdbvegetarianpistoconhuevosjpg.png",
      "/local_data/products/themealdbvegetarianpistoconhuevosjpg.png"
    ]
  },
  {
    "id": "themealdbvegetariansichuaneggplantjpg",
    "name": "Themealdbvegetariansichuaneggplantjpg",
    "price": 258,
    "rating": 4.5,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbvegetariansichuaneggplantjpg.png",
    "category": "Premium Gourmet",
    "description": "Experience the elegant taste of Themealdbvegetariansichuaneggplantjpg, specially crafted by our executive chefs for the Premium Gourmet collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 378,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetariansichuaneggplantjpg.png",
      "/local_data/products/themealdbvegetariansichuaneggplantjpg.png",
      "/local_data/products/themealdbvegetariansichuaneggplantjpg.png"
    ]
  },
  {
    "id": "themealdbvegetarianspicedtortillajpg",
    "name": "Themealdbvegetarianspicedtortillajpg",
    "price": 275,
    "rating": 4.6,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbvegetarianspicedtortillajpg.png",
    "category": "Seafood Specials",
    "description": "Experience the elegant taste of Themealdbvegetarianspicedtortillajpg, specially crafted by our executive chefs for the Seafood Specials collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 395,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetarianspicedtortillajpg.png",
      "/local_data/products/themealdbvegetarianspicedtortillajpg.png",
      "/local_data/products/themealdbvegetarianspicedtortillajpg.png"
    ]
  },
  {
    "id": "themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg",
    "name": "Themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg",
    "price": 292,
    "rating": 4.699999999999999,
    "time": "30 mins",
    "isVeg": true,
    "image": "/local_data/products/themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg.png",
    "category": "Biryani World",
    "description": "Experience the elegant taste of Themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg, specially crafted by our executive chefs for the Biryani World collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 412,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg.png",
      "/local_data/products/themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg.png",
      "/local_data/products/themealdbvegetarianstovetopeggplantwithharissachickpeasandcuminyogurtjpg.png"
    ]
  },
  {
    "id": "themealdbvegetariansummerpistoujpg",
    "name": "Themealdbvegetariansummerpistoujpg",
    "price": 309,
    "rating": 4.8,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbvegetariansummerpistoujpg.png",
    "category": "North Indian Spice",
    "description": "Experience the elegant taste of Themealdbvegetariansummerpistoujpg, specially crafted by our executive chefs for the North Indian Spice collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 429,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetariansummerpistoujpg.png",
      "/local_data/products/themealdbvegetariansummerpistoujpg.png",
      "/local_data/products/themealdbvegetariansummerpistoujpg.png"
    ]
  },
  {
    "id": "themealdbvegetarianthairicenoodlesaladjpg",
    "name": "Themealdbvegetarianthairicenoodlesaladjpg",
    "price": 326,
    "rating": 4.1,
    "time": "30 mins",
    "isVeg": false,
    "image": "/local_data/products/themealdbvegetarianthairicenoodlesaladjpg.png",
    "category": "South Indian Tiffins",
    "description": "Experience the elegant taste of Themealdbvegetarianthairicenoodlesaladjpg, specially crafted by our executive chefs for the South Indian Tiffins collection. Vibrant and rich.",
    "unit": "1 Portion",
    "mrp": 446,
    "discount": 15,
    "images": [
      "/local_data/products/themealdbvegetarianthairicenoodlesaladjpg.png",
      "/local_data/products/themealdbvegetarianthairicenoodlesaladjpg.png",
      "/local_data/products/themealdbvegetarianthairicenoodlesaladjpg.png"
    ]
  }
];
