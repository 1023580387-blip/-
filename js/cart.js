// VOLT STREETWEAR - Cart Module
// Shopping cart drawer, cart management, parabolic animation

let cartDrawerOpen = false;

// ==================== Drawer Controls ====================

function openCartDrawer() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;

  overlay.classList.add('open');
  drawer.classList.add('open');
  cartDrawerOpen = true;
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;

  overlay.classList.remove('open');
  drawer.classList.remove('open');
  cartDrawerOpen = false;
  document.body.style.overflow = '';
}

function toggleCartDrawer() {
  if (cartDrawerOpen) {
    closeCartDrawer();
  } else {
    openCartDrawer();
  }
}

// ==================== Cart Operations ====================

function addToCart(productId, quantity = 1, size = null, color = null) {
  const product = App.getProductById(productId);
  if (!product) return false;

  const existingItem = App.state.cart.items.find(item =>
    item.productId === productId &&
    item.size === size &&
    item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    App.state.cart.items.push({
      productId,
      quantity,
      size,
      color
    });
  }

  App.recalculateCart();
  App.saveCartToStorage();
  updateCartBadgePulse();

  return true;
}

function removeFromCart(itemIndex) {
  App.state.cart.items.splice(itemIndex, 1);
  App.recalculateCart();
  App.saveCartToStorage();
  renderCartDrawer();
}

function updateItemQuantity(itemIndex, delta) {
  const item = App.state.cart.items[itemIndex];
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(itemIndex);
  } else {
    App.recalculateCart();
    App.saveCartToStorage();
  }
  renderCartDrawer();
}

function clearCart() {
  App.state.cart.items = [];
  App.recalculateCart();
  App.saveCartToStorage();
  renderCartDrawer();
}

// ==================== Parabolic Fly Animation ====================

function animateParabolicAddToCart(startRect, endRect, imageSrc) {
  // Create flying element
  const fly = document.createElement('div');
  fly.className = 'fly-element';

  // Use image if available
  if (imageSrc) {
    fly.style.backgroundImage = `url(${imageSrc})`;
    fly.style.backgroundSize = 'cover';
    fly.style.backgroundPosition = 'center';
  }

  // Position starting point
  const startX = startRect.left + startRect.width / 2 - 16;
  const startY = startRect.top - window.scrollY;
  fly.style.left = `${startX}px`;
  fly.style.top = `${startY}px`;

  document.body.appendChild(fly);

  // End point
  const endX = endRect.left + endRect.width / 2 - 16;
  const endY = endRect.top - window.scrollY - 16;

  // Use CSS transform with timing
  requestAnimationFrame(() => {
    // Calculate quadratic bezier curve
    // Control point is 1/2 distance up
    const midX = (startX + endX) / 2;
    const midY = Math.min(startY, endY) - 80;

    fly.style.transition = 'none';
    fly.style.transform = `translate(0, 0)`;

    requestAnimationFrame(() => {
      fly.style.transition = 'transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.6s ease 0.3s';
      fly.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
      fly.style.opacity = '0';
    });
  });

  // Cleanup
  setTimeout(() => {
    if (fly.parentNode) {
      fly.parentNode.removeChild(fly);
    }
  }, 700);
}

function updateCartBadgePulse() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  badge.classList.remove('pulse');
  void badge.offsetWidth; // Trigger reflow
  badge.classList.add('pulse');
}

// ==================== Render Cart ====================

function renderCartDrawer() {
  const body = document.querySelector('#cartDrawer .cart-drawer-body');
  if (!body) return;

  const items = App.state.cart.items;

  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div class="cart-empty-text">Your cart is empty</div>
        <div class="cart-empty-sub">Add some products to get started</div>
        <a href="products.html" class="btn btn-primary" onclick="cart.closeCartDrawer()"><span>Browse Products</span></a>
      </div>
    `;
    updateCartFooter();
    return;
  }

  let html = '';

  items.forEach((item, index) => {
    const product = App.getProductById(item.productId);
    if (!product) return;

    const price = product.price * item.quantity;
    const image = product.images[0];

    html += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${image}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <div>
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-meta">
              ${item.size ? `Size: ${item.size}` : ''}
              ${item.color ? `${item.size ? ' · ' : ''}Color: ${item.color}` : ''}
            </div>
            <div class="cart-item-price">$${price}</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button onclick="cart.updateItemQuantity(${index}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="cart.updateItemQuantity(${index}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="cart.removeFromCart(${index})">REMOVE</button>
          </div>
        </div>
      </div>
    `;
  });

  body.innerHTML = html;
  updateCartFooter();
}

function updateCartFooter() {
  const totalEl = document.querySelector('.cart-total-amount');
  if (!totalEl) return;
  totalEl.textContent = `$${App.state.cart.total.toFixed(2)}`;

  const titleEl = document.querySelector('.cart-drawer-count');
  if (titleEl && App.state.cart.count > 0) {
    titleEl.textContent = `(${App.state.cart.count})`;
  }
}

function renderCartPage() {
  const container = document.getElementById('cartPageItems');
  const summaryContainer = document.getElementById('cartPageSummary');
  if (!container) return;

  const items = App.state.cart.items;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="height: 300px;">
        <div class="cart-empty-icon">🛒</div>
        <div class="cart-empty-text">Your cart is empty</div>
        <a href="products.html" class="btn btn-primary" style="margin-top: 24px;"><span>Browse Products</span></a>
      </div>
    `;
    if (summaryContainer) {
      summaryContainer.style.display = 'none';
    }
    return;
  }

  let html = '';

  items.forEach((item, index) => {
    const product = App.getProductById(item.productId);
    if (!product) return;

    const price = product.price * item.quantity;
    const image = product.images[0];

    html += `
      <div class="cart-page-item">
        <div class="cart-page-item-image">
          <img src="${image}" alt="${product.name}">
        </div>
        <div class="cart-page-item-info">
          <div>
            <div class="cart-page-item-name">${product.name}</div>
            <div class="cart-page-item-meta">
              ${item.size ? `Size: ${item.size}` : ''}
              ${item.color ? `${item.size ? ' · ' : ''}Color: ${item.color}` : ''}
            </div>
            <div class="cart-page-item-price">$${price}</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button onclick="cart.updateItemQuantity(${index}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="cart.updateItemQuantity(${index}, 1)">+</button>
            </button>
            <button class="cart-item-remove" onclick="cart.removeFromCart(${index})">REMOVE</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  if (summaryContainer) {
    let subtotal = App.state.cart.total;
    let shipping = subtotal > 0 ? 10 : 0;
    let total = subtotal + shipping;

    summaryContainer.innerHTML = `
      <h3>Order Summary</h3>
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Shipping</span>
        <span>$${shipping.toFixed(2)}</span>
      </div>
      <div class="cart-summary-total">
        <span>Total</span>
        <span class="amount">$${total.toFixed(2)}</span>
      </div>
      <button class="btn btn-primary btn-lg" onclick="alert('Checkout would proceed here in a real store!')">
        <span>Checkout</span>
      </button>
    `;
  }
}

// ==================== Initialize ====================

document.addEventListener('DOMContentLoaded', () => {
  // Cart icon click
  const cartIcons = document.querySelectorAll('.cart-toggle');
  cartIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCartDrawer();
    });
  });

  // Overlay click close
  const overlay = document.getElementById('cartOverlay');
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }

  // Close button
  const closeBtn = document.getElementById('cartDrawerClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawerOpen) {
      closeCartDrawer();
    }
  });

  // Render if on cart page
  if (document.getElementById('cartPageItems')) {
    renderCartPage();
  }
});

// Export to window
window.cart = {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearCart,
  animateParabolicAddToCart,
  renderCartDrawer,
  renderCartPage
};