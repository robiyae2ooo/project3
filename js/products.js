/**
 * Alibaba Clone - Products & Catalog Data Model
 * Real B2B wholesale dataset with tiered pricing, MOQ, suppliers, and specifications.
 */

const CATEGORIES = [
  {
    id: "electronics",
    name: "Consumer Electronics",
    icon: "bi-laptop",
    featured: true,
    subcategories: [
      { name: "Smart Watches & Bands", count: 480 },
      { name: "TWS Earphones & Audio", count: 620 },
      { name: "Phone Accessories & Chargers", count: 1250 },
      { name: "Drones & RC Tech", count: 210 },
      { name: "Gaming Consoles & Peripherals", count: 340 },
      { name: "Smart Home & IoT Devices", count: 590 }
    ]
  },
  {
    id: "apparel",
    name: "Apparel & Accessories",
    icon: "bi-tag",
    featured: true,
    subcategories: [
      { name: "Men's Hoodies & Streetwear", count: 890 },
      { name: "Women's Activewear & Yoga Sets", count: 1120 },
      { name: "Custom T-Shirts & Polos", count: 2400 },
      { name: "Denim & Jeans Wholesale", count: 530 },
      { name: "Sportswear & Team Jerseys", count: 760 },
      { name: "Outerwear & Down Jackets", count: 410 }
    ]
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: "bi-house-door",
    featured: true,
    subcategories: [
      { name: "Kitchen Utensils & Gadgets", count: 980 },
      { name: "Drinkware & Insulated Tumblers", count: 1450 },
      { name: "Smart LED Lighting & Fixtures", count: 870 },
      { name: "Garden Furniture & Planters", count: 320 },
      { name: "Robotic Vacuums & Cleaning", count: 290 },
      { name: "Home Storage & Organization", count: 640 }
    ]
  },
  {
    id: "machinery",
    name: "Machinery & Industrial",
    icon: "bi-gear-wide-connected",
    featured: true,
    subcategories: [
      { name: "CNC Laser Engravers & Cutters", count: 310 },
      { name: "3D Printers & Filaments", count: 240 },
      { name: "Packaging & Bag Making Machinery", count: 180 },
      { name: "Mini Excavators & Earthmovers", count: 145 },
      { name: "Hydraulic Presses & Metal Lathes", count: 220 },
      { name: "Food Processing Machinery", count: 390 }
    ]
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "bi-stars",
    featured: true,
    subcategories: [
      { name: "Organic Skincare & Serums", count: 1100 },
      { name: "Private Label Cosmetics & Makeup", count: 950 },
      { name: "Professional Hair Styling Tools", count: 430 },
      { name: "Nail Art & Gel Polish Kits", count: 780 },
      { name: "Eco Packaging & Bottles", count: 620 },
      { name: "Electric Facial Massagers & RF", count: 310 }
    ]
  },
  {
    id: "packaging",
    name: "Packaging & Printing",
    icon: "bi-box-seam",
    featured: true,
    subcategories: [
      { name: "Biodegradable Corrugated Boxes", count: 1540 },
      { name: "Stand-Up Pouches with Zipper", count: 920 },
      { name: "Custom Rigid Gift Boxes", count: 680 },
      { name: "Cosmetic Dropper Bottles & Jars", count: 750 },
      { name: "Adhesive Labels & Holograms", count: 430 },
      { name: "Eco Paper Bags & Totes", count: 820 }
    ]
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy & Solar",
    icon: "bi-sun",
    featured: true,
    subcategories: [
      { name: "Tier 1 Monocrystalline Solar Panels", count: 450 },
      { name: "LiFePO4 Lithium Battery Storage", count: 380 },
      { name: "Hybrid Solar Inverters (5kW - 12kW)", count: 290 },
      { name: "Portable Solar Power Stations", count: 510 },
      { name: "Solar Street Lights All-in-One", count: 640 },
      { name: "EV Fast Chargers (Wallbox 22kW)", count: 210 }
    ]
  },
  {
    id: "sports-outdoors",
    name: "Sports & Entertainment",
    icon: "bi-bicycle",
    featured: false,
    subcategories: [
      { name: "Inflatable SUP Paddle Boards", count: 320 },
      { name: "Electric Bikes & Commuter Scooters", count: 540 },
      { name: "Camping Tents & Hiking Gear", count: 470 },
      { name: "Commercial Gym & Fitness Equipment", count: 610 },
      { name: "Golf Accessories & Simulators", count: 190 },
      { name: "Water Sports & Scuba Gear", count: 230 }
    ]
  }
];

const PRODUCTS = [
  {
    id: "alb-1001",
    name: "Factory OEM/ODM Ultra 2 Smartwatch 2.02 Inch AMOLED Screen Waterproof IP68 Wireless Charging Smart Watch with Compass",
    category: "electronics",
    subCategory: "Smart Watches & Bands",
    badge: "Top Ranking #1",
    minOrder: 10,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 10, maxQty: 99, price: 16.50 },
      { minQty: 100, maxQty: 499, price: 14.20 },
      { minQty: 500, maxQty: null, price: 11.90 }
    ],
    rating: 4.9,
    reviewsCount: 428,
    soldCount: "45,000+",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 3,
    samplePrice: 22.00,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Titanium Orange", hex: "#ff6a00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
        { name: "Space Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80" },
        { name: "Silver Starlight", hex: "#e0e0e0", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["49mm Titanium Case"]
    },
    supplier: {
      id: "sup-01",
      name: "Shenzhen Lemfo Smart Technology Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 9,
      verified: true,
      goldSupplier: true,
      responseRate: "99.1%",
      responseTime: "≤1h",
      onTimeDelivery: "99.5%",
      transactions: "1,200+ orders / $2.8M+",
      staff: "150-200 People",
      floorSpace: "12,000 m²",
      certifications: ["ISO9001", "CE", "RoHS", "FCC"]
    },
    customization: [
      "Customized logo (Min. order: 100 Pieces)",
      "Customized packaging (Min. order: 500 Pieces)",
      "Custom Firmware/App (Min. order: 1,000 Pieces)"
    ],
    specifications: {
      "Display Type": "2.02 Inch AMOLED High Resolution (485*520)",
      "Waterproof Level": "IP68 Professional Waterproof",
      "Battery Capacity": "380mAh Lithium Polymer (5-7 days)",
      "Operation System": "Android / iOS Compatible",
      "Main Features": "Bluetooth Call, Heart Rate, NFC, Compass, GPS Track",
      "Warranty": "12 Months"
    },
    shippingMethods: [
      { name: "Air Express (DHL / FedEx)", time: "3-7 business days", pricePerUnit: 3.50 },
      { name: "Alibaba Logistics Air Cargo", time: "8-12 business days", pricePerUnit: 2.10 },
      { name: "Sea Freight DDP (Door to Door)", time: "25-35 business days", pricePerUnit: 0.85 }
    ]
  },
  {
    id: "alb-1002",
    name: "Heavyweight 450GSM French Terry 100% Cotton Oversized Blank Hoodies Custom Puff Print Vintage Acid Wash Unisex Hoodie",
    category: "apparel",
    subCategory: "Men's Hoodies & Streetwear",
    badge: "Verified Manufacturer",
    minOrder: 20,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 20, maxQty: 99, price: 14.80 },
      { minQty: 100, maxQty: 499, price: 12.50 },
      { minQty: 500, maxQty: null, price: 9.80 }
    ],
    rating: 4.8,
    reviewsCount: 310,
    soldCount: "82,000+",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 5,
    samplePrice: 28.00,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Washed Vintage Charcoal", hex: "#333333", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80" },
        { name: "Oatmeal Cream", hex: "#ded6c9", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80" },
        { name: "Dusty Olive Green", hex: "#556b2f", image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"]
    },
    supplier: {
      id: "sup-02",
      name: "Guangzhou Boshi Apparel Garment Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 12,
      verified: true,
      goldSupplier: true,
      responseRate: "98.5%",
      responseTime: "≤2h",
      onTimeDelivery: "98.9%",
      transactions: "2,400+ orders / $4.2M+",
      staff: "300+ People",
      floorSpace: "25,000 m²",
      certifications: ["OEKO-TEX Standard 100", "BSCI", "WRAP", "GOTS"]
    },
    customization: [
      "Custom screen print / puff print / embroidery (Min. 50 pcs)",
      "Custom woven neck tag & hangtags (Min. 100 pcs)",
      "Custom dyed Pantone color (Min. 200 pcs)"
    ],
    specifications: {
      "Fabric Weight": "450-480 GSM Heavy French Terry",
      "Material": "100% Combed Cotton Ring Spun",
      "Technics": "Acid Wash / Garment Dye / Preshrunk",
      "Fit": "Drop Shoulder Oversized Boxy Streetwear Cut",
      "Origin": "Guangdong, China"
    },
    shippingMethods: [
      { name: "Express Door to Door (UPS/DHL)", time: "4-7 business days", pricePerUnit: 4.80 },
      { name: "Air Freight Forwarder", time: "10-14 business days", pricePerUnit: 2.60 },
      { name: "Sea Freight DDP", time: "28-35 business days", pricePerUnit: 1.10 }
    ]
  },
  {
    id: "alb-1003",
    name: "Tier 1 High Efficiency 550W 580W 600W Bifacial N-Type TopCon Monocrystalline Solar Panel Photovoltaic Module for Home & Commercial",
    category: "renewable-energy",
    subCategory: "Tier 1 Monocrystalline Solar Panels",
    badge: "Super September Deal",
    minOrder: 10,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 10, maxQty: 49, price: 68.00 },
      { minQty: 50, maxQty: 199, price: 59.50 },
      { minQty: 200, maxQty: null, price: 52.00 }
    ],
    rating: 4.95,
    reviewsCount: 184,
    soldCount: "120,000+ pcs",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 7,
    samplePrice: 90.00,
    images: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545209567-93717df3d5f1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Bifacial Silver Frame", hex: "#c0c0c0", image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80" },
        { name: "Full Black Architectural", hex: "#111111", image: "https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["550 Watt", "580 Watt TopCon", "600 Watt Ultra"]
    },
    supplier: {
      id: "sup-03",
      name: "Jiangsu SolarTech New Energy Power Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 15,
      verified: true,
      goldSupplier: true,
      responseRate: "99.8%",
      responseTime: "≤30min",
      onTimeDelivery: "100%",
      transactions: "890 orders / $12.5M+",
      staff: "800+ People",
      floorSpace: "120,000 m²",
      certifications: ["TUV Rheinland", "CE", "IEC 61215", "UL 1703", "ISO14001"]
    },
    customization: [
      "Custom junction box & MC4 connector type (Min. 50 pcs)",
      "Custom branded carton and pallet packaging (Min. 100 pcs)",
      "Bespoke frame dimensions (Min. 200 pcs)"
    ],
    specifications: {
      "Cell Type": "N-Type Monocrystalline TopCon 16BB",
      "Module Efficiency": "22.8% Max Peak Efficiency",
      "Dimensions": "2278 x 1134 x 35 mm (28.5 kg)",
      "Glass": "3.2mm Anti-Reflective Tempered Glass",
      "Warranty": "15-Year Product Warranty, 30-Year Linear Power Warranty"
    },
    shippingMethods: [
      { name: "Ocean Freight Container Pallet DDP", time: "25-40 business days", pricePerUnit: 12.00 },
      { name: "Railway Freight to EU (CIF/DDP)", time: "18-24 business days", pricePerUnit: 16.50 }
    ]
  },
  {
    id: "alb-1004",
    name: "Wholesale Double Wall Stainless Steel 40oz Tumbler with Handle Straw Insulated Travel Mug Vacuum Car Coffee Cup BPA Free",
    category: "home-garden",
    subCategory: "Drinkware & Insulated Tumblers",
    badge: "Trending Hot #1",
    minOrder: 24,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 24, maxQty: 99, price: 5.60 },
      { minQty: 100, maxQty: 499, price: 4.80 },
      { minQty: 500, maxQty: null, price: 3.95 }
    ],
    rating: 4.88,
    reviewsCount: 520,
    soldCount: "250,000+ pcs",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 3,
    samplePrice: 12.00,
    images: [
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Matte Cream White", hex: "#f8f5f0", image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80" },
        { name: "Eucalyptus Pastel Green", hex: "#8ca087", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80" },
        { name: "Dusty Rose Pink", hex: "#d8a399", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80" },
        { name: "Midnight Black", hex: "#1f1f1f", image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["30oz (900ml)", "40oz (1200ml)"]
    },
    supplier: {
      id: "sup-04",
      name: "Zhejiang Yongkang Haotian Drinkware Manufacturing Ltd.",
      country: "CN",
      countryName: "China",
      years: 11,
      verified: true,
      goldSupplier: true,
      responseRate: "99.4%",
      responseTime: "≤1h",
      onTimeDelivery: "99.8%",
      transactions: "3,100+ orders / $6.8M+",
      staff: "450 People",
      floorSpace: "38,000 m²",
      certifications: ["FDA Food Grade", "LFGB", "BPA Free", "BSCI"]
    },
    customization: [
      "Laser engraved logo (Min. 48 pcs)",
      "Silk screen / UV 3D color printing (Min. 100 pcs)",
      "Custom color box packaging (Min. 500 pcs)"
    ],
    specifications: {
      "Material": "Inner 304 Food Grade Stainless Steel + Outer 201 SS",
      "Thermal Insulation": "Keeps cold 24h, hot 12h",
      "Feature": "Spill-proof lid with 2-in-1 straw & sip opening",
      "Dishwasher Safe": "Yes, Top Rack Safe"
    },
    shippingMethods: [
      { name: "Air Express Express DDP", time: "5-8 business days", pricePerUnit: 2.20 },
      { name: "Fast Sea Shipping DDP", time: "18-25 business days", pricePerUnit: 0.95 }
    ]
  },
  {
    id: "alb-1005",
    name: "Industrial Fiber Laser Cutting Machine 1500W 2000W 3000W 6000W CNC Sheet Metal Stainless Steel Plate Laser Cutter",
    category: "machinery",
    subCategory: "CNC Laser Engravers & Cutters",
    badge: "Verified Supplier Pro",
    minOrder: 1,
    unit: "Set",
    tieredPricing: [
      { minQty: 1, maxQty: 2, price: 9800.00 },
      { minQty: 3, maxQty: 5, price: 8900.00 },
      { minQty: 6, maxQty: null, price: 8200.00 }
    ],
    rating: 4.96,
    reviewsCount: 96,
    soldCount: "420 sets",
    readyToShip: false,
    tradeAssurance: true,
    fastDispatchDays: 14,
    samplePrice: 9800.00,
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Alibaba Orange & Anthracite", hex: "#ff6a00", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80" },
        { name: "Industrial Blue & White", hex: "#0066cc", image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["1500W (Working Area 3000x1500mm)", "3000W Heavy Duty", "6000W High Speed"]
    },
    supplier: {
      id: "sup-05",
      name: "Shandong Bodor CNC Machine Equipment Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 14,
      verified: true,
      goldSupplier: true,
      responseRate: "99.7%",
      responseTime: "≤15min",
      onTimeDelivery: "99.2%",
      transactions: "540 orders / $8.9M+",
      staff: "600+ Engineers & Techs",
      floorSpace: "65,000 m²",
      certifications: ["CE", "FDA", "ISO9001", "SGS Inspected"]
    },
    customization: [
      "Custom laser power source: Raycus / MAX / IPG",
      "Customized automatic exchange table & rotary axis",
      "Custom OEM body paint & client company logo"
    ],
    specifications: {
      "Laser Source": "Raycus / MAX 1500W-6000W Fiber Laser",
      "Cutting Bed Size": "3000mm x 1500mm (Optional 4000x2000mm)",
      "Max Running Speed": "100m/min High Acceleration",
      "Repeat Position Accuracy": "±0.02mm",
      "Control Software": "CypCut CNC Laser Control System",
      "Warranty": "3 Years Complete Machine Warranty"
    },
    shippingMethods: [
      { name: "Full Container Load (FCL) Ocean Sea Freight", time: "25-45 business days", pricePerUnit: 650.00 }
    ]
  },
  {
    id: "alb-1006",
    name: "TWS Wireless ANC Noise Cancelling Bluetooth 5.4 Earbuds Hi-Fi Spatial Audio Touch Control In-Ear Headphones with Mic",
    category: "electronics",
    subCategory: "TWS Earphones & Audio",
    badge: "Hot Wholesale",
    minOrder: 20,
    unit: "Pairs",
    tieredPricing: [
      { minQty: 20, maxQty: 99, price: 8.90 },
      { minQty: 100, maxQty: 499, price: 7.20 },
      { minQty: 500, maxQty: null, price: 5.85 }
    ],
    rating: 4.82,
    reviewsCount: 390,
    soldCount: "110,000+ pairs",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 2,
    samplePrice: 15.00,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Glacier White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80" },
        { name: "Matte Black", hex: "#181818", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80" },
        { name: "Midnight Navy", hex: "#132742", image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["Standard In-Ear with 3 Ear Tip Sizes"]
    },
    supplier: {
      id: "sup-06",
      name: "Dongguan QCY Audio Acoustic Electronics Ltd.",
      country: "CN",
      countryName: "China",
      years: 10,
      verified: true,
      goldSupplier: true,
      responseRate: "99.0%",
      responseTime: "≤1h",
      onTimeDelivery: "99.6%",
      transactions: "4,200+ orders / $5.4M+",
      staff: "320 People",
      floorSpace: "18,000 m²",
      certifications: ["CE", "RoHS", "FCC", "BQB Bluetooth SIG", "KC"]
    },
    customization: [
      "Laser print logo on charging case & earbuds (Min. 50 pairs)",
      "Custom Bluetooth pairing name & popup animation (Min. 500 pairs)",
      "Retail custom color gift box packaging (Min. 500 pairs)"
    ],
    specifications: {
      "Bluetooth Version": "V5.4 Ultra Low Latency (38ms)",
      "Noise Reduction": "Hybrid Active Noise Cancellation -42dB + ENC Calls",
      "Battery Life": "8h Playtime per Charge / 36h Total with Case",
      "Water Resistance": "IPX5 Sweat & Rain Proof",
      "Driver": "10mm Titanium Composite Diaphragm"
    },
    shippingMethods: [
      { name: "Special Battery Express (FedEx/DHL)", time: "4-7 business days", pricePerUnit: 1.80 },
      { name: "Air Line DDP Including Battery Tax", time: "8-12 business days", pricePerUnit: 1.10 }
    ]
  },
  {
    id: "alb-1007",
    name: "Private Label Natural Vitamin C 20% & Hyaluronic Acid Facial Whitening Anti-Aging Hydrating Collagen Face Serum Skincare",
    category: "beauty",
    subCategory: "Organic Skincare & Serums",
    badge: "Verified Supplier Pro",
    minOrder: 50,
    unit: "Bottles",
    tieredPricing: [
      { minQty: 50, maxQty: 199, price: 3.20 },
      { minQty: 200, maxQty: 999, price: 2.45 },
      { minQty: 1000, maxQty: null, price: 1.80 }
    ],
    rating: 4.91,
    reviewsCount: 460,
    soldCount: "380,000+ bottles",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 3,
    samplePrice: 8.00,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597359-54359d997235?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Amber Dropper Bottle", hex: "#c67c3b", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80" },
        { name: "Frosted Clear Dropper", hex: "#eaeaea", image: "https://images.unsplash.com/photo-1608248597359-54359d997235?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["30ml (1 fl oz)", "50ml Luxury Size"]
    },
    supplier: {
      id: "sup-07",
      name: "Guangzhou Hanxue Cosmetics Biotechnology Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 13,
      verified: true,
      goldSupplier: true,
      responseRate: "98.9%",
      responseTime: "≤2h",
      onTimeDelivery: "99.4%",
      transactions: "1,850+ orders / $3.9M+",
      staff: "220 People",
      floorSpace: "15,000 m² Clean Room GMPC",
      certifications: ["FDA Registered", "GMPC (US/EU)", "ISO22716", "MSDS", "COA"]
    },
    customization: [
      "Custom branded label & dropper cap color (Min. 50 pcs)",
      "Custom formula & scent: Green Tea / Rose / Unscented (Min. 500 pcs)",
      "Bespoke gold foil paper outer packaging box (Min. 500 pcs)"
    ],
    specifications: {
      "Key Ingredients": "20% Sodium Ascorbyl Phosphate (Vitamin C), Botanical Hyaluronic Acid, Vitamin E, Ferulic Acid",
      "Form": "Viscous Golden Dropper Liquid",
      "Skin Type": "Suitable for All Skin Types including Sensitive",
      "Shelf Life": "36 Months (Sealed)",
      "Cruelty Free": "100% Vegan & Cruelty Free Certified"
    },
    shippingMethods: [
      { name: "Cosmetics Air Courier Express", time: "6-9 business days", pricePerUnit: 1.40 },
      { name: "Sea Freight Liquid DDP", time: "25-32 business days", pricePerUnit: 0.50 }
    ]
  },
  {
    id: "alb-1008",
    name: "Custom Logo Luxury Matte Black Rigid Magnetic Closure Cardboard Gift Packaging Box with EVA Foam Insert for Electronics/Cosmetics",
    category: "packaging",
    subCategory: "Custom Rigid Gift Boxes",
    badge: "Verified Manufacturer",
    minOrder: 100,
    unit: "Boxes",
    tieredPricing: [
      { minQty: 100, maxQty: 499, price: 1.85 },
      { minQty: 500, maxQty: 1999, price: 1.35 },
      { minQty: 2000, maxQty: null, price: 0.95 }
    ],
    rating: 4.87,
    reviewsCount: 290,
    soldCount: "600,000+ pcs",
    readyToShip: false,
    tradeAssurance: true,
    fastDispatchDays: 7,
    samplePrice: 20.00,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Matte Black with Gold Hot Stamp", hex: "#111111", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80" },
        { name: "Textured Clean White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80" },
        { name: "Kraft Natural Brown", hex: "#a67b5b", image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["Medium: 22 x 16 x 6.5 cm", "Large: 30 x 22 x 9 cm", "Custom Dimensions"]
    },
    supplier: {
      id: "sup-08",
      name: "Shenzhen Colorwing Printing & Packaging Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 16,
      verified: true,
      goldSupplier: true,
      responseRate: "99.3%",
      responseTime: "≤1h",
      onTimeDelivery: "99.7%",
      transactions: "3,800+ orders / $7.1M+",
      staff: "380 People",
      floorSpace: "32,000 m² Automated Lines",
      certifications: ["FSC Certified", "ISO9001", "RoHS", "SGS Eco-Friendly"]
    },
    customization: [
      "Custom Foil Stamping (Gold / Silver / Holographic)",
      "Embossing / Debossing / Spot UV glossy highlights",
      "Custom Die-Cut EVA Foam / Velvet tray insert"
    ],
    specifications: {
      "Board Material": "1200 GSM Greyboard + 157 GSM Coated Art Paper",
      "Closure": "Strong N52 Hidden Neodymium Magnets",
      "Finishing": "Anti-scratch Matte Lamination",
      "Eco Feature": "100% Recyclable and Biodegradable",
      "Application": "Watches, Jewelry, Perfume, Apparel, Electronics"
    },
    shippingMethods: [
      { name: "Air Freight Forwarder DDP", time: "8-12 business days", pricePerUnit: 0.90 },
      { name: "Ocean Freight Sea Shipping DDP", time: "26-34 business days", pricePerUnit: 0.35 }
    ]
  },
  {
    id: "alb-1009",
    name: "Foldable 1000W Fat Tire Electric Mountain Bike 48V 20Ah Samsung Battery 45km/h Hydraulic Disc Brakes E-Bike with Rear Rack",
    category: "sports-outdoors",
    subCategory: "Electric Bikes & Commuter Scooters",
    badge: "Top Ranking #2",
    minOrder: 2,
    unit: "Units",
    tieredPricing: [
      { minQty: 2, maxQty: 9, price: 620.00 },
      { minQty: 10, maxQty: 49, price: 540.00 },
      { minQty: 50, maxQty: null, price: 475.00 }
    ],
    rating: 4.89,
    reviewsCount: 165,
    soldCount: "6,500+ units",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 5,
    samplePrice: 750.00,
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Stealth Matt Black", hex: "#222222", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop&q=80" },
        { name: "Army Desert Sand", hex: "#c2b280", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80" },
        { name: "Nardo Grey", hex: "#777b7e", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["20 x 4.0 All-Terrain Fat Tires", "26 x 4.0 Full Size Fat Tires"]
    },
    supplier: {
      id: "sup-09",
      name: "Changzhou Samebike Electric Vehicle Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 11,
      verified: true,
      goldSupplier: true,
      responseRate: "99.2%",
      responseTime: "≤1h",
      onTimeDelivery: "99.1%",
      transactions: "1,100+ orders / $6.3M+",
      staff: "280 People",
      floorSpace: "22,000 m²",
      certifications: ["EN15194 (EU Standard)", "CE", "UL 2849", "RoHS"]
    },
    customization: [
      "Custom Frame Decal & Branding (Min. 10 units)",
      "Battery upgrade to 25Ah LG cells (Min. 20 units)",
      "Optional front and rear cargo racks & waterproof pannier bags"
    ],
    specifications: {
      "Motor Power": "1000W High Torque Brushless Rear Hub Motor",
      "Battery": "48V 20Ah Samsung Removable Li-ion Battery",
      "Range": "60-80 km (Pure Electric) / 100-120 km (Pedal Assist)",
      "Brakes": "Dual Front & Rear Hydraulic Disc Brakes (180mm)",
      "Gears": "Shimano 7-Speed Transmission System",
      "Frame Material": "6061 Aerospace Aluminum Alloy"
    },
    shippingMethods: [
      { name: "Special Heavy Ocean DDP to Door (EU/USA)", time: "28-35 business days", pricePerUnit: 95.00 },
      { name: "Train Freight DDP (Europe Direct)", time: "22-28 business days", pricePerUnit: 120.00 }
    ]
  },
  {
    id: "alb-1010",
    name: "10.1 Inch Android 13 4G LTE Rugged Industrial Tablet PC Octa Core 8GB+128GB IP67 Waterproof Barcode Scanner RFID Tablet",
    category: "electronics",
    subCategory: "Smart Home & IoT Devices",
    badge: "Verified Supplier Pro",
    minOrder: 5,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 5, maxQty: 19, price: 165.00 },
      { minQty: 20, maxQty: 99, price: 142.00 },
      { minQty: 100, maxQty: null, price: 125.00 }
    ],
    rating: 4.86,
    reviewsCount: 142,
    soldCount: "18,000+ units",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 3,
    samplePrice: 195.00,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Heavy Duty Yellow & Black", hex: "#e5a93b", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80" },
        { name: "Industrial Dark Grey", hex: "#3b3f46", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["Standard 8GB RAM + 128GB ROM", "With Zebra 1D/2D Barcode Engine", "With UHF RFID 6-Meter Reader"]
    },
    supplier: {
      id: "sup-10",
      name: "Shenzhen Emdoor Information Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 17,
      verified: true,
      goldSupplier: true,
      responseRate: "99.5%",
      responseTime: "≤1h",
      onTimeDelivery: "99.6%",
      transactions: "1,500+ orders / $9.8M+",
      staff: "500+ People",
      floorSpace: "40,000 m²",
      certifications: ["MIL-STD-810G", "IP67", "CE", "FCC", "GMS Android"]
    },
    customization: [
      "Custom boot animation & pre-installed software APK",
      "Laser engraved serial numbers & asset tags",
      "Vehicle charging dock & handstrap accessories"
    ],
    specifications: {
      "Operating System": "Android 13.0 with Google GMS",
      "CPU": "MediaTek MT6789 Octa Core 2.2GHz",
      "Display": "10.1 Inch IPS 1920x1200 800nits Sunlight Readable",
      "Protection": "IP67 Waterproof & Dustproof, 1.22m Drop Resistant",
      "Battery": "10,000mAh Removable Battery with Quick Charge 3.0"
    },
    shippingMethods: [
      { name: "Air Express DHL / UPS", time: "3-6 business days", pricePerUnit: 6.80 },
      { name: "Air Cargo DDP Door to Door", time: "8-12 business days", pricePerUnit: 3.50 }
    ]
  },
  {
    id: "alb-1011",
    name: "Commercial Multifunctional Stand Mixer 7L 10L 15L Stainless Steel Bowl Planetary Dough Kneader Egg Whisk Bakery Machine",
    category: "machinery",
    subCategory: "Food Processing Machinery",
    badge: "Verified Manufacturer",
    minOrder: 2,
    unit: "Units",
    tieredPricing: [
      { minQty: 2, maxQty: 9, price: 185.00 },
      { minQty: 10, maxQty: 49, price: 158.00 },
      { minQty: 50, maxQty: null, price: 135.00 }
    ],
    rating: 4.88,
    reviewsCount: 178,
    soldCount: "12,400+ units",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 4,
    samplePrice: 220.00,
    images: [
      "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Commercial Metallic Silver", hex: "#b5b5b5", image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=800&auto=format&fit=crop&q=80" },
        { name: "Retro Crimson Red", hex: "#990000", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["7 Liters (500W Pure Copper)", "10 Liters Heavy Commercial", "15 Liters Bakery Pro"]
    },
    supplier: {
      id: "sup-11",
      name: "Guangzhou Twothousand Machinery Co., Ltd.",
      country: "CN",
      countryName: "China",
      years: 18,
      verified: true,
      goldSupplier: true,
      responseRate: "99.1%",
      responseTime: "≤1h",
      onTimeDelivery: "99.3%",
      transactions: "2,200+ orders / $7.4M+",
      staff: "340 People",
      floorSpace: "30,000 m²",
      certifications: ["CE", "ETL", "NSF Sanitarian", "ISO9001"]
    },
    customization: [
      "Custom Voltage & Plug (110V US, 220V EU, 240V UK)",
      "Custom Brand Logo on stainless steel body",
      "Extra Dough Hook / Flat Beater / Wire Whip accessories"
    ],
    specifications: {
      "Bowl Capacity": "7L / 10L / 15L SUS304 Food Grade",
      "Motor Power": "500W - 1200W Pure Copper Gear Transmission",
      "Speed": "Stepless Variable Speed with Pulse Mode",
      "Dough Capacity": "Max 1.5kg Flour / 2.5kg Dough per batch",
      "Weight": "16 kg (Heavy Cast Metal Body)"
    },
    shippingMethods: [
      { name: "Air Cargo DDP Door to Door", time: "8-14 business days", pricePerUnit: 28.00 },
      { name: "Sea Freight DDP (Carton Pallet)", time: "25-35 business days", pricePerUnit: 12.50 }
    ]
  },
  {
    id: "alb-1012",
    name: "Wholesale Seamless High Waist Ribbed Yoga Pants Workout Gym Leggings Squat Proof Butt Lift Women Sport Fitness Leggings",
    category: "apparel",
    subCategory: "Women's Activewear & Yoga Sets",
    badge: "Trending Hot #2",
    minOrder: 20,
    unit: "Pieces",
    tieredPricing: [
      { minQty: 20, maxQty: 99, price: 6.90 },
      { minQty: 100, maxQty: 499, price: 5.60 },
      { minQty: 500, maxQty: null, price: 4.40 }
    ],
    rating: 4.93,
    reviewsCount: 580,
    soldCount: "340,000+ pcs",
    readyToShip: true,
    tradeAssurance: true,
    fastDispatchDays: 2,
    samplePrice: 15.00,
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80"
    ],
    variations: {
      colors: [
        { name: "Sage Green", hex: "#9eab97", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80" },
        { name: "Midnight Onyx", hex: "#1c1c1c", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80" },
        { name: "Terracotta Clay", hex: "#c46252", image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=80" },
        { name: "Ocean Teal", hex: "#2b5963", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80" }
      ],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    supplier: {
      id: "sup-12",
      name: "Yiwu Fitlife Activewear Garment Factory",
      country: "CN",
      countryName: "China",
      years: 8,
      verified: true,
      goldSupplier: true,
      responseRate: "99.6%",
      responseTime: "≤30min",
      onTimeDelivery: "99.8%",
      transactions: "4,900+ orders / $5.8M+",
      staff: "200 People",
      floorSpace: "14,000 m² Seamless Knitting Machines",
      certifications: ["OEKO-TEX Standard 100", "BSCI", "SGS Squat Tested"]
    },
    customization: [
      "Custom heat transfer / silicone reflective logo (Min. 50 pcs)",
      "Custom woven waistband & brand care label (Min. 100 pcs)",
      "Bespoke frosted zip lock polybag with logo (Min. 200 pcs)"
    ],
    specifications: {
      "Material": "78% Nylon + 22% Spandex Four-Way Stretch",
      "Fabric Weight": "300 GSM Heavyweight Compression Ribbed",
      "Features": "Anti-Cellulite, Squat-Proof, Moisture Wicking, Butt Scrunch",
      "Care": "Machine wash cold, tumble dry low"
    },
    shippingMethods: [
      { name: "Express Door to Door (DHL/FedEx)", time: "3-6 business days", pricePerUnit: 1.95 },
      { name: "Air Freight Forwarder DDP", time: "8-12 business days", pricePerUnit: 0.95 }
    ]
  }
];

// Helper methods for querying and filtering
const Catalog = {
  getAllProducts() {
    return PRODUCTS;
  },

  getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  },

  getCategories() {
    return CATEGORIES;
  },

  getCategoryById(id) {
    return CATEGORIES.find(c => c.id === id);
  },

  getFeaturedProducts(limit = 8) {
    return PRODUCTS.slice(0, limit);
  },

  getTopRankingProducts(limit = 4) {
    return PRODUCTS.filter(p => p.badge && p.badge.includes("Top Ranking")).slice(0, limit);
  },

  getSuperDeals(limit = 4) {
    return PRODUCTS.filter(p => p.badge && p.badge.includes("Deal") || p.readyToShip).slice(0, limit);
  },

  search({ query, category, minPrice, maxPrice, minOrder, readyToShip, verifiedOnly, sortBy }) {
    let results = [...PRODUCTS];

    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.supplier.name.toLowerCase().includes(q)
      );
    }

    if (category && category !== "all") {
      results = results.filter(p => p.category === category);
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
      const minP = parseFloat(minPrice);
      results = results.filter(p => {
        const lowestPrice = p.tieredPricing[p.tieredPricing.length - 1].price;
        return lowestPrice >= minP;
      });
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
      const maxP = parseFloat(maxPrice);
      results = results.filter(p => {
        const startPrice = p.tieredPricing[0].price;
        return startPrice <= maxP;
      });
    }

    if (minOrder) {
      const moq = parseInt(minOrder, 10);
      results = results.filter(p => p.minOrder <= moq);
    }

    if (readyToShip) {
      results = results.filter(p => p.readyToShip);
    }

    if (verifiedOnly) {
      results = results.filter(p => p.supplier.verified);
    }

    // Sorting
    if (sortBy === "price_asc") {
      results.sort((a, b) => a.tieredPricing[0].price - b.tieredPricing[0].price);
    } else if (sortBy === "price_desc") {
      results.sort((a, b) => b.tieredPricing[0].price - a.tieredPricing[0].price);
    } else if (sortBy === "popularity" || sortBy === "reviews") {
      results.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === "moq_asc") {
      results.sort((a, b) => a.minOrder - b.minOrder);
    }

    return results;
  },

  getUnitPriceForQty(product, quantity) {
    if (!product || !product.tieredPricing || product.tieredPricing.length === 0) return 0;
    const qty = Math.max(quantity, product.minOrder);
    for (const tier of product.tieredPricing) {
      if (tier.maxQty === null || qty <= tier.maxQty) {
        return tier.price;
      }
    }
    return product.tieredPricing[product.tieredPricing.length - 1].price;
  }
};

// Export to window for browser access
if (typeof window !== "undefined") {
  window.CATEGORIES = CATEGORIES;
  window.PRODUCTS = PRODUCTS;
  window.Catalog = Catalog;
}
