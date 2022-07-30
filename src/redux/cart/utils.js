export const addToCartUtil = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === cartItemToAdd.id && cartItem.size === cartItemToAdd.size && cartItem.color === cartItemToAdd.color
    );
  
    if (existingCartItem) {
        return cartItems.map(cartItem =>
          cartItem.id === cartItemToAdd.id ? 
          { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeFromCart = (cartItems, cartItemsToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemsToRemove.id && cartItem.size === cartItemsToRemove.size && cartItem.color === cartItemsToRemove.color
  )

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemsToRemove.id)
  }

  return cartItems.map(
    cartItem => cartItem.id === cartItemsToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1} : cartItem
  );
};

export const changeSizeOrColorFunc = (cart, item, whatToChange, changeTo) => {
  // getting the right item
  const selectedItem = cart.find(
    cartItem => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
  );
  
  // getting the selected attribute  
  const attribute = selectedItem.attributes.find(attribute => attribute.name === whatToChange)
  
  // checking if the the user didnt select the same option.
  if(attribute.selected !== changeTo){
    attribute.selected = changeTo
  }

  return [...cart]
}