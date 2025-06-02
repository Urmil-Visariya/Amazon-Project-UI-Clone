export const cart = [];

export function addToCart(button){
  // const productId = button.dataset.productId;
  const {productId} = button.dataset;
  const productName = button.dataset.productName;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  let matchingItem;

  cart.forEach(cartItem =>{
    if(cartItem.id === productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.productQuantity+= quantity;
  } else{
    cart.push({
      productId:productId,
      productName:productName,
      productQuantity:quantity
    });
  }
}