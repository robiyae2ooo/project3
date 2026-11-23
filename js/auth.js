/**
 * Alibaba Clone - Authentication & User State Management
 * Handles login, registration, session, addresses, orders, and wishlist in LocalStorage.
 */

const Auth = {
  STORAGE_KEY_USER: "alibaba_current_user",
  STORAGE_KEY_USERS: "alibaba_registered_users",
  STORAGE_KEY_ADDRESSES: "alibaba_user_addresses",
  STORAGE_KEY_ORDERS: "alibaba_user_orders",
  STORAGE_KEY_WISHLIST: "alibaba_user_wishlist",

  init() {
    this.seedDefaultData();
    this.updateHeaderUI();
  },

  seedDefaultData() {
    // Seed default demo user if not existing
    if (!localStorage.getItem(this.STORAGE_KEY_USERS)) {
      const defaultUsers = [
        {
          id: "usr_demo_888",
          fullName: "Alexander Wright",
          email: "alex.wright@globaltrade.com",
          password: "password123",
          accountType: "Buyer",
          companyName: "Wright Global Import-Export LLC",
          country: "United States",
          phone: "+1 (555) 349-2810",
          verified: true,
          registeredAt: "2024-03-15"
        }
      ];
      localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
    }

    // Default addresses
    if (!localStorage.getItem(this.STORAGE_KEY_ADDRESSES)) {
      const defaultAddresses = [
        {
          id: "addr_1",
          fullName: "Alexander Wright",
          company: "Wright Global Import-Export LLC",
          street: "742 Evergreen Logistics Blvd, Suite 400",
          city: "Los Angeles",
          state: "California",
          postalCode: "90015",
          country: "United States",
          phone: "+1 555-349-2810",
          taxId: "EIN-82910381",
          isDefault: true
        },
        {
          id: "addr_2",
          fullName: "Warehouse Receiving Dept",
          company: "Wright Global West Coast Hub",
          street: "1280 Port of Long Beach Terminal Way, Gate 4",
          city: "Long Beach",
          state: "California",
          postalCode: "90802",
          country: "United States",
          phone: "+1 555-901-4421",
          taxId: "EIN-82910381",
          isDefault: false
        }
      ];
      localStorage.setItem(this.STORAGE_KEY_ADDRESSES, JSON.stringify(defaultAddresses));
    }

    // Default sample orders
    if (!localStorage.getItem(this.STORAGE_KEY_ORDERS)) {
      const defaultOrders = [
        {
          id: "ALB-2026-9841249",
          date: "2026-11-18T14:32:00Z",
          status: "In Transit",
          statusClass: "status-in-transit",
          supplier: "Shenzhen Lemfo Smart Technology Co., Ltd.",
          items: [
            {
              id: "alb-1001",
              name: "Factory OEM/ODM Ultra 2 Smartwatch 2.02 Inch AMOLED Screen",
              image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
              color: "Titanium Orange",
              size: "49mm Titanium Case",
              quantity: 50,
              unitPrice: 16.50,
              totalPrice: 825.00
            }
          ],
          shippingMethod: "Air Express (DHL / FedEx)",
          shippingCost: 175.00,
          totalAmount: 1000.00,
          trackingNumber: "DHL-984123891US",
          shippingAddress: "742 Evergreen Logistics Blvd, Los Angeles, CA 90015",
          paymentMethod: "Trade Assurance (Visa Card ending in 4242)",
          tradeAssuranceProtected: true
        },
        {
          id: "ALB-2026-7732104",
          date: "2026-10-05T09:15:00Z",
          status: "Completed",
          statusClass: "status-completed",
          supplier: "Guangzhou Boshi Apparel Garment Co., Ltd.",
          items: [
            {
              id: "alb-1002",
              name: "Heavyweight 450GSM French Terry Oversized Blank Hoodies",
              image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
              color: "Washed Vintage Charcoal",
              size: "L",
              quantity: 100,
              unitPrice: 12.50,
              totalPrice: 1250.00
            }
          ],
          shippingMethod: "Air Freight Forwarder",
          shippingCost: 260.00,
          totalAmount: 1510.00,
          trackingNumber: "UPS-7732104CN",
          shippingAddress: "742 Evergreen Logistics Blvd, Los Angeles, CA 90015",
          paymentMethod: "Wire Transfer (T/T)",
          tradeAssuranceProtected: true
        }
      ];
      localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(defaultOrders));
    }

    // Default wishlist
    if (!localStorage.getItem(this.STORAGE_KEY_WISHLIST)) {
      localStorage.setItem(this.STORAGE_KEY_WISHLIST, JSON.stringify(["alb-1003", "alb-1005"]));
    }
  },

  getCurrentUser() {
    const userJson = localStorage.getItem(this.STORAGE_KEY_USER);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY_USERS) || "[]");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);

    if (user) {
      const sessionUser = { ...user };
      delete sessionUser.password;
      localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(sessionUser));
      this.updateHeaderUI();
      return { success: true, user: sessionUser };
    }

    // For convenience in testing, if not found, we can offer demo auto-login or fail gracefully
    return { success: false, message: "Invalid email or password. Please check your credentials or click 'Use Demo Account'." };
  },

  quickDemoLogin() {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY_USERS) || "[]");
    const user = users[0];
    if (user) {
      const sessionUser = { ...user };
      delete sessionUser.password;
      localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(sessionUser));
      this.updateHeaderUI();
      return sessionUser;
    }
    return null;
  },

  register(userData) {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY_USERS) || "[]");
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase().trim())) {
      return { success: false, message: "An account with this email address already exists." };
    }

    const newUser = {
      id: "usr_" + Date.now(),
      fullName: userData.fullName,
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      accountType: userData.accountType || "Buyer",
      companyName: userData.companyName || "Global Trading Co.",
      country: userData.country || "United States",
      phone: userData.phone || "+1 (555) 000-0000",
      verified: true,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(users));

    // Automatically log in
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(sessionUser));
    this.updateHeaderUI();

    return { success: true, user: sessionUser };
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY_USER);
    this.updateHeaderUI();
    window.location.href = "login.html";
  },

  getAddresses() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY_ADDRESSES) || "[]");
  },

  saveAddress(address) {
    const addresses = this.getAddresses();
    if (address.isDefault) {
      addresses.forEach(a => a.isDefault = false);
    }
    if (address.id) {
      const index = addresses.findIndex(a => a.id === address.id);
      if (index !== -1) {
        addresses[index] = { ...addresses[index], ...address };
      }
    } else {
      address.id = "addr_" + Date.now();
      if (addresses.length === 0) address.isDefault = true;
      addresses.push(address);
    }
    localStorage.setItem(this.STORAGE_KEY_ADDRESSES, JSON.stringify(addresses));
    return addresses;
  },

  deleteAddress(addressId) {
    let addresses = this.getAddresses().filter(a => a.id !== addressId);
    if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
      addresses[0].isDefault = true;
    }
    localStorage.setItem(this.STORAGE_KEY_ADDRESSES, JSON.stringify(addresses));
    return addresses;
  },

  getOrders() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY_ORDERS) || "[]");
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem(this.STORAGE_KEY_ORDERS, JSON.stringify(orders));
    return order;
  },

  getWishlist() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY_WISHLIST) || "[]");
  },

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;
    if (index !== -1) {
      wishlist.splice(index, 1);
      added = false;
    } else {
      wishlist.push(productId);
      added = true;
    }
    localStorage.setItem(this.STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    this.updateWishlistCount();
    return added;
  },

  isWishlisted(productId) {
    return this.getWishlist().includes(productId);
  },

  updateWishlistCount() {
    const count = this.getWishlist().length;
    const badge = document.querySelector(".header-wishlist-count");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-block" : "none";
    }
  },

  updateHeaderUI() {
    const user = this.getCurrentUser();
    const userContainer = document.getElementById("headerUserSection");
    if (!userContainer) return;

    if (user) {
      userContainer.innerHTML = `
        <div class="dropdown header-user-dropdown">
          <button class="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center gap-2 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-avatar-circle">${user.fullName.charAt(0)}</div>
            <div class="text-start d-none d-lg-block">
              <span class="d-block small text-light opacity-75" style="font-size: 11px;">Welcome back</span>
              <span class="d-block fw-semibold text-truncate" style="max-width: 110px; font-size: 13px;">${user.fullName.split(' ')[0]}</span>
            </div>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 py-2" style="min-width: 200px; border-radius: 8px;">
            <li class="px-3 py-2 border-bottom">
              <div class="fw-bold text-dark text-truncate">${user.fullName}</div>
              <div class="small text-muted text-truncate">${user.companyName || user.email}</div>
              <span class="badge bg-warning text-dark mt-1" style="font-size: 10px;">Verified ${user.accountType}</span>
            </li>
            <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person me-2 text-warning"></i> My Profile</a></li>
            <li><a class="dropdown-item py-2" href="profile.html?tab=orders"><i class="bi bi-box me-2 text-warning"></i> My Orders</a></li>
            <li><a class="dropdown-item py-2" href="profile.html?tab=addresses"><i class="bi bi-geo-alt me-2 text-warning"></i> Delivery Addresses</a></li>
            <li><a class="dropdown-item py-2" href="profile.html?tab=wishlist"><i class="bi bi-heart me-2 text-warning"></i> My Favorites</a></li>
            <li><hr class="dropdown-divider my-1"></li>
            <li><button class="dropdown-item py-2 text-danger" onclick="Auth.logout()"><i class="bi bi-box-arrow-right me-2"></i> Sign Out</button></li>
          </ul>
        </div>
      `;
    } else {
      userContainer.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-person fs-4 text-white"></i>
          <div class="d-flex flex-column lh-1">
            <span class="small text-white-50" style="font-size: 11px;">Welcome!</span>
            <div class="d-flex align-items-center gap-1">
              <a href="login.html" class="text-white text-decoration-none fw-semibold small hover-underline">Sign In</a>
              <span class="text-white-50 small">|</span>
              <a href="register.html" class="text-warning text-decoration-none fw-semibold small hover-underline">Join Free</a>
            </div>
          </div>
        </div>
      `;
    }

    this.updateWishlistCount();
  }
};

// Auto initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  Auth.init();
});

if (typeof window !== "undefined") {
  window.Auth = Auth;
}
