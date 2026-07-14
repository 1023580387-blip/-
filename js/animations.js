// VOLT STREETWEAR - Animations Module
// Quick buy hover, dropdown, and other effects

// Quick Buy - Already handled by CSS, but this handles the click handler
document.addEventListener('DOMContentLoaded', () => {
  // Quick buy button on product cards
  document.querySelectorAll('.product-card-quick-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const productId = card.dataset.productId;

      // Get default first size
      const product = App.getProductById(productId);
      const defaultSize = product ? product.sizes[0] : null;
      const defaultColor = product ? product.colors[0] : null;

      // Add one to cart
      const imageRect = card.querySelector('.product-card-image').getBoundingClientRect();
      const cartIcon = document.querySelector('.cart-toggle');
      const cartRect = cartIcon.getBoundingClientRect();
      const imageSrc = product.images[0];

      cart.addToCart(productId, 1, defaultSize, defaultColor);

      if (cartIcon && imageRect) {
        cart.animateParabolicAddToCart(imageRect, cartRect, imageSrc);
      }

      App.showToast('Added to cart', '✅');

      e.preventDefault();
    });
  });
});

// Parabolic animation from product detail add to cart
function handleDetailAddToCart(productId) {
  const button = event.currentTarget;
  const product = App.getProductById(productId);
  if (!product) return;

  // Get selected options
  const selectedSize = document.querySelector('.size-btn.selected');
  const selectedColor = document.querySelector('.color-btn.selected');
  const qtyInput = document.getElementById('quantityInput');

  const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
  const size = selectedSize ? selectedSize.dataset.size : product.sizes[0];
  const color = selectedColor ? selectedColor.dataset.color : product.colors[0];

  // Add to cart
  cart.addToCart(productId, quantity, size, color);

  // Animate
  const cartIcon = document.querySelector('.cart-toggle');
  const buttonRect = button.getBoundingClientRect();
  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect();
    const mainImage = document.querySelector('.product-gallery-main img.active');
    const imageSrc = mainImage ? mainImage.src : product.images[0];
    cart.animateParabolicAddToCart(buttonRect, cartRect, imageSrc);
  }

  App.showToast('Added to cart', '✅');
  cart.openCartDrawer();
}

// Size selector functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.size-btn:not(.unavailable)').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.product-sizes');
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Color selector
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.product-colors');
      parent.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Quantity controls
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('quantityInput');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }
});

// Export functions
window.animations = {
  handleDetailAddToCart
};