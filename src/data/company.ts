import { Director, CustomerReview } from '@/types';

export const COMPANY_INFO = {
  brandName: 'Roshan',
  fullName: 'Roshan Private Limited',
  tagline: 'Precision Polymer Engineering for Modern Living',
  shortTagline: 'Everyday Homeware, Built for Indian Households',
  foundingYear: '2008',
  headquarters: 'Vadodara, Gujarat, India',
  headOffice: '1st Floor, Plot No. 174, Brushellz Industrial Park, Opp GSFC, Dashrath, Vadodara - 391740, Gujarat',
  manufacturingAddress: 'A-2/832 GIDC Estate, Makarpura, Vadodara, Gujarat',
  address: 'Head Office: 1st Floor, Plot No. 174, Brushellz Industrial Park, Opp GSFC, Dashrath, Vadodara - 391740, Gujarat | Plant: A-2/832 GIDC Estate, Makarpura, Vadodara, Gujarat',
  phone: '+91 96621 37795',
  whatsapp: '+91 96621 37795',
  whatsappRaw: '919662137795',
  email: 'contact@roshan.com',
  b2bEmail: 'sales@roshan.com',
  supportEmail: 'support@roshan.com',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  certifications: ['ISO 9001:2015 Certified', '100% Virgin Grade Polymer', 'CSD Approved Quality', 'BPA-Free Certified', 'Make In India Champion'],
  currentPlantArea: '~10,000 sq ft',
  upcomingPlantArea: '~25,000 sq ft',
  machineCount: '7 Injection Moulding Machines',
  stats: [
    { label: 'States & UTs Reached', value: '24+', suffix: 'Across India' },
    { label: 'Injection Moulding Cells', value: '7 Machines', suffix: 'Expanding in Upcoming Months' },
    { label: 'Manufacturing Footprint', value: '~10,000 sq ft', suffix: 'Upcoming ~25,000 sq ft Plant' },
    { label: 'Retail & Distribution Partners', value: '12,000+', suffix: 'Active Outlets' },
    { label: 'Precision Tooling & Moulds', value: '85+', suffix: 'In-House Tooling' },
    { label: 'Households Served', value: '18M+', suffix: 'Pan India Families' },
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
  subtitle: 'Precision Injection Moulding Hub in Makarpura GIDC, Vadodara',
  description: 'Operating from our primary ~10,000 sq ft plant in Makarpura GIDC, Vadodara, with a major ~25,000 sq ft facility expansion underway, Roshan runs 7 high-precision injection moulding machines with immediate scope for fleet expansion in the upcoming months.',
  currentPlant: '~10,000 sq ft',
  upcomingPlant: '~25,000 sq ft',
  machineCount: '7 Units (Fleet Expansion in Progress)',
  headOfficeAddress: '1st Floor, Plot No. 174, Brushellz Industrial Park, Opp GSFC, Dashrath, Vadodara - 391740, Gujarat',
  plantAddress: 'A-2/832 GIDC Estate, Makarpura, Vadodara, Gujarat',
  facilitySpecs: [
    {
      title: 'Injection Moulding Cells',
      value: '7 High-Precision Units',
      desc: 'Presently operating 7 microprocessor-controlled injection moulding machines with planned fleet capacity additions in upcoming months.'
    },
    {
      title: 'Plant Footprint Expansion',
      value: '~10,000 to ~25,000 sq ft',
      desc: 'Current ~10,000 sq ft active manufacturing floor in Makarpura GIDC, scaling rapidly with an upcoming ~25,000 sq ft state-of-the-art facility.'
    },
    {
      title: 'Material Science Lab',
      value: '100% Virgin Polymer Control',
      desc: 'In-house Melt Flow Index (MFI) testers, Izod impact testers, environmental stress cracking baths, and spectrophotometer color-matching.'
    },
    {
      title: 'Tool Room & CAD/CAM',
      value: 'In-House Precision Tooling',
      desc: 'Multi-cavity mold maintenance, precision CNC tooling, and mold flow simulation ensuring zero-defect wall thickness and high cycle rates.'
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
        summary: 'Frosty and Dual Buckets (16L–25L), deep soaking tubs, anti-skid bath stools, Patla bath seats, deluxe & regular mugs, pedal bins, and soap cases.'
      },
      {
        name: 'Household & Cleaning',
        summary: 'Premium cleaning brooms, floor squeegee wipers, dustpans, heavy-duty swing dustbins, cloth clips, garment hangers, and laundry baskets.'
      },
      {
        name: 'Storage & Organization',
        summary: 'Decorative planters (Round, Square, Rectangle), utility ropes, clotheslines, and versatile storage containers.'
      },
      {
        name: 'CSD & Defense Supplies',
        summary: 'Specialized household products tested and listed for Indian Armed Forces Canteen Stores Department (CSD).'
      }
    ],
    qualityFeatures: ['100% Virgin Grade Polymers', 'Heavy Gauge Wall Thickness', 'Non-Fading Masterbatch Color', 'Dishwasher & Freezer Safe']
  },
  contractManufacturing: {
    title: 'Contract Manufacturing & OEM / ODM',
    badge: 'B2B Turnkey Solutions',
    description: 'Roshan is the trusted manufacturing partner for FMCG brands, retail conglomerates, and institutional buyers looking for precision plastic injection moulding in Vadodara, Gujarat.',
    services: [
      {
        title: 'Custom Product Design & Prototyping',
        desc: 'Comprehensive 3D CAD modeling, mold flow analysis, rapid SLA 3D printing, and functional prototype testing before mold steel cutting.'
      },
      {
        title: 'Mould Design, Tooling & Fabrication',
        desc: 'Multi-cavity hardened tool fabrication with hot runner systems, optimized cycle cooling, and high-durability shot life.'
      },
      {
        title: 'High-Precision Injection Production',
        desc: 'Presently 7 injection moulding machines operating in Makarpura GIDC, expanding with an upcoming ~25,000 sq ft modern facility.'
      },
      {
        title: 'Private Label Branding & Packaging',
        desc: 'Custom masterbatch Pantone matching, pad printing, screen printing, in-mold labeling (IML), laser etching, and retail-ready packaging design.'
      },
      {
        title: 'Regulatory & Export Compliance',
        desc: 'Full documentation support for ISO standards, food contact regulations, and port-side container logistics from Mundra & Hazira ports.'
      }
    ],
    b2bHighlights: [
      'Minimum Order Flexibility: From trial pilot batches to multi-thousand carton runs',
      'Confidentiality & IP Protection with formal NDAs',
      'Dedicated engineering and account management',
      'Strategic Gujarat industrial corridor proximity'
    ]
  }
};

export const DIRECTORS: Director[] = [
  {
    name: 'Sahil Navin Bhagtani',
    title: 'Director of Operations & Strategic Expansion',
    role: 'Plant Production, Technology & Capacity Scaling',
    bio: 'Spearheading Roshan’s operational excellence and manufacturing scale, Sahil Navin Bhagtani oversees daily injection moulding plant performance, high-precision tooling cycles, and the active expansion from the ~10,000 sq ft facility to the upcoming ~25,000 sq ft manufacturing hub in Vadodara.',
    highlights: ['Driving ~25,000 sq ft Plant Expansion', 'Optimizing 7 High-Precision Injection Lines', 'CSD & Institutional Supply Integration'],
  },
  {
    name: 'Sangita Jadeja',
    title: 'Director of Commercial Alliances & Corporate Governance',
    role: 'Institutional Partnerships & Brand Management',
    bio: 'Sangita Jadeja leads Roshan’s institutional client partnerships, nationwide wholesale distribution network, and statutory corporate governance. Her unwavering focus on ethical manufacturing and customer satisfaction has established Roshan as a dependable household name across India.',
    highlights: ['Steering Pan-India Wholesale & Retail Distribution', 'Corporate Governance & Quality Assurance Champion', 'Key Institutional & Retail Account Lead'],
  },
  {
    name: 'Navinkumar Thakurdas Bhagtani',
    title: 'Managing Director & Founder',
    role: 'Founding Vision, Polymer Engineering & Tooling Mastery',
    bio: 'With extensive expertise in plastics engineering and precision injection moulding, Navinkumar Thakurdas Bhagtani founded Roshan with a clear mandate: deliver uncompromised durability and virgin polymer quality to Indian households. He guides strategic capital investments, mold design standards, and corporate vision.',
    highlights: ['Pioneer in Polymer Injection Moulding & Tooling', 'Architect of 100% Virgin Polymer Standards', 'Visionary Behind Roshan Industrial Growth'],
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

