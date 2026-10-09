import { Product, Review, Coupon } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Sound Pro ANC Headphones',
    tagline: 'High-Fidelity Studio Sound with Spatial Audio & 45h Battery',
    description: 'Immerse yourself in pure studio-grade acoustics. Engineered with custom 40mm titanium drivers, hybrid active noise cancellation, and ultra-plush memory foam earcups for all-day luxury comfort.',
    category: 'Audio & Wearables',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewCount: 428,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 14,
    colors: [
      { name: 'Matte Obsidian', hex: '#1c1917' },
      { name: 'Silver Mist', hex: '#e2e8f0' },
      { name: 'Champagne Gold', hex: '#d4af37' }
    ],
    badge: 'BESTSELLER',
    tags: ['bestseller', 'trending', 'sale'],
    features: [
      'Active Noise Cancellation up to 42dB attenuation',
      '45-Hour Battery Life with Fast Charge (10 mins = 5 hrs)',
      'Custom 40mm Titanium Composite Drivers',
      'Low latency Bluetooth 5.4 + Hi-Res LDAC Support',
      'Quad beamforming microphones with AI wind reduction'
    ],
    specifications: {
      'Driver Size': '40mm Custom Dynamic',
      'Frequency Response': '10Hz - 40,000Hz',
      'Battery Life': '45 hours (ANC Off) / 38 hours (ANC On)',
      'Weight': '255g',
      'Warranty': '2 Years Replacement Guarantee'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-2',
    name: 'Chronos Sapphire Chronograph Watch',
    tagline: 'Precision Automatic Movement with Italian Saddle Leather',
    description: 'A masterpiece of horological craftsmanship. Features an anti-reflective scratch-resistant sapphire crystal lens, surgical-grade 316L stainless steel casing, and water resistance up to 100 meters.',
    category: 'Fashion',
    price: 12499,
    originalPrice: 16999,
    rating: 4.8,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 9,
    colors: [
      { name: 'Midnight Onyx', hex: '#0f172a' },
      { name: 'Classic Cognac', hex: '#78350f' },
      { name: 'Emerald Forest', hex: '#064e3b' }
    ],
    sizes: ['40mm Case', '42mm Case'],
    badge: 'HOT',
    tags: ['bestseller', 'featured', 'sale'],
    features: [
      'Scratch-proof Double Domed Sapphire Crystal',
      'Japanese Miyota 9015 Automatic Movement',
      '316L Marine-Grade Stainless Steel Casing',
      '10 ATM / 100M Water Resistance',
      'Quick-release interchangeable genuine leather strap'
    ],
    specifications: {
      'Case Diameter': '40mm / 42mm',
      'Case Thickness': '10.8mm',
      'Lug Width': '20mm',
      'Glass': 'Sapphire Crystal with Anti-Reflective Coating',
      'Water Resistance': '100m / 10ATM'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-3',
    name: 'Verve Titanium Polarized Sunglasses',
    tagline: 'Ultra-lightweight Aerospace Titanium with UV400 Clarity',
    description: 'Weighing only 18 grams, the Verve Titanium combines aerospace-grade Japanese titanium with 9-layer polarized lenses to eliminate glare and enhance true color contrast.',
    category: 'Fashion',
    price: 4999,
    originalPrice: 7499,
    rating: 4.7,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 22,
    colors: [
      { name: 'Gunmetal Titanium', hex: '#334155' },
      { name: 'Brushed Gold', hex: '#ca8a04' },
      { name: 'Matte Black', hex: '#18181b' }
    ],
    sizes: ['Standard Medium', 'Wide Fit'],
    badge: 'LIMITED',
    tags: ['trending', 'new'],
    features: [
      'Ultralight Japanese Beta-Titanium Frame (18g)',
      'Category 3 UV400 Polarized Precision Lenses',
      'Oleophobic & Hydrophobic Anti-Smudge Coatings',
      'Hypoallergenic Silicone Nose Pads',
      'Includes Magnetic Hard Leather Folding Case'
    ],
    specifications: {
      'Frame Material': 'Aerospace Beta-Titanium',
      'Lens Type': 'Polarized Triacetate Cellulose (TAC)',
      'UV Protection': '100% UVA/UVB (UV400)',
      'Weight': '18.4g',
      'Frame Width': '142mm'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-4',
    name: 'Nomad Waxed Canvas Weekend Duffle',
    tagline: 'Weatherproof Military Duck Canvas & Full-Grain Leather Accents',
    description: 'Engineered for spontaneous weekend getaways and rugged commutes. Handcrafted from heavy-duty 18oz Scottish waxed cotton canvas with reinforced solid brass hardware and water-resistant YKK Excella zippers.',
    category: 'Fashion',
    price: 6899,
    originalPrice: 9499,
    rating: 4.9,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 11,
    colors: [
      { name: 'Olive Drab', hex: '#3f6212' },
      { name: 'Desert Khaki', hex: '#b45309' },
      { name: 'Charcoal Black', hex: '#27272a' }
    ],
    badge: 'HOT',
    tags: ['bestseller', 'trending'],
    features: [
      '18oz Weather-Resistant Waxed Canvas',
      'Full-Grain Vegetable-Tanned Tuscan Leather Trim',
      'Dedicated Padded 16" Laptop Sleeve & Shoe Compartment',
      'Airport Trolley Pass-Through Sleeve',
      'Solid Antiqued Brass Hardware'
    ],
    specifications: {
      'Capacity': '42 Liters (Airline Carry-On Compliant)',
      'Dimensions': '52cm x 28cm x 26cm',
      'Weight': '1.4kg',
      'Lining': '100% Organic Herringbone Cotton'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-5',
    name: 'Apex Pro Wireless Mechanical Keyboard',
    tagline: 'Gasket-Mounted Hot-Swappable RGB with Aluminum CNC Body',
    description: 'The pinnacle of tactile satisfaction. Custom pre-lubed linear switches, sound-dampening poron foam gasket mount, triple connection modes (2.4G/BT 5.2/Type-C), and a CNC-machined aerospace aluminum chassis.',
    category: 'Electronics',
    price: 8499,
    originalPrice: 11999,
    rating: 4.8,
    reviewCount: 389,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 18,
    colors: [
      { name: 'Space Gray', hex: '#475569' },
      { name: 'Arctic White', hex: '#f8fafc' },
      { name: 'Retro Industrial', hex: '#d97706' }
    ],
    sizes: ['Red Linear (Quiet)', 'Brown Tactile (Bumpy)', 'Blue Clicky'],
    badge: '25% OFF',
    tags: ['bestseller', 'trending'],
    features: [
      'Full CNC Anodized Aluminum Body with Sound Dampening Gaskets',
      'Hot-Swappable 5-Pin Switch Sockets',
      'Per-Key RGB with 22 Dynamic Backlight Modes',
      '4,000mAh Battery (Up to 200 hours backlight-off)',
      'South-Facing LEDs for Cherry Profile Keycap Compatibility'
    ],
    specifications: {
      'Layout': '75% Compact (82 Keys + Multi-Function Knob)',
      'Connectivity': 'Tri-Mode: 2.4GHz Wireless, Bluetooth 5.2, USB-C',
      'Polling Rate': '1,000Hz Ultra-Low Latency',
      'Weight': '1,150g'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-6',
    name: 'Urban Glide Minimal Leather Sneakers',
    tagline: 'Handmade Italian Nappa Leather with Ortholite Memory Insole',
    description: 'Understated luxury for the modern wardrobe. Crafted in small batches from buttery-soft Italian calfskin leather and vulcanized margom rubber soles designed for effortless walking.',
    category: 'Footwear',
    price: 7299,
    originalPrice: 9999,
    rating: 4.8,
    reviewCount: 176,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 15,
    colors: [
      { name: 'Pristine White', hex: '#f8fafc' },
      { name: 'Minimal Cream', hex: '#fef08a' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    badge: 'NEW',
    tags: ['new', 'trending'],
    features: [
      'Buttery Italian Full-Grain Nappa Leather',
      'Breathable Vachetta Calfskin Interior Lining',
      'High-Density OrthoLite® Shock-Absorbing Footbed',
      'Durable Italian Margom Rubber Outsoles',
      'Waxed 100% Organic Cotton Laces'
    ],
    specifications: {
      'Origin': 'Handcrafted in Marche, Italy',
      'Sole Height': '28mm',
      'Construction': 'Stitched Strobel Construction',
      'Care': 'Complimentary Conditioning Wax included'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-7',
    name: 'Lumina Qi Smart Table Lamp & Charger',
    tagline: 'Touch Dimmable Ambient Lighting with 15W Fast Wireless Pad',
    description: 'Transform your nightstand or workspace. Seamless magnetic arm design with 3 light temperature presets, infinite stepless brightness, and integrated Qi wireless charging dock.',
    category: 'Home & Living',
    price: 3799,
    originalPrice: 5499,
    rating: 4.7,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 25,
    colors: [
      { name: 'Matte Ash White', hex: '#f1f5f9' },
      { name: 'Walnut Dark Wood', hex: '#451a03' }
    ],
    badge: '30% OFF',
    tags: ['sale', 'trending'],
    features: [
      '15W Qi-Certified Fast Wireless Charging Base',
      'Flicker-Free Eye Care LED with CRI > 95',
      '3 Color Temperatures (2700K Warm, 4000K Neutral, 6500K Daylight)',
      'Intuitive Smooth Touch Slide Dimming',
      'Auto-Off 30/60 Minute Sleep Timer'
    ],
    specifications: {
      'Power Output': '12W Lamp + 15W Wireless Charger',
      'Luminous Flux': '650 Lumens',
      'Material': 'Anodized Aluminum & Natural Beech Wood',
      'Input': 'USB Type-C (30W Adapter included)'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-8',
    name: 'Ceramic Artisan Pour-Over Dripper Set',
    tagline: 'Hand-thrown Stoneware with Double-Wall Borosilicate Carafe',
    description: 'Brew the ultimate clean cup of specialty coffee. Handcrafted matte stoneware cone with 60-degree internal extraction spirals, paired with a heat-resistant 600ml glass carafe.',
    category: 'Home & Living',
    price: 2199,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 30,
    colors: [
      { name: 'Charcoal Matte', hex: '#262626' },
      { name: 'Speckled Oat', hex: '#e7e5e4' },
      { name: 'Terracotta Rust', hex: '#9a3412' }
    ],
    badge: 'HOT',
    tags: ['bestseller'],
    features: [
      'Hand-thrown High-Fired Japanese Ceramic Cone',
      'Optimal 60° Cone Angle for Perfect Flow Rate',
      '600ml Borosilicate Glass Server with Volume Marks',
      'Thermal Stability prevents temperature drops during brewing',
      'Includes 50 Unbleached Organic Filters'
    ],
    specifications: {
      'Capacity': '1-4 Cups (600ml Server)',
      'Dishwasher Safe': 'Yes',
      'Microwave Safe': 'Carafe Only',
      'Origin': 'Mino Artisan Ware, Japan'
    },
    isFeaturedWheel: true
  },
  {
    id: 'prod-9',
    name: 'Nova Ultra-Slim MagSafe Power Bank',
    tagline: '10,000mAh with 22.5W Fast Charge & Aerospace Aluminum Shell',
    description: 'Thin enough to slip into any pocket while snapped to your smartphone. Equipped with powerful N52 neodymium magnets, bidirectional 20W PD Type-C, and LED digital percentage display.',
    category: 'Electronics',
    price: 2899,
    originalPrice: 4199,
    rating: 4.8,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1609592426815-f5b9cb7b093f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 42,
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Deep Purple', hex: '#581c87' },
      { name: 'Champagne Silver', hex: '#cbd5e1' }
    ],
    badge: '30% OFF',
    tags: ['bestseller', 'sale'],
    features: [
      'Ultra-Strong 15N Magnetic Snap Lock',
      '10,000mAh High-Density Polymer Battery',
      '15W Fast Wireless + 22.5W USB-C PD Wired Output',
      'Precision OLED Real-Time Battery Percentage Screen',
      'Intelligent Multi-Protection Temperature Control'
    ],
    specifications: {
      'Battery Capacity': '10,000mAh / 38.5Wh',
      'Thickness': '12.8mm',
      'Weight': '190g',
      'Ports': '1x USB-C (In/Out), 1x Magnetic Wireless'
    }
  },
  {
    id: 'prod-10',
    name: 'Signature Cashmere Knit Crewneck',
    tagline: 'Grade-A 100% Mongolian Cashmere with Ribbed Trims',
    description: 'Incomparably soft and cloud-like warmth. Spun from long-staple 2-ply Mongolian cashmere yarn that resists pilling and drapes effortlessly with a modern relaxed silhouette.',
    category: 'Fashion',
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 16,
    colors: [
      { name: 'Heather Camel', hex: '#d97706' },
      { name: 'Charcoal Melange', hex: '#334155' },
      { name: 'Forest Spruce', hex: '#14532d' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'LIMITED',
    tags: ['trending', 'new'],
    features: [
      '100% Pure Mongolian Cashmere (15.5 Micron Long-Staple)',
      '2-Ply 12-Gauge Tight Knit resists stretching and pilling',
      'Ribbed Collar, Cuffs, and Hem for tailored drape',
      'Thermoregulating: Breathable yet exceptionally warm',
      'Oeko-Tex Standard 100 Certified Non-Toxic Dye'
    ],
    specifications: {
      'Material': '100% Grade-A Mongolian Cashmere',
      'Fit': 'Modern Classic (True to Size)',
      'Care': 'Hand Wash Cold or Gentle Dry Clean',
      'Weight': '290g'
    }
  },
  {
    id: 'prod-11',
    name: 'Zenith 4K Action Camera Gimbal Kit',
    tagline: '60FPS 4K HDR with 3-Axis Mechanical Stabilization',
    description: 'Capture cinematic action anywhere. Features a 1/1.3-inch ultra-low light sensor, active AI subject tracking, waterproof casing down to 10 meters without a case, and 120fps slow-motion capture.',
    category: 'Electronics',
    price: 24999,
    originalPrice: 32999,
    rating: 4.8,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 8,
    colors: [
      { name: 'Stealth Matte Black', hex: '#18181b' }
    ],
    badge: 'HOT',
    tags: ['bestseller', 'trending'],
    features: [
      '1/1.3" CMOS Sensor with 4K/60fps and 10-bit D-Log M',
      '3-Axis HorizonSteady Mechanical Stabilization',
      'Dual Full-Color Touchscreens (Front & Back)',
      '160-Minute Extreme Temperature Endurance Battery',
      'Includes Magnetic Quick-Release Mount & Tripod'
    ],
    specifications: {
      'Video Resolution': '4K (3840×2160) @ 60/120fps',
      'Still Resolution': '48 Megapixels RAW',
      'Waterproof': '10m without housing',
      'Storage': 'microSD up to 512GB (U3/V30)'
    }
  },
  {
    id: 'prod-12',
    name: 'Aroma Diffuser & Himalayan Salt Lamp',
    tagline: 'Ultrasonic Fine Mist with 100% Natural Pink Salt Crystals',
    description: 'Breathe deeper and sleep soundly. Combines therapeutic Himalayan pink salt crystal ionizing therapy with whisper-quiet ultrasonic aromatherapy and 7 warm relaxing ambient glow modes.',
    category: 'Home & Living',
    price: 2499,
    originalPrice: 3899,
    rating: 4.7,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: 35,
    colors: [
      { name: 'Natural Sand', hex: '#f5f5f4' },
      { name: 'Dark Slate', hex: '#334155' }
    ],
    badge: '35% OFF',
    tags: ['sale'],
    features: [
      'Real Hand-Carved Himalayan Pink Crystal Salt Stones',
      'Ultrasonic Cold Mist diffusion preserves essential oil properties',
      'Whisper Quiet < 20dB operation with auto water shut-off',
      '300ml Water Tank lasts up to 10 hours continuously',
      'Customizable Warm Amber to Sunset Glow Lighting'
    ],
    specifications: {
      'Tank Volume': '300ml',
      'Coverage Area': '300 sq. ft',
      'Salt Weight': '450g Certified Himalayan Salt',
      'Timer Options': '1h / 3h / 6h / Continuous'
    }
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'SURESH20',
    discountPercentage: 20,
    description: '⚡ 20% OFF Entire Order (Festive Special)'
  },
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    description: '🎉 10% OFF First Order'
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    description: '🚚 Free Express Shipping (Waives ₹149 delivery)'
  },
  {
    code: 'FESTIVE500',
    discountFixed: 500,
    minSpend: 2000,
    description: '🎁 Flat ₹500 OFF on orders above ₹2,000'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rajesh Sharma',
    rating: 5,
    date: '2 days ago',
    verified: true,
    productName: 'Aura Sound Pro ANC Headphones',
    comment: 'The soundstage on these headphones blew me away! Better ANC than my previous ₹30k pair. Delivered in just 2 days to Bangalore. Suresh Store packaging was pristine.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-2',
    author: 'Priya Iyer',
    rating: 5,
    date: '5 days ago',
    verified: true,
    productName: 'Chronos Sapphire Watch',
    comment: 'Got this as an anniversary gift for my husband. The sapphire crystal is spotless and the dial catches the light like a luxury timepiece. The weight feels ultra-premium.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-3',
    author: 'Vikram Mehta',
    rating: 5,
    date: '1 week ago',
    verified: true,
    productName: 'Apex Pro Mechanical Keyboard',
    comment: 'The creamy acoustic sound on this keyboard is pure typing bliss. Hot-swapping was effortless. 10/10 shopping experience at Suresh Store!',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'rev-4',
    author: 'Ananya Deshmukh',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    productName: 'Nomad Waxed Canvas Duffle',
    comment: 'Took this bag on a trip to Himachal. Water beads right off the waxed fabric, plenty of space for 4 days of clothes, and the leather handles feel indestructible.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  }
];
