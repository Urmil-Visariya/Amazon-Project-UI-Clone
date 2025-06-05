import { updateCheckoutCartQuantity } from '../scripts/utils/CheckoutCartQuantity.js';

export const cart = JSON.parse(localStorage.getItem('cart')) || 
[];

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(button){
  // const productId = button.dataset.productId;
  const {productId} = button.dataset;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  let matchingItem;

  cart.forEach(cartItem =>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.productQuantity+= quantity;
  } else{
    cart.push({
      productId:productId,
      productQuantity:quantity
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