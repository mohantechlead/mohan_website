import sliderLogo from '@/assets/img/slider-logo.png'

export const presentationMeta = {
  title: 'Powering Ethiopia\'s Industrial Future',
  subtitle: 'Mohan Group · Products & DDFTZ'
}

export const slides = [
  {
    id: 'logo-splash',
    type: 'logo-splash',
    section: 'intro',
    logo: sliderLogo,
    title: 'Mohan Group of Companies',
    tagline: 'Powering Ethiopia\'s Industrial Future'
  },
  {
    id: 'company-intro',
    type: 'company-intro',
    section: 'intro',
    eyebrow: 'Mohan Group of Companies',
    title: 'Built on Legacy, Designed for Tomorrow',
    subtitle:
      'Founded by Mayur Suryakant Kothari, Mohan Group is one of Ethiopia\'s most respected industrial groups — operating across polymer manufacturing, footwear, trading, and free zone logistics.',
    image: '/slider-1.jpg',
    logo: sliderLogo,
    pillars: [
      { name: 'Mohan PLC', tag: 'Manufacturing', image: '/slider-3.jpg' },
      { name: 'Mohan International', tag: 'Trading', image: '/mohan_int.jpg' },
      { name: 'Vina Trade & Industry', tag: 'Footwear', image: '/vina-2.png' },
      { name: 'Mohan Wire Industries', tag: 'Hardware', image: '/wire-2.jpg' }
    ],
    facts: [
      { value: '30+', label: 'Years of legacy' },
      { value: '7', label: 'Manufacturing units' },
      { value: '1', label: 'Trading unit' },
      { value: '1st', label: 'FTZ operator in Ethiopia' }
    ]
  },
  {
    id: 'section-products',
    type: 'section',
    section: 'products',
    chapter: '01',
    title: 'Our Products',
    subtitle: 'Compounds, footwear, resins, and industrial hardware manufactured and distributed across Ethiopia.',
    accent: 'amber',
    image: '/slider-3.jpg'
  },
  {
    id: 'product-portfolio',
    type: 'product-analytics',
    section: 'products',
    eyebrow: 'Product Portfolio',
    title: 'Complete Industrial Product Range',
    donut: {
      title: 'Product Mix by Category',
      segments: [
        { label: 'Polymer Compounds', value: 28, color: '#f59e0b' },
        { label: 'Masterbatches', value: 18, color: '#0ea5e9' },
        { label: 'Footwear', value: 24, color: '#10b981' },
        { label: 'Trading Resins', value: 20, color: '#8b5cf6' },
        { label: 'Wire & Hardware', value: 10, color: '#94a3b8' }
      ]
    },
    metrics: [
      { label: 'EVA Grades', value: 95, color: '#f59e0b' },
      { label: 'PVC Applications', value: 90, color: '#0ea5e9' },
      { label: 'Footwear Output', value: 92, color: '#10b981' },
      { label: 'Resin Stock Depth', value: 88, color: '#8b5cf6' }
    ],
    lineChart: {
      title: 'Output Growth Index',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      series: [
        { label: 'Compounds', values: [62, 68, 74, 82, 90, 96], color: '#f59e0b' },
        { label: 'Footwear', values: [55, 60, 72, 78, 86, 92], color: '#10b981' }
      ]
    },
    vBars: {
      title: 'Division Output Share',
      items: [
        { label: 'Polymers', value: 88, color: '#f59e0b' },
        { label: 'Footwear', value: 82, color: '#10b981' },
        { label: 'Trading', value: 76, color: '#8b5cf6' },
        { label: 'Wire', value: 68, color: '#94a3b8' }
      ]
    },
    products: [
      { name: 'EVA Compounds', image: '/eva-1.jpg', stat: '2006 Pioneer' },
      { name: 'Masterbatches', image: '/presentation/masterbatch-pellets.png', stat: 'Color & Filler' },
      { name: 'Deer Footwear', image: '/vina-2.png', stat: 'Market Leader' },
      { name: 'PVC Products', image: '/presentation/plastic-chairs.png', stat: 'Injection Molded' }
    ]
  },
  {
    id: 'production-dashboard',
    type: 'chart-dashboard',
    section: 'products',
    eyebrow: 'Analytics',
    title: 'Production & Capacity Dashboard',
    subtitle: 'Real-time view of output mix, growth trends, and division performance across Mohan Group.',
    donut: {
      title: 'Revenue Mix by Division',
      segments: [
        { label: 'Mohan PLC', value: 42, color: '#f59e0b' },
        { label: 'Vina Footwear', value: 28, color: '#10b981' },
        { label: 'Mohan Intl.', value: 22, color: '#8b5cf6' },
        { label: 'Wire Industries', value: 8, color: '#94a3b8' }
      ]
    },
    lineChart: {
      title: 'Capacity Utilization Trend',
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'],
      series: [
        { label: 'Manufacturing', values: [72, 78, 84, 88, 91, 95], color: '#f59e0b' },
        { label: 'Logistics', values: [65, 70, 76, 82, 87, 92], color: '#0ea5e9' }
      ]
    },
    vBars: {
      title: 'Plant Utilization',
      items: [
        { label: 'EVA', value: 94, color: '#f59e0b' },
        { label: 'PVC', value: 88, color: '#0ea5e9' },
        { label: 'MB', value: 86, color: '#10b981' },
        { label: 'Shoes', value: 92, color: '#8b5cf6' },
        { label: 'Wire', value: 78, color: '#94a3b8' }
      ]
    },
    hBars: {
      title: 'Quality & Delivery KPIs',
      items: [
        { label: 'On-Time Delivery', value: 93, color: '#10b981' },
        { label: 'Defect Rate (inv.)', value: 97, color: '#f59e0b' },
        { label: 'Customer Retention', value: 89, color: '#0ea5e9' }
      ]
    },
    images: [
      { src: '/slider-3.jpg', caption: 'Mohan PLC manufacturing' },
      { src: '/eva-1.jpg', caption: 'EVA compound production' },
      { src: '/presentation/masterbatch-pellets.png', caption: 'Masterbatch & polymers', contain: true }
    ]
  },
  {
    id: 'masterbatch-showcase',
    type: 'product-showcase',
    section: 'products',
    eyebrow: 'Mohan PLC',
    title: 'Color & Filler Masterbatches',
    body: 'Premium color masterbatches and filler systems for PE, PP, and PVC converters — consistent dispersion, vibrant finishes, and cost-effective production.',
    image: '/presentation/masterbatch-pellets.png',
    contain: true,
    tags: ['Color MB', 'Filler MB', 'Fluorescent', 'UV-Resistant'],
    specs: [
      { label: 'Color Consistency', value: 95 },
      { label: 'Dispersion Quality', value: 92 },
      { label: 'Converter Grades', value: 90 }
    ],
    vBars: {
      title: 'Grade Distribution',
      items: [
        { label: 'Color', value: 92, color: '#f59e0b' },
        { label: 'Filler', value: 88, color: '#0ea5e9' },
        { label: 'White', value: 85, color: '#e2e8f0' },
        { label: 'Black', value: 80, color: '#64748b' }
      ]
    },
    lineChart: {
      title: 'Monthly MB Output',
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      series: [
        { label: 'Tons', values: [120, 135, 148, 162, 175, 190], color: '#0ea5e9' }
      ]
    },
    figures: [
      { value: '1st', label: 'Filler MB in Ethiopia' },
      { value: 'PE/PP/PVC', label: 'Applications' }
    ]
  },
  {
    id: 'compounds',
    type: 'product-detail',
    section: 'products',
    eyebrow: 'Mohan PLC',
    title: 'EVA, PVC & Rubber Compounds',
    body: 'First EVA compound manufacturer in Ethiopia. Custom formulations for footwear, automotive, cables, pipes, and construction.',
    image: '/eva-1.jpg',
    contain: false,
    gallery: ['/presentation/eva-sheets.png', '/eva-2.jpg', '/pvc-1.jpg', '/pvc-2.jpg'],
    applications: [
      { label: 'Footwear & Soles', value: 96 },
      { label: 'Pipes & Cables', value: 88 },
      { label: 'Automotive Parts', value: 82 },
      { label: 'Construction Profiles', value: 85 }
    ],
    figures: [
      { value: '2006', label: 'EVA launch year' },
      { value: '100%', label: 'Import substitution focus' }
    ]
  },
  {
    id: 'eva-sheets-showcase',
    type: 'product-showcase',
    section: 'products',
    eyebrow: 'Mohan PLC',
    title: 'EVA & Rubber Sheets',
    body: 'Multi-color EVA and rubber sheets for footwear, construction expansion joints, and industrial applications — produced with consistent quality and custom grades.',
    image: '/presentation/eva-sheets.png',
    contain: true,
    tags: ['EVA Sheets', 'Rubber Sheets', 'Expansion Joints', 'Custom Colors'],
    specs: [
      { label: 'Footwear Grade', value: 94 },
      { label: 'Construction Use', value: 88 },
      { label: 'Color Range', value: 92 }
    ],
    figures: [
      { value: 'Multi', label: 'Color options' },
      { value: 'Local', label: 'Made in Ethiopia' }
    ]
  },
  {
    id: 'injection-showcase',
    type: 'product-showcase',
    section: 'products',
    eyebrow: 'Mohan PLC',
    title: 'Injection Molded PVC Products',
    body: 'Durable injection-molded household and furniture products from PVC compounds — chairs, components, and industrial molded goods for local markets.',
    image: '/presentation/plastic-chairs.png',
    contain: true,
    tags: ['PVC Chairs', 'Household', 'Furniture', 'Injection Molding'],
    specs: [
      { label: 'Durability', value: 90 },
      { label: 'Volume Capacity', value: 88 },
      { label: 'Color Options', value: 85 }
    ],
    vBars: {
      title: 'Product Mix',
      items: [
        { label: 'Chairs', value: 90, color: '#f59e0b' },
        { label: 'Tables', value: 72, color: '#0ea5e9' },
        { label: 'Parts', value: 68, color: '#10b981' },
        { label: 'Custom', value: 55, color: '#8b5cf6' }
      ]
    },
    lineChart: {
      title: 'Injection Volume Trend',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      series: [
        { label: 'Units (K)', values: [45, 52, 61, 74, 88, 102], color: '#f59e0b' }
      ]
    },
    figures: [
      { value: 'PVC', label: 'Compound-based' },
      { value: 'Local', label: 'Production' }
    ]
  },
  {
    id: 'footwear',
    type: 'product-detail',
    section: 'products',
    eyebrow: 'Vina & Mohan PLC',
    title: 'Footwear & Finished Goods',
    body: 'Deer brand flip-flops dominate the Ethiopian market. Mohan PLC produces canvas, sneakers, safety boots, and export-oriented footwear with full vertical linkage.',
    image: '/footwear-2.png',
    contain: false,
    gallery: ['/vina-2.png', '/presentation/gumboots.png', '/footwear-3.png', '/vina-3.jpg'],
    applications: [
      { label: 'Flip-flops (Deer)', value: 95 },
      { label: 'Canvas & Sneakers', value: 85 },
      { label: 'EVA / Rubber Sheets', value: 78 },
      { label: 'Rubber Components', value: 80 }
    ],
    figures: [
      { value: 'Deer', label: 'Trusted brand' },
      { value: '2014', label: 'Footwear vertical' }
    ]
  },
  {
    id: 'safety-footwear',
    type: 'product-showcase',
    section: 'products',
    eyebrow: 'Industrial Footwear',
    title: 'Safety Boots & Gumboots',
    body: 'Steel-toe safety boots and industrial gumboots engineered for construction, manufacturing, and heavy-duty environments — waterproof, anti-skid, and shock-absorbing.',
    image: '/presentation/gumboots.png',
    contain: true,
    secondaryImage: '/presentation/safety-boot-features.png',
    tags: ['Steel Toe', 'Waterproof', 'Anti-Skid', 'Shock Absorption'],
    specs: [
      { label: 'Toe Protection', value: 96 },
      { label: 'Water Resistance', value: 94 },
      { label: 'Grip & Safety', value: 92 }
    ],
    vBars: {
      title: 'Safety Rating',
      items: [
        { label: 'Toe', value: 96, color: '#f59e0b' },
        { label: 'Grip', value: 92, color: '#10b981' },
        { label: 'Water', value: 94, color: '#0ea5e9' },
        { label: 'Shock', value: 90, color: '#8b5cf6' }
      ]
    },
    lineChart: {
      title: 'Safety Boot Sales',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      series: [
        { label: 'Pairs (K)', values: [18, 24, 32, 41, 52, 64], color: '#10b981' }
      ]
    },
    figures: [
      { value: 'PVC', label: 'Industrial grade' },
      { value: 'Safe', label: 'Workplace ready' }
    ]
  },
  {
    id: 'product-gallery',
    type: 'product-gallery',
    section: 'products',
    eyebrow: 'Product Range',
    title: 'Full Industrial Product Spectrum',
    subtitle: 'From raw compounds and masterbatches to finished footwear, furniture, and hardware.',
    donut: {
      title: 'Portfolio Split',
      segments: [
        { label: 'Polymers', value: 32, color: '#f59e0b' },
        { label: 'Footwear', value: 28, color: '#10b981' },
        { label: 'Trading', value: 24, color: '#8b5cf6' },
        { label: 'Hardware', value: 16, color: '#94a3b8' }
      ]
    },
    vBars: {
      title: 'Top Sellers',
      items: [
        { label: 'Deer', value: 95, color: '#10b981' },
        { label: 'EVA', value: 88, color: '#f59e0b' },
        { label: 'MB', value: 82, color: '#0ea5e9' },
        { label: 'Wire', value: 76, color: '#94a3b8' }
      ]
    },
    lineChart: {
      title: 'Annual Output Index',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      series: [
        { label: 'Index', values: [70, 76, 82, 88, 94, 100], color: '#fcd34d' }
      ]
    },
    items: [
      { image: '/presentation/masterbatch-pellets.png', title: 'Masterbatches', category: 'Polymers', contain: true },
      { image: '/presentation/eva-sheets.png', title: 'EVA Sheets', category: 'Compounds', contain: true },
      { image: '/eva-1.jpg', title: 'EVA Compounds', category: 'Manufacturing', contain: false },
      { image: '/presentation/plastic-chairs.png', title: 'PVC Furniture', category: 'Injection', contain: true },
      { image: '/presentation/plastic-chair-green.png', title: 'Molded Chairs', category: 'PVC', contain: true },
      { image: '/vina-2.png', title: 'Deer Flip-flops', category: 'Footwear', contain: false },
      { image: '/presentation/gumboots.png', title: 'Gumboots', category: 'Industrial', contain: true },
      { image: '/presentation/safety-boot-features.png', title: 'Safety Boots', category: 'Safety', contain: true },
      { image: '/footwear-2.png', title: 'Footwear Range', category: 'Finished', contain: false },
      { image: '/wire-2.jpg', title: 'Wire & Nails', category: 'Hardware', contain: false },
      { image: '/ddftz/gate-day-night.png', title: 'DDFTZ Gate', category: 'DDFTZ', contain: false }
    ]
  },
  {
    id: 'wire-trading',
    type: 'dual-panel',
    section: 'products',
    eyebrow: 'Trading & Hardware',
    title: 'Resins, Wire & Industrial Inputs',
    panels: [
      {
        title: 'Mohan International — Resins',
        image: '/mohan_int.jpg',
        bars: [
          { label: 'HDPE', value: 90, color: '#f59e0b' },
          { label: 'LDPE / LLDPE', value: 88, color: '#0ea5e9' },
          { label: 'PP & Exceed', value: 85, color: '#10b981' },
          { label: 'PVC & Stabilizers', value: 80, color: '#8b5cf6' }
        ]
      },
      {
        title: 'Mohan Wire — Elephant Brand',
        image: '/wire-2.jpg',
        bars: [
          { label: 'Nails', value: 88, color: '#f59e0b' },
          { label: 'Barbed Wire', value: 85, color: '#94a3b8' },
          { label: 'Binding Wire', value: 82, color: '#0ea5e9' },
          { label: 'Hardware Range', value: 78, color: '#10b981' }
        ],
        images: ['/wire-1.jpg', '/2.jpg']
      }
    ]
  },
  {
    id: 'product-markets',
    type: 'market-chart',
    section: 'products',
    eyebrow: 'Applications',
    title: 'Where Our Products Go',
    subtitle: 'End-market distribution across Ethiopia\'s growing industrial sectors.',
    donut: {
      segments: [
        { label: 'Footwear', value: 38, color: '#f59e0b' },
        { label: 'Packaging', value: 22, color: '#0ea5e9' },
        { label: 'Construction', value: 18, color: '#10b981' },
        { label: 'Automotive', value: 12, color: '#8b5cf6' },
        { label: 'Industrial', value: 10, color: '#94a3b8' }
      ]
    },
    vBars: {
      title: 'Sector Demand Index',
      items: [
        { label: 'Footwear', value: 95, color: '#f59e0b' },
        { label: 'Packaging', value: 82, color: '#0ea5e9' },
        { label: 'Construction', value: 78, color: '#10b981' },
        { label: 'Auto', value: 65, color: '#8b5cf6' }
      ]
    },
    lineChart: {
      title: 'Market Growth Forecast',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        { label: 'Ethiopia', values: [60, 68, 75, 82, 90, 98], color: '#f59e0b' },
        { label: 'Export', values: [40, 48, 55, 62, 70, 78], color: '#0ea5e9' }
      ]
    },
    images: [
      { src: '/presentation/masterbatch-pellets.png', caption: 'Packaging & polymers', contain: true },
      { src: '/presentation/plastic-chairs.png', caption: 'Construction & household', contain: true },
      { src: '/presentation/gumboots.png', caption: 'Industrial safety', contain: true },
      { src: '/wire-2.jpg', caption: 'Wire & hardware', contain: false }
    ]
  },
  {
    id: 'section-ddftz',
    type: 'section',
    section: 'ddftz',
    chapter: '02',
    title: 'DDFTZ Operations',
    subtitle: 'Mohan PLC — Ethiopia\'s first licensed Free Zone Operator at the Dire Dawa Free Trade Zone.',
    accent: 'sky',
    image: '/ddftz/gate-day-night.png'
  },
  {
    id: 'ddftz-gate',
    type: 'ddftz-hero',
    section: 'ddftz',
    eyebrow: 'Dire Dawa Free Trade Zone',
    title: 'Ethiopia\'s Gateway to Global Trade',
    body: 'First licensed Free Zone Operator in Ethiopia. Mohan PLC operates at the landmark Dire Dawa Free Trade Zone entrance — connecting international supply to Ethiopian industry.',
    image: '/ddftz/gate-day-night.png',
    stats: [
      { value: 1, suffix: 'st', label: 'Licensed FTZ operator' },
      { value: 1, suffix: '', label: 'Third-country trade pioneer' },
      { value: 24, suffix: '/7', label: 'Logistics capability' }
    ]
  },
  {
    id: 'ddftz-infrastructure',
    type: 'ddftz-visual',
    section: 'ddftz',
    eyebrow: 'Zone Infrastructure',
    title: 'Built for Industrial Scale',
    body: 'Modern warehouse facilities and container logistics within the Free Zone support high-volume polymer and industrial material throughput.',
    image: '/ddftz/warehouse-yard.png',
    figures: [
      { value: 'MSC', label: 'Global shipping links' },
      { value: 'Zone', label: 'Dedicated warehousing' }
    ],
    bars: [
      { label: 'Warehouse Capacity', value: 90, color: '#10b981' },
      { label: 'Container Handling', value: 88, color: '#f59e0b' },
      { label: 'Site Development', value: 85, color: '#0ea5e9' }
    ]
  },
  {
    id: 'ddftz-logistics',
    type: 'ddftz-visual',
    section: 'ddftz',
    eyebrow: 'Active Logistics',
    title: 'Container Loading & Fulfillment',
    body: 'Forklift operations and container loading at DDFTZ move polymer resins and industrial sacks from global supply into Ethiopian manufacturing.',
    image: '/ddftz/forklift-loading.png',
    figures: [
      { value: 'Fast', label: 'Near-shore fulfillment' },
      { value: 'Bulk', label: 'Industrial cargo' }
    ],
    bars: [
      { label: 'Loading Speed', value: 92, color: '#f59e0b' },
      { label: 'Order Turnaround', value: 88, color: '#0ea5e9' },
      { label: 'Cargo Throughput', value: 85, color: '#10b981' }
    ]
  },
  {
    id: 'ddftz-warehouse',
    type: 'ddftz-visual',
    section: 'ddftz',
    eyebrow: 'Buffer Stock',
    title: 'High-Capacity Warehouse Storage',
    body: 'Stacked industrial inventories within the Free Zone provide supply chain resilience and rapid fulfillment for Mohan Group and partner industries.',
    image: '/ddftz/warehouse-interior.png',
    figures: [
      { value: '24/7', label: 'Stock availability' },
      { value: 'Bulk', label: 'Resin & chemical storage' }
    ],
    bars: [
      { label: 'Inventory Depth', value: 95, color: '#8b5cf6' },
      { label: 'Supply Resilience', value: 90, color: '#10b981' },
      { label: 'Fulfillment Readiness', value: 88, color: '#f59e0b' }
    ]
  },
  {
    id: 'ddftz-advantages',
    type: 'ddftz-metrics',
    section: 'ddftz',
    eyebrow: 'Partner Value',
    title: 'Strategic Advantages of DDFTZ',
    image: '/ddftz/gate-day-night.png',
    cards: [
      {
        icon: 'globe',
        title: 'Optimized Near-Shoring',
        detail: 'Seamless near-shoring drastically reduces lead times and ensures rapid order fulfillment.',
        metric: '3×',
        metricLabel: 'Faster vs port route'
      },
      {
        icon: 'shield',
        title: 'Supply Chain Resilience',
        detail: 'Robust buffer inventories of essential commodities within the Free Zone.',
        metric: '24/7',
        metricLabel: 'Stock availability'
      },
      {
        icon: 'agility',
        title: 'Operational Agility',
        detail: 'Bridges global supply and local demand with industry-leading turnaround.',
        metric: 'Fast',
        metricLabel: 'Fulfillment benchmark'
      }
    ],
    compareBars: [
      { label: 'Direct Port Import', value: 88 },
      { label: 'Multi-Hub Routing', value: 72 },
      { label: 'Regional Supply', value: 58 },
      { label: 'DDFTZ Near-Shore', value: 32, highlight: true }
    ]
  },
  {
    id: 'ddftz-trends',
    type: 'chart-dashboard',
    section: 'ddftz',
    eyebrow: 'DDFTZ Analytics',
    title: 'Logistics Performance Dashboard',
    subtitle: 'Lead-time reduction, throughput growth, and zone utilization at Dire Dawa Free Trade Zone.',
    donut: {
      title: 'Cargo Type Mix',
      segments: [
        { label: 'Polymer Resins', value: 45, color: '#f59e0b' },
        { label: 'Chemicals', value: 25, color: '#0ea5e9' },
        { label: 'Industrial', value: 20, color: '#10b981' },
        { label: 'Other', value: 10, color: '#94a3b8' }
      ]
    },
    lineChart: {
      title: 'Lead-Time Reduction (Days)',
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      series: [
        { label: 'Port Route', values: [42, 40, 38, 36, 35, 34], color: '#94a3b8' },
        { label: 'DDFTZ Route', values: [28, 22, 18, 14, 11, 8], color: '#10b981' }
      ]
    },
    vBars: {
      title: 'Zone Utilization',
      items: [
        { label: 'Warehouse', value: 92, color: '#10b981' },
        { label: 'Loading', value: 88, color: '#f59e0b' },
        { label: 'Storage', value: 95, color: '#8b5cf6' },
        { label: 'Dispatch', value: 86, color: '#0ea5e9' }
      ]
    },
    hBars: {
      title: 'Partner Satisfaction KPIs',
      items: [
        { label: 'Fulfillment Speed', value: 94, color: '#10b981' },
        { label: 'Stock Availability', value: 96, color: '#f59e0b' },
        { label: 'Cost Efficiency', value: 88, color: '#0ea5e9' }
      ]
    },
    images: [
      { src: '/ddftz/gate-day-night.png', caption: 'DDFTZ main gate' },
      { src: '/ddftz/warehouse-yard.png', caption: 'Warehouse yard logistics' },
      { src: '/ddftz/forklift-loading.png', caption: 'Active fulfillment' }
    ]
  },
  {
    id: 'ddftz-gallery',
    type: 'ddftz-gallery',
    section: 'ddftz',
    eyebrow: 'DDFTZ in Pictures',
    title: 'Operations at Dire Dawa Free Trade Zone',
    images: [
      { src: '/ddftz/gate-day-night.png', caption: 'DDFTZ main gate — day & night operations' },
      { src: '/ddftz/forklift-loading.png', caption: 'Container loading & industrial fulfillment' },
      { src: '/ddftz/warehouse-yard.png', caption: 'Warehouse yard & MSC container logistics' },
      { src: '/ddftz/warehouse-interior.png', caption: 'High-capacity bulk storage facility' }
    ]
  },
  {
    id: 'cta',
    type: 'cta',
    section: 'ddftz',
    eyebrow: 'Partner With Us',
    title: 'Products & DDFTZ — Ready When You Are',
    subtitle: 'Source compounds, footwear, and resins — or leverage DDFTZ near-shoring for faster industrial supply.',
    image: '/ddftz/gate-day-night.png',
    links: [
      { label: 'Contact Our Team', route: '/contact', primary: true },
      { label: 'Explore Products', route: '/mohan-plc', primary: false },
      { label: 'DDFTZ Operations', route: '/ddftz-operations', primary: false }
    ]
  },
  {
    id: 'qr-close',
    type: 'qr-close',
    section: 'intro',
    title: 'Visit Mohan Group Online',
    subtitle: 'Scan the QR code to explore our full website, products, and DDFTZ operations.',
    qr: '/presentation/qr-code.png',
    url: 'https://mohan-group.com/',
    urlLabel: 'mohan-group.com'
  }
]
