export const addToCartUtil = (cartItems, cartItemToAdd) => {

  const existingItem = cartItems.find(
    item => item.id === cartItemToAdd.id && JSON.stringify(item.attributes) === JSON.stringify(cartItemToAdd.attributes)
  );

  if (existingItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id && JSON.stringify(cartItem.attributes) === JSON.stringify(cartItemToAdd.attributes)
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeFromCart = (cartItems, ItemToRemove) => {
  const existingItem = cartItems.find(
    item => item.id === ItemToRemove.id && JSON.stringify(item.attributes) === JSON.stringify(ItemToRemove.attributes)
  )

  if(existingItem.quantity === 1) {
    return cartItems.filter(item => JSON.stringify(item.attributes) !== JSON.stringify(ItemToRemove.attributes)) 
  }
  
  return cartItems.map(
    item => item.id === ItemToRemove.id && JSON.stringify(item.attributes) === JSON.stringify(ItemToRemove.attributes) ?
    { ...item, quantity: item.quantity - 1} : item
  );
};

export const changeSizeOrColorFunc = (cart, item, whatToChange, changeTo) => {
  // getting the right item
    const selectedItem = cart.find(
      cartItem => cartItem.id === item.id && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
    );

  // check if there is another shoe.
    const selectedShoe = cart.find(
      cartItem => cartItem.id === item.id
    );
  // if there is another shoe, check if it has the same value as the new selected value aka changeTo
      const attributeee = selectedShoe.attributes.find(attribute => attribute.name === whatToChange)
      if(attributeee.selected === changeTo){
          
      }
      
  // if so, remove the one this the least quantity. and add the amount to the other one.

  // console.log(selectedItem, whatToChange, changeTo)
  
  // getting the selected attribute  
  const attribute = selectedItem.attributes.find(attribute => attribute.name === whatToChange)


  // checking if the the user didnt select the same option.
  // if(attribute.selected !== changeTo){
  //   attribute.selected = changeTo
  // }

  return [...cart]
}