import { Director, CustomerReview } from '@/types';

export const COMPANY_INFO = {
  brandName: 'Roshan',
  fullName: 'Roshan Private Limited',
  tagline: 'Precision Polymer Engineering for Modern Living',
  shortTagline: 'Everyday Homeware, Built for Indian Households',
  foundingYear: '2008',
  headquarters: 'Vadodara, Gujarat, India',
  address: 'Plot No. 42-45, GIDC Industrial Estate, Makarpura, Vadodara, Gujarat 390010, India',
  phone: '+91 (0265) 263-8890',
  whatsapp: '+91 98765 43210',
  whatsappRaw: '919876543210',
  email: 'contact@roshan.com',
  b2bEmail: 'sales@roshan.com',
  supportEmail: 'support@roshan.com',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  certifications: ['ISO 9001:2015 Certified', '100% Virgin Grade Polymer', 'BPA-Free Certified', 'Make In India Champion', 'Zero-Defect Quality Standard'],
  stats: [
    { label: 'States & UTs Reached', value: '24+', suffix: 'Across India' },
    { label: 'Monthly Polymer Capacity', value: '650+', suffix: 'Metric Tons' },
    { label: 'Retail & Distribution Partners', value: '12,000+', suffix: 'Active Outlets' },
    { label: 'Precision Injection Moulds', value: '85+', suffix: 'In-House Tooling' },
    { label: 'Products Delivered', value: '18M+', suffix: 'Households Served' },
    { label: 'Clamping Force Range', value: '80T - 950T', suffix: 'Injection Machines' },
  ]
};

export const VISION_MISSION = {
  vision: {
    title: 'Our Vision',
    subtitle: 'Setting India’s Benchmark in Durable, Sustainable Homeware',
    description: 'To become India’s most trusted household essentials and polymer solutions brand, enriching everyday living through uncompromising durability, thoughtful ergonomic design, and environmentally responsible polymer manufacturing.',
    pillars: [
      { title: 'Zero Compromise Durability', desc: 'Engineering products that survive rigorous daily Indian household usage without warping or cracking.' },
      { title: 'Design-First Modern Utility', desc: 'Crafting silhouettes, palettes, and finishes that elevate contemporary bathroom and kitchen aesthetics.' },
      { title: 'Circular & Responsible Polymers', desc: 'Pioneering 100% recyclable virgin polymers and closed-loop manufacturing scrap recycling.' }
    ]
  },
  mission: {
    title: 'Our Mission',
    subtitle: 'Empowering Millions of Homes & Global B2B Partners',
    description: 'To deliver premium-quality, 100% virgin-grade homeware at accessible everyday price points while providing multinational and domestic enterprises with turnkey precision contract manufacturing, custom tooling, and flawless execution.',
    commitments: [
      { title: 'Reliable Supply Chain', desc: 'Consistent nationwide distribution with zero dispatch latency across 24+ Indian states.' },
      { title: 'World-Class Tooling', desc: 'State-of-the-art multi-cavity injection molds engineered to micrometer tolerances.' },
      { title: 'Customer-Centric Innovation', desc: 'Direct feedback loops with homemakers, retailers, and institutional procurement teams.' }
    ]
  }
};

export const MANUFACTURING_DETAILS = {
  title: 'Our Manufacturing Facility',
  subtitle: 'High-Precision Injection Moulding Infrastructure in Vadodara, Gujarat',
  description: 'Spanning over 85,000 square feet in the industrial heartland of Vadodara, Roshan operates cutting-edge automated injection moulding cells, centralized material drying, robotic part extraction, and advanced clean finishing floors.',
  facilitySpecs: [
    {
      title: 'Advanced Machinery',
      value: '28+ High-Precision Units',
      desc: 'Microprocessor-controlled servo-hydraulic injection machines ranging from 80 to 950 tons clamping force, capable of single-shot parts up to 5.2 kg.'
    },
    {
      title: 'Tool Room & CAD/CAM',
      value: 'In-House Precision Tooling',
      desc: 'Equipped with CNC wire-cut EDM, 5-axis vertical machining centers, and mold flow simulation software for rapid development of complex multi-cavity molds.'
    },
    {
      title: 'Material Science Lab',
      value: '100% Virgin Polymer Control',
      desc: 'In-house Melt Flow Index (MFI) testers, Izod impact testers, environmental stress cracking baths, and spectrophotometer color-matching.'
    },
    {
      title: 'Automation & Cleanliness',
      value: 'Class 100,000 Assembly',
      desc: 'Robotic side-entry and 3-axis cartesian pick-and-place robots, automated conveyorized packing, and dust-controlled assembly lines.'
    }
  ],
  processes: [
    { step: '01', name: 'Raw Material Testing', detail: 'Polymer granules checked for purity, moisture content, and chemical compliance before batch blending.' },
    { step: '02', name: 'Precision Injection Moulding', detail: 'Cycle-optimized clamping, temperature-controlled runner systems, and micro-tolerance cavity fills.' },
    { step: '03', name: 'In-Mould Finishing & Foiling', detail: 'Robotic in-mould labelling (IML) and hot-foil heat-transfer printing for scratchproof luxury finishes.' },
    { step: '04', name: 'Stress & Drop Verification', detail: 'Randomized batch sampling subjected to 2-meter drop tests, rim compression, and thermal shock.' },
    { step: '05', name: 'Protective Smart Packaging', detail: 'Automated shrink-wrapping, corrugated master-carton boxing, and barcode lot tracking.' }
  ]
};

export const CAPABILITIES = {
  householdProducts: {
    title: 'Household Plastic Products',
    badge: 'Core Proprietary Brand',
    description: 'We develop, manufacture, and distribute comprehensive ranges of homeware products under our flagship "Roshan" brand, designed specifically for Indian lifestyle needs.',
    categoriesCovered: [
      {
        name: 'Bathroom Ware',
        summary: 'Heavy buckets (16L–25L), deep soaking tubs, non-slip bath stools, precision mugs, self-draining soap trays, and odor-lock swing bins.'
      },
      {
        name: 'Kitchen & Dining Ware',
        summary: 'Unbreakable dinner sets, stackable storage containers, insulated water jugs, spice organizers, and multi-tier prep strainers.'
      },
      {
        name: 'Cleaning Essentials',
        summary: 'Centrifugal spin mops, wide squeegee wipers, flagged dustpan-brush combos, and chemical-resistant industrial spray bottles.'
      },
      {
        name: 'Storage & Organization',
        summary: 'Aesthetic open-weave baskets, modular wardrobe bins, self-watering indoor planters, and unbreakable coat hangers.'
      },
      {
        name: 'Thermal & Hydration Ware',
        summary: 'Double-wall PUF insulated flasks, leak-tight fridge bottles, and stainless steel multi-tier lunch carriers.'
      }
    ],
    qualityFeatures: ['100% Virgin Grade Polymers', 'Heavy Gauge Wall Thickness', 'Non-Fading Masterbatch Color', 'Dishwasher & Freezer Safe']
  },
  contractManufacturing: {
    title: 'Contract Manufacturing & OEM / ODM',
    badge: 'B2B Turnkey Solutions',
    description: 'Roshan is the preferred manufacturing partner for leading FMCG brands, retail conglomerates, hospitality groups, and international importers looking for end-to-end custom plastic manufacturing in India.',
    services: [
      {
        title: 'Custom Product Design & Prototyping',
        desc: 'Comprehensive 3D CAD modeling, mold flow analysis, rapid SLA 3D printing, and functional prototype testing before mold steel cutting.'
      },
      {
        title: 'Mould Design, Tooling & Fabrication',
        desc: 'Hardened P20, H13, and stainless steel mold fabrication with hot runner systems, optimized cycle cooling, and guaranteed 1,000,000+ shot life.'
      },
      {
        title: 'High-Volume Precision Production',
        desc: 'Over 28 high-tonnage machines running 24/7 with automated robotic part extraction, ensuring prompt fulfillment of multi-container export orders.'
      },
      {
        title: 'Private Label Branding & Packaging',
        desc: 'Custom masterbatch Pantone matching, pad printing, screen printing, in-mold labeling (IML), laser etching, and retail-ready packaging design.'
      },
      {
        title: 'Regulatory & Export Compliance',
        desc: 'Full documentation support for US FDA, EU food contact regulations, RoHS certification, and port-side container logistics from Nhava Sheva & Mundra.'
      }
    ],
    b2bHighlights: [
      'Minimum Order Flexibility: From 5,000 units to multi-million part runs',
      'Confidentiality & IP Protection with formal NDAs',
      'Dedicated engineering account managers',
      'Strategic port proximity: 6 hours to Mundra & Hazira ports'
    ]
  }
};

export const DIRECTORS: Director[] = [
  {
    name: 'Shri Roshan Patel',
    title: 'Managing Director & Founder',
    role: 'Executive Vision & Corporate Strategy',
    bio: 'With over 24 years of hands-on leadership in India’s polymer and precision plastics sector, Shri Roshan Patel established Roshan with a vision to democratize luxury homeware. His strategic guidance drives the company’s capital investments, sustainable manufacturing transitions, and multi-state distribution alliances.',
    highlights: ['24+ Years Industry Pioneer', 'Spearheaded 24-state retail expansion', 'Champion of Zero-Waste Polymer Circularity'],
  },
  {
    name: 'Rajesh K. Varma',
    title: 'Director of Technical Operations & Tooling',
    role: 'Injection Moulding & Polymer Engineering',
    bio: 'A mechanical engineering veteran with expertise in precision mold design and robotics automation. Shri Rajesh Varma oversees the 85,000 sq.ft. Vadodara manufacturing plant, supervising tool room precision, cycle time optimizations, and stringent ISO quality assurance protocols across 28 injection moulding lines.',
    highlights: ['Specialist in Multi-Cavity Hot Runner Molds', 'Implemented Robotic Pick-and-Place Cells', 'Six Sigma Quality Champion'],
  },
  {
    name: 'Ananya R. Mehta',
    title: 'Director of Commercial Alliances & Brand Growth',
    role: 'B2B Partnerships & Nationwide Supply Chain',
    bio: 'Holding an MBA in International Supply Chain Management, Ms. Mehta spearheads Roshan’s national retail network, large-format hypermarket vendor contracts, and international contract manufacturing accounts. She is responsible for digital commerce transformation and customer experience excellence.',
    highlights: ['Built 12,000+ Retail Partner Network', 'Expanded B2B OEM Portfolio by 300%', 'Pioneered Direct-to-Consumer Digital Store'],
  }
];

export const CUSTOMERS_REACH = {
  title: 'Where Roshan Reaches',
  subtitle: 'A Network Trusted by Households, Retailers & Global Brands Across India',
  description: 'From our centralized manufacturing hub in Vadodara, Gujarat, Roshan products travel daily to hypermarkets, department stores, traditional general trade retailers, and e-commerce fulfillment hubs across 24 states and union territories.',
  presenceStats: [
    { region: 'Western India', states: 'Gujarat, Maharashtra, Rajasthan, Goa', coverage: '4,500+ Outlets' },
    { region: 'Northern India', states: 'Delhi NCR, Punjab, Haryana, Uttar Pradesh, Uttarakhand', coverage: '3,200+ Outlets' },
    { region: 'Southern India', states: 'Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala', coverage: '2,800+ Outlets' },
    { region: 'Eastern & Central', states: 'Madhya Pradesh, West Bengal, Odisha, Bihar, Chhattisgarh', coverage: '1,500+ Outlets' }
  ],
  clientTypes: [
    { title: 'Modern Trade & Hypermarkets', desc: 'Direct supplier to prominent national supermarket and home store chains.' },
    { title: 'General Retail Stores', desc: 'Present in neighborhood homeware and utensil shops across Tier 1, 2, and 3 cities.' },
    { title: 'OEM Contract Clients', desc: 'Manufacturing customized proprietary plastic products for global FMCG & appliance brands.' },
    { title: 'Hospitality & Institutions', desc: 'Supplying bulk unbreakable tableware, bins, and cleaning essentials to hotel chains and hospitals.' }
  ]
};

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Sunita Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'The Roshan Bloom Bathroom set is truly stunning! The gold foil accent and deep maroon color gave my new bathroom a 5-star hotel feel. More importantly, the plastic is very thick and doesn’t flex even when the bucket is full of water.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Vikas Aggarwal (Home Decors Retailer)',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    comment: 'We have been stocking Roshan products in our retail outlets for 4 years. The quality consistency from their Vadodara plant is exceptional. Customers specifically ask for Roshan buckets and fridge bottles because they simply do not break.',
    date: '1 month ago',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Meenakshi Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'Ordered the Serene Dinner Set and Utility Baskets. Even after multiple dishwasher cycles and turmeric curry exposure, there is zero staining! Fantastic product at a very fair price.',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Amitabh Sen (Procurement Head)',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    comment: 'Roshan handled our OEM contract manufacturing for 50,000 custom storage crates. From mold development to prompt dispatch, their engineering precision was world-class.',
    date: '2 months ago',
    verified: true
  }
];

