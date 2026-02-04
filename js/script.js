// ==========================
// CONFIG API
// ==========================
// ⚠️ PRODUCTION: InfinityFree - ssguitar.free.nf
// Local Development: http://localhost/uascrud
// Production: https://ssguitar.free.nf/uascrud
const API_BASE = "https://ssguitar.free.nf/uascrud"; // ✅ PRODUCTION URL
let guitars = []; // data akan diisi dari API

// Fallback demo data jika API tidak tersedia
const DEMO_GUITARS = [
  {
    id: 1,
    name: "Gibson SG Original",
    price: 15000000,
    image: "SG_Original.webp",
    description: `<strong>Gibson SG Original - Klasik Legendaris</strong><br><br>
    <strong>Spesifikasi:</strong><br>
    • <strong>Body:</strong> Solid Mahogany, Double Cutaway Design<br>
    • <strong>Neck:</strong> Mahogany with Rosewood Fretboard<br>
    • <strong>Frets:</strong> 22 Medium Jumbo Frets<br>
    • <strong>Pickups:</strong> 2x Alnico Classic (Neck & Bridge)<br>
    • <strong>Bridge:</strong> Tune-o-Matic dengan Stopbar Tailpiece<br>
    • <strong>Hardware:</strong> Chrome-plated, Sealed Tuners<br>
    • <strong>Finishing:</strong> Ebony with Satin Polyester<br><br>
    Gitar legendaris dengan tone powerful, sustain panjang, dan responsivitas sempurna. Ideal untuk rock, blues, dan metal. Dipakai oleh ribuan musisi profesional worldwide.`
  },
  {
    id: 2,
    name: "Gibson SG Modern",
    price: 18000000,
    image: "SG_Modern.webp",
    description: `<strong>Gibson SG Modern - Contemporary Beast</strong><br><br>
    <strong>Spesifikasi:</strong><br>
    • <strong>Body:</strong> Premium Solid Mahogany, Ultra-Thin Profile<br>
    • <strong>Neck:</strong> Slim Taper Mahogany with Bound Rosewood<br>
    • <strong>Frets:</strong> 22 Stainless Steel Medium Jumbo Frets<br>
    • <strong>Pickups:</strong> Burstbucker Pro (Neck), Custom (Bridge)<br>
    • <strong>Bridge:</strong> Modern Tune-o-Matic dengan Locking Tailpiece<br>
    • <strong>Controls:</strong> Push-Pull Coil Tap, Tonepot Split Switch<br>
    • <strong>Finishing:</strong> Ebony Satin, Trans Black, Heritage Cherry<br><br>
    Versi modern dengan ergonomi superior, akses fret yang lebih baik, dan pickup berkualitas tinggi. Cocok untuk musisi kontemporer yang menginginkan fleksibilitas tone dan playability maksimal.`
  },
  {
    id: 3,
    name: "Gibson SG Exclusive",
    price: 20000000,
    image: "SG_Exclusive.webp",
    description: `<strong>Gibson SG Exclusive - Limited Premium Edition</strong><br><br>
    <strong>Spesifikasi:</strong><br>
    • <strong>Body:</strong> Select Solid Mahogany, Hand-Carved Top<br>
    • <strong>Neck:</strong> 1-Piece Mahogany with Ebony Binding & Block Inlays<br>
    • <strong>Frets:</strong> 22 Stainless Steel Jumbo, Crowned & Polished<br>
    • <strong>Pickups:</strong> Burstbucker Pro Set (Custom Winding)<br>
    • <strong>Bridge:</strong> Titanium Tune-o-Matic dengan Hand-Finished Tailpiece<br>
    • <strong>Tuning System:</strong> Locking Deluxe Tuners dengan Ebony Buttons<br>
    • <strong>Finishing:</strong> Hand-Aged Burgundy Mist, Limited Vintage Sunburst<br>
    • <strong>Accessories:</strong> Premium Hard Case, Lifetime Certificate<br><br>
    Limited edition eksklusif dengan material berkualitas tertinggi dan hand-crafted attention to detail. Setiap gitar difinish dengan tangan dan dinomor. Untuk kolektor dan musisi yang menghargai craftsmanship superior.`
  },
  {
    id: 4,
    name: "Gibson SG Historic",
    price: 22000000,
    image: "SG_Historic.webp",
    description: `<strong>Gibson SG Historic - Golden Era Reissue</strong><br><br>
    <strong>Spesifikasi:</strong><br>
    • <strong>Body:</strong> Solid Mahogany (Vintage Specification), Custom Contours<br>
    • <strong>Neck:</strong> 1-Piece Mahogany, Vintage Profile Rosewood Fretboard<br>
    • <strong>Frets:</strong> 22 Vintage Style Nickel-Silver Frets<br>
    • <strong>Pickups:</strong> Historic Alnico II (Neck), Historic Alnico II Magnet (Bridge)<br>
    • <strong>Bridge:</strong> Vintage Tune-o-Matic, Hand-Finished Trapeze Tailpiece<br>
    • <strong>Hardware:</strong> Nickel-Plated Vintage Tuning Machines<br>
    • <strong>Controls:</strong> Traditional 2-Volume, 2-Tone Configuration<br>
    • <strong>Finishing:</strong> Aged Cherry, Vintage Sunburst, Custom Color Options<br>
    • <strong>Certifikat:</strong> Authenticity Certificate dengan Serial Number<br><br>
    Replika autentik dari era keemasan Gibson (1961-1969) dengan spesifikasi period-correct. Menggunakan kualitas material vintage dan konstruksi tradisional. Tone yang hangat, sustain natural, dan responsivitas vintage. Impecable untuk musisi yang mencari pengalaman vintage authentic.`
  }
];

// ==========================
// INIT DEFAULT ADMIN
// ==========================
(function initAdmin(){
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = users.find(u => u.username === "admin");

  if (!adminExists) {
    users.push({
      name: "Administrator",
      username: "admin",
      password: "admin123",
      role: "admin"
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
})();

// ==========================
// FETCH PRODUCTS (IMPROVED)
// ==========================
async function fetchProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(`${API_BASE}/get_data.php`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const result = await res.json();

    if (result.status !== "success") {
      throw new Error(result.message || "API returned error");
    }

    guitars = Array.isArray(result.data) ? result.data : [];

    if (guitars.length === 0) {
      console.warn("⚠️ API mengembalikan data kosong, menggunakan demo data");
      guitars = DEMO_GUITARS;
    }

  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    console.log("📌 Menggunakan demo data (API tidak tersedia)");
    guitars = DEMO_GUITARS;
  }

  // Render setelah data loaded
  if (document.getElementById("product-grid")) {
    renderGrid();
  }

  if (document.getElementById("detail-wrap")) {
    renderDetailFromQuery();
  }

  if (document.getElementById("wishlist-wrap")) {
    renderWishlist();
  }
}


// ==========================
// DELETE PRODUCT (IMPROVED)
// ==========================
async function deleteProduct(id) {
  if (!confirm("⚠️ Yakin mau hapus produk ini?")) return;

  try {
    const response = await fetch(`${API_BASE}/delete_data.php?id=${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "success") {
      showNotification("✅ Produk berhasil dihapus!", "success");
      guitars = guitars.filter(g => g.id !== id);
      renderAdminProductList();
    } else {
      showNotification("❌ Gagal hapus: " + result.message, "error");
    }
  } catch (error) {
    console.error("Delete error:", error);
    showNotification("❌ Error: " + error.message, "error");
  }
}




// ==========================
// AUTH SYSTEM
// ==========================
function validateLogin(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return false;

  localStorage.setItem("loggedUser", user.username);
  localStorage.setItem("loggedUserName", user.name);
  localStorage.setItem("loggedUserRole", user.role || "user");

  return true;
}

function requireLogin() {
  const user = localStorage.getItem("loggedUser");
  const name = localStorage.getItem("loggedUserName");

  if (!user || !name) {
    alert("Please login first!");
    window.location.href = "login.html";
  }
}


// ==========================
// RENDER GRID (PERFORMANCE FIXED)
// ==========================
function renderGrid(limit = null) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const data = limit ? guitars.slice(0, limit) : guitars;

  if (data.length === 0) {
    grid.innerHTML = '<div class="col-12"><p class="text-muted text-center">📭 Tidak ada produk tersedia</p></div>';
    return;
  }

  // ✅ FIX: Gunakan array join instead of += loop
  let html = "";

  data.forEach(g => {
    // Ambil preview dari description (first line atau first 80 chars)
    let preview = g.description;
    if (preview.includes('<strong>')) {
      preview = preview.split('<br>')[0].replace(/<\/?strong>/g, '');
    }
    if (preview.length > 80) {
      preview = preview.substring(0, 80) + '...';
    }
    
    html += `
      <div class="col-md-3">
        <div class="card h-100">
          <img src="images/${g.image}" class="card-img-top" alt="${g.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${escapeHtml(g.name)}</h5>
            <p class="text-muted small mb-2">${preview}</p>
            <p class="card-text fw-bold">Rp ${Number(g.price).toLocaleString("id-ID")}</p>

            <div class="mt-auto d-grid gap-2">
              <a href="detail.html?id=${g.id}&from=collections"
                 class="btn btn-dark btn-sm">Detail</a>
              <button class="btn btn-outline-danger btn-sm"
                onclick="addWishlist(${g.id})">
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}


// ==========================
// WISHLIST SYSTEM (IMPROVED)
// ==========================
function addWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(id)) {
    showNotification("❤️ Produk sudah ada di wishlist!", "info");
    return;
  }

  wishlist.push(id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  showNotification("✅ Berhasil ditambahkan ke wishlist ❤️", "success");
}

function renderWishlist() {
  const wrap = document.getElementById("wishlist-wrap");
  if (!wrap) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wrap.innerHTML = '<div class="alert alert-info">📭 Wishlist masih kosong.</div>';
    return;
  }

  // ✅ FIX: Build HTML first, then set innerHTML
  let html = "";

  wishlist.forEach(id => {
    const g = guitars.find(x => Number(x.id) === Number(id));
    if (!g) return;

    html += `
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5>${escapeHtml(g.name)}</h5>
            <p class="text-muted mb-0">Rp ${Number(g.price).toLocaleString("id-ID")}</p>
          </div>
          <button class="btn btn-sm btn-danger"
            onclick="removeWishlist(${id})">
            ❌ Remove
          </button>
        </div>
      </div>
    `;
  });

  wrap.innerHTML = html;
}

function removeWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(x => x !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}


// ==========================
// DETAIL PAGE (IMPROVED)
// ==========================
async function renderDetailFromQuery() {
  const wrap = document.getElementById("detail-wrap");
  const loading = document.getElementById("detail-loading");
  if (!wrap) return;

  // Wait for guitars data to load
  if (guitars.length === 0) {
    await fetchProducts();
  }

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const from = params.get("from") || "menu";

  const g = guitars.find(x => Number(x.id) === Number(id));
  
  if (!g) {
    if (loading) loading.style.display = "none";
    wrap.innerHTML = `<div class="alert alert-danger">❌ Produk tidak ditemukan</div>`;
    wrap.style.display = "block";
    return;
  }

  // Hide loading, show detail
  if (loading) loading.style.display = "none";
  wrap.style.display = "block";

  wrap.innerHTML = `
    <div class="row g-5 align-items-center">
      <div class="col-md-6 text-center">
        <img src="images/${g.image}"
             class="img-fluid rounded-4 shadow" alt="${g.name}">
      </div>

      <div class="col-md-6">
        <h2 class="fw-bold mb-3">${escapeHtml(g.name)}</h2>
        <p class="fs-4 fw-semibold mb-3 text-primary">
          Rp ${Number(g.price).toLocaleString("id-ID")}
        </p>
        <div class="mb-4" style="line-height: 1.8; font-size: 0.95rem;">
          ${g.description}
        </div>

        <div class="d-flex gap-3">
          <button class="btn btn-dark px-4"
            onclick="addWishlist(${g.id})">
            ❤️ Tambah Wishlist
          </button>
          <a href="${from}.html"
             class="btn btn-outline-secondary px-4">
            ← Kembali
          </a>
        </div>
      </div>
    </div>
  `;
}


// ==========================
// NAVBAR AUTO HIDE ON SCROLL
// ==========================
let lastScroll = 0;
const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;

    if (current > lastScroll && current > 120) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = current;
  });
}


// ==========================
// AUTO FETCH ON LOAD
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

// ==========================
// FETCH INSERT PRODUCT (IMPROVED)
// ==========================
async function insertProduct(formData) {
  try {
    const res = await fetch(`${API_BASE}/insert_data.php`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const result = await res.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Gagal insert produk");
    }

    showNotification("✅ Produk berhasil ditambahkan 🎸", "success");

    // refresh data dari API
    await fetchProducts();

  } catch (err) {
    console.error("Insert error:", err);
    showNotification("❌ " + err.message, "error");
  }
}

// ==========================
// FORM SUBMIT HANDLER
// ==========================
const addForm = document.getElementById("add-product-form");

if (addForm) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addForm);
    insertProduct(formData);

    addForm.reset();
  });
}

// ==========================
// UTILITY FUNCTIONS
// ==========================

/**
 * Escape HTML special characters untuk prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
  // Type: 'success', 'error', 'warning', 'info'
  const colors = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  const alertDiv = document.createElement('div');
  alertDiv.className = `alert ${colors[type]} alert-dismissible fade show position-fixed`;
  alertDiv.setAttribute('role', 'alert');
  alertDiv.style.top = '100px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.maxWidth = '400px';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(alertDiv);

  // Auto remove setelah 4 detik
  setTimeout(() => {
    alertDiv.remove();
  }, 4000);
}

/**
 * Edit product function (placeholder untuk future feature)
 */
function editProduct(id) {
  alert("⏳ Fitur edit akan segera hadir");
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
