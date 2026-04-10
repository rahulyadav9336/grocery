import React, { useState, useEffect, createContext, useContext } from 'react';

// Context for global state
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        addNotification(`Added another ${product.name} to cart!`, 'success');
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      addNotification(`${product.name} added to cart!`, 'success');
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        addNotification(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      addNotification(`${product.name} added to wishlist!`, 'success');
      return [...prev, product];
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        toggleWishlist,
        darkMode,
        setDarkMode,
        addToCart,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const categories = [
  {
    id: 1,
    name: 'Fruits & Vegetables',
    emoji: '🥦',
    color: '#4CAF50',
    icon: '🍎',
    deals: '20% off',
  },
  {
    id: 2,
    name: 'Dairy & Bread',
    emoji: '🥛',
    color: '#2196F3',
    icon: '🧀',
    deals: '15% off',
  },
  {
    id: 3,
    name: 'Snacks',
    emoji: '🍪',
    color: '#FF9800',
    icon: '🍿',
    deals: '25% off',
  },
  {
    id: 4,
    name: 'Beverages',
    emoji: '🥤',
    color: '#9C27B0',
    icon: '🧃',
    deals: '10% off',
  },
  {
    id: 5,
    name: 'Atta & Rice',
    emoji: '🌾',
    color: '#795548',
    icon: '🍚',
    deals: '12% off',
  },
  {
    id: 6,
    name: 'Personal Care',
    emoji: '🧴',
    color: '#E91E63',
    icon: '🧴',
    deals: '18% off',
  },
  {
    id: 7,
    name: 'Meat & Seafood',
    emoji: '🍗',
    color: '#F44336',
    icon: '🥩',
    deals: '15% off',
  },
  {
    id: 8,
    name: 'Organic',
    emoji: '🌱',
    color: '#8BC34A',
    icon: '🌿',
    deals: '22% off',
  },
];

const allProducts = [
  {
    id: 1,
    name: 'Fresh Red Apples',
    price: 120,
    originalPrice: 150,
    unit: 'kg',
    category: 'Fruits & Vegetables',
    img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: false,
    discount: 20,
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 60,
    originalPrice: 80,
    unit: 'dozen',
    category: 'Fruits & Vegetables',
    img: 'https://images.unsplash.com/photo-1574226516831-e1dff420e12',
    rating: 4.3,
    reviews: 95,
    inStock: true,
    isNew: false,
    discount: 25,
  },
  {
    id: 3,
    name: 'Fresh Farm Milk',
    price: 60,
    originalPrice: 70,
    unit: 'litre',
    category: 'Dairy & Bread',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    isNew: false,
    discount: 14,
  },
  {
    id: 4,
    name: 'Whole Wheat Bread',
    price: 45,
    originalPrice: 55,
    unit: 'pack',
    category: 'Dairy & Bread',
    img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
    rating: 4.4,
    reviews: 87,
    inStock: true,
    isNew: false,
    discount: 18,
  },
  {
    id: 5,
    name: 'Potato Chips',
    price: 30,
    originalPrice: 40,
    unit: 'pack',
    category: 'Snacks',
    img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    isNew: false,
    discount: 25,
  },
  {
    id: 6,
    name: 'Orange Juice',
    price: 120,
    originalPrice: 150,
    unit: 'bottle',
    category: 'Beverages',
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd551bba',
    rating: 4.6,
    reviews: 112,
    inStock: true,
    isNew: true,
    discount: 20,
  },
  {
    id: 7,
    name: 'Premium Basmati Rice',
    price: 180,
    originalPrice: 220,
    unit: 'kg',
    category: 'Atta & Rice',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    isNew: false,
    discount: 18,
  },
  {
    id: 8,
    name: 'Herbal Shampoo',
    price: 250,
    originalPrice: 350,
    unit: 'bottle',
    category: 'Personal Care',
    img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
    rating: 4.5,
    reviews: 78,
    inStock: false,
    isNew: false,
    discount: 28,
  },
  {
    id: 9,
    name: 'Chicken Breast',
    price: 320,
    originalPrice: 400,
    unit: 'kg',
    category: 'Meat & Seafood',
    img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    isNew: false,
    discount: 20,
  },
  {
    id: 10,
    name: 'Organic Tomatoes',
    price: 50,
    originalPrice: 65,
    unit: 'kg',
    category: 'Organic',
    img: 'https://images.unsplash.com/photo-1546470427-1f9a2c4d2fd6',
    rating: 4.4,
    reviews: 67,
    inStock: true,
    isNew: false,
    discount: 23,
  },
  {
    id: 11,
    name: 'Cheddar Cheese',
    price: 180,
    originalPrice: 220,
    unit: '200g',
    category: 'Dairy & Bread',
    img: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b',
    rating: 4.6,
    reviews: 94,
    inStock: true,
    isNew: false,
    discount: 18,
  },
  {
    id: 12,
    name: 'Cold Drink Can',
    price: 35,
    originalPrice: 50,
    unit: 'can',
    category: 'Beverages',
    img: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a',
    rating: 4.1,
    reviews: 234,
    inStock: true,
    isNew: false,
    discount: 30,
  },
];

const dealsOfDay = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 99,
    originalPrice: 150,
    discount: 34,
    img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
    timeLeft: '05:23:45',
  },
  {
    id: 2,
    name: 'Orange Juice',
    price: 89,
    originalPrice: 150,
    discount: 41,
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd551bba',
    timeLeft: '05:23:45',
  },
  {
    id: 3,
    name: 'Basmati Rice',
    price: 149,
    originalPrice: 220,
    discount: 32,
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
    timeLeft: '05:23:45',
  },
];

const featuredBrands = [
  { name: 'Amul', logo: '🥛', products: 45 },
  { name: 'Nestle', logo: '🍫', products: 38 },
  { name: 'Patanjali', logo: '🌿', products: 52 },
  { name: 'Britannia', logo: '🍪', products: 31 },
];

function NotificationToast({ notifications }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification toast-${notif.type}`}>
          <span>{notif.type === 'success' ? '✅' : 'ℹ️'}</span>
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
}

function Navbar({ setSearchTerm, searchTerm }) {
  const { cart, wishlist, darkMode, setDarkMode } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">
              Fresh<span>Mart</span>
            </span>
          </div>

          <div className={`search-wrapper ${isSearchOpen ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Search 1000+ products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          <div className="nav-icons">
            <button className="nav-icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              className="nav-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              🔍
            </button>
            <button className="nav-icon wishlist-icon">
              ❤️{' '}
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </button>
            <button
              className="nav-icon cart-icon"
              onClick={() => setIsCartOpen(true)}
            >
              🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

function CartSidebar({ isOpen, onClose }) {
  const { cart, setCart, addNotification } = useApp();

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    addNotification('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Cart 🛒</h2>
        <button className="close-cart" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-animation">🛍️</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping →
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">
                    ₹{item.price}/{item.unit}
                  </p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <p>₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-savings">
            <span>Total Savings:</span>
            <span className="savings-amount">₹{savings}</span>
          </div>
          <div className="cart-total">
            <span>Total Amount:</span>
            <span className="total-price">₹{total}</span>
          </div>
          {total < 500 && (
            <div className="free-delivery-note">
              Add ₹{500 - total} more for FREE delivery
            </div>
          )}
          <button className="checkout-btn">Proceed to Checkout →</button>
        </div>
      )}
    </div>
  );
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Fresh Groceries',
      subtitle: 'Delivered to Your Doorstep',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Biggest Sale',
      subtitle: 'Up to 50% OFF',
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Free Delivery',
      subtitle: 'On orders above ₹500',
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: slide.bg }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge animate-fade-in">
                  ✨ Special Offer
                </div>
                <h1 className="animate-slide-up">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h1>
                <p className="animate-slide-up-delay">
                  Get the best quality fruits, vegetables, and daily essentials
                  at unbeatable prices.
                </p>
                <div className="hero-buttons animate-slide-up-delay-2">
                  <button className="btn-primary">Shop Now →</button>
                  <button className="btn-secondary">Learn More</button>
                </div>
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">50k+</span>
                    <span className="stat-label">Happy Customers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1000+</span>
                    <span className="stat-label">Products</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">30min</span>
                    <span className="stat-label">Fast Delivery</span>
                  </div>
                </div>
              </div>
              <div className="hero-image">
                <div className="floating-card">🎉 Mega Sale</div>
                <div className="floating-card">🚚 Free Shipping</div>
                <div className="floating-card">💰 Best Prices</div>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DealsOfDay() {
  return (
    <div className="section deals-section">
      <div className="section-header">
        <h2>🔥 Deals of the Day</h2>
        <p>Limited time offers - Don't miss out!</p>
      </div>
      <div className="deals-grid">
        {dealsOfDay.map((deal) => (
          <div className="deal-card" key={deal.id}>
            <div className="deal-badge">-{deal.discount}%</div>
            <img src={deal.img} alt={deal.name} />
            <h4>{deal.name}</h4>
            <div className="deal-prices">
              <span className="deal-price">₹{deal.price}</span>
              <span className="deal-original">₹{deal.originalPrice}</span>
            </div>
            <div className="deal-timer">
              <span>⏰ {deal.timeLeft}</span>
            </div>
            <button className="deal-btn">Grab Deal →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="section categories-section">
      <div className="section-header">
        <h2>Shop by Category</h2>
        <p>Browse through our wide range of categories</p>
      </div>
      <div className="categories-grid">
        {categories.map((c) => (
          <div
            className={`category-card ${selectedCategory === c.name ? 'active' : ''}`}
            key={c.id}
            onClick={() =>
              setSelectedCategory(selectedCategory === c.name ? null : c.name)
            }
          >
            <div className="category-icon">{c.icon}</div>
            <h4>{c.name}</h4>
            <div className="category-deals">{c.deals}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Products({ products, addToCart }) {
  const { wishlist, toggleWishlist } = useApp();
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState(500);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  let filteredProducts = [...products];

  if (showInStockOnly) {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  }

  filteredProducts = filteredProducts.filter((p) => p.price <= priceRange);

  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filteredProducts.sort((a, b) => b.discount - a.discount);
  }

  return (
    <div className="section products-section">
      <div className="section-header">
        <h2>✨ Popular Products</h2>
        <div className="product-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort by: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: Highest First</option>
            <option value="discount">Discount: Biggest First</option>
          </select>
          <div className="filter-toggle">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="price-slider"
            />
            <span>Max: ₹{priceRange}</span>
          </div>
          <label className="stock-filter">
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>
      </div>

      <div className={`products-${viewMode}`}>
        {filteredProducts.map((p) => (
          <div className={`product-card ${viewMode}-view`} key={p.id}>
            <div className="product-badges">
              {p.discount > 0 && (
                <div className="discount-badge">-{p.discount}%</div>
              )}
              {p.isNew && <div className="new-badge">New</div>}
              {!p.inStock && (
                <div className="outofstock-badge">Out of Stock</div>
              )}
            </div>
            <div className="product-image">
              <img src={p.img} alt={p.name} />
              <button
                className={`wishlist-btn ${wishlist?.find((item) => item.id === p.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(p)}
              >
                ❤️
              </button>
            </div>
            <div className="product-info">
              <h4>{p.name}</h4>
              <div className="product-rating">
                {'★'.repeat(Math.floor(p.rating))}
                <span>({p.reviews})</span>
              </div>
              <div className="product-price">
                <span className="current-price">₹{p.price}</span>
                <span className="original-price">₹{p.originalPrice}</span>
                <span className="unit">/{p.unit}</span>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(p)}
                disabled={!p.inStock}
              >
                {p.inStock ? 'Add to Cart +' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-animation">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

function FeaturedBrands() {
  return (
    <div className="section brands-section">
      <div className="section-header">
        <h2>🏷️ Featured Brands</h2>
        <p>Shop from trusted brands</p>
      </div>
      <div className="brands-grid">
        {featuredBrands.map((brand) => (
          <div className="brand-card" key={brand.name}>
            <div className="brand-logo">{brand.logo}</div>
            <h4>{brand.name}</h4>
            <p>{brand.products}+ Products</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-icon">📧</div>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get exclusive offers, deals and updates straight to your inbox</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe →</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">🛒 FreshMart</div>
          <p>Your trusted grocery partner since 2020</p>
          <div className="payment-methods">
            <span>💳</span>
            <span>📱</span>
            <span>🏦</span>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>Fruits & Vegetables</li>
            <li>Dairy & Bakery</li>
            <li>Snacks & Beverages</li>
            <li>Household Essentials</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@freshmart.com</p>
          <div className="social-links">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 FreshMart. All rights reserved. Made with ❤️ for India</p>
      </div>
    </footer>
  );
}

// Main App component wrapped with Provider
function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart, notifications } = useApp();

  let filteredProducts = allProducts;
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  return (
    <>
      <NotificationToast notifications={notifications} />
      <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Hero />
      <DealsOfDay />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Products products={filteredProducts} addToCart={addToCart} />
      <FeaturedBrands />
      <Newsletter />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
