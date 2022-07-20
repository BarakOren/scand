import { cartTypes } from "./types";
import {addToCartUtil, removeFromCart} from "./utils";

const initialState = {
    overlayToggler: false,
    cart: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                overlayToggler: !state.overlayToggler
            }
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cart: addToCartUtil(state.cart, action.payload)
            }
        case cartTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: removeFromCart(state.cart, action.payload)
            }
        default: 
        return state;
    }
}