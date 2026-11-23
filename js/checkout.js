/**
 * Alibaba Clone - Checkout & Trade Assurance Order Placement
 * Validates shipping addresses, calculates tiered shipping costs, handles Trade Assurance
 * payment methods, processes simulated payments, and records completed orders.
 */

const Checkout = {
  selectedShippingMethod: "express",
  shippingRates: {
    express: { name: "Air Express (DHL/FedEx)", baseCost: 35.00, perUnitCost: 2.20, days: "3-7 business days" },
    air_cargo: { name: "Alibaba Air Cargo Logistics", baseCost: 20.00, perUnitCost: 1.40, days: "8-12 business days" },
    sea_freight: { name: "Sea Freight DDP (Door-to-Door)", baseCost: 15.00, perUnitCost: 0.65, days: "25-35 business days" }
  },

  init() {
    this.renderCheckoutItems();
    this.renderAddresses();
    this.setupEventListeners();
    this.updateTotals();
  },

  getCheckoutItems() {
    const buyNow = sessionStorage.getItem("buy_now_item");
    if (buyNow) {
      try {
        const item = JSON.parse(buyNow);
        return [item];
      } catch (e) {
        console.error("Failed to parse buy_now_item", e);
      }
    }
    const cartItems = Cart.getItems();
    return cartItems.filter(i => i.selected);
  },

  renderCheckoutItems() {
    const container = document.getElementById("checkoutItemsContainer");
    if (!container) return;

    const items = this.getCheckoutItems();
    if (items.length === 0) {
      container.innerHTML = `
        <div class="alert alert-warning d-flex align-items-center justify-content-between p-4 rounded-3">
          <div>
            <i class="bi bi-exclamation-triangle-fill fs-4 me-2"></i>
            <strong>No items selected for order!</strong> Please select products from your cart or browse the catalog.
          </div>
          <a href="products.html" class="btn btn-warning fw-semibold btn-sm">Explore Products</a>
        </div>
      `;
      const submitBtn = document.getElementById("submitOrderBtn");
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    // Group items by supplier
    const grouped = {};
    items.forEach(item => {
      const sup = item.supplierName || "Alibaba Verified Supplier";
      if (!grouped[sup]) grouped[sup] = [];
      grouped[sup].push(item);
    });

    let html = "";
    Object.keys(grouped).forEach(supplier => {
      html += `
        <div class="card border mb-4 shadow-sm rounded-3 overflow-hidden">
          <div class="card-header bg-light border-bottom d-flex align-items-center justify-content-between py-2 px-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-shop text-primary"></i>
              <span class="fw-bold text-dark" style="font-size: 14px;">Supplier: ${supplier}</span>
              <span class="badge text-bg-warning rounded-pill" style="font-size: 10px;"><i class="bi bi-shield-check"></i> Verified</span>
            </div>
            <span class="small text-muted"><i class="bi bi-shield-lock-fill text-warning me-1"></i> Trade Assurance Covered</span>
          </div>
          <div class="card-body p-0">
      `;

      grouped[supplier].forEach(item => {
        const total = (item.quantity * item.unitPrice).toFixed(2);
        html += `
          <div class="p-3 border-bottom d-flex gap-3 align-items-center">
            <img src="${item.image}" alt="${item.name}" class="rounded object-fit-cover" style="width: 72px; height: 72px; flex-shrink: 0; border: 1px solid #e9ecef;">
            <div class="flex-grow-1">
              <h6 class="mb-1 text-truncate-2" style="font-size: 13.5px; line-height: 1.3;">${item.name}</h6>
              <div class="small text-muted mb-1">
                <span class="badge bg-light text-dark border me-2">Color: ${item.color || 'Standard'}</span>
                <span class="badge bg-light text-dark border">Spec: ${item.size || 'Standard'}</span>
              </div>
              <div class="small text-success"><i class="bi bi-lightning-charge-fill"></i> ${item.leadTime || 'Ships within 3 days'}</div>
            </div>
            <div class="text-end" style="min-width: 140px;">
              <div class="fw-bold text-dark fs-6">$${item.unitPrice.toFixed(2)} <span class="small text-muted fw-normal">/${item.unit || 'pc'}</span></div>
              <div class="small text-muted">Qty: <strong class="text-dark">${item.quantity}</strong></div>
              <div class="small text-danger fw-semibold mt-1">Item Total: $${total}</div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
          <div class="card-footer bg-white p-3">
            <div class="row align-items-center">
              <div class="col-md-7">
                <label class="form-label small text-muted mb-1">Supplier Remark / Special Request:</label>
                <input type="text" class="form-control form-control-sm" placeholder="e.g. customized logo instructions, packaging note...">
              </div>
              <div class="col-md-5 text-md-end mt-2 mt-md-0">
                <span class="small text-muted">Subtotal (${grouped[supplier].reduce((s, i) => s + i.quantity, 0)} items):</span>
                <span class="fw-bold text-dark fs-6 ms-2">$${grouped[supplier].reduce((s, i) => s + (i.quantity * i.unitPrice), 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderAddresses() {
    const container = document.getElementById("addressListContainer");
    if (!container) return;

    const addresses = Auth.getAddresses();
    if (addresses.length === 0) {
      container.innerHTML = `
        <div class="alert alert-secondary py-3">
          <p class="mb-2 small">No shipping addresses saved yet. Please add your delivery address below.</p>
          <button type="button" class="btn btn-warning btn-sm fw-semibold" data-bs-toggle="modal" data-bs-target="#newAddressModal">
            <i class="bi bi-plus-lg me-1"></i> Add Shipping Address
          </button>
        </div>
      `;
      return;
    }

    let html = `<div class="row g-3">`;
    addresses.forEach((addr, idx) => {
      const isDefault = addr.isDefault || idx === 0;
      html += `
        <div class="col-md-6">
          <div class="card address-card h-100 p-3 border ${isDefault ? 'border-warning shadow-sm bg-warning-subtle' : 'border-secondary-subtle'}" style="cursor: pointer; border-radius: 8px;" onclick="Checkout.selectAddress('${addr.id}')">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <input class="form-check-input mt-0 address-radio" type="radio" name="shippingAddressRadio" id="addr_${addr.id}" value="${addr.id}" ${isDefault ? 'checked' : ''}>
                <label class="form-check-label fw-bold text-dark mb-0" for="addr_${addr.id}" style="font-size: 14px;">${addr.fullName}</label>
              </div>
              ${isDefault ? '<span class="badge text-bg-warning" style="font-size: 10px;">Default</span>' : ''}
            </div>
            <div class="small text-muted mb-1"><i class="bi bi-building me-1"></i> ${addr.company || 'Private Buyer'}</div>
            <div class="small text-dark mb-1"><i class="bi bi-geo-alt me-1 text-danger"></i> ${addr.street}, ${addr.city}, ${addr.state} ${addr.postalCode}, ${addr.country}</div>
            <div class="small text-muted"><i class="bi bi-telephone me-1"></i> ${addr.phone}</div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  },

  selectAddress(addressId) {
    const radio = document.getElementById(`addr_${addressId}`);
    if (radio) radio.checked = true;
    document.querySelectorAll(".address-card").forEach(c => {
      c.classList.remove("border-warning", "shadow-sm", "bg-warning-subtle");
      c.classList.add("border-secondary-subtle");
    });
    const selectedRadio = document.querySelector(`input[name="shippingAddressRadio"][value="${addressId}"]`);
    if (selectedRadio) {
      const card = selectedRadio.closest(".address-card");
      if (card) {
        card.classList.add("border-warning", "shadow-sm", "bg-warning-subtle");
        card.classList.remove("border-secondary-subtle");
      }
    }
  },

  setupEventListeners() {
    // Shipping method radio change
    const shippingRadios = document.querySelectorAll('input[name="shippingMethodRadio"]');
    shippingRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.selectedShippingMethod = e.target.value;
        this.updateTotals();
      });
    });

    // Save Address Modal submit
    const addressForm = document.getElementById("modalAddressForm");
    if (addressForm) {
      addressForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newAddr = {
          fullName: document.getElementById("modalAddrName").value.trim(),
          company: document.getElementById("modalAddrCompany").value.trim() || "Independent Buyer",
          street: document.getElementById("modalAddrStreet").value.trim(),
          city: document.getElementById("modalAddrCity").value.trim(),
          state: document.getElementById("modalAddrState").value.trim(),
          postalCode: document.getElementById("modalAddrZip").value.trim(),
          country: document.getElementById("modalAddrCountry").value,
          phone: document.getElementById("modalAddrPhone").value.trim(),
          isDefault: document.getElementById("modalAddrDefault").checked
        };

        Auth.saveAddress(newAddr);
        this.renderAddresses();

        // Close modal
        const modalEl = document.getElementById("newAddressModal");
        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
          const bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }
        addressForm.reset();
        Cart.showToast("Shipping address saved successfully!");
      });
    }

    // Submit Order button
    const submitBtn = document.getElementById("submitOrderBtn");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        this.processOrder();
      });
    }
  },

  calculateShipping(totalUnits) {
    const rate = this.shippingRates[this.selectedShippingMethod] || this.shippingRates.express;
    return parseFloat((rate.baseCost + (totalUnits * rate.perUnitCost)).toFixed(2));
  },

  updateTotals() {
    const items = this.getCheckoutItems();
    if (items.length === 0) return;

    let subtotal = 0;
    let totalPieces = 0;
    items.forEach(i => {
      subtotal += i.quantity * i.unitPrice;
      totalPieces += i.quantity;
    });

    const shipping = this.calculateShipping(totalPieces);
    const taxServiceFee = parseFloat((subtotal * 0.02).toFixed(2)); // Trade Assurance Escrow fee
    const grandTotal = parseFloat((subtotal + shipping + taxServiceFee).toFixed(2));

    const subtotalEl = document.getElementById("summarySubtotal");
    const shippingEl = document.getElementById("summaryShipping");
    const feeEl = document.getElementById("summaryFee");
    const grandTotalEl = document.getElementById("summaryGrandTotal");
    const piecesEl = document.getElementById("summaryPiecesCount");

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (feeEl) feeEl.textContent = `$${taxServiceFee.toFixed(2)}`;
    if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
    if (piecesEl) piecesEl.textContent = `${totalPieces} Units`;
  },

  processOrder() {
    const items = this.getCheckoutItems();
    if (items.length === 0) {
      alert("No items selected for order!");
      return;
    }

    // Validate address
    const selectedAddressRadio = document.querySelector('input[name="shippingAddressRadio"]:checked');
    if (!selectedAddressRadio) {
      alert("Please select or add a delivery address.");
      return;
    }
    const addresses = Auth.getAddresses();
    const chosenAddress = addresses.find(a => a.id === selectedAddressRadio.value) || addresses[0];

    // Validate payment method
    const paymentRadio = document.querySelector('input[name="paymentMethodRadio"]:checked');
    const paymentMethodName = paymentRadio ? paymentRadio.getAttribute("data-method-name") : "Credit Card";

    // Show processing state
    const submitBtn = document.getElementById("submitOrderBtn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Securing Order with Alibaba Trade Assurance...`;
    }

    let totalPieces = 0;
    let subtotal = 0;
    items.forEach(i => {
      totalPieces += i.quantity;
      subtotal += i.quantity * i.unitPrice;
    });
    const shipping = this.calculateShipping(totalPieces);
    const fee = parseFloat((subtotal * 0.02).toFixed(2));
    const grandTotal = parseFloat((subtotal + shipping + fee).toFixed(2));

    // Generate random Alibaba order ID
    const orderNumber = "ALB-" + new Date().getFullYear() + "-" + Math.floor(1000000 + Math.random() * 9000000);

    const orderData = {
      id: orderNumber,
      date: new Date().toISOString(),
      status: "Payment Confirmed (Preparing Dispatch)",
      statusClass: "status-preparing",
      supplier: items[0].supplierName || "Alibaba Gold Supplier",
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        image: i.image,
        color: i.color || 'Standard',
        size: i.size || 'Standard',
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: parseFloat((i.quantity * i.unitPrice).toFixed(2))
      })),
      shippingMethod: this.shippingRates[this.selectedShippingMethod].name,
      shippingCost: shipping,
      serviceFee: fee,
      totalAmount: grandTotal,
      totalPieces: totalPieces,
      trackingNumber: "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      shippingAddress: `${chosenAddress.fullName}, ${chosenAddress.street}, ${chosenAddress.city}, ${chosenAddress.country} (Tel: ${chosenAddress.phone})`,
      paymentMethod: paymentMethodName,
      tradeAssuranceProtected: true
    };

    // Simulate payment authorization delay
    setTimeout(() => {
      // Save order to history
      Auth.addOrder(orderData);

      // If came from Buy Now, clear session; else remove checked out items from cart
      if (sessionStorage.getItem("buy_now_item")) {
        sessionStorage.removeItem("buy_now_item");
      } else {
        Cart.removeSelected();
      }

      // Store in session for order-success.html
      sessionStorage.setItem("latest_order", JSON.stringify(orderData));

      // Redirect to success page
      window.location.href = "order-success.html";
    }, 1200);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("checkoutItemsContainer")) {
    Checkout.init();
  }
});

if (typeof window !== "undefined") {
  window.Checkout = Checkout;
}
