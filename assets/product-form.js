/**
 * Buenacopa Theme - Product Form
 * Handles: variant selection, quantity, add-to-cart, buy-now, image gallery, dropdowns
 */

var ProductForm = {
  selectedVariantId: null,
  selectedPrice: 0,
  quantity: 1,
  isSubmitting: false,

  init: function () {
    var firstBtn = document.querySelector('.variant-btn.selected');
    if (firstBtn) {
      this.selectedVariantId = parseInt(firstBtn.dataset.variantId);
      this.selectedPrice = parseInt(firstBtn.dataset.variantPrice);
    }
  },

  selectVariant: function (variantId, button) {
    this.selectedVariantId = variantId;
    this.selectedPrice = parseInt(button.dataset.variantPrice);

    document.querySelectorAll('.variant-btn').forEach(function (btn) {
      btn.classList.remove('selected', 'border-accent', 'bg-accent/10');
      btn.classList.add('border-background/15', 'bg-background/5');
      var radio = btn.querySelector('.w-5.h-5.rounded-full');
      if (radio) {
        radio.classList.remove('border-accent');
        radio.classList.add('border-background/30');
        var dot = radio.querySelector('.w-2\\.5');
        if (dot) dot.remove();
      }
    });

    button.classList.add('selected', 'border-accent', 'bg-accent/10');
    button.classList.remove('border-background/15', 'bg-background/5');
    var radio = button.querySelector('.w-5.h-5.rounded-full');
    if (radio) {
      radio.classList.add('border-accent');
      radio.classList.remove('border-background/30');
      if (!radio.querySelector('.w-2\\.5')) {
        var dot = document.createElement('div');
        dot.className = 'w-2.5 h-2.5 rounded-full bg-accent';
        radio.appendChild(dot);
      }
    }

    this.updateMobileCTA();
  },

  selectImage: function (src, button) {
    var mainImg = document.getElementById('main-product-image');
    if (mainImg) {
      mainImg.removeAttribute('srcset');
      mainImg.src = src;
    }

    document.querySelectorAll('.product-thumbnail').forEach(function (thumb) {
      thumb.classList.remove('border-accent');
      thumb.classList.add('border-background/10');
    });
    button.classList.add('border-accent');
    button.classList.remove('border-background/10');
  },

  incrementQty: function () {
    this.quantity++;
    this.updateQuantityDisplay();
  },

  decrementQty: function () {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQuantityDisplay();
    }
  },

  updateQuantityDisplay: function () {
    var qtyEl = document.getElementById('product-quantity');
    if (qtyEl) qtyEl.textContent = this.quantity;
    this.updateMobileCTA();
  },

  updateMobileCTA: function () {
    var ctaText = document.getElementById('mobile-cta-text');
    if (ctaText && this.selectedPrice) {
      var total = (this.selectedPrice / 100) * this.quantity;
      var hasDecimals = total % 1 !== 0;
      var lang = document.documentElement.lang || 'es';
      var addToCartText = (window.theme && window.theme.strings && window.theme.strings.addToCart) || 'Agregar al carrito';
      ctaText.textContent = addToCartText + ' – $' + total.toLocaleString(lang, { minimumFractionDigits: hasDecimals ? 2 : 0, maximumFractionDigits: 2 });
    }
  },

  setButtonLoading: function (loading) {
    var buttons = [
      document.getElementById('add-to-cart-desktop'),
      document.querySelector('#mobile-sticky-cta button')
    ];
    buttons.forEach(function (btn) {
      if (!btn) return;
      if (loading) {
        btn.disabled = true;
        btn.dataset.originalText = btn.textContent;
        btn.style.opacity = '0.7';
      } else {
        btn.disabled = false;
        btn.style.opacity = '';
      }
    });
  },

  addToCart: function () {
    if (!this.selectedVariantId || this.isSubmitting) return;
    this.isSubmitting = true;
    this.setButtonLoading(true);

    CartDrawer.addItem(this.selectedVariantId, this.quantity)
      .finally(function () {
        ProductForm.isSubmitting = false;
        ProductForm.setButtonLoading(false);
      });
  },

  buyNow: function () {
    if (!this.selectedVariantId || this.isSubmitting) return;
    this.isSubmitting = true;

    var buyBtn = document.querySelector('[onclick="ProductForm.buyNow()"]');
    if (buyBtn) {
      buyBtn.disabled = true;
      buyBtn.style.opacity = '0.7';
    }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.selectedVariantId, quantity: this.quantity })
    })
    .then(function (r) {
      if (!r.ok) throw new Error((window.theme && window.theme.strings && window.theme.strings.processError) || 'Error');
      window.location.href = '/checkout';
    })
    .catch(function () {
      ProductForm.isSubmitting = false;
      if (buyBtn) {
        buyBtn.disabled = false;
        buyBtn.style.opacity = '';
      }
      CartDrawer.showError((window.theme && window.theme.strings && window.theme.strings.processError) || 'Error');
    });
  },

  toggleDropdown: function (button) {
    var section = button.closest('.dropdown-section');
    var content = section.querySelector('.dropdown-content');
    var chevron = section.querySelector('.dropdown-chevron');
    var isOpen = content.classList.contains('open');

    if (isOpen) {
      content.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = '';
    } else {
      content.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  ProductForm.init();
});
