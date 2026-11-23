/**
 * Alibaba Clone - Main Application Script
 * Handles global search auto-suggest, category mega-menu flyouts, currency/region preferences,
 * Contact Supplier modal, Chat Now simulation, RFQ widget, and interactive UI components.
 */

const App = {
  preferences: {
    country: "United States",
    currency: "USD ($)",
    language: "English - EN"
  },

  init() {
    this.loadPreferences();
    this.setupGlobalSearch();
    this.setupMegaMenu();
    this.setupPreferencesModal();
    this.setupContactSupplierModal();
    this.setupChatDrawer();
    this.setupRfqWidget();
    this.setupQuickViewModal();
  },

  loadPreferences() {
    const saved = localStorage.getItem("alibaba_preferences");
    if (saved) {
      try {
        this.preferences = { ...this.preferences, ...JSON.parse(saved) };
      } catch (e) {}
    }
    this.updatePreferencesDisplay();
  },

  updatePreferencesDisplay() {
    const label = document.getElementById("headerPreferencesLabel");
    if (label) {
      label.textContent = `${this.preferences.country} / ${this.preferences.currency} / ${this.preferences.language.split(' ')[0]}`;
    }
  },

  savePreferences(prefs) {
    this.preferences = { ...this.preferences, ...prefs };
    localStorage.setItem("alibaba_preferences", JSON.stringify(this.preferences));
    this.updatePreferencesDisplay();
    Cart.showToast("Regional preferences updated successfully!");
  },

  setupGlobalSearch() {
    const searchInputs = document.querySelectorAll(".alibaba-search-input");
    const searchForms = document.querySelectorAll(".alibaba-search-form");

    searchInputs.forEach(input => {
      const parentForm = input.closest(".alibaba-search-form");
      const suggestBox = parentForm ? parentForm.querySelector(".search-suggestions-box") : null;

      input.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        if (!suggestBox) return;

        if (query.length < 2) {
          suggestBox.classList.add("d-none");
          suggestBox.innerHTML = "";
          return;
        }

        const matches = Catalog.search({ query }).slice(0, 5);
        if (matches.length === 0) {
          suggestBox.innerHTML = `
            <div class="p-3 text-muted small text-center">
              No matching products found for "<strong>${query}</strong>"
            </div>
          `;
          suggestBox.classList.remove("d-none");
          return;
        }

        let html = `<div class="list-group list-group-flush border-0">`;
        matches.forEach(item => {
          html += `
            <a href="product-details.html?id=${item.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 p-2 border-0">
              <img src="${item.images[0]}" alt="${item.name}" class="rounded object-fit-cover" style="width: 44px; height: 44px;">
              <div class="flex-grow-1 overflow-hidden">
                <div class="text-truncate fw-semibold text-dark" style="font-size: 13px;">${item.name}</div>
                <div class="small text-muted d-flex gap-2">
                  <span class="text-danger fw-bold">$${item.tieredPricing[0].price.toFixed(2)}</span>
                  <span>MOQ: ${item.minOrder} ${item.unit}</span>
                  <span class="badge text-bg-light border text-truncate" style="max-width: 120px;">${item.category}</span>
                </div>
              </div>
            </a>
          `;
        });

        html += `
          <div class="p-2 bg-light border-top text-center">
            <a href="products.html?q=${encodeURIComponent(query)}" class="small text-primary text-decoration-none fw-semibold">
              View all results for "${query}" <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>`;

        suggestBox.innerHTML = html;
        suggestBox.classList.remove("d-none");
      });

      // Hide suggestions when clicking outside
      document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && suggestBox && !suggestBox.contains(e.target)) {
          suggestBox.classList.add("d-none");
        }
      });
    });

    searchForms.forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector(".alibaba-search-input");
        const categorySelect = form.querySelector(".alibaba-search-category");
        const q = input ? input.value.trim() : "";
        const cat = categorySelect ? categorySelect.value : "all";

        let targetUrl = "products.html?";
        const params = [];
        if (q) params.push(`q=${encodeURIComponent(q)}`);
        if (cat && cat !== "all") params.push(`cat=${encodeURIComponent(cat)}`);

        window.location.href = targetUrl + params.join("&");
      });
    });
  },

  setupMegaMenu() {
    // Populate dynamic categories in category sidebars or mega menus if present
    const categoryMenuEl = document.getElementById("mainCategorySidebarList");
    if (!categoryMenuEl) return;

    let html = "";
    CATEGORIES.forEach(cat => {
      html += `
        <li class="category-menu-item position-relative">
          <a href="products.html?cat=${cat.id}" class="category-menu-link d-flex align-items-center justify-content-between text-decoration-none text-dark py-2 px-3">
            <span class="d-flex align-items-center gap-2">
              <i class="bi ${cat.icon} text-muted"></i>
              <span class="cat-name">${cat.name}</span>
            </span>
            <i class="bi bi-chevron-right text-muted small"></i>
          </a>
          <div class="category-mega-flyout shadow-lg bg-white p-4 border rounded-end">
            <div class="row">
              <div class="col-8">
                <h6 class="fw-bold text-dark border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
                  <i class="bi ${cat.icon} text-warning"></i> ${cat.name} Wholesale
                </h6>
                <div class="row g-2">
                  ${cat.subcategories.map(sub => `
                    <div class="col-6">
                      <a href="products.html?cat=${cat.id}&sub=${encodeURIComponent(sub.name)}" class="text-decoration-none text-secondary d-block p-1 hover-orange small">
                        ${sub.name} <span class="text-muted" style="font-size: 11px;">(${sub.count})</span>
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="col-4 border-start ps-3">
                <h6 class="fw-bold text-dark mb-2 small text-uppercase letter-spacing-1">Buyer Services</h6>
                <ul class="list-unstyled small text-muted mb-3">
                  <li class="mb-2"><i class="bi bi-shield-check text-success me-1"></i> Trade Assurance</li>
                  <li class="mb-2"><i class="bi bi-patch-check-fill text-warning me-1"></i> Verified Suppliers</li>
                  <li class="mb-2"><i class="bi bi-truck text-primary me-1"></i> Fast Dispatch</li>
                  <li class="mb-2"><i class="bi bi-file-earmark-text text-secondary me-1"></i> Production Monitoring</li>
                </ul>
                <div class="p-2 bg-light rounded text-center">
                  <span class="small d-block fw-bold text-dark mb-1">Source with Ease</span>
                  <a href="products.html?cat=${cat.id}" class="btn btn-warning btn-sm w-100 fw-semibold" style="font-size: 12px;">Browse Category</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      `;
    });

    categoryMenuEl.innerHTML = html;
  },

  setupPreferencesModal() {
    const form = document.getElementById("preferencesModalForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const country = document.getElementById("prefCountrySelect").value;
      const currency = document.getElementById("prefCurrencySelect").value;
      const language = document.getElementById("prefLanguageSelect").value;

      this.savePreferences({ country, currency, language });

      const modalEl = document.getElementById("preferencesModal");
      if (modalEl && window.bootstrap && window.bootstrap.Modal) {
        const bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) bsModal.hide();
      }
    });
  },

  setupContactSupplierModal() {
    const modalEl = document.getElementById("contactSupplierModal");
    if (!modalEl) return;

    const form = document.getElementById("contactSupplierForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Sending Inquiry...`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="bi bi-send-fill me-1"></i> Send Inquiry Now`;
          }
          if (window.bootstrap && window.bootstrap.Modal) {
            const bsModal = bootstrap.Modal.getInstance(modalEl);
            if (bsModal) bsModal.hide();
          }
          form.reset();
          Cart.showToast("Inquiry sent directly to supplier! Check your email for reply.");
        }, 1000);
      });
    }
  },

  openContactSupplier(supplierName = "Shenzhen Lemfo Smart Technology Co., Ltd.", productName = "") {
    const titleEl = document.getElementById("contactSupplierModalTitle");
    const nameEl = document.getElementById("contactSupplierNameDisplay");
    const productEl = document.getElementById("contactSupplierProductInput");

    if (titleEl) titleEl.textContent = `Inquire with ${supplierName}`;
    if (nameEl) nameEl.textContent = supplierName;
    if (productEl && productName) productEl.value = `Inquiry regarding: ${productName}`;

    const modalEl = document.getElementById("contactSupplierModal");
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    }
  },

  setupChatDrawer() {
    const chatDrawer = document.getElementById("alibabaLiveChatDrawer");
    if (!chatDrawer) return;

    const chatInput = document.getElementById("chatDrawerInput");
    const chatForm = document.getElementById("chatDrawerForm");
    const chatMessages = document.getElementById("chatDrawerMessages");

    if (chatForm && chatInput && chatMessages) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        // User message
        const userMsgHtml = `
          <div class="d-flex justify-content-end mb-2">
            <div class="p-2 rounded bg-warning text-dark small" style="max-width: 80%; border-radius: 12px 12px 2px 12px !important;">
              ${msg}
              <div class="text-end text-dark-50" style="font-size: 10px;">Just now</div>
            </div>
          </div>
        `;
        chatMessages.insertAdjacentHTML("beforeend", userMsgHtml);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulated supplier automated response
        setTimeout(() => {
          const supplierReplies = [
            "Hello! Thank you for contacting our sales team. We have this model in stock and ready to ship.",
            "Yes, we support full OEM/ODM branding, custom packaging, and sample orders before bulk production.",
            "Our factory has CE, RoHS, and ISO9001 certifications. What quantity are you planning to order?",
            "We provide full Trade Assurance protection and fast DDP shipping to your warehouse."
          ];
          const randomReply = supplierReplies[Math.floor(Math.random() * supplierReplies.length)];

          const supMsgHtml = `
            <div class="d-flex justify-content-start mb-2">
              <div class="p-2 rounded bg-light border text-dark small" style="max-width: 80%; border-radius: 12px 12px 12px 2px !important;">
                <div class="fw-bold text-primary mb-1" style="font-size: 11px;"><i class="bi bi-shield-check"></i> Verified Sales Rep</div>
                ${randomReply}
                <div class="text-start text-muted" style="font-size: 10px;">Just now</div>
              </div>
            </div>
          `;
          chatMessages.insertAdjacentHTML("beforeend", supMsgHtml);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
      });
    }
  },

  openChat(supplierName = "Shenzhen Lemfo Smart Technology Co., Ltd.") {
    const chatDrawer = document.getElementById("alibabaLiveChatDrawer");
    const chatTitle = document.getElementById("chatDrawerSupplierName");
    if (chatTitle) chatTitle.textContent = supplierName;

    if (chatDrawer) {
      chatDrawer.classList.add("open");
    }
  },

  closeChat() {
    const chatDrawer = document.getElementById("alibabaLiveChatDrawer");
    if (chatDrawer) {
      chatDrawer.classList.remove("open");
    }
  },

  setupRfqWidget() {
    const rfqForm = document.getElementById("homepageRfqForm");
    if (!rfqForm) return;

    rfqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const productReq = document.getElementById("rfqProductInput").value.trim();
      const qty = document.getElementById("rfqQuantityInput").value.trim();
      const unit = document.getElementById("rfqUnitSelect").value;

      if (!productReq) {
        alert("Please specify the product you want to source.");
        return;
      }

      Cart.showToast(`RFQ Posted! Quotes for "${productReq}" (${qty} ${unit}) will arrive in your Buyer Center.`);
      rfqForm.reset();
    });
  },

  setupQuickViewModal() {
    // Allows viewing product info without leaving homepage/search
    window.openQuickView = function(productId) {
      const product = Catalog.getProductById(productId);
      if (!product) return;

      const modalEl = document.getElementById("productQuickViewModal");
      if (!modalEl) return;

      const imgEl = modalEl.querySelector(".quick-view-image");
      const titleEl = modalEl.querySelector(".quick-view-title");
      const priceEl = modalEl.querySelector(".quick-view-price");
      const moqEl = modalEl.querySelector(".quick-view-moq");
      const supplierEl = modalEl.querySelector(".quick-view-supplier");
      const linkEl = modalEl.querySelector(".quick-view-link");
      const addCartBtn = modalEl.querySelector(".quick-view-add-cart");

      if (imgEl) imgEl.src = product.images[0];
      if (titleEl) titleEl.textContent = product.name;
      if (priceEl) priceEl.textContent = `$${product.tieredPricing[0].price.toFixed(2)} - $${product.tieredPricing[product.tieredPricing.length - 1].price.toFixed(2)}`;
      if (moqEl) moqEl.textContent = `Min. Order: ${product.minOrder} ${product.unit}`;
      if (supplierEl) supplierEl.textContent = product.supplier.name;
      if (linkEl) linkEl.href = `product-details.html?id=${product.id}`;

      if (addCartBtn) {
        addCartBtn.onclick = function() {
          Cart.addItem(product, {}, product.minOrder);
          if (window.bootstrap && window.bootstrap.Modal) {
            const bsModal = bootstrap.Modal.getInstance(modalEl);
            if (bsModal) bsModal.hide();
          }
        };
      }

      if (window.bootstrap && window.bootstrap.Modal) {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
      }
    };
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

if (typeof window !== "undefined") {
  window.App = App;
}
