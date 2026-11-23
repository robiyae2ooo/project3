/**
 * Alibaba Clone - Shopping Cart Logic & LocalStorage Persistence
 * Implements supplier-grouped cart items, MOQ validation, tiered pricing recalculation,
 * selection states, and dynamic calculations.
 */

const Cart = {
  STORAGE_KEY: "alibaba_cart",

  init() {
    this.seedDefaultCartIfEmpty();
    this.updateCartBadge();
  },

  seedDefaultCartIfEmpty() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialCart = [
        {
          id: "alb-1001",
          name: "Factory OEM/ODM Ultra 2 Smartwatch 2.02 Inch AMOLED Screen Waterproof IP68 Wireless Charging Smart Watch with Compass",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
          supplierId: "sup-01",
          supplierName: "Shenzhen Lemfo Smart Technology Co., Ltd.",
          supplierCountry: "CN",
          minOrder: 10,
          unit: "Pieces",
          color: "Titanium Orange",
          size: "49mm Titanium Case",
          quantity: 20,
          tieredPricing: [
            { minQty: 10, maxQty: 99, price: 16.50 },
            { minQty: 100, maxQty: 499, price: 14.20 },
            { minQty: 500, maxQty: null, price: 11.90 }
          ],
          unitPrice: 16.50,
          selected: true,
          shippingCostPerUnit: 2.50,
          leadTime: "3-5 days dispatch"
        },
        {
          id: "alb-1004",
          name: "Wholesale Double Wall Stainless Steel 40oz Tumbler with Handle Straw Insulated Travel Mug Vacuum Car Coffee Cup BPA Free",
          image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80",
          supplierId: "sup-04",
          supplierName: "Zhejiang Yongkang Haotian Drinkware Manufacturing Ltd.",
          supplierCountry: "CN",
          minOrder: 24,
          unit: "Pieces",
          color: "Matte Cream White",
          size: "40oz (1200ml)",
          quantity: 48,
          tieredPricing: [
            { minQty: 24, maxQty: 99, price: 5.60 },
            { minQty: 100, maxQty: 499, price: 4.80 },
            { minQty: 500, maxQty: null, price: 3.95 }
          ],
          unitPrice: 5.60,
          selected: true,
          shippingCostPerUnit: 1.20,
          leadTime: "Fast Dispatch"
        }
      ];
      this.saveCart(initialCart);
    }
  },

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  },

  saveCart(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateCartBadge();
  },

  addItem(product, variation = {}, quantity = null) {
    const items = this.getItems();
    const qty = quantity ? Math.max(quantity, product.minOrder) : product.minOrder;
    const color = variation.color || (product.variations && product.variations.colors ? product.variations.colors[0].name : "Standard");
    const size = variation.size || (product.variations && product.variations.sizes ? product.variations.sizes[0] : "Standard");

    // Match by ID and identical variation
    const existingIndex = items.findIndex(item => item.id === product.id && item.color === color && item.size === size);

    const unitPrice = Catalog.getUnitPriceForQty(product, qty);

    if (existingIndex > -1) {
      items[existingIndex].quantity += qty;
      items[existingIndex].unitPrice = Catalog.getUnitPriceForQty(product, items[existingIndex].quantity);
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        image: variation.image || product.images[0],
        supplierId: product.supplier.id,
        supplierName: product.supplier.name,
        supplierCountry: product.supplier.country,
        minOrder: product.minOrder,
        unit: product.unit,
        color: color,
        size: size,
        quantity: qty,
        tieredPricing: product.tieredPricing,
        unitPrice: unitPrice,
        selected: true,
        shippingCostPerUnit: product.shippingMethods && product.shippingMethods[0] ? product.shippingMethods[0].pricePerUnit : 2.00,
        leadTime: product.fastDispatchDays ? `${product.fastDispatchDays} days dispatch` : "Standard Dispatch"
      };
      items.push(cartItem);
    }

    this.saveCart(items);
    this.showToast(`Added to Cart: ${qty} ${product.unit} of "${product.name.slice(0, 35)}..."`);
    return items;
  },

  updateQuantity(index, newQty) {
    const items = this.getItems();
    if (items[index]) {
      const item = items[index];
      const qty = Math.max(item.minOrder, parseInt(newQty, 10) || item.minOrder);
      item.quantity = qty;

      // Recalculate price tier
      if (item.tieredPricing && item.tieredPricing.length > 0) {
        for (const tier of item.tieredPricing) {
          if (tier.maxQty === null || qty <= tier.maxQty) {
            item.unitPrice = tier.price;
            break;
          }
        }
      }
      this.saveCart(items);
    }
    return items;
  },

  toggleItemSelection(index) {
    const items = this.getItems();
    if (items[index]) {
      items[index].selected = !items[index].selected;
      this.saveCart(items);
    }
    return items;
  },

  toggleSupplierSelection(supplierId, selectAllForSupplier) {
    const items = this.getItems();
    items.forEach(item => {
      if (item.supplierId === supplierId) {
        item.selected = selectAllForSupplier;
      }
    });
    this.saveCart(items);
    return items;
  },

  toggleSelectAll(selectAll) {
    const items = this.getItems();
    items.forEach(item => {
      item.selected = selectAll;
    });
    this.saveCart(items);
    return items;
  },

  removeItem(index) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveCart(items);
    return items;
  },

  removeSelected() {
    let items = this.getItems();
    items = items.filter(item => !item.selected);
    this.saveCart(items);
    return items;
  },

  clearCart() {
    this.saveCart([]);
  },

  getTotals() {
    const items = this.getItems();
    const selectedItems = items.filter(i => i.selected);

    let subtotal = 0;
    let shippingTotal = 0;
    let totalPieces = 0;

    selectedItems.forEach(item => {
      subtotal += item.quantity * item.unitPrice;
      shippingTotal += item.quantity * (item.shippingCostPerUnit || 1.50);
      totalPieces += item.quantity;
    });

    // Bulk discount if total pieces > 100
    const bulkDiscount = totalPieces >= 100 ? subtotal * 0.05 : 0;
    const finalTotal = subtotal + shippingTotal - bulkDiscount;

    return {
      selectedCount: selectedItems.length,
      totalCount: items.length,
      totalPieces,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shippingTotal: parseFloat(shippingTotal.toFixed(2)),
      bulkDiscount: parseFloat(bulkDiscount.toFixed(2)),
      finalTotal: parseFloat(Math.max(0, finalTotal).toFixed(2))
    };
  },

  updateCartBadge() {
    const items = this.getItems();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".header-cart-count");
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
    });
  },

  showToast(message, type = "success") {
    let toastContainer = document.getElementById("alibaba-toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "alibaba-toast-container";
      toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
      toastContainer.style.zIndex = "9999";
      document.body.appendChild(toastContainer);
    }

    const toastId = "toast_" + Date.now();
    const iconClass = type === "success" ? "bi-check-circle-fill text-success" : "bi-exclamation-circle-fill text-warning";

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center bg-white shadow-lg border-0" role="alert" aria-live="assertive" aria-atomic="true" style="border-radius: 8px; border-left: 4px solid var(--alb-orange) !important;">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2 py-3">
            <i class="bi ${iconClass} fs-5"></i>
            <div>
              <div class="fw-semibold text-dark" style="font-size: 13px;">${message}</div>
              <div class="mt-1 d-flex gap-2">
                <a href="cart.html" class="badge text-bg-warning text-decoration-none" style="font-size: 11px;">View Cart</a>
                <a href="checkout.html" class="badge text-bg-dark text-decoration-none" style="font-size: 11px;">Checkout</a>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
      toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
    } else {
      setTimeout(() => toastEl.remove(), 4000);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Cart.init();
});

if (typeof window !== "undefined") {
  window.Cart = Cart;
}
