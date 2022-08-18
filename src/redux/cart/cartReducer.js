import { cartTypes } from "./types";
import {addToCartFunc, selectAttributeFromItem ,removeFromCart, changeSizeOrColorFunc, addFromCart, addToCartFromCategoryPage} from "./utils";

const initialState = {
    overlayToggler: true,
    cart: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                overlayToggler: !state.overlayToggler
            }
        case cartTypes.CLOSE_OVERLAY: 
            return {
                ...state,
                overlayToggler: false
            }
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cart: addToCartFunc(state.cart, action.payload)
            }
        case cartTypes.ADD_FROM_CART:
            return {
                ...state,
                cart: addFromCart(state.cart, action.payload)
            }
        
        case cartTypes.ADD_TO_CART_FROM_CATEGORY_PAGE: 
            return {
                ...state, 
                cart: addToCartFromCategoryPage(state.cart, action.payload)
            }
        case cartTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: removeFromCart(state.cart, action.payload)
            }
        case cartTypes.CHANGE_SIZE_OR_COLOR: 
            return {
                ...state,
                cart: changeSizeOrColorFunc(state.cart, action.payload.item, action.payload.whatToChange, action.payload.changeTo)
            }
            case cartTypes.SELECT_ATTRIBUTE_FROM_ITEM_PAGE: 
            return {
                ...state,
                cart: selectAttributeFromItem(state.cart, action.payload.item, action.payload.whatToChange, action.payload.changeTo)
            }

        default: 
        return state;
    }
}