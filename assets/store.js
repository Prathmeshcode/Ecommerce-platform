// E-Commerce Platform JavaScript
class ECommercePlatform {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "MacBook Pro 16-inch",
                price: 199999,
                originalPrice: 229999,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
                rating: 4.8,
                reviews: 124,
                category: "electronics",
                badge: "BESTSELLER",
                description: "Powerful laptop for professional work"
            },
            {
                id: 2,
                name: "iPhone 15 Pro",
                price: 134999,
                originalPrice: 139999,
                image: "https://images.unsplash.com/photo-1510557880182-3bb7566c57c9?w=400&h=300&fit=crop",
                rating: 4.9,
                reviews: 89,
                category: "electronics",
                badge: "NEW",
                description: "Latest iPhone with advanced features"
            },
            {
                id: 3,
                name: "Sony WH-1000XM4",
                price: 29999,
                originalPrice: 34999,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                rating: 4.7,
                reviews: 203,
                category: "accessories",
                badge: "SALE",
                description: "Premium noise-canceling headphones"
            },
            {
                id: 4,
                name: "Dell XPS 13",
                price: 89999,
                originalPrice: 99999,
                image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
                rating: 4.6,
                reviews: 156,
                category: "electronics",
                badge: "",
                description: "Ultra-portable premium laptop"
            },
            {
                id: 5,
                name: "iPad Pro 12.9",
                price: 99999,
                originalPrice: 109999,
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
                rating: 4.8,
                reviews: 178,
                category: "electronics",
                badge: "HOT",
                description: "Professional tablet for creativity"
            },
            {
                id: 6,
                name: "AirPods Pro",
                price: 24999,
                originalPrice: 27999,
                image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
                rating: 4.5,
                reviews: 334,
                category: "accessories",
                badge: "",
                description: "Wireless earbuds with active noise cancellation"
            },
            {
                id: 7,
                name: "Samsung Galaxy S24",
                price: 79999,
                originalPrice: 84999,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
                rating: 4.4,
                reviews: 267,
                category: "electronics",
                badge: "",
                description: "Flagship Android smartphone"
            },
            {
                id: 8,
                name: "Adobe Creative Suite",
                price: 4999,
                originalPrice: 5999,
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
                rating: 4.7,
                reviews: 89,
                category: "software",
                badge: "DIGITAL",
                description: "Complete creative software package"
            }
        ];
        
        this.cart = [];
        this.init();
    }
    
    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
    }
    
    setupEventListeners() {
        // Category filters
        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.filterProducts());
        });
        
        // Price range
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', () => this.filterProducts());
        }
        
        // Sort dropdown
        document.querySelector('.form-select').addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });
    }
    
    loadProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;
        
        productGrid.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to product cards
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                this.addToCart(productId);
            });
        });
        
        document.querySelectorAll('.action-btn[title="Add to Wishlist"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToWishlist(parseInt(e.target.closest('.action-btn').getAttribute('data-product-id')));
            });
        });
    }
    
    createProductCard(product) {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <div class="product-actions">
                            <button class="action-btn" title="Quick View" onclick="showProductModal(${product.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" title="Add to Wishlist" data-product-id="${product.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-rating">
                            <span style="color: #ffc107;">${stars}</span>
                            <small class="text-muted">(${product.reviews})</small>
                        </div>
                        <h6 class="product-title">${product.name}</h6>
                        <p class="text-muted small">${product.description}</p>
                        <div class="product-price">
                            <span class="current-price">₹${product.price.toLocaleString()}</span>
                            ${product.originalPrice > product.price ? `
                                <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                                <span class="discount-percent">${discount}% OFF</span>
                            ` : ''}
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-cart-plus me-1"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    filterProducts() {
        const categories = Array.from(document.querySelectorAll('.form-check-input:checked'))
            .map(cb => cb.value);
        const maxPrice = parseInt(document.getElementById('priceRange').value);
        
        const filtered = this.products.filter(product => {
            const categoryMatch = categories.length === 0 || categories.includes(product.category);
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });
        
        this.displayProducts(filtered);
    }
    
    sortProducts(sortBy) {
        let sorted = [...this.products];
        
        switch(sortBy) {
            case 'Sort by Price':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'Sort by Name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Sort by Rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
        }
        
        this.displayProducts(sorted);
    }
    
    displayProducts(products) {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = products.map(product => this.createProductCard(product)).join('');
        
        // Re-attach event listeners
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                this.addToCart(productId);
            });
        });
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartCount();
        this.updateCartModal();
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.updateCartCount();
            this.updateCartModal();
        }
    }
    
    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
        }
    }
    
    updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h5>Your cart is empty</h5>
                    <p class="text-muted">Add some products to get started!</p>
                </div>
            `;
            cartTotal.textContent = '0';
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-4">
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">₹${item.price.toLocaleString()}</small>
                        </div>
                        <div class="col-3">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                                       onchange="store.updateQuantity(${item.id}, parseInt(this.value))">
                                <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-2 text-end">
                            <strong>₹${(item.price * item.quantity).toLocaleString()}</strong>
                            <button class="btn btn-sm btn-outline-danger ms-2" onclick="store.removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toLocaleString();
            checkoutBtn.disabled = false;
        }
    }
    
    addToWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        this.showNotification(`${product.name} added to wishlist!`, 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions
function showCart() {
    store.updateCartModal();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function showLogin() {
    alert('Login functionality - This would integrate with your authentication system');
}

function showRegister() {
    alert('Registration functionality - This would show a signup form');
}

function showDemo() {
    alert('Demo scheduling - This would open a calendar booking system');
}

function proceedToCheckout() {
    alert('Checkout process - This would redirect to secure payment processing');
}

function showProductModal(productId) {
    const product = store.products.find(p => p.id === productId);
    alert(`Product Details: ${product.name}\nPrice: ₹${product.price.toLocaleString()}\n\nThis would show a detailed product modal with specifications, reviews, and more images.`);
}

// Initialize the store
let store;
document.addEventListener('DOMContentLoaded', function() {
    store = new ECommercePlatform();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some demo interactions
setTimeout(() => {
    console.log('🛒 E-Commerce Platform Demo Ready!');
    console.log('Try adding products to cart, filtering by categories, and exploring features.');
}, 1000);
