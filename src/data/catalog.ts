export type Category = 'Apparel' | 'Accessories' | 'Collectibles' | 'Desk Setup';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
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
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const shippingThreshold = 2999;

export const categories: Category[] = ['Apparel', 'Accessories', 'Collectibles', 'Desk Setup'];

export const products: Product[] = [
  {
    id: '1',
    slug: 'prime-operator-hoodie',
    name: 'Prime Operator Hoodie',
    category: 'Apparel',
    tagline: 'Oversized premium drop for ranked nights.',
    description: 'Heavyweight hoodie with bold tactical graphics, premium fleece interior, and an esports-inspired silhouette built for everyday wear.',
    price: 6999,
    originalPrice: 8299,
    rating: 4.8,
    reviews: 214,
    stock: 18,
    featured: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    accent: '#ff4655',
    colors: ['Carbon Black', 'Neon Red', 'Volt Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    bullets: ['420 GSM fleece', 'Oversized fit', 'Printed chest and sleeve graphics', 'Machine washable']
  },
  {
    id: '2',
    slug: 'radiant-xl-mousepad',
    name: 'Radiant XL Mousepad',
    category: 'Desk Setup',
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
    sizes: ['XL'],
    bullets: ['Smooth glide finish', 'Anti-slip rubber base', 'Stitched edges', 'Water-resistant surface']
  },
  {
    id: '3',
    slug: 'killjoy-collectors-figure',
    name: 'Killjoy Collector Figure',
    category: 'Collectibles',
    tagline: 'Shelf-ready hero collectible for creators.',
    description: 'A premium collector figure designed to give your desk or studio shelf a strong tactical identity.',
    price: 3299,
    rating: 4.9,
    reviews: 96,
    stock: 11,
    featured: true,
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
    accent: '#b34dff',
    colors: ['Signature Yellow'],
    sizes: ['Standard'],
    bullets: ['Collector box included', 'Display card included', 'Weighted base', 'Limited run']
  },
  {
    id: '4',
    slug: 'blade-core-keychain',
    name: 'Blade Core Keychain',
    category: 'Accessories',
    tagline: 'Small add-on with big visual impact.',
    description: 'A compact metal keychain with enamel detailing, designed for gifting, bundling, and quick cart add-ons.',
    price: 899,
    rating: 4.5,
    reviews: 204,
    stock: 64,
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
    accent: '#ff7a1a',
    colors: ['Neon Pink', 'Cyan Edge'],
    sizes: ['One Size'],
    bullets: ['Metal alloy build', 'Enamel finish', 'Gift-ready card backing', 'Split ring included']
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
