import { calculateCartQuantity } from "./cartQuantity.js";

export function updateCheckoutCartQuantity() {
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${calculateCartQuantity()} items</a>)`;
}


