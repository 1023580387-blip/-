// VOLT STREETWEAR - Core Application
// Data initialization, state management, utilities

// Generate images using the API endpoint
const IMAGE_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=';

function generateImageUrl(prompt, size = 'landscape_4_3') {
  return `${IMAGE_BASE}${encodeURIComponent(prompt)}&image_size=${size}`;
}

// ==================== Product Data ====================

const products = [
  {
    id: 1,
    name: 'GRAFFITI OVERSIZED HOODIE',
    price: 129,
    description: 'Bold graffiti graphic oversized hoodie crafted from heavyweight 100% cotton. Featuring ribbed cuffs, adjustable drawcords, and dropped shoulders for the authentic streetwear silhouette.',
    category: 'hoodies',
    images: [
      generateImageUrl('Black oversized hoodie with graffiti print on black mannequin hanging against concrete wall, streetwear product shot, high contrast'),
      generateImageUrl('Model wearing black graffiti oversized hoodie, back view, urban street background, street fashion')
    ],
    gallery: [
      generateImageUrl('Black oversized graffiti hoodie front view on model, urban street photography'),
      generateImageUrl('Black oversized graffiti hoodie back view showing full graphic print'),
      generateImageUrl('Close-up detail of the graffiti print and fabric texture'),
      generateImageUrl('Hoodie detail showing ribbed hem and drawstring')
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray'],
    featured: true,
    badge: 'new'
  },
  {
    id: 2,
    name: 'NYLON CARGO PANTS',
    price: 149,
    description: 'Technical nylon cargo pants with multiple pockets, adjustable cuffs, and reinforced stitching. Perfect for street style with functional utility.',
    category: 'pants',
    images: [
      generateImageUrl('Black nylon cargo pants on display, streetwear fashion product photography'),
      generateImageUrl('Model wearing black cargo pants walking in city, full body shot')
    ],
    gallery: [
      generateImageUrl('Black nylon cargo pants front view'),
      generateImageUrl('Black nylon cargo pants side view showing pockets'),
      generateImageUrl('Detail shot of cargo pockets and stitching'),
      generateImageUrl('Adjustable cuff detail close-up')
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Camo'],
    featured: true,
    badge: null
  },
  {
    id: 3,
    name: 'GRAPHIC PRINT T-SHIRT',
    price: 59,
    description: 'Heavyweight cotton t-shirt with bold original graphic print. Relaxed fit, double stitched hems for durability.',
    category: 'tshirts',
    images: [
      generateImageUrl('White t-shirt with bold red graphic print on wooden hanger, studio product shot'),
      generateImageUrl('Model wearing white graphic t-shirt, city street background')
    ],
    gallery: [
      generateImageUrl('White graphic t-shirt front view'),
      generateImageUrl('Close-up of graphic print detail'),
      generateImageUrl('Model wearing t-shirt, street style'),
      generateImageUrl('Fabric texture close-up')
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    featured: true,
    badge: 'sale'
  },
  {
    id: 4,
    name: 'TECHNICAL BOMBER JACKET',
    price: 219,
    description: 'Water-resistant technical bomber jacket with ribbed cuffs, multiple zipper pockets, and VOLT branding.',
    category: 'outerwear',
    images: [
      generateImageUrl('Black technical bomber jacket hanging in front of brick wall, product photography'),
      generateImageUrl('Model wearing black bomber jacket walking down urban street')
    ],
    gallery: [
      generateImageUrl('Black bomber jacket front view'),
      generateImageUrl('Black bomber jacket on model, three quarter view'),
      generateImageUrl('Zipper pocket detail close-up'),
      generateImageUrl('Ribbed collar and cuff detail')
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    featured: true,
    badge: null
  },
  {
    id: 5,
    name: 'DISTRACTED DENIM JACKET',
    price: 189,
    description: 'Heavy washed denim jacket with intentional distressing and custom patches. Classic streetwear silhouette.',
    category: 'outerwear',
    images: [
      generateImageUrl('Black faded denim jacket with patches on hanger, studio product shot'),
      generateImageUrl('Model wearing distressed black denim jacket outdoors')
    ],
    gallery: [
      generateImageUrl('Black distressed denim jacket front view'),
      generateImageUrl('Patches detail on denim jacket'),
      generateImageUrl('Distressing and fade detail close-up'),
      generateImageUrl('Jacket on model, street fashion')
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Blue'],
    featured: false,
    badge: 'new'
  },
  {
    id: 6,
    name: 'LEATHER BASEBALL CAP',
    price: 49,
    description: 'Premium leather baseball cap with embroidered VOLT logo. Adjustable leather strap for the perfect fit.',
    category: 'accessories',
    images: [
      generateImageUrl('Black leather baseball cap with red embroidered logo on white background'),
      generateImageUrl('Model wearing black leather cap, close-up street portrait')
    ],
    gallery: [
      generateImageUrl('Black leather cap front view'),
      generateImageUrl('Embroidered logo detail'),
      generateImageUrl('Back view showing adjustable strap'),
      generateImageUrl('Leather texture close-up')
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Brown'],
    featured: false,
    badge: null
  },
  {
    id: 7,
    name: 'ARMY FATIGUE CARGO SHORTS',
    price: 89,
    description: 'Heavy cotton cargo shorts with multiple pockets, relaxed fit. Perfect for summer streetwear.',
    category: 'pants',
    images: [
      generateImageUrl('Olive green cargo shorts folded on concrete floor, product photography'),
      generateImageUrl('Model wearing olive cargo shorts in urban setting')
    ],
    gallery: [
      generateImageUrl('Olive green cargo shorts front view'),
      generateImageUrl('Cargo pocket detail'),
      generateImageUrl('Model wearing shorts walking in city'),
      generateImageUrl('Fabric texture detail')
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Olive', 'Black'],
    featured: false,
    badge: null
  },
  {
    id: 8,
    name: 'CHECKERBOARD FLANNEL SHIRT',
    price: 89,
    description: 'Heavy cotton flannel shirt with bold checkerboard pattern. Can be worn as overshirt or buttoned up.',
    category: 'tops',
    images: [
      generateImageUrl('Black and white checkerboard flannel shirt hanging on wooden hanger'),
      generateImageUrl('Model wearing open checkerboard flannel over black t-shirt, street style')
    ],
    gallery: [
      generateImageUrl('Checkerboard flannel shirt front view'),
      generateImageUrl('Flannel fabric texture close-up'),
      generateImageUrl('Model wearing open flannel overshirt'),
      generateImageUrl('Cuff and pocket detail')
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black/White', 'Red/Black'],
    featured: false,
    badge: null
  },
  {
    id: 9,
    name: 'SIDE STRIPE TRACK PANTS',
    price: 99,
    description: 'Soft cotton blend track pants with bold red side stripe. Elastic waistband and tapered fit.',
    category: 'pants',
    images: [
      generateImageUrl('Black track pants with red side stripe, product shot on gray background'),
      generateImageUrl('Model wearing track pants while walking in city')
    ],
    gallery: [
      generateImageUrl('Black track pants with red stripe front view'),
      generateImageUrl('Side stripe detail close-up'),
      generateImageUrl('Ankle cuff detail'),
      generateImageUrl('Elastic waistband and drawstring')
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray'],
    featured: false,
    badge: null
  },
  {
    id: 10,
    name: 'REFLECTIVE LOGO CREWNECK',
    price: 119,
    description: 'Reflective logo print crewneck sweatshirt in heavyweight cotton. Logo reflects light at night.',
    category: 'hoodies',
    images: [
      generateImageUrl('Charcoal gray reflective logo crewneck sweatshirt in dark studio'),
      generateImageUrl('Reflective logo glowing in low light, detail shot')
    ],
    gallery: [
      generateImageUrl('Charcoal crewneck with reflective logo in normal light'),
      generateImageUrl('Reflective logo glowing in dark'),
      generateImageUrl('Crewneck collar detail'),
      generateImageUrl('Worn by model on dark street')
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Black'],
    featured: false,
    badge: 'new'
  },
  {
    id: 11,
    name: 'CANVAS TOTE BAG',
    price: 39,
    description: 'Heavyweight canvas tote bag with printed VOLT logo. Durable and spacious for everyday use.',
    category: 'accessories',
    images: [
      generateImageUrl('Black canvas tote bag with red logo on concrete background'),
      generateImageUrl('Person carrying black canvas tote bag on shoulder, street shot')
    ],
    gallery: [
      generateImageUrl('Black canvas tote bag front view'),
      generateImageUrl('Logo detail close-up'),
      generateImageUrl('Canvas texture detail'),
      generateImageUrl('Tote bag held by model')
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Natural'],
    featured: false,
    badge: null
  },
  {
    id: 12,
    name: 'ZIP-UP WORK JACKET',
    price: 169,
    description: 'Heavy workwear jacket with full zipper front, multiple utility pockets. Reinforced stitching throughout.',
    category: 'outerwear',
    images: [
      generateImageUrl('Gray workwear zip-up jacket on display against brick wall'),
      generateImageUrl('Model wearing gray work jacket on construction site background')
    ],
    gallery: [
      generateImageUrl('Gray work jacket front view'),
      generateImageUrl('Utility pocket detail'),
      generateImageUrl('Heavy duck canvas fabric close-up showing texture and stitching'),
      generateImageUrl('Full zipper and collar detail')
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black'],
    featured: false,
    badge: null
  }
];

// ==================== State Management ====================

const AppState = {
  cart: {
    items: [],
    total: 0,
    count: 0
  }
};

// ==================== LocalStorage Persistence ====================

const STORAGE_KEY = 'volt_cart';

function loadCartFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      AppState.cart = parsed;
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      AppState.cart = { items: [], total: 0, count: 0 };
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.cart));
}

function recalculateCart() {
  let count = 0;
  let total = 0;
  AppState.cart.items.forEach(item => {
    const product = getProductById(item.productId);
    if (product) {
      count += item.quantity;
      total += product.price * item.quantity;
    }
  });
  AppState.cart.count = count;
  AppState.cart.total = total;
  saveCartToStorage();
  updateCartBadge();
}

// ==================== Utility Functions ====================

function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;

  if (AppState.cart.count > 0) {
    badge.textContent = AppState.cart.count;
    badge.classList.add('has-items');
  } else {
    badge.classList.remove('has-items');
  }
}

// ==================== Toast Notification ====================

function showToast(message, icon = '✓') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-text">${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ==================== Initialize ====================

document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  updateCartBadge();
  initDropdowns();
  initScrollReveal();
  initMobileMenu();

  // Scroll hide header logic
  let lastScroll = 0;
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
          header.classList.add('hidden');
        } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    });
  }
});

// ==================== Dropdown Menu ====================

function initDropdowns() {
  // Already handled by CSS hover, but this adds touch support
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      if (menu.style.opacity === '1') {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.maxHeight = '0';
      } else {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.maxHeight = '300px';
      }
    });
  });
}

// ==================== Mobile Menu ====================

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
}

// ==================== Scroll Reveal ====================

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ==================== Export for other modules ====================

window.App = {
  products,
  state: AppState,
  loadCartFromStorage,
  saveCartToStorage,
  recalculateCart,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  updateCartBadge,
  showToast,
  generateImageUrl
};