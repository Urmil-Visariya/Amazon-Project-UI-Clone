export const cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productQuantity:2
},{
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    productQuantity:1
}];

export function addToCart(button){
  // const productId = button.dataset.productId;
  const {productId} = button.dataset;
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
      productQuantity:quantity
    });
  }
}