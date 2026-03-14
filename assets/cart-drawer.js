/**
 * Buenacopa Theme - Cart Drawer
 * Handles: open/close drawer, AJAX cart operations, DOM updates
 */

var CartDrawer = {
  open: function () {
    document.getElementById('cart-drawer').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    this.refresh();
  },

  close: function () {
    document.getElementById('cart-drawer').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.body.style.overflow = '';
  },

  refresh: function () {
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) { CartDrawer.render(cart); })
      .catch(function () {});
  },

  render: function (cart) {
    var itemsContainer = document.getElementById('cart-items');
    var emptyState = document.getElementById('cart-empty');
    var footer = document.getElementById('cart-footer');
    var totalEl = document.getElementById('cart-total');

    if (cart.item_count === 0) {
      itemsContainer.innerHTML = '';
      itemsContainer.style.display = 'none';
      emptyState.style.display = 'flex';
      footer.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      itemsContainer.style.display = 'block';
      footer.style.display = 'block';

      var html = '';
      cart.items.forEach(function (item) {
        html += '<div class="flex gap-4 p-2 border-b border-border" data-key="' + item.key + '">';
        if (item.image) {
          html += '<div class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">';
          html += '<img src="' + item.image + '" alt="' + item.title + '" class="w-full h-full object-cover" width="64" height="64">';
          html += '</div>';
        }
        html += '<div class="flex-1 min-w-0">';
        html += '<h4 class="font-medium text-sm truncate text-foreground">' + item.title + '</h4>';
        html += '<p class="font-semibold text-sm mt-1 text-foreground">$' + (item.price / 100).toLocaleString() + ' MXN</p>';
        html += '</div>';
        html += '<div class="flex flex-col items-end gap-2 flex-shrink-0">';
        html += '<button onclick="CartDrawer.removeItem(\'' + item.key + '\')" class="text-muted-foreground hover:text-foreground p-1" aria-label="Eliminar">';
        html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';
        html += '</button>';
        html += '<div class="flex items-center gap-1">';
        html += '<button onclick="CartDrawer.updateQty(\'' + item.key + '\',' + (item.quantity - 1) + ')" class="w-6 h-6 border border-border rounded flex items-center justify-center text-foreground hover:bg-white/5" aria-label="Reducir">';
        html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>';
        html += '</button>';
        html += '<span class="w-8 text-center text-sm text-foreground">' + item.quantity + '</span>';
        html += '<button onclick="CartDrawer.updateQty(\'' + item.key + '\',' + (item.quantity + 1) + ')" class="w-6 h-6 border border-border rounded flex items-center justify-center text-foreground hover:bg-white/5" aria-label="Aumentar">';
        html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
        html += '</button>';
        html += '</div></div></div>';
      });

      itemsContainer.innerHTML = html;
      totalEl.textContent = '$' + (cart.total_price / 100).toLocaleString() + ' MXN';
    }

    updateCartCount();
  },

  addItem: function (variantId, quantity) {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: quantity || 1 })
    })
    .then(function (r) { return r.json(); })
    .then(function (item) {
      CartDrawer.open();
      return item;
    });
  },

  updateQty: function (key, quantity) {
    if (quantity < 1) {
      return this.removeItem(key);
    }
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
    .then(function (r) { return r.json(); })
    .then(function (cart) { CartDrawer.render(cart); });
  },

  removeItem: function (key) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    })
    .then(function (r) { return r.json(); })
    .then(function (cart) { CartDrawer.render(cart); });
  },

  checkout: function () {
    window.location.href = '/checkout';
  }
};
