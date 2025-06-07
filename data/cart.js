import { updateCheckoutCartQuantity } from '../scripts/utils/CheckoutCartQuantity.js';

export const cart = JSON.parse(localStorage.getItem('cart')) || 
[];

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function getCartItem(productId){
  let matchingItem;

  cart.forEach(cartItem =>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  return matchingItem;
}

export function addToCart(button){
  // const productId = button.dataset.productId;
  const {productId} = button.dataset;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  let matchingItem = getCartItem(productId);

  if(matchingItem){
    matchingItem.productQuantity+= quantity;
  } else{
    cart.push({
      productId:productId,
      productQuantity:quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const index = cart.findIndex((item) =>{
    return productId === item.productId;
    });

    if(index != -1){
        cart.splice(index,1);
    }
    updateCheckoutCartQuantity();
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  cart.forEach(cartItem =>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateQuantity(productId,newQuantity){
  const cartItem = getCartItem(productId);
  cartItem.productQuantity = newQuantity;
  saveToStorage();
}