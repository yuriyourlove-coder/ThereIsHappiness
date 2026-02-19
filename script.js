// Глобальные переменные
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину

// Загрузка товаров при старте
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
});

// Функция загрузки товаров из JSON-файла
function loadProducts() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => {
            document.getElementById('content').innerHTML = 'Ошибка загрузки товаров';
        });
}

// Отображение товаров на главной
function displayProducts(productsToShow) {
    let html = '<div class="products-grid">';
    productsToShow.forEach(product => {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} ₽</p>
                    <p>${product.description}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        В корзину
                    </button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    document.getElementById('content').innerHTML = html;
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Товар добавлен в корзину');
    }
}

// Обновление счетчика в шапке
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Показать корзину
function showCart() {
    if (cart.length === 0) {
        document.getElementById('content').innerHTML = '<p>Корзина пуста</p>';
        return;
    }
    
    let total = 0;
    let html = '<h2>Ваша корзина</h2>';
    
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price} ₽</span>
                <button onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;
    });
    
    html += `<h3>Итого: ${total} ₽</h3>`;
    html += '<button onclick="checkout()">Оформить заказ</button>';
    
    document.getElementById('content').innerHTML = html;
}

// Удаление из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart(); // Обновляем отображение
}

// Показать главную
function showHome() {
    displayProducts(products);
}

// Заглушка для оформления заказа
function checkout() {
    alert('Заказ оформлен! (тестовая версия)');
    // Здесь можно очистить корзину
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showHome();
}

// Простая навигация (подсветка кнопок)
document.querySelectorAll('.app-nav button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.app-nav button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});