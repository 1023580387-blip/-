// VOLT STREETWEAR - Carousel Module
// Hero Banner auto-play and manual control

class Carousel {
  constructor(options) {
    this.container = options.container;
    this.slidesContainer = options.slidesContainer || this.container.querySelector('.carousel-track');
    this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
    this.dotsContainer = this.container.querySelector('.carousel-dots');
    this.prevBtn = this.container.querySelector('.carousel-btn-prev');
    this.nextBtn = this.container.querySelector('.carousel-btn-next');
    this.progressBar = this.container.querySelector('.carousel-progress-bar');

    this.currentIndex = 0;
    this.autoPlayInterval = options.autoPlayInterval || 3000;
    this.isAutoPlaying = options.autoPlay !== false;
    this.autoPlayTimer = null;
    this.progressTimer = null;

    this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.goToSlide(0);
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = Array.from(this.dotsContainer.querySelectorAll('.carousel-dot'));
  }

  updateDots() {
    if (!this.dots) return;
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  updateProgress() {
    if (!this.progressBar) return;
    const progress = ((this.currentIndex + 1) / this.slides.length) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  goToSlide(index) {
    this.slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    this.currentIndex = index;
    this.updateDots();
    this.updateProgress();
  }

  next() {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.slides.length) {
      nextIndex = 0;
    }
    this.goToSlide(nextIndex);
  }

  prev() {
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.slides.length - 1;
    }
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoPlay();
      });
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      if (this.isAutoPlaying) {
        this.stopAutoPlay();
      }
    });
    this.container.addEventListener('mouseleave', () => {
      if (this.isAutoPlaying) {
        this.startAutoPlay();
      }
    });
  }

  resetAutoPlay() {
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.hero-carousel');
  if (carouselContainer) {
    window.carousel = new Carousel({
      container: carouselContainer,
      autoPlay: true,
      autoPlayInterval: 4000
    });
  }
});

window.Carousel = Carousel;