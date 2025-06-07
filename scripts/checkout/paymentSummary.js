import {cart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';
import { calculateCartQuantity } from '../utils/cartQuantity.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);

        productPriceCents += product.priceCents * cartItem.productQuantity;
        shippingPriceCents += deliveryOption.priceCents
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

    const taxCents = (totalBeforeTaxCents*10)/100;
    const totalCents = totalBeforeTaxCents + taxCents;

    const cartQuantity = calculateCartQuantity();

    const paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}