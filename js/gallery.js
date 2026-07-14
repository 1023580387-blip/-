// VOLT STREETWEAR - Product Gallery Module
// Thumbnail image gallery for product detail page

class ProductGallery {
  constructor(mainSelector, thumbsSelector) {
    this.mainImages = document.querySelectorAll(mainSelector);
    this.thumbnails = document.querySelectorAll(thumbsSelector);
    this.currentIndex = 0;

    if (!this.mainImages || !this.thumbnails) return;

    this.init();
  }

  init() {
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.goToIndex(index);
      });
    });

    this.goToIndex(0);
  }

  goToIndex(index) {
    if (index < 0 || index >= this.mainImages.length) return;

    // Remove active from all
    this.mainImages.forEach(img => img.classList.remove('active'));
    this.thumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Add active to current
    this.mainImages[index].classList.add('active');
    this.thumbnails[index].classList.add('active');

    this.currentIndex = index;
  }

  next() {
    let next = this.currentIndex + 1;
    if (next >= this.mainImages.length) next = 0;
    this.goToIndex(next);
  }

  prev() {
    let prev = this.currentIndex - 1;
    if (prev < 0) prev = this.mainImages.length - 1;
    this.goToIndex(prev);
  }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const hasGallery = document.querySelector('.product-gallery');
  if (hasGallery) {
    window.productGallery = new ProductGallery(
      '.product-gallery-main img',
      '.product-gallery-thumb'
    );
  }
});