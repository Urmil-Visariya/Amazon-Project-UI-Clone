import { cart, removeFromCart,updateDeliveryOption,updateQuantity } from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { calculateCartQuantity } from '../utils/cartQuantity.js';

//default export
import formatCurrency from '../utils/money.js';

//named export
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

//only import dayjs function
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

import { calculateDeliveryDate, deliveryOptions,getDeliveryOptions } from '../../data/deliveryOptions.js';

import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

function renderCartSummary() {
    let cartSummaryHTML = '';

    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOptions(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML +=
            `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.productQuantity}</span>
                        </span>
                        <span class="update-quantity-link
                        js-update-quantity-link link-primary"
                        data-product-id=${matchingProduct.id}>
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input js-quantity-link-${matchingProduct.id}"
                        data-product-id = ${matchingProduct.id}>
                        <span class="save-quantity-link link-primary js-save-quantity-link"
                        data-product-id = ${matchingProduct.id}>
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link"
                        data-product-id = ${matchingProduct.id}>
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHtml(cartItem)}
                    </div>
                </div>
            </div>`
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}

function deliveryOptionsHtml(cartItem) {
    const productId = cartItem.productId;
    let html = '';

    deliveryOptions.forEach(deliveryOption => {
        const dateString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents === 0 ?
            'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = (cartItem.deliveryOptionId === deliveryOption.id);

        html +=
            `<div class="delivery-option js-delivery-option"
                data-product-id = "${productId}"
                data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${productId}"
                ${isChecked? 'checked' : ''}>
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
    });
    return html;
}

function setupDeleteHandlers() {
    document.querySelectorAll('.js-delete-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                // const container = document.querySelector(`.js-cart-item-container-${productId}`);
                // container.remove();
                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}

function setupUpdateHandlers(){
    document.querySelectorAll('.js-update-quantity-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity');

                const input = document.querySelector(`.js-quantity-link-${productId}`);
                const currentQuantity = container.querySelector('.quantity-label').textContent;
                input.value = currentQuantity;
                input.focus();
            });
        });

        setupUpdateSaveHandlers();
}

function setupUpdateSaveHandlers(){
    document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            handleQuantityUpdates(productId);
        });
    });

    document.querySelectorAll('.js-quantity-input').forEach((link)=>{
            link.addEventListener('keydown',(event)=>{
                if(event.key === 'Enter'){
                    const productId = link.dataset.productId;
                    handleQuantityUpdates(productId);
                }
            });
        });
}

function handleQuantityUpdates(productId){
    const newQuantity = Number(document.querySelector(`.js-quantity-link-${productId}`).value);

    if(isNaN(newQuantity) || newQuantity<0 || newQuantity>=1000) {
        alert('Invalid Input');
    }
    else if(newQuantity === 0){
        removeFromCart(productId);
    }
    else{
        updateQuantity(productId,newQuantity);
    }

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    renderOrderSummary();
    renderPaymentSummary();
}

function setupDeliveryOptionHandlers() {
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        // console.log("Hello");
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

export function renderOrderSummary(){
    renderCheckoutHeader();
    renderCartSummary();
    setupDeleteHandlers();
    setupUpdateHandlers();
    setupDeliveryOptionHandlers();
    
}



