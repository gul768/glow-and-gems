// GLOW & GEMS — PRODUCT SETTINGS
// Change each image path to your own image URL or local file.

const products = [
  {
    id: 1,
    name: "Soft Glow Serum",
    category: "beauty",
    price: "Rs. 2,450",
    image: "images/serum.jpg",
    note: "A little ritual for radiant days"
  },
  {
    id: 2,
    name: "Everyday Perfume",
    category: "beauty",
    price: "Rs. 3,200",
    image: "images/perfume.jpeg",
    note: "Your signature in a bottle"
  },
  {
    id: 3,
    name: " Lipsticks",
    category: "beauty",
    price: "Rs. 1,150",
    image: "images/lipstick.jpeg",
    note: "A soft touch of colour"
  },
  {
    id: 4,
    name: "Foundation",
    category: "beauty",
    price: "Rs. 1,850",
    image: "images/foundation.jpeg",
    note: "Your daily hydration favourite"
  },
  {
    id: 5,
    name: "Golden Rings",
    category: "jewelry",
    price: "Rs. 1,750",
    image: "images/goldrings.jpeg",
    note: "A golden little statement"
  },
  {
    id: 6,
    name: "Everyday Necklace",
    category: "jewelry",
    price: "Rs. 2,100",
    image: "images/necklace.jpeg",
    note: "Simple, personal, timeless"
  },
  {
    id: 7,
    name: "Set of Jewelry",
    category: "jewelry",
    price: "Rs. 1,400",
    image: "images/necklace2.jpeg",
    note: "Delicate shine for every day"
  },
  {
    id: 8,
    name: "Classic rings",
    category: "jewelry",
    price: "Rs. 1,950",
    image: "images/golden ring.jpeg",
    note: "A little shine, always"
  },
  {
    id: 9,
    name: "Classic Leather Belt",
    category: "accessories",
    price: "Rs. 2,600",
    image: "images/belt.jpeg",
    note: "The finishing touch"
  },
  {
    id: 10,
    name: "Everyday Wallet",
    category: "accessories",
    price: "Rs. 2,250",
    image: "images/wallet.jpeg",
    note: "Made to go everywhere"
  },
  {
    id: 11,
    name: "Minimal Wristwatch",
    category: "accessories",
    price: "Rs. 4,500",
    image: "images/watch.jpeg",
    note: "Timeless by design"
  },
  {
    id: 12,
    name: "Golden Bracelet",
    category: "jewelry",
    price: "Rs. 1,850",
    image: "images/golden bracelet.jpeg",
    note: "Stack it or wear it solo"
  }
];

// Render the products on the Shop page.
const productGrid = document.querySelector("#product-grid");
const resultCount = document.querySelector("#result-count");

function renderProducts(filter = "all") {
  if (!productGrid) return;

  const visibleProducts = products.filter(product =>
    filter === "all" || product.category === filter
  );

  if (resultCount) {
    resultCount.textContent = visibleProducts.length;
  }

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
        >
        <div class="image-placeholder" style="display:none">
          <span>ADD YOUR IMAGE</span>
          <small>${product.image}</small>
        </div>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.note}</p>

        <div class="product-bottom">
          <span class="price">${product.price}</span>
          <button
            class="product-action"
            type="button"
            data-product="${product.id}"
          >
            View details ↗
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

renderProducts();

// Filter products by category.
document.querySelectorAll(".filter-pill").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

// Demo product details.
document.addEventListener("click", event => {
  const button = event.target.closest(".product-action");
  if (!button) return;

  const product = products.find(
    item => item.id === Number(button.dataset.product)
  );

  if (product) {
    alert(
      `${product.name}\n${product.price}\n\n` +
      "Add your product details or shopping cart here."
    );
  }
});

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Display the current year in the footer.
document.querySelectorAll(".year").forEach(element => {
  element.textContent = new Date().getFullYear();
});

// Demo newsletter form.
const newsletterForm = document.querySelector("#newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    document.querySelector("#newsletter-message").textContent =
      "Thank you for subscribing! Connect an email service to save subscriptions.";

    newsletterForm.reset();
  });
}

// Contact form opens the visitor's email application.
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value;
    const message = document.querySelector("#message").value.trim();

    // Replace this with your real email address.
    const recipient = "hello@example.com";

    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Topic: ${subject}\n\n${message}`;

    const mailLink =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent("Glow & Gems: " + subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailLink;
  });
}

// Show placeholders when a static page image is missing.
document.querySelectorAll(
  ".hero-visual img, .category-image img, .editorial-art img, .contact-image img"
).forEach(img => {
  const showPlaceholder = () => {
    img.style.display = "none";
    const placeholder = img.parentElement.querySelector(".image-placeholder");
    if (placeholder) placeholder.style.display = "grid";
  };

  img.addEventListener("error", showPlaceholder);

  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  }
});