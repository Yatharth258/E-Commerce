document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.nav-cart');

    // Attach click event to all "Add to Cart" buttons
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            // Check if item already exists in the cart
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    // Display the total cart item count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        let badge = document.querySelector('.cart-count');
        if (!badge) {
            badge = document.createElement('span');
            badge.classList.add('cart-count');
            badge.style.marginLeft = '5px';
            badge.style.backgroundColor = 'orange';
            badge.style.color = 'white';
            badge.style.padding = '2px 6px';
            badge.style.borderRadius = '50%';
            badge.style.fontSize = '12px';
            cartIcon.appendChild(badge);
        }
        badge.textContent = totalItems;
    }

    // Initialize cart count on page load
    updateCartCount();
});
