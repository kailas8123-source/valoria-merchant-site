export type Category = 'Apparel' | 'Desk Setup' | 'Wall Art' | 'Creator Kits';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  drop: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  featured?: boolean;
  image: string;
  accent: string;
  colors: string[];
  sizes: string[];
  bullets: string[];
  bundle?: boolean;
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const shippingThreshold = 3499;

export const categories: Category[] = ['Apparel', 'Desk Setup', 'Wall Art', 'Creator Kits'];

export const products: Product[] = [
  {
    id: '1',
    slug: 'night-shift-oversized-tee',
    name: 'Night Shift Oversized Tee',
    category: 'Apparel',
    drop: 'Episode 01',
    tagline: 'Heavy cotton silhouette for ranked nights and LAN finals.',
    description: 'A premium oversized tee with tactical linework, heavyweight cotton, and a sharp dropped-shoulder fit built for all-day competitive comfort.',
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 248,
    stock: 26,
    featured: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    accent: '#ff4655',
    colors: ['Matte Black', 'Smoke Grey', 'Signal White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bullets: ['240 GSM cotton jersey', 'Oversized streetwear fit', 'Soft-touch tactical print', 'Pre-shrunk finish']
  },
  {
    id: '2',
    slug: 'strike-core-hoodie',
    name: 'Strike Core Hoodie',
    category: 'Apparel',
    drop: 'Limited Drop',
    tagline: 'Fleece armor for cold queues, scrims, and travel days.',
    description: 'A heavyweight pullover hoodie with a structured hood, ribbed cuffs, and original competitive graphics inspired by tactical FPS interfaces.',
    price: 5999,
    originalPrice: 7499,
    rating: 4.9,
    reviews: 186,
    stock: 14,
    featured: true,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80',
    accent: '#38d6c4',
    colors: ['Carbon', 'Neon Coral'],
    sizes: ['S', 'M', 'L', 'XL'],
    bullets: ['420 GSM brushed fleece', 'Oversized tactical fit', 'Hidden phone pocket', 'Drop-number sleeve mark']
  },
  {
    id: '3',
    slug: 'command-xl-deskmat',
    name: 'Command XL Deskmat',
    category: 'Desk Setup',
    drop: 'Arena Gear',
    tagline: 'Wide stitched desk mat for high-precision play.',
    description: 'A premium esports desk mat that anchors the setup with a smooth glide surface, stitched edges, and non-slip base.',
    price: 2199,
    rating: 4.7,
    reviews: 162,
    stock: 30,
    featured: true,
    image: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=1200&q=80',
    accent: '#00d1ff',
    colors: ['Midnight Grid', 'Signal Red'],
    sizes: ['900x400mm'],
    bullets: ['Smooth glide finish', 'Anti-slip rubber base', 'Stitched edges', 'Water-resistant surface']
  },
  {
    id: '4',
    slug: 'map-room-poster-set',
    name: 'Map Room Poster Set',
    category: 'Wall Art',
    drop: 'Studio Wall',
    tagline: 'Original abstract arena prints for battlestation walls.',
    description: 'A three-print poster set with original cyber cartography, no game logos or official map art, printed on satin art paper.',
    price: 1799,
    rating: 4.6,
    reviews: 122,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
    accent: '#f0c05a',
    colors: ['Coral Trace', 'Cyan Ghost'],
    sizes: ['A3 Set', 'A2 Set'],
    bullets: ['Set of three prints', 'Satin 250 GSM paper', 'Original tactical layouts', 'Shipped in protective tube']
  },
  {
    id: '5',
    slug: 'rank-up-sticker-vault',
    name: 'Rank Up Sticker Vault',
    category: 'Wall Art',
    drop: 'Add-on',
    tagline: 'Low-cost cart booster with high-glow personality.',
    description: 'A waterproof vinyl sticker pack with original callouts, icons, and stream-ready labels for laptops, cases, and consoles.',
    price: 699,
    rating: 4.5,
    reviews: 311,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80',
    accent: '#ff7a1a',
    colors: ['Mixed Neon'],
    sizes: ['20 Pack'],
    bullets: ['Waterproof vinyl', 'Matte laminate', 'Original icon set', 'Giftable add-on pack']
  },
  {
    id: '6',
    slug: 'streamer-command-bundle',
    name: 'Streamer Command Bundle',
    category: 'Creator Kits',
    drop: 'Creator Pack',
    tagline: 'A complete desk drop for creators and competitive streamers.',
    description: 'Bundle the hoodie, XL deskmat, stickers, and poster set into a premium creator kit designed for a cohesive tactical desk identity.',
    price: 8999,
    originalPrice: 11196,
    rating: 4.9,
    reviews: 74,
    stock: 9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    accent: '#b34dff',
    colors: ['Carbon Kit'],
    sizes: ['Bundle'],
    bullets: ['Hoodie + deskmat + poster set + stickers', 'Creator launch packaging', 'Best-value drop', 'Priority dispatch'],
    bundle: true
  },
  {
    id: '7',
    slug: 'neon-edge-desk-kit',
    name: 'Neon Edge Desk Kit',
    category: 'Desk Setup',
    drop: 'Setup Tools',
    tagline: 'Desk accessories for cleaner cables and sharper streams.',
    description: 'A set of cable clips, controller stand, microfiber cloth, and enamel desk badge with a premium tactical setup feel.',
    price: 1899,
    rating: 4.7,
    reviews: 93,
    stock: 33,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    accent: '#38d6c4',
    colors: ['Blackout', 'Cyan Trim'],
    sizes: ['Desk Kit'],
    bullets: ['Cable control pieces', 'Controller stand', 'Microfiber cloth', 'Enamel desk badge']
  }
];

export const testimonials = [
  {
    name: 'Aarav S.',
    role: 'Mumbai',
    quote: 'The site now feels like a real gaming storefront, especially on mobile.'
  },
  {
    name: 'Nitya K.',
    role: 'Bengaluru',
    quote: 'The checkout flow is clean, the cart persists, and the product pages feel polished.'
  },
  {
    name: 'Kabir P.',
    role: 'Delhi',
    quote: 'This is the kind of merchant site that can actually be deployed and iterated on.'
  }
];
