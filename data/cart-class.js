class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productQuantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                productQuantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    getCartItem(productId) {
        let matchingItem;

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        return matchingItem;
    }

    addToCart(productId) {
        const element = document.querySelector(`.js-quantity-selector-${productId}`);

        let quantity = 1;
        if (element) {
            quantity = Number(element.value);
        }

        let matchingItem = this.getCartItem(productId);

        if (matchingItem) {
            matchingItem.productQuantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                productQuantity: quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        const index = this.cartItems.findIndex((item) => {
            return productId === item.productId;
        });

        if (index != -1) {
            this.cartItems.splice(index, 1);
        }
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

    updateQuantity(productId, newQuantity) {
        const cartItem = this.getCartItem(productId);
        cartItem.productQuantity = newQuantity;
        this.saveToStorage();
    }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);