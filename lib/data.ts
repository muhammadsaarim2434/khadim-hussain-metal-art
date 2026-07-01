export const company = {
  name: 'Khadim Hussain Metal Art',
  short: 'KHMA',
  tagline: 'Aluminum & Metal Manufacturer — Lahore',
  heroHeading: 'Your Vision, Our Metal Expertise',
  heroSub:
    'Custom-crafted gates, railings, grills, outdoor furniture and decorative metal art — built to last, designed to impress.',
  phone: '+923028070443',
  phoneDisplay: '+92 302 8070443',
  email: 'infokhma@gmail.com',
  address: 'Madar-e-Millat Road, Lahore, Punjab, Pakistan',
  hours: '8:00am – 8:00pm, Monday – Saturday',
  logo: '/images/logo/logo.png',
  logoLight: '/images/logo/logo-light.png',
  instagram: '#',
  youtube: '#',
  whatsapp: 'https://wa.me/923028070443',
};

export type Category = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: 'main-gates',
    title: 'Main Gates',
    image: '/images/categories/category-6.jpg',
    description:
      'Bold, custom entrance and main gates that give your home or property a lasting identity.',
  },
  {
    slug: 'railings',
    title: 'Railings',
    image: '/images/categories/category-3.jpg',
    description:
      'Elegant staircase and balcony railings, handcrafted in iron and aluminum.',
  },
  {
    slug: 'doors',
    title: 'Doors',
    image: '/images/categories/category-2.jpg',
    description:
      'Durable, decorative metal doors designed for security and timeless style.',
  },
  {
    slug: 'aluminum-furniture',
    title: 'Aluminum Furniture',
    image: '/images/categories/category-1.jpg',
    description:
      'Cast aluminum chairs, tables and benches for outdoor and garden spaces.',
  },
  {
    slug: 'grills-windows',
    title: 'Grills & Windows',
    image: '/images/categories/category-7.jpg',
    description:
      'Protective and decorative window grills crafted with intricate detail.',
  },
  {
    slug: 'decorative-art',
    title: 'Decorative Art',
    image: '/images/categories/category-4.png',
    description:
      'Artistic metal sculptures, frames and decorative pieces to elevate any space.',
  },
];

export type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  featured?: boolean;
  sale?: boolean;
  description: string;
  features: string[];
  material: string;
  finish: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: 'grand-entrance-main-gate',
    title: 'Grand Entrance Main Gate',
    category: 'main-gates',
    image: '/images/products/product-3.jpg',
    images: ['/images/products/product-3.jpg', '/images/products/product-5.jpg'],
    featured: true,
    description:
      'A statement main gate combining strength and artistry. Custom-sized and finished to complement your property’s architecture.',
    features: [
      'Fully customizable size & design',
      'Heavy-duty weld construction',
      'Rust-resistant powder coating',
      'Optional automation-ready hinges',
    ],
    material: 'Wrought Iron / Cast Aluminum',
    finish: 'Powder-coated, anti-rust',
  },
  {
    id: 2,
    slug: 'ornate-staircase-railing',
    title: 'Ornate Staircase Railing',
    category: 'railings',
    image: '/images/products/product-2.jpg',
    images: ['/images/products/product-2.jpg', '/images/products/product-6.jpg'],
    featured: true,
    description:
      'Hand-forged staircase railing with intricate scrollwork. Engineered for safety without compromising on elegance.',
    features: [
      'Intricate hand-forged scrollwork',
      'Made to measure for any staircase',
      'Smooth, hand-finished surface',
      'Indoor & outdoor options',
    ],
    material: 'Wrought Iron',
    finish: 'Hand-brushed, sealed',
  },
  {
    id: 3,
    slug: 'cast-aluminum-chair-set',
    title: 'Cast Aluminum Chair Set',
    category: 'aluminum-furniture',
    image: '/images/products/product-1.jpeg',
    images: ['/images/products/product-1.jpeg', '/images/products/product-7.jpeg'],
    featured: true,
    sale: true,
    description:
      'Lightweight yet durable cast aluminum outdoor furniture. Weatherproof and designed for lasting comfort.',
    features: [
      'All-weather cast aluminum',
      'Lightweight & easy to move',
      'Ergonomic classic design',
      'Available in sets',
    ],
    material: 'Cast Aluminum',
    finish: 'UV-stable powder coat',
  },
  {
    id: 4,
    slug: 'cast-aluminum-table',
    title: 'Cast Aluminum Garden Table',
    category: 'aluminum-furniture',
    image: '/images/products/product-7.jpeg',
    images: ['/images/products/product-7.jpeg', '/images/products/product-1.jpeg'],
    description:
      'A beautifully detailed cast aluminum table, the perfect centerpiece for gardens, terraces and courtyards.',
    features: [
      'Rust-free cast aluminum',
      'Decorative detailed casting',
      'Stable, level-adjustable base',
      'Pairs with our chair sets',
    ],
    material: 'Cast Aluminum',
    finish: 'UV-stable powder coat',
  },
  {
    id: 5,
    slug: 'decorative-wall-art-panel',
    title: 'Decorative Wall Art Panel',
    category: 'decorative-art',
    image: '/images/products/product-8.jpeg',
    images: ['/images/products/product-8.jpeg'],
    featured: true,
    description:
      'A bespoke metal art panel that turns a plain wall into a focal point. Custom motifs available on request.',
    features: [
      'Custom motifs & sizes',
      'Laser-precise detailing',
      'Indoor / outdoor safe',
      'Mount-ready',
    ],
    material: 'Mild Steel / Aluminum',
    finish: 'Antique / matte finish',
  },
  {
    id: 6,
    slug: 'artistic-metal-grill',
    title: 'Artistic Window Grill',
    category: 'grills-windows',
    image: '/images/products/product-4.jpg',
    images: ['/images/products/product-4.jpg'],
    description:
      'Security meets style. Decorative window grills tailored to your window dimensions and design taste.',
    features: [
      'Made to measure',
      'Enhanced security',
      'Decorative patterns',
      'Corrosion-resistant',
    ],
    material: 'Wrought Iron',
    finish: 'Powder-coated',
  },
  {
    id: 7,
    slug: 'classic-iron-gate',
    title: 'Classic Iron Gate',
    category: 'main-gates',
    image: '/images/products/product-5.jpg',
    images: ['/images/products/product-5.jpg', '/images/products/product-3.jpg'],
    description:
      'A timeless iron gate design with clean lines and sturdy build — an elegant welcome to any home.',
    features: [
      'Classic timeless design',
      'Robust frame',
      'Weatherproof coating',
      'Custom dimensions',
    ],
    material: 'Wrought Iron',
    finish: 'Powder-coated, anti-rust',
  },
  {
    id: 8,
    slug: 'balcony-railing-design',
    title: 'Balcony Railing Design',
    category: 'railings',
    image: '/images/products/product-6.jpg',
    images: ['/images/products/product-6.jpg', '/images/products/product-2.jpg'],
    description:
      'Modern-classic balcony railings that balance openness, safety and decorative appeal.',
    features: [
      'Safety-compliant heights',
      'Decorative infill patterns',
      'Iron or aluminum options',
      'Custom finishes',
    ],
    material: 'Iron / Aluminum',
    finish: 'Powder-coated',
  },
];

export const stats = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '15K+', label: 'Happy Clients' },
  { value: '9K+', label: 'Products Delivered' },
  { value: '100%', label: 'In-House Production' },
];

export const whyChoose = [
  {
    title: 'Exceptional Craftsmanship',
    body: 'Every product reflects years of experience and meticulous attention to detail — from intricate grillwork to bold gates and elegant aluminum furniture.',
  },
  {
    title: '100% In-House Production',
    body: 'We manage the entire process in-house — from raw metal and aluminum casting to the final finishing touches — ensuring premium quality and on-time delivery.',
  },
  {
    title: 'Wide, Diverse Product Range',
    body: 'From outdoor furniture and custom main gates to decorative metal art and window grills, we offer fully customized solutions matched to your style.',
  },
  {
    title: 'Tailored Solutions',
    body: 'Bring us your idea and we craft it exactly to your requirements — the right size, the right finish, the right look for your space.',
  },
];

export const offers = [
  {
    title: 'Best Prices & Offers',
    body: 'Competitive, factory-direct pricing without compromising quality. Premium metalwork at unmatched value.',
    icon: 'tag',
  },
  {
    title: 'Custom Design Options',
    body: 'Tailor-made metalwork — custom gates, railings, grills and furniture crafted exactly to your style and space.',
    icon: 'pencil-ruler',
  },
  {
    title: '100% Satisfaction Guarantee',
    body: 'Your satisfaction is our priority. We guarantee top-quality craftsmanship in every single product.',
    icon: 'shield-check',
  },
];

export const faqs = [
  {
    q: 'Do you make fully custom designs?',
    a: 'Yes. Almost everything we build is made to order. Share your idea, reference photos or measurements and our team will craft it to your exact requirements.',
  },
  {
    q: 'Do you handle both manufacturing and installation?',
    a: 'We manage the complete process in-house — from raw metal and aluminum casting to final finishing — and offer ready-to-install solutions.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Send us a message through the contact form, call us, or message us on WhatsApp with your product type, size and quantity. We respond promptly.',
  },
  {
    q: 'Where are you located?',
    a: 'Our workshop is on Madar-e-Millat Road, Lahore, Punjab, Pakistan. We serve customers across Pakistan.',
  },
];

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Contact Us', href: '/contact' },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}
