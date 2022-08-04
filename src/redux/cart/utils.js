import { v4 as uuidv4 } from 'uuid';

export const addToCartUtil = (cartItems, cartItemToAdd) => {

  const existingItem = cartItems.find(
    item => item.id === cartItemToAdd.id && JSON.stringify(item.attributes) === JSON.stringify(cartItemToAdd.attributes) 
  );

  if (existingItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const addFromCart = (cartItems, cartItemToAdd) => {
  return cartItems.map(item => item.uid === cartItemToAdd.uid
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
}

export const addToCartFromCategoryPage = (cartItems, cartItemToAdd) => {

  const AddedDefaultValues = cartItemToAdd.attributes.map((att) => {
    return  {...att, selected: att.items[0].value}
  })

  const ItemWithDefaultAttributes = {...cartItemToAdd, attributes: AddedDefaultValues}

  const existingItem = cartItems.find(
    item => item.id === ItemWithDefaultAttributes.id && JSON.stringify(item.attributes) === JSON.stringify(ItemWithDefaultAttributes.attributes) 
  );

  if (existingItem) {
    const ItemWithUid = {...existingItem, uid: uuidv4()}
    return cartItems.map(cartItem =>
      cartItem.id === ItemWithUid.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  const ItemWithUid = {...ItemWithDefaultAttributes, uid: uuidv4()}
  
  return [...cartItems, { ...ItemWithUid, quantity: 1 }];

}



export const removeFromCart = (cartItems, ItemToRemove) => {
  const existingItem = cartItems.find(
    // item => item.id === ItemToRemove.id && JSON.stringify(item.attributes) === JSON.stringify(ItemToRemove.attributes)
    item => item.uid === ItemToRemove.uid
  )

  if(existingItem.quantity === 1) {
    // return cartItems.filter(item => JSON.stringify(item.attributes) !== JSON.stringify(ItemToRemove.attributes))
    return cartItems.filter(item => item.uid !== ItemToRemove.uid) 
  }
  
  return cartItems.map(
  // && JSON.stringify(item.attributes) === JSON.stringify(ItemToRemove.attributes)
    item => item.uid === ItemToRemove.uid  ?
    { ...item, quantity: item.quantity - 1} : item
  );
};




export const changeSizeOrColorFunc = (cart, item, whatToChange, changeTo) => {

  const attribute = item.attributes.find(attribute => attribute.name === whatToChange)
  
  // checking if the the user didnt select the same attribute. if so lets change to attribute selection
  if(attribute.selected !== changeTo){
    attribute.selected = changeTo
  }

  // checking if there are two items with the exact same id and attributes,
  // if so, one of them will be deleted. no need for two items with the same selections in our 
  // cart.
  const matchedItems = cart.filter(
    cartItem => cartItem.id === item.id && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes)
  );

  if(matchedItems.length >= 2){
    return cart.filter(item => item.uid !== matchedItems[1].uid) 
  }

  return [...cart]
}